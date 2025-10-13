import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'app-input-search',
	templateUrl: './input-search.component.html',
	styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
	@Input() label: string = ''
	@Input() placeholder: string = ''
	@Output() eventChange: EventEmitter<string> = new EventEmitter<string>()
	@Input() name: string = ''
	@Input() results: string[] = []
	@Input() inputValue: string = ''

	selectedResult: number = 0
	constructor() {}

	ngOnInit() {}

	clickItem(item: string) {
		this.inputValue = item
	}

	keyDownSearch(event: any) {
		const ARROW_DOWN = event.key == 'ArrowDown'
		const ARROW_UP = event.key == 'ArrowUp'
		this.selectedResult += Number(ARROW_DOWN) - Number(ARROW_UP)
		this.selectedResult =
			this.selectedResult > this.results.length - 1
				? 0
				: this.selectedResult
		this.selectedResult =
			this.selectedResult < 0
				? this.results.length - 1
				: this.selectedResult
		if (event.key == 'Enter') {
			this.clickItem(this.results[this.selectedResult])
		}
	}

	search() {
		this.eventChange.emit(this.inputValue)
	}
}
