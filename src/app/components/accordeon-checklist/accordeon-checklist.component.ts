import {
	Component,
	Input,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core'
import { CheckboxListComponent } from '../checkbox-list/checkbox-list.component'

@Component({
	selector: 'app-accordeon-checklist',
	templateUrl: './accordeon-checklist.component.html',
	styleUrls: ['./accordeon-checklist.component.scss'],
})
export class AccordeonChecklistComponent implements OnInit {
	@ViewChildren(CheckboxListComponent)
	allCheckBoxList!: QueryList<CheckboxListComponent>

	@Input() options: any
	@Input() data: string = ''
	idSelectedAccordion: string = ''
	constructor() {}

	ngOnInit() {}

	changeAccordion(accordionId: string) {
		this.idSelectedAccordion === accordionId
			? (this.idSelectedAccordion = '')
			: (this.idSelectedAccordion = accordionId)
	}
}
