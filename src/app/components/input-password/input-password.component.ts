import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	ViewChild,
	ElementRef,
} from '@angular/core'
import { IonInput } from '@ionic/angular'

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'input-password',
	templateUrl: './input-password.component.html',
	styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent implements OnInit {
	// @ViewChild('passwordEyeRegister') passwordEye;
	@ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye:
		| ElementRef
		| undefined
	@Input() label: string | undefined
	@Input() name: string | undefined
	@Input() inputModel: string | undefined
	@Output() inputModelChange = new EventEmitter<string>()
	@Output() keyEnterPress = new EventEmitter()
	@ViewChild(IonInput, { static: true }) input?: IonInput
	type = 'password'
	constructor() {
		this.inputModel = ''
	}

	ngOnInit() {}

	toogle(event: Event) {
		event.stopPropagation()
		this.type = this.type === 'text' ? 'password' : 'text'
	}
	enterPress(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			this.keyEnterPress.emit()
		}
	}
}
