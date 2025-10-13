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
	selector: 'app-input-search-multiple',
	templateUrl: './input-search-multiple.component.html',
	styleUrls: ['./input-search-multiple.component.scss'],
})
export class InputSearchMultipleComponent implements OnInit {
	@Input() klass: string = ''
	@Input() klassContent: string = 'w-[calc(100%-132px)]'
	@Input() label!: string
	@Input() name!: string
	@Input() type: string = 'text'
	@Input() required: boolean = false
	@Input() value: any[] = []
	@Input() placeholder!: string
	@Input() readonly: boolean = false
	@Input() options!: any[]
	@Output() valueChange = new EventEmitter<any>()
	@Output() onChange = new EventEmitter<any>()
	open: boolean = false
	search!: string
	@ViewChild('inputElem') inputElem: ElementRef | undefined
	@ViewChild('menu') menu: ElementRef | undefined
	textDisplay: string = ''
	constructor(private elemRef: ElementRef) {}

	ngOnInit() {
		this.textDisplay = !this.value.length
			? this.placeholder
			: this.value.length < 2
			? 'Un seleccionado'
			: `${this.value.length} seleccionados`
	}

	@HostListener('document:mousedown', ['$event']) onmousedown(event: any) {
		if (this.open && !this.elemRef.nativeElement.contains(event.target)) {
			this.open = false
		}
	}

	handleChange(event: any) {
		this.search = event
		this.textDisplay = !this.value.length
			? this.placeholder
			: this.value.length < 2
			? 'Un seleccionado'
			: `${this.value.length} seleccionados`
		// this.valueChange.emit(this.value);
		// this.onChange.emit(this.value);
	}

	onClick(event: Event) {
		this.open = !this.open
	}

	onMouseLeave(event: any) {
		const target = event.target
		this.open = false
	}

	selectOption(option: any) {
		this.search = ''
		if (!this.value?.length) {
			this.value = [{ ...option }]
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
			? this.placeholder
			: this.value.length < 2
			? 'Un seleccionado'
			: `${this.value.length} seleccionados`
		this.valueChange.emit(this.value)
		this.onChange.emit(this.value)
	}

	selectedOption(option: any) {
		return this.value?.some((item: any) => item?.value === option?.value)
	}

	selectAll() {
		this.search = ''
		if (this.value.length === this.options.length) {
			this.value = []
			this.textDisplay = this.placeholder
		} else {
			this.value = [...this.options]
			this.textDisplay = `${this.value.length} seleccionados`
		}
		this.valueChange.emit(this.value)
		this.onChange.emit(this.value)
	}

	onFocus(event: any) {
		this.open = true
	}
}
