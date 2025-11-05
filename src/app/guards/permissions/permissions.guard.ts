import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { AuthStore } from 'src/app/utils/auth';
import { isExceptionUser } from 'src/app/utils/user-exceptions';

@Injectable({
	providedIn: 'root',
})
export class PermissionsGuard implements CanActivateChild {
	constructor(private router: Router, private authStore: AuthStore) {}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		console.log('Guard ejecutado en:', state.url);
		const url = state.url.split('/').filter((element) => element !== '');
		const user = this.authStore.user;
		const permissions = user.role?.permissions;
		const poleo = user.role?.permissions;
		console.log('Guard ejecupermissions tado en:', permissions);

		// Permiso para oym-reports
		if (url[0] === 'oym-reports') {
			const access =
				url.length !== 2
					? true
					: permissions?.reports.some((category) =>
							category.reports.includes(Number(url[1]))
					  ) || false;

			if (access) return true;
		}
		/*if (url[0] === 'robots') {
			const access =
				url.length !== 2
					? true
					: permissions?.rpa;

			if (access) return true;
		}
		if (url[0] === 'executions') {
			const access =
				url.length !== 2
					? true
					: permissions?.rpa;

			if (access) return true;
		}*/

		if (url[0] === 'rpa') {
			const access =
				url.length !== 2
					? true
					: permissions?.rpa;

			if (access) return true;
		}


		// Permiso para management
		/*if (url[0] === 'management' && permissions?.management) {
			return true;
		}*/

		// Permiso para administrative-reports
		/*if (url[0] === 'administrative-reports') {
			// Acceso general si tiene permiso
			if (permissions?.administrativeReports) return true;

			// Excepción específica
			if (
				url[1] === 'development-control' &&
				isExceptionUser(user) 
			) return true;

			
		}*/
		

		// Permiso para management
		/*		if (url[0] === 'management') {
					// Acceso general si tiene permiso
					if (permissions?.management) return true;

					// Excepción específica: acceso a 'users'
					if (
						url[1] === 'users' &&
						isExceptionUser(user)

					) return true;
				}*/

		// Si no se cumple nada, redirige al inicio
		this.router.navigate(['/oym-reports']);
		return false;
	}

}
