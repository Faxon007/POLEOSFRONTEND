import {
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'

@Component({
	selector: 'app-input-select',
	templateUrl: './input-select.component.html',
	styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit {
	@Input() klass: string = ''
	@Input() klassContent: string = 'w-[calc(100%-132px)]'
	@Input() label!: string
	@Input() name!: string
	@Input() type: string = 'text'
	@Input() required: boolean = false
	@Input() value: any
	@Input() placeholder!: string
	@Input() readonly: boolean = true
	@Input() options: any[] = []
	@Output() valueChange = new EventEmitter<any>()
	open: boolean = false
	@ViewChild('inputElem') inputElem: ElementRef | undefined
	@ViewChild('menu') menu: ElementRef | undefined
	textDisplay: string = ''
	constructor(private elemRef: ElementRef) {}

	@HostListener('document:mousedown', ['$event']) onmousedown(event: any) {
		if (this.open && !this.elemRef.nativeElement.contains(event.target)) {
			this.open = false
		}
	}

	ngOnInit() {
		this.textDisplay = this.value?.label || ''
	}

	handleChange(event: Event) {
		this.textDisplay = this.value?.label
		this.valueChange.emit(this.value?.label)
	}

	onClick(event: Event) {
		this.open = !this.open
	}

	onMouseLeave(event: any) {
		const target = event.target
		this.open = false
	}

	selectOption(option: any) {
		this.value = option
		this.textDisplay = option?.label
		this.open = false
		this.valueChange.emit(this.value)
	}

	selectedOption(option: any) {
		return this.value?.value === option?.value
	}
}
