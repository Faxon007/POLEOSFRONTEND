import {
	Component,
	Input,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CheckboxListComponent } from 'src/app/components/checkbox-list/checkbox-list.component'
import { ICategory, IRole } from 'src/app/interfaces'
import { CategoryService } from 'src/app/services/category/category.service'
import { RolService } from 'src/app/services/rol/rol.service'
import { RobotsService } from 'src/app/services/robot/robot.service'
@Component({
	selector: 'app-roles-modal',
	templateUrl: './rol-modal.component.html',
	styleUrls: ['./rol-modal.component.scss'],
})
export class RolModalComponent implements OnInit {
	@Input() type: string = ''
	@Input() role: IRole = {
		id: 0,
		name: '',
		permissions: {
			reports: [],
			management: false,
			administrativeReports: false,
			rpa: false,
			robotPermissions: {},
		},
	}

	rol: IRole = {
		id: 0,
		name: '',
		permissions: {
			reports: [],
			management: false,
			administrativeReports: false,
			rpa: false,
			robotPermissions: {},
		},
	}

	valueSearch: string = ''
	@ViewChildren(CheckboxListComponent)
	allCheckBoxList!: QueryList<CheckboxListComponent>

	idSelectedAccordion: string = ''
	categories: any[] = []
	loading: boolean = false

	robots: any[] = [] 

	constructor(
		private modalController: ModalController,
		private categoryService: CategoryService,
		private rolService: RolService,
		public robotsService: RobotsService
	) {}

	options: any[] = []

	async ngOnInit() {
		if (this.type === 'edit') {
			this.rol = JSON.parse(JSON.stringify(this.role))
		}

		// 🔹 Cargar robots desde BD usando tu método
		this.robotsService.getAllRobots().subscribe((res: any) => {
			this.robots = res.rows.map((r: any) => ({
				...r,
				options: r.options || [],
			}))

			// inicializar permisos de robots si no existen
			this.robots.forEach((r) => {
				if (!this.rol.permissions.robotPermissions[r.name]) {
					this.rol.permissions.robotPermissions[r.name] = []
				}
			})
		})

		
		this.categoryService.getAllCategoriesWithReports().subscribe((categories) => {
			let categoriesVariable: ICategory[] = categories.rows
			this.categories = categoriesVariable.map((category) => {
				return {
					id: category.id,
					name: category.name,
					items: category.reports?.map((data) => {
						let index: number = this.rol.permissions.reports.findIndex(
							(report) => report.categoryId == data.categoryId
						)
						let checked =
							index != -1
								? this.rol.permissions.reports[index].reports.some(
										(report) => report == data.id
								  )
								: false
						return {
							id: data.id,
							name: data.name,
							check: checked,
						}
					}),
				}
			})
			this.options = this.categories
		})
	}

	validateCategorie(category: any) {
		let valid: boolean = false
		this.valueSearch = this.valueSearch.toLowerCase().trim()
		if (this.valueSearch.length != 0) {
			valid = !category.name.toLowerCase().includes(this.valueSearch)
			valid = valid
				? !category.items.some((item: any) =>
						item.name.toLowerCase().includes(this.valueSearch)
				  )
				: false
		}
		return valid
	}

	deselectReport() {
		this.allCheckBoxList.forEach((checkBox: CheckboxListComponent) => {
			checkBox.unCheckAll()
		})
	}

	pressCheckOymReports() {
		this.deselectReport()
	}

	cancel() {
		this.modalController.dismiss()
	}

	changeAccordion(accordionId: string) {
		this.idSelectedAccordion === accordionId
			? (this.idSelectedAccordion = '')
			: (this.idSelectedAccordion = accordionId)
	}

	toggleRobotOption(robotName: string, option: string, checked: boolean) {
		const permissions = this.rol.permissions.robotPermissions
		if (!permissions[robotName]) permissions[robotName] = []

		if (checked) {
			if (!permissions[robotName].includes(option))
				permissions[robotName].push(option)
		} else {
			permissions[robotName] = permissions[robotName].filter(
				(o) => o !== option
			)
		}
	}

	saveRol() {
		this.loading = true

		let permissions = this.allCheckBoxList.map((item) => {
			let reports = item.options.items
				.filter((report: any) => report.check)
				.map((reportItem: any) => reportItem.id)

			return {
				categoryId: item.options.id,
				reports: reports,
			}
		})
		if (permissions != undefined) {
			permissions = permissions.filter((item) => item.reports.length != 0)
			this.rol.permissions.reports = permissions
		}
		console.log(this.rol)
		if (this.type == 'create') {
			this.rolService.createRol(this.rol).subscribe((_) => {
				this.modalController.dismiss()
				this.loading = false
				this.rolService.updateTable()
			})
		} else {
			this.rolService.updateRol(this.rol.id, this.rol).subscribe((_) => {
				this.modalController.dismiss()
				this.loading = false
				this.rolService.updateTable()
			})
		}
	}
}
