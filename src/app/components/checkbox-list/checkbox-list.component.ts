import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-checkbox-list',
	templateUrl: './checkbox-list.component.html',
	styleUrls: ['./checkbox-list.component.scss'],
})
export class CheckboxListComponent implements OnInit {
	@Input() options!: any
	@Input() FindInput: string = ''
	constructor() {}

	ngOnInit() {}

	public unCheckAll() {
		this.options.items.forEach((option: any) => (option.check = false))
	}

	showItem(item: string) {
		let valid: boolean = false
		this.FindInput = this.FindInput.toLowerCase().trim()
		if (this.FindInput.length != 0) {
			valid = !this.options.name.toLowerCase().includes(this.FindInput)
			valid = valid ? !item.toLowerCase().includes(this.FindInput) : false
		}
		return valid
	}
}
