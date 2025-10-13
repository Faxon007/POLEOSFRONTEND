import { ModalController } from '@ionic/angular'
import { Component, Input, OnInit } from '@angular/core'
import { ICategory, IPagination } from 'src/app/interfaces'
import { CategoryService } from 'src/app/services/category/category.service'
import { EventService } from 'src/app/services/event.service'

@Component({
	selector: 'app-category-modal',
	templateUrl: './category-modal.component.html',
	styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
	@Input() type: string | undefined
	@Input() data: ICategory = {
		name: '',
		description: '',
	}
	category: ICategory = {
		name: '',
		description: '',
	}
	loading: boolean = false
	constructor(
		private modalController: ModalController,
		private categoryService: CategoryService,
		private eventService: EventService
	) {}

	ngOnInit() {
		if (this.type === 'update') {
			this.category = this.data
		}
	}

	close() {
		this.modalController.dismiss()
	}

	onSumbit() {
		this.loading = true
		this.type === 'create'
			? this.categoryService.createCategory(this.category).subscribe((_) => {
					this.categoryService.updateTable()
					this.loading = false
					this.modalController.dismiss()
			  })
			: this.categoryService
					.updateCategory(this.category)
					.subscribe((_) => {
						this.categoryService.updateTable()
						this.loading = false
						this.modalController.dismiss()
					})
	}
}
