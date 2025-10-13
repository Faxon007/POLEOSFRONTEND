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
import { roles } from 'src/app/utils/catalog'

@Component({
	selector: 'app-input-autocomplete',
	templateUrl: './input-autocomplete.component.html',
	styleUrls: ['./input-autocomplete.component.scss'],
})
export class InputAutocompleteComponent implements OnInit {
	@Input() klass: string = ''
	@Input() klassContent: string = 'w-[calc(100%-132px)]'
	@Input() label!: string
	@Input() name!: string
	@Input() type: string = 'text'
	@Input() required: boolean = false
	@Input() value: any
	@Input() placeholder!: string
	@Input() readonly: boolean = false
	@Input() options: any[] = []
	@Output() valueChange = new EventEmitter<any>()
	open: boolean = false
	@ViewChild('inputElem') inputElem: ElementRef | undefined
	@ViewChild('menu') menu: ElementRef | undefined
	textDisplay: string = ''
	@Input() search: string = ''
	constructor(private elemRef: ElementRef) {}
	@HostListener('document:mousedown', ['$event']) onmousedown(event: any) {
		if (this.open && !this.elemRef.nativeElement.contains(event.target)) {
			this.open = false
		}
	}
	ngOnInit() {
		// this.textDisplay = this.value?.label || this.placeholder;
	}

	handleChange(event: any) {
		this.search = event
		this.value = this.search === '' ? {} : this.value
		if (
			this.search !== '' &&
			this.options.some(
				(option) =>
					option?.label?.toLowerCase() === this.search?.toLowerCase()
			)
		) {
			this.value = this.options.find(
				(option) =>
					option?.label?.toLowerCase() === this.search.toLowerCase()
			)
			this.search = this.value?.label
			this.valueChange.emit(this.value)
			setTimeout(() => {
				this.open = false
			}, 500)
		}
		// if(this.search !== '') {
		// }
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
		this.search = option?.label
		this.open = false
		this.valueChange.emit(this.value)
	}

	selectedOption(option: any) {
		return this.value?.value === option?.value
	}

	onFocus(event: any) {
		this.open = true
	}
}
