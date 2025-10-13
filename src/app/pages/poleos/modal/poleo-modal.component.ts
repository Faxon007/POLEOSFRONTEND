import { ModalController } from '@ionic/angular'
import { Component, Input, OnInit } from '@angular/core'
import { IPoleo,IRobot, IPagination } from 'src/app/interfaces'
import { PoleosService } from 'src/app/services/poleo/poleo.service'
import { RobotsService } from 'src/app/services/robot/robot.service'
import { EventService } from 'src/app/services/event.service'
@Component({
	selector: 'app-poleo-modal',
	templateUrl: './poleo-modal.component.html',
	styleUrls: ['./poleo-modal.component.scss'],
})
export class PoleoModalComponent implements OnInit {
	@Input() type: string | undefined
	@Input() data: IPoleo = {
		title: '',
		robot: {
			id: 0,
			name: '',
		},
		country: '',
		host: '',
		user: '', 
		password: '',
		directory: '',
		protocol: '',
		port: 0,
	}
	poleo: IPoleo = {
		title: '',
		robot: {
			id: 0,
			name: '',
		},
		country: '',
		host: '',
		user: '', 
		password: '',
		directory: '',
		protocol: '',
		port: 0
	}
	loading: boolean = false
	robots: any[] = []
	robot: any = {}
	constructor(
		private modalController: ModalController,
		private poleosService: PoleosService,
		private robotService: RobotsService
	) {}

ngOnInit() {
  if (this.type === 'update') {
    this.poleo = this.data;
    this.poleo.robotId = 1; // Forzar el robot por defecto
  }
}


	close() {
		this.modalController.dismiss()
	}

	onSumbit() {
  // Setear siempre el robotId por defecto
  this.poleo.robotId = 1;

  this.loading = true;

  if (this.type === 'create') {
    this.poleosService.createPoleo(this.poleo).subscribe((_) => {
      this.poleosService.updateTable();
      this.loading = false;
      this.modalController.dismiss();
    });
  } else {
    this.poleosService.updatePoleo(this.poleo).subscribe((_) => {
      this.poleosService.updateTable();
      this.loading = false;
      this.modalController.dismiss();
    });
  }
}

}
