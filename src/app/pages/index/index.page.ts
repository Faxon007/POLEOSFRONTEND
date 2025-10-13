import { Component, OnInit } from '@angular/core'
import { LoginService } from 'src/app/services/login/login.service'
import { AuthStore } from 'src/app/utils/auth'
import { SideMenuStore } from 'src/app/utils/sidemenu'

@Component({
	selector: 'app-index',
	templateUrl: './index.page.html',
	styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
	isAuthenticated: boolean | undefined
	constructor(
		public authStore: AuthStore,
		public sideMenuStore: SideMenuStore
	) {
		this.isAuthenticated = this.authStore?.isAuthenticated
	}

	ngOnInit() {}
}
