import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CheckboxListComponent } from 'src/app/components/checkbox-list/checkbox-list.component'
import { IRobot, IExecution } from 'src/app/interfaces'
import { RobotsService } from 'src/app/services/robot/robot.service'
import { ExecutionService } from 'src/app/services/execution/execution.service'

@Component({
  selector: 'app-execution-modal',
  templateUrl: './execution-modal.component.html',
  styleUrls: ['./execution-modal.component.scss'],
})
export class ExecutionModalComponent implements OnInit {
  @Input() type: string = 'create'
  @Input() data?: IExecution
  private startDateOriginal: string = '';

  execution: IExecution = {
    status: 'ACTIVO',
    startDate: new Date().toISOString(),
    cronExpression: '',
    frequency: 'DIARIA',
    weekDay: '1',
    execRobots: { poleos: [] },
    country:'',
  }

  valueSearch: string = ''
  @ViewChildren(CheckboxListComponent) allCheckBoxList!: QueryList<CheckboxListComponent>

  idSelectedAccordion: string = ''
  robots: any[] = []
  options: any[] = []
  loading: boolean = false

  constructor(
    private modalController: ModalController,
    private robotsService: RobotsService,
    private executionService: ExecutionService
  ) {}

  ngOnInit() {
  if (this.type === 'update' && this.data) {
    this.execution = { ...this.data };

    // Fecha tal cual para ion-datetime
    if (this.execution.startDateForPicker) {
      this.execution.startDateForPicker = this.execution.startDateForPicker;
    }
  }

 this.robotsService.getAllRobotsWithPoleos().subscribe((robots) => {
  // Filtrar solo los robots que tengan el nombre "Poleos"
  const soloPoleos = robots.rows.filter((robot: IRobot) => robot.name === "Poleos");

  this.robots = soloPoleos.map((robot: IRobot) => ({
    id: robot.id,
    name: robot.name,
    items: robot.poleos?.map((p) => {
      const index = this.execution.execRobots.poleos.findIndex(
        (r) => r.robotId == p.robotId
      );
      const checked =
        index != -1
          ? this.execution.execRobots.poleos[index].poleos.includes(p.id)
          : false;
      return { id: p.id, name: p.title, check: checked };
    }),
  }));

  this.options = this.robots;
});

  }

  validateRobots(robot: any) {
    const search = this.valueSearch.toLowerCase().trim()
    if (!search) return false
    return !robot.name.toLowerCase().includes(search) && !robot.items.some((item: any) => item.name.toLowerCase().includes(search))
  }

  deselectPoleo() {
    this.allCheckBoxList.forEach((c) => c.unCheckAll())
  }

  pressCheckOymPoleos() {
    this.deselectPoleo()
  }

  changeAccordion(id: string) {
    this.idSelectedAccordion = this.idSelectedAccordion === id ? '' : id
  }

  cancel() {
    this.modalController.dismiss()
  }

  saveExecution() {
    this.loading = true
    // enviar la fecha original sin desfase
    this.execution.startDate = this.execution.startDateOriginal || this.execution.startDateForPicker;

    const date = new Date(this.execution.startDate)
    const minutes = date.getMinutes()
    const hours = date.getHours()
    let cron = ''

    if (this.execution.frequency === 'DIARIA') cron = `${minutes} ${hours} * * *`
    else if (this.execution.frequency === 'SEMANAL') cron = `${minutes} ${hours} * * ${this.execution.weekDay || 1}`
    else if (this.execution.frequency === 'MENSUAL') cron = `${minutes} ${hours} ${date.getDate()} * *`
    else if (this.execution.frequency === 'ANUAL') cron = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`

    this.execution.cronExpression = cron

    let execRobots = this.allCheckBoxList.map((item) => ({
      robotId: item.options.id,
      poleos: item.options.items.filter((p) => p.check).map((p) => p.id),
    })).filter((r) => r.poleos.length > 0)

    this.execution.execRobots.poleos = execRobots

    const action$ =
      this.type === 'create'
        ? this.executionService.createExecution(this.execution)
        : this.executionService.updateExecution(this.execution.id!, this.execution)

    action$.subscribe(() => {
      this.modalController.dismiss()
      this.loading = false
      this.executionService.updateTable()
    })
  }
}
