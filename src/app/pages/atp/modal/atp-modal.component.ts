import { ModalController } from '@ionic/angular'
import { Component, Input, OnInit } from '@angular/core'
import { IAtp, IPagination } from 'src/app/interfaces'
import { AtpService } from 'src/app/services/atp/atp.service'
import { EventService } from 'src/app/services/event.service'

@Component({
	selector: 'app-atp-modal',
	templateUrl: './atp-modal.component.html',
	styleUrls: ['./atp-modal.component.scss'],
})
export class AtpModalComponent implements OnInit {
	@Input() type: string | undefined
	@Input() data: IAtp = {
		title: '',
		country: '',
		host: '',
		user: '', 
		password: '',
		directory: '',
		protocol: '',
		port: 0
	}
	atp: IAtp = {
		title: '',
		country: '',
		host: '',
		user: '', 
		password: '',
		directory: '',
		protocol: '',
		port: 0
	}
	loading: boolean = false
	constructor(
		private modalController: ModalController,
		private atpService: AtpService,
		private eventService: EventService
	) {}

	ngOnInit() {
		if (this.type === 'update') {
			this.atp = this.data
		}
	}

	close() {
		this.modalController.dismiss()
	}

	onSumbit() {
		this.loading = true
		this.type === 'create'
			? this.atpService.createAtp(this.atp).subscribe((_) => {
					this.atpService.updateTable()
					this.loading = false
					this.modalController.dismiss()
			  })
			: this.atpService
					.updateAtp(this.atp)
					.subscribe((_) => {
						this.atpService.updateTable()
						this.loading = false
						this.modalController.dismiss()
					})
	}
}
