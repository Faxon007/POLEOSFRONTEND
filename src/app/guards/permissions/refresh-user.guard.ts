import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router'
import { LoginService } from 'src/app/services/login/login.service'
import { AuthStore } from 'src/app/utils/auth'

@Injectable({
	providedIn: 'root',
})
export class RefreshUserGuard implements CanActivate {
	constructor(
		private authStore: AuthStore,
		private loginService: LoginService,
		private router: Router
	) {}
	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		if (this.authStore.isAuthenticated) {
			const user = await this.loginService.getUser(this.authStore.token)
			this.authStore.setAuth({
				token: this.authStore.token,
				user,
				isAuthenticated: true,
			})
		} else {
			this.router.navigate(['/login'])
		}

		return this.authStore.isAuthenticated
	}
}
