import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { Route } from '@angular/router'
import { AuthStore } from 'src/app/utils/auth'

@Injectable({
	providedIn: 'root',
})
export class authGuard implements CanActivateChild {
	constructor(private router: Router, private auth: AuthStore) {}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		//Este arreglo guardara las paginas que puedes acceder sin haber echo login
		const loginPages: string[] = [
			'reset-password',
			'forgot-password',
			'login',
		]

		// console.log(state.url)

		// return true

		let url = state.url.split('/').filter((elemnt) => elemnt != '')
		// console.log(url)

		//Verificamos si la url que queremos ingresar es la de login
		if (!loginPages.some((page) => url[0].startsWith(page))) {
			//Si no es asi, verificamos si no esta autenticado y lo redirigimos al login si no es asi
			!this.auth.isAuthenticated ? this.router.navigate(['/login']) : null
			return this.auth.isAuthenticated
		} else {
			//Si es asi verificamos si no esta autenticado y lo redirigimos a categories si es asi
			this.auth.isAuthenticated
				? this.router.navigate(['/oym-reports'])
				: null
			return !this.auth.isAuthenticated
		}
	}
}
