import { ModalController } from '@ionic/angular'
import { Component, Input, OnInit } from '@angular/core'
import { IRobot } from 'src/app/interfaces'
import { RobotsService } from 'src/app/services/robot/robot.service'
import { EventService } from 'src/app/services/event.service'

@Component({
  selector: 'app-robot-modal',
  templateUrl: './robot-modal.component.html',
  styleUrls: ['./robot-modal.component.scss'],
})
export class RobotModalComponent implements OnInit {
  @Input() type: string | undefined
  @Input() data: IRobot = {
    name: '',
    description: '',
    script: '',
    status: '',
    options: [],
  }

  robot: IRobot = {
    name: '',
    description: '',
    script: '',
    status: '',
    options: [],
  }

  newOption: string = '' // 👈 input para nueva opción
  loading: boolean = false

  constructor(
    private modalController: ModalController,
    private robotsService: RobotsService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    if (this.type === 'update') {
      this.robot = { ...this.data }
      if (!this.robot.options) this.robot.options = []
    }
  }

  close() {
    this.modalController.dismiss()
  }

  addOption() {
    if (this.newOption.trim() && !this.robot.options.includes(this.newOption.trim())) {
      this.robot.options.push(this.newOption.trim())
      this.newOption = ''
    }
  }

  removeOption(index: number) {
    this.robot.options.splice(index, 1)
  }

  onSumbit() {
    this.loading = true
    this.type === 'create'
      ? this.robotsService.createRobot(this.robot).subscribe((_) => {
          this.robotsService.updateTable()
          this.loading = false
          this.modalController.dismiss()
        })
      : this.robotsService.updateRobot(this.robot).subscribe((_) => {
          this.robotsService.updateTable()
          this.loading = false
          this.modalController.dismiss()
        })
  }
}
