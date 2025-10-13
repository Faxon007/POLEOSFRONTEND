import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { ICategory, IReport } from 'src/app/interfaces'
import { CategoryService } from 'src/app/services/category/category.service'
import { EventService } from 'src/app/services/event.service'
import { ReportService } from 'src/app/services/report/report.service'

@Component({
	selector: 'app-reports-modals',
	templateUrl: './reports-modals.component.html',
	styleUrls: ['./reports-modals.component.scss'],
})
export class ReportsModalsComponent implements OnInit {
	@Input() type: string | undefined
	@Input() data: IReport = {
		name: '',
		url: '',
		category: {
			id: 0,
			name: '',
		},
	}

	report: IReport = {
		name: '',
		url: '',
		category: {
			name: '',
			id: 0,
		},
	}

	loading: boolean = false

	categories: any[] = []
	category: any = {}

	constructor(
		private modalController: ModalController,
		private reportService: ReportService,
		private categoryService: CategoryService,
		private messageService: EventService
	) {}

  ngOnInit() {
    this.categoryService.getAllCategories(1, -1).subscribe((data) => {
      this.categories = data.rows.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      });
    });
    if (this.type === 'update') {
      this.report = this.data;
      this.category = {
        value: this.data.category.id,
        label: this.data.category.name,
      };
    }
  }

	close() {
		this.modalController.dismiss()
	}

  // searchCategory(inputValue:any){
  //   this.report.category.name=inputValue;
  //   if (inputValue!=""){
  //     inputValue=inputValue.toLowerCase();
  //     this.categoryService.getAllCategories(undefined,-1,inputValue).subscribe(
  //       data => this.categories= data.rows.map(
  //         (categoryData:ICategory)=>
  //         {return {
  //           label:categoryData.name,
  //           values: categoryData.id
  //         }}
  //       )
  //     )
  //   }
  // }

	onSummit() {
		const VALID_CATEGORY = this.categories.find(
			(data) => this.category.label == data.label
		)
		if (VALID_CATEGORY) {
			this.report.categoryId = this.category.value
			this.loading = true
			this.type === 'create'
				? this.reportService
						.createReport(this.report)
						.subscribe((report) => {
							this.reportService.updateTable()
							this.loading = false
							this.modalController.dismiss()
						})
				: this.reportService
						.updateReport(this.data.id as number, this.report)
						.subscribe((_) => {
							this.reportService.updateTable()
							this.loading = false
							this.modalController.dismiss()
						})
		} else {
			alert('Categoría invalida')
		}
	}
}
