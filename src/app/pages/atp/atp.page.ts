import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'	
import { ModalController } from '@ionic/angular'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { IAtp, IColumn } from 'src/app/interfaces'
import { AtpService } from 'src/app/services/atp/atp.service'
import { AtpModalComponent } from './modal/atp-modal.component'
import { EventService } from 'src/app/services/event.service'
import { LIMIT } from 'src/app/services/common/httpOptions'
@Component({
	selector: 'app-atp',
	templateUrl: './atp.page.html',
	styleUrls: ['./atp.page.scss'],
})
export class AtpPage implements OnInit {
	listOptions: any[] = [
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (atp: IAtp) => {
				const data = JSON.parse(JSON.stringify(atp))
				this.openAtpModal('update', data)
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async (atp: IAtp) => {
				const modal = await this.modalCtrl.create({
					component: AlertModalComponent,
					cssClass: 'claro-oym-modal-action',
					swipeToClose: true,
					mode: 'ios',
					componentProps: {
						icon: 'trash-outline',
						title: 'Eliminar Atp',
						message: `¿Estás seguro de eliminar el Atp "${atp.title}"?`,
						data: atp,
						Accept: this.atpService.deleteAtp,
					},
				})
				modal.onWillDismiss().then((_) => {
					this.atpService.updateTable(true)
				})
				await modal.present()
			},
		},
	]
	columns: IColumn[] = [
		{
			label: 'Título',
			field: 'title',
			klass: 'w-[300px]',
		},
		{
			label: 'País',
			field: 'country',
		},
		{
			label: 'Host',
			field: 'host',
		},
		{
			label: 'Directorio',
			field: 'directory',
		},
		{
			label: 'Protocolo',
			field: 'protocol',
		},
		{
			label: '',
			field: 'actions',
			klass: 'w-[100px]',
		},
	]
	rows: any[] = []
	currentPage: number = 1
	limit: number = LIMIT
	totalPages: number = 0
	count: number = 0
	loading: boolean = false
	search = ''
	constructor(
		public modalCtrl: ModalController,
		public atpService: AtpService
	) {}

	ngOnInit() {
		this.getAtp()
	}

	searchAtp(AtpName: string) {
		this.atpService.currentPage = 1
		this.search = AtpName
		this.getAtp(this.search)
	}

	getAtp(
		title: string = this.search,
		page: number = this.atpService.currentPage,
		limit: number = this.limit
	) {
		this.loading = true
		this.atpService
			.getAllAtp(page, limit, title)
			.subscribe((res: any) => {
				this.atpService.setAtp(res)
				this.loading = false
			})
	}

	async openAtpModal(type: string = 'create', atp?: IAtp){
		const modal = await this.modalCtrl.create({
			component: AtpModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				data: atp,
			},
		})
		return await modal.present()
	}

	async onChangePage(page: number) {
		this.atpService.currentPage = page
		this.getAtp()
	}
}
