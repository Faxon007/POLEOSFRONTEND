import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { ISideMenu } from '../interfaces'

@Injectable({
	providedIn: 'root',
})
export class SideMenuStore {
	private sidemenuSubject: BehaviorSubject<ISideMenu>
	public sidemenu: Observable<ISideMenu>
	constructor() {
		const sidemenu: any = localStorage?.getItem('sidemenu')
			? localStorage.getItem('sidemenu')
			: { isMobile: false, show: true }
		try {
			this.sidemenuSubject = new BehaviorSubject<ISideMenu>(
				JSON.parse(sidemenu)
			)
			this.sidemenu = this.sidemenuSubject.asObservable()
		} catch (error) {
			this.sidemenuSubject = new BehaviorSubject<ISideMenu>({
				isMobile: false,
				show: false,
			})
			this.sidemenu = this.sidemenuSubject.asObservable()
		}
	}

	get sidemenuValue(): ISideMenu {
		return this.sidemenuSubject.value
	}

	public setSideMenu(menu: ISideMenu, isMobile: boolean): void {
		this.sidemenuSubject.next(menu)
		if (!isMobile) {
			localStorage.setItem('sidemenu', JSON.stringify(menu))
		}
	}
}
