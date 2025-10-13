/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	@Input() load: boolean | undefined
	@Input() title: string | undefined
	@Input() icon: string | undefined
	@Input() klass: string | undefined
	@Input() disabled: boolean | undefined
	@Input() form: string | undefined
	@Output() clicked = new EventEmitter()
	@Output() handleFile = new EventEmitter()
	@Input() fileBtn: boolean = false
	@Input() accept: string = 'image/png, image/jpeg'
	@Input() color: string = ''
	constructor() {}

	ngOnInit() {}

	handleFileInput(event: any) {
		this.handleFile.emit(event.target.files)
		event.target.value = null
	}
}
