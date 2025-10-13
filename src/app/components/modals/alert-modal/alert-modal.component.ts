import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-alert-modal',
	templateUrl: './alert-modal.component.html',
	styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
	@Input() icon: string | undefined
	@Input() title: string | undefined
	@Input() message: string | undefined
	@Input() klassIcon: string = 'bg-primary-item text-primary'
	@Input() klassButton: string = 'primary large'
	@Input() titleButton: string = 'Eliminar'
	@Input() data: any | undefined
	@Input() titleCancelButton: string = 'Cancelar'
	@Input() klassCancelButton: string = 'secondary large'
	@Input() showButton: boolean = true
	@Input() showCancelButton: boolean = true
	@Input() Accept: Function = () => {}
	@Input() secondMessage!: string
	@Input() secondIcon!: string
	@Input() downloadPath!: string
	loading: boolean = false
	constructor(private modalController: ModalController) {}

	ngOnInit() {}

	onClick() {
		this.loading = true
		if (this.Accept) {
			this.Accept(this.data.id).subscribe((data: any) => {
				this.loading = false
				this.modalController.dismiss({ accept: true })
			})
		}
	}

	cancel() {
		this.modalController.dismiss({ accept: false })
	}
}
