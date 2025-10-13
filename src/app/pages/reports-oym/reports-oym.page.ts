import { IReport, IUser } from './../../interfaces/index'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IReportByCategory, IExecution, } from 'src/app/interfaces'
import { AuthStore } from 'src/app/utils/auth'
import { UserService } from 'src/app/services/user/user.service'
import { EventService } from 'src/app/services/event.service'
import { OymReportsService } from 'src/app/services/oymReports/oym-reports.service'
import { ModalController } from '@ionic/angular'
import { Execution2ModalComponent } from '../executions/modal/execution2-modal/execution2-modal.component'
@Component({
	selector: 'app-reports-oym',
	templateUrl: './reports-oym.page.html',
	styleUrls: ['./reports-oym.page.scss'],
})
export class ReportsOymPage implements OnInit {
	reports: IReportByCategory[] = []
	search: string = ''
	user!: IUser
	hasPoleosExecution: boolean = false;
	hasAtpExecution: boolean = false;

	constructor(
		private router: Router,
		private auth: AuthStore,
		private userService: UserService,
		private event: EventService,
		private oymReportsService: OymReportsService,
		private modalCtrl: ModalController
	) {}

	ngOnInit() {
		this.auth.auth.subscribe((session) => {
			this.user = session.user
			const robotPermissions = this.user?.role?.permissions.robotPermissions ?? {};
			 // Validar si tiene permiso de ejecución en Poleos
    		this.hasPoleosExecution = robotPermissions['Poleos']?.includes('executions') ?? false;
    	// Validar si tiene permiso de ejecución en ATP
    		this.hasAtpExecution = robotPermissions['ATP']?.includes('executions2') ?? false;

			session.token !== '' ? this.setDateView() : undefined
			if (session.isAuthenticated) {
				this.oymReportsService.getReportsWithFavorites.subscribe(
					(data: IReportByCategory[]) => {
						this.reports = data
					}
				)
			}
		})
	}

	onClick(item: any) {
		this.router.navigate([`/oym-reports/${item?.id}`])
	}

	private ChangeValueItem(item: IReport): void {
		let category = this.reports.find(
			(category) => category.id == item.categoryId
		)
		if (category) {
			if (item.favorite) {
				category.reports = category.reports.filter(
					(report) => report.id != item.id
				)
			} else {
				category.reports.push(item)
			}
		}
	}

	onClickFavorite(item: IReport) {
		if (item.id) {
			if (this.auth.user.favorites?.includes(item.id)) {
				this.auth.user.favorites = this.auth.user.favorites?.filter(
					(reportid) => reportid != item.id
				)
				item.favorite = false
				this.ChangeValueItem(item)
				this.reports[0].reports = this.reports[0].reports.filter(
					(report) => report.id != item.id
				)
				this.event.presentToast(
					'Se elimino de favoritos',
					1000,
					'danger'
				)
			} else {
				item.favorite = true
				this.ChangeValueItem(item)
				this.reports[0].reports.push(item)
				this.event.presentToast('Se agrego a favoritos', 700, 'success')
				this.auth.user.favorites?.push(item.id)
			}

			if (this.auth.user.id)
				this.userService
					.updateUniqueParamaterUser(this.auth.user.id, {
						favorites: this.auth.user.favorites,
					})
					.subscribe()
		}
	}

	setDateView() {
		this.user.LASTVIEW = `${new Date().toLocaleString()}`
		this.oymReportsService.setDateView(this.user).subscribe((res) => res)
	  }

	async openPoleosModal(type: string = 'create', execution?: IExecution) {
		const modal = await this.modalCtrl.create({
			component: Execution2ModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				data: execution,
			},
		})
		return await modal.present()
	}
}
