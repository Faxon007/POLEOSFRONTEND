import {
	Component,
	Input,
	OnInit,
	EventEmitter,
	Output,
	Renderer2,
} from '@angular/core'
import { Router } from '@angular/router'
import { IPage } from 'src/app/interfaces'
import { RolService } from 'src/app/services/rol/rol.service'
import { SideMenuStore } from 'src/app/utils/sidemenu'

@Component({
	selector: 'app-item-menu',
	templateUrl: './item-menu.component.html',
	styleUrls: ['./item-menu.component.scss'],
})
export class ItemMenuComponent implements OnInit {
	@Output() click: EventEmitter<any> = new EventEmitter()
	@Input() pages: IPage[] = []
	currentPage: IPage = <IPage>{}
	constructor(
		public router: Router,
		public sideMenuStore: SideMenuStore,
		private renderer: Renderer2
	) {}

	ngOnInit() {}

	isSelected(page: IPage) {
		return this.router?.url === page?.url
	}

	selectPage(page: IPage) {
		this.currentPage = page
		this.router.navigate([page.url])
	}
}
