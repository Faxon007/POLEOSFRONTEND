import {
	Component,
	ElementRef,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Renderer2,
	SimpleChanges,
	ViewChild,
} from '@angular/core'
import { Router, RouterStateSnapshot } from '@angular/router'
import { Location } from '@angular/common'
import { IPage } from 'src/app/interfaces'
import { pages } from './pages'
import { SideMenuStore } from 'src/app/utils/sidemenu'
import { Platform } from '@ionic/angular'

@Component({
	selector: 'app-sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
	pages: IPage[] = pages
	@ViewChild('submenu') submenu: any
	@ViewChild('menu') menu: ElementRef | undefined
	@Input() isAuthenticated: boolean | undefined
	constructor(
		public router: Router,
		public sideMenuStore: SideMenuStore,
		public platform: Platform
	) {}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.validateMobile()
	}
	ngOnInit() {
		this.validateMobile()
	}

	closeMenu() {
		// console.log('closing menu')
		this.sideMenuStore.setSideMenu({ isMobile: true, show: false }, true)
	}

	validateMobile() {
		if (window.outerWidth < 768) {
			this.sideMenuStore.setSideMenu(
				{
					isMobile: true,
					show: false,
				},
				true
			)
		} else {
			let menu = { show: false, isMobile: false }
			try {
				menu = JSON.parse(localStorage.getItem('sidemenu') ?? '') || {}
			} catch (error: any) {}
			this.sideMenuStore.setSideMenu(
				{ isMobile: false, show: menu.show },
				false
			)
		}
	}
}
