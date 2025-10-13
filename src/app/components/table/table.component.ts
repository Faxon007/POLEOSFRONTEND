import {
	Component,
	ContentChild,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
} from '@angular/core'
import { PopoverController } from '@ionic/angular'
import { IColumn, List } from 'src/app/interfaces'
import { PopoverOptionsComponent } from '../popover-options/popover-options.component'
import { get } from 'lodash'
@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
	@Input() rows: List[] = []
	@Input() columns: IColumn[] = []
	@Input() listOptions: any[] = []
	@Input() perPage: number = 10
	@Input() current: number = 1
	@Input() count: number = 0
	@Input() total: number = Math.ceil(this.rows.length / this.perPage)
	@Output() changePage: EventEmitter<number> = new EventEmitter<number>()
	@Input() loading: boolean = false
	@Input() showActions: boolean = true;


	@ContentChild(TemplateRef) templateRef!: TemplateRef<any>
	constructor(public popoverController: PopoverController) {}

	ngOnInit() {}

	async presentPopover(data: List, event: any) {
		data.isActive === true
			? (this.listOptions[0].title = 'Dar de baja')
			: data.isActive === false
			? (this.listOptions[0].title = 'Activar usuario')
			: null

		const popover = await this.popoverController.create({
			component: PopoverOptionsComponent,
			event,
			cssClass: 'claro-oym-popover',
			componentProps: {
				options: this.listOptions,
				data: data,
			},
			translucent: true,
			mode: 'md',
		})
		return await popover.present()
	}

	public onGoTo(page: number): void {
		this.current = page
		this.changePage.emit(page)
	}

	public onNext(page: number): void {
		this.current = page + 1
		this.changePage.emit(this.current)
	}

	public onPrevious(page: number): void {
		this.current = page - 1
		this.changePage.emit(this.current)
	}

	public getValue(row: any, field: any): any {
		return get(row, field, '')
	}
}
