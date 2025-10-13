import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IReport, List } from 'src/app/interfaces'

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
	@Input() title: string | undefined
	@Input() items: IReport[] = []
	@Output() onClick = new EventEmitter()
	@Input() length?: number = 0
	@Input() search: string = ''
	@Output() clickFavorite: EventEmitter<IReport> = new EventEmitter()
	constructor() {}

	ngOnInit() {}

	handleClick(item: any) {
		this.onClick.emit(item)
	}
	clickStars(item: IReport) {
		this.clickFavorite.emit(item)
	}
}
