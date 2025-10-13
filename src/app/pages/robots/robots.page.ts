import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'	
import { ModalController } from '@ionic/angular'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { IRobot, IColumn } from 'src/app/interfaces'
import { RobotsService } from 'src/app/services/robot/robot.service'
import { RobotModalComponent } from './modal/robot-modal.component'
import { EventService } from 'src/app/services/event.service'
import { LIMIT } from 'src/app/services/common/httpOptions'
@Component({
	selector: 'app-robots',
	templateUrl: './robots.page.html',
	styleUrls: ['./robots.page.scss'],
})
export class RobotsPage implements OnInit {
	listOptions: any[] = [
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (robot: IRobot) => {
				const data = JSON.parse(JSON.stringify(robot))
				this.openRobotModal('update', data)
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async (robot: IRobot) => {
				const modal = await this.modalCtrl.create({
					component: AlertModalComponent,
					cssClass: 'claro-oym-modal-action',
					swipeToClose: true,
					mode: 'ios',
					componentProps: {
						icon: 'trash-outline',
						title: 'Eliminar Robot',
						message: `¿Estás seguro de eliminar el Robot "${robot.name}"?`,
						data: robot,
						Accept: this.robotsService.deleteRobot,
					},
				})
				modal.onWillDismiss().then((_) => {
					this.robotsService.updateTable(true)
				})
				await modal.present()
			},
		},
	]
	columns: IColumn[] = [
		{
			label: 'Nombre',
			field: 'name',
			klass: 'w-[300px]',
		},
		{
			label: 'Descripción',
			field: 'description',
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
		public robotsService: RobotsService
	) {}

	ngOnInit() {
		this.getRobots()
	}

	searchRobots(RobotsName: string) {
		this.robotsService.currentPage = 1
		this.search = RobotsName
		this.getRobots(this.search)
	}

	getRobots(
		name: string = this.search,
		page: number = this.robotsService.currentPage,
		limit: number = this.limit
	) {
		this.loading = true
		this.robotsService
			.getAllRobots(page, limit, name)
			.subscribe((res: any) => {
				this.robotsService.setRobots(res)
				this.loading = false
			})
	}

	async openRobotModal(type: string = 'create', robot?: IRobot){
		const modal = await this.modalCtrl.create({
			component: RobotModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				data: robot,
			},
		})
		return await modal.present()
	}

	async onChangePage(page: number) {
		this.robotsService.currentPage = page
		this.getRobots()
	}
}
