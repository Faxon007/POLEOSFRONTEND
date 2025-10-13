import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-control-development-modal',
	templateUrl: './control-development-modal.component.html',
	styleUrls: ['./control-development-modal.component.scss'],
})
export class ControlDevelopmentModalComponent implements OnInit {
	report: any = {
		name: '',
		url: '',
		categoryId: '',
	}
	loading: boolean = false
	@Input() type: string | undefined
	constructor() {}

	ngOnInit() {}

	close() {}

	onSumbit() {}
}
