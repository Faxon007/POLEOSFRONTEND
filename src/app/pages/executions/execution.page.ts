import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IRobot,
  IColumn,
  IoptionSelection,
  IPagination,
  IExecution,
} from 'src/app/interfaces';
import { ExecutionModalComponent } from './modal/execution-modal/execution-modal.component';
import { ExecutionService } from 'src/app/services/execution/execution.service';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { RobotsService } from 'src/app/services/robot/robot.service';
import { LIMIT } from 'src/app/services/common/httpOptions';

@Component({
  selector: 'app-executions',
  templateUrl: './execution.page.html',
  styleUrls: ['./execution.page.scss'],
})
export class ExecutionsPage implements OnInit {
  valueSearchExecution: string = '';
  robots: IoptionSelection[] = [];
  limit: number = LIMIT;
  loading: boolean = false;

  COLUMNS: IColumn[] = [
    { label: 'Pais', field: 'country', klass: 'w-[250px]' },
    { label: 'Inicio', field: 'startDate' },
    { label: 'Frecuencia', field: 'frequency' },
    { label: 'Día', field: 'weekdayOrDay' },   // 👈 nuevo campo en tabla
    { label: 'Estado', field: 'status' },
    { label: '', field: 'actions', klass: 'w-[100px]' },
  ];

  LIST_OPTIONS: any[] = [
    {
      title: 'Editar',
      icon: 'create-outline',
      event: (execution: any) => {
        const DATA = { ...execution };
        if (execution.startDateISO) {
          DATA.startDate = execution.startDateISO;
        }
        this.openExecutionModal('update', DATA);
      },
    },
    {
      title: 'Eliminar',
      icon: 'trash-outline',
      event: async (execution: any) => {
        const DeleteFunction = this.executionService.deleteExecution;
        const modal = await this.modalCtrl.create({
          component: AlertModalComponent,
          cssClass: 'claro-oym-modal-action',
          swipeToClose: true,
          mode: 'ios',
          componentProps: {
            icon: 'trash-outline',
            title: 'Eliminar ejecución',
            message: `¿Estás seguro de eliminar "${execution.name}"?`,
            data: execution,
            Accept: DeleteFunction,
          },
        });

        modal.onWillDismiss().then(() => {
          this.loadExecutions();
        });

        return await modal.present();
      },
    },
  ];

  constructor(
    public executionService: ExecutionService,
    private modalCtrl: ModalController,
    private robotService: RobotsService
  ) {}

  ngOnInit() {
    this.loadExecutions();
  }

  loadExecutions() {
    this.loading = true;

    this.executionService
      .getAllExecutions(this.executionService.currentPage, this.limit)
      .subscribe(
        (data: IPagination) => {
          const daysOfWeek = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
          ];

          const rows = (data.rows || []).map((row: any) => {
            row.robotType =
              row.execRobots && Object.keys(row.execRobots).length
                ? Object.keys(row.execRobots)[0]
                : 'sin robot';

            // 👇 Transformamos weekday/día según frecuencia
            if (row.frequency === 'SEMANAL' && row.weekDay !== undefined) {
              row.weekdayOrDay = daysOfWeek[row.weekDay] || row.weekDay;
            } else if (row.frequency === 'MENSUAL' && row.weekDay !== undefined) {
              row.weekdayOrDay = row.weekDay.toString(); // día calendario
            } else {
              row.weekdayOrDay = '-';
            }

            return row;
          });

          this.executionService.setExecutions({ ...data, rows });
          this.loading = false;

          this.robotService.getAllRobots(1, -1).subscribe((robotsData) => {
            this.robots = robotsData.rows.map((robot: IRobot) => ({
              label: robot.name,
              value: robot.id?.toString(),
            }));
          });
        },
        (err) => {
          console.error('error getAllExecutions', err);
          this.loading = false;
        }
      );
  }

  async onChangePage(page: number) {
    this.executionService.currentPage = page;
    this.loadExecutions();
  }

  async openExecutionModal(type: string = 'create', execution?: IExecution) {
    if (execution) {
      execution.startDateForPicker = execution.startDate;
    }

    const modal = await this.modalCtrl.create({
      component: ExecutionModalComponent,
      cssClass: 'claro-oym-modal',
      mode: 'ios',
      componentProps: { type, data: execution },
    });

    modal.onWillDismiss().then(() => {
      this.loadExecutions();
    });

    return await modal.present();
  }

  searchExecution(): void {
    this.executionService.currentPage = 1;
    this.valueSearchExecution = this.valueSearchExecution.toLowerCase().trim();
    this.loadExecutions();
  }
}
