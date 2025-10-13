import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import {
	ICategory,
	IColumn,
	IoptionSelection,
	IPagination,
	IReport,
} from 'src/app/interfaces'
import { ReportsModalsComponent } from './reports-modals/reports-modals.component'
import { ReportService } from 'src/app/services/report/report.service'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { report } from 'process'
import { CategoryService } from 'src/app/services/category/category.service'
import { LIMIT } from 'src/app/services/common/httpOptions'
@Component({
	selector: 'app-reports',
	templateUrl: './reports.page.html',
	styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
	valueSearchReport: string = ''
	categories: IoptionSelection[] = []
	selectCategories: IoptionSelection[] = []
	LIST_OPTIONS: any[] = [
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (category: any) => {
				const DATA = JSON.parse(JSON.stringify(category))
				this.openReportModal('update', DATA)
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async (report: any) => {
				const DeleteFunction = this.reportService.deleteReport
				const modal = await this.modalCtrl.create({
					component: AlertModalComponent,
					cssClass: 'claro-oym-modal-action',
					swipeToClose: true,
					mode: 'ios',
					componentProps: {
						icon: 'trash-outline',
						title: 'Eliminar reporte',
						message: `¿Estás seguro de eliminar "${report.name}" ?`,
						data: report,
						Accept: DeleteFunction,
					},
				})
				modal.onDidDismiss().then((_) => {
					this.reportService.updateTable(true)
				})
				return await modal.present()
			},
		},
	]

	limit: number = LIMIT
	loading: boolean = false

	COLUMNS: IColumn[] = [
		{
			label: 'Reporte',
			field: 'name',
			klass: 'w-[250px]',
		},
		{
			label: 'Categoria',
			field: 'category.name',
			klass: 'w-[250px]',
		},
		{
			label: 'URL',
			field: 'url',
		},
		{
			label: '',
			field: 'actions',
			klass: 'w-[100px]',
		},
	]

	constructor(
		public reportService: ReportService,
		private modalCtrl: ModalController,
		private categoryService: CategoryService
	) {}

	ngOnInit() {
		this.loading = true
		this.reportService
			.getAllReports(this.reportService.currentPage, this.limit)
			.subscribe((data: IPagination) =>
				this.reportService.setReports(data)
			)

		this.categoryService.getAllCategories(1, -1).subscribe((data) => {
			this.categories = data.rows.map((category: ICategory) => {
				return {
					label: category.name,
					value: category.id?.toString(),
				}
			})
		})
		setTimeout(() => {
			this.loading = false
		}, 800)
	}

	async onChangePage(page: number) {
		this.reportService.currentPage = page
		this.reportService
			.getAllReports(page, this.limit)
			.subscribe((data: IPagination) =>
				this.reportService.setReports(data)
			)
	}

	async openReportModal(type: string = 'create', report?: IReport) {
		const modal = await this.modalCtrl.create({
			component: ReportsModalsComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				data: report,
			},
		})
		return await modal.present()
	}

	searchReport(): void {
		this.reportService.currentPage = 1
		this.valueSearchReport = this.valueSearchReport.toLowerCase().trim()
		let valueSearch =
			this.valueSearchReport != '' ? this.valueSearchReport : undefined
		let categoryArray: any[] = this.selectCategories.map(
			(category) => category.value
		)
		this.reportService
			.getAllReports(
				1,
				this.limit,
				valueSearch,
				valueSearch,
				categoryArray
			)
			.subscribe((data) => {
				this.reportService.setReports(data)
			})
	}
}
