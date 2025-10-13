import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import {
	IRobot,
	IColumn,
	IoptionSelection,
	IPagination,
	IPoleo,
} from 'src/app/interfaces'
import { PoleoModalComponent } from './modal/poleo-modal.component'
import { PoleosService } from 'src/app/services/poleo/poleo.service'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { RobotsService } from 'src/app/services/robot/robot.service'
import { LIMIT } from 'src/app/services/common/httpOptions'
@Component({
	selector: 'app-poleos',
	templateUrl: './poleos.page.html',
	styleUrls: ['./poleos.page.scss'],
})
export class PoleosPage implements OnInit {
	robots: IoptionSelection[] = []
	selectRobots: IoptionSelection[] = []
	search: string = ''
	LIST_OPTIONS: any[] = [
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (robot: any) => {
				const DATA = JSON.parse(JSON.stringify(robot))
				this.openPoleoModal('update', DATA)
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async (poleo: any) => {
				const DeleteFunction = this.poleoService.deletePoleo
				const modal = await this.modalCtrl.create({
					component: AlertModalComponent,
					cssClass: 'claro-oym-modal-action',
					swipeToClose: true,
					mode: 'ios',
					componentProps: {
						icon: 'trash-outline',
						title: 'Eliminar poleoe',
						message: `¿Estás seguro de eliminar "${poleo.name}" ?`,
						data: poleo,
						Accept: DeleteFunction,
					},
				})
				modal.onDidDismiss().then((_) => {
					this.poleoService.updateTable(true)
				})
				return await modal.present()
			},
		},
	]

	limit: number = LIMIT
	loading: boolean = false

	COLUMNS: IColumn[] = [
		{
			label: 'Título',
			field: 'title',
			klass: 'w-[350px]',
		},
		{
			label: 'Pais',
			field: 'country',
			klass: 'w-[100px]',
		},
		{
			label: 'Servidor',
			field: 'host',
			klass: 'w-[200px]',
		},
		{
			label: 'Directorio',
			field: 'directory',
			klass: 'w-[200px]',
		},
		{
			label: 'Puerto',
			field: 'port',
			klass: 'w-[100px]',
		},
		{
			label: 'Prótocolo',
			field: 'protocol',
			klass: 'w-[100px]',
		},
		{
			label: '',
			field: 'actions',
			klass: 'w-[100px]',
		},
	]

	constructor(
		public poleoService: PoleosService,
		private modalCtrl: ModalController,
		private robotService: RobotsService
	) {}

	ngOnInit() {
		this.loading = true
		this.poleoService
			.getAllPoleos(this.poleoService.currentPage, this.limit)
			.subscribe((data: IPagination) =>
				this.poleoService.setPoleos(data)
			)

		this.robotService.getAllRobots(1, -1).subscribe((data) => {
			this.robots = data.rows.map((robot: IRobot) => {
				return {
					label: robot.name,
					value: robot.id?.toString(),
				}
			})
		})
		setTimeout(() => {
			this.loading = false
		}, 800)
	}
	/*prueba */

	async onChangePage(page: number) {
		this.poleoService.currentPage = page
		this.poleoService
			.getAllPoleos(page, this.limit)
			.subscribe((data: IPagination) =>
				this.poleoService.setPoleos(data)
			)
	}

	async openPoleoModal(type: string = 'create', poleo?: IPoleo) {
		const modal = await this.modalCtrl.create({
			component: PoleoModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				data: poleo,
			},
		})
						modal.onDidDismiss().then((_) => {
					this.poleoService.updateTable(true)
				})
				return await modal.present()
		
	}


	searchPoleo(e:string) {
		this.poleoService.currentPage = 1
		let search = e.trim()
			
		let robotArray: any[] = this.selectRobots.map(
			(robot) => robot.value
		)
		this.poleoService
			.getAllPoleos(
				1,
				this.limit,
				search,
				robotArray
			)
			.subscribe((data) => {
				this.poleoService.setPoleos(data)
			})
	}
}
