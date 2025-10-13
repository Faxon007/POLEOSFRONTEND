import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-successful',
	templateUrl: './successful-element.component.html',
	styleUrls: ['./successful-element.component.scss'],
})
export class SuccessfulElementComponent implements OnInit {
	@Input() rotule: string = ''
	@Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>()
	clickButton() {
		this.clicked.emit()
		this.router.navigate(['/login'])
	}
	constructor(private router: Router) {}

	ngOnInit() {}
}
