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
	selector: 'app-input-select-multiple',
	templateUrl: './input-select-multiple.component.html',
	styleUrls: ['./input-select-multiple.component.scss'],
})
export class InputSelectMultipleComponent implements OnInit {
	@Input() klass: string = ''
	@Input() klassContent: string = 'w-[calc(100%-132px)]'
	@Input() label!: string
	@Input() name!: string
	@Input() type: string = 'text'
	@Input() required: boolean = false
	@Input() value: any = []
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
		this.textDisplay = !this.value.length
			? ''
			: this.value.length < 2
			? this.value[0]?.label
			: `${this.value.length} seleccionados`
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
		if (!this.value.length) {
			this.value = [{ ...option }, ...this.value]
		} else {
			const index = this.value.findIndex(
				(item: any) => item?.value === option?.value
			)
			if (index === -1) {
				this.value = [{ ...option }, ...this.value]
			} else {
				this.value.splice(index, 1)
			}
		}
		this.textDisplay = !this.value.length
			? ''
			: this.value.length < 2
			? option?.label
			: `${this.value.length} seleccionados`
		this.valueChange.emit(this.value)
	}

	selectedOption(option: any) {
		return this.value?.some((item: any) => item?.value === option?.value)
	}

	selectAll() {
		if (this.value.length === this.options.length) {
			this.value = []
			this.textDisplay = ''
		} else {
			this.value = [...this.options]
			this.textDisplay = `${this.value.length} seleccionados`
		}
		this.valueChange.emit(this.value)
	}
}
