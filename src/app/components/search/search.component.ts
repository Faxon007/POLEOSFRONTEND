import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
	@Input() placeholder: string | undefined
	@Input() class: string | undefined
	@Input() value!: string
	@Output() valueChange = new EventEmitter<any>()
	@Output() onChange = new EventEmitter<any>()
	@Output() onFocus = new EventEmitter<any>()
	constructor() {}

	ngOnInit() {}

	handleChange(event: any) {
		this.valueChange.emit(this.value)
	}
}
