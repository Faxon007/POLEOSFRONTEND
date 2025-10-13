import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { ICategory, IColumn } from 'src/app/interfaces'
import { CategoryService } from 'src/app/services/category/category.service'
import { CategoryModalComponent } from './modal/category-modal/category-modal.component'
import { LIMIT } from 'src/app/services/common/httpOptions'
@Component({
	selector: 'app-categories',
	templateUrl: './categories.page.html',
	styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
	listOptions: any[] = [
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (category: ICategory) => {
				const data = JSON.parse(JSON.stringify(category))
				this.openCategoryModal('update', data)
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async (category: ICategory) => {
				const modal = await this.modalCtrl.create({
					component: AlertModalComponent,
					cssClass: 'claro-oym-modal-action',
					swipeToClose: true,
					mode: 'ios',
					componentProps: {
						icon: 'trash-outline',
						title: 'Eliminar categoría',
						message: `¿Estás seguro de eliminar la categoría "${category.name}"?`,
						data: category,
						Accept: this.categoryService.deleteCategory,
					},
				})
				modal.onWillDismiss().then((_) => {
					this.categoryService.updateTable(true)
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
		public categoryService: CategoryService
	) {}

	ngOnInit() {
		this.getCategories()
	}

	searchCategories(categoryName: string) {
		this.categoryService.currentPage = 1
		this.search = categoryName
		this.getCategories(this.search)
	}

	getCategories(
		name: string = this.search,
		page: number = this.categoryService.currentPage,
		limit: number = this.limit
	) {
		this.loading = true
		this.categoryService
			.getAllCategories(page, limit, name)
			.subscribe((res: any) => {
				this.categoryService.setCategoies(res)
				this.loading = false
			})
	}

	async openCategoryModal(type: string = 'create', category?: ICategory) {
		const modal = await this.modalCtrl.create({
			component: CategoryModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				data: category,
			},
		})
		return await modal.present()
	}

	async onChangePage(page: number) {
		this.categoryService.currentPage = page
		this.getCategories()
	}
}
