import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivateChild,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router'
import { firstValueFrom, Observable } from 'rxjs'
import { HandleError } from 'src/app/services/common/handle-error.'
import { ForgotPasswordService } from 'src/app/services/forgot-password/forgot-password.service'

@Injectable({
	providedIn: 'root',
})
export class ForgotPasswordGuard implements CanActivateChild {
	constructor(
		private forgotPasswordService: ForgotPasswordService,
		private handleError: HandleError
	) {}
	async canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		const token: string = route.queryParamMap.get('token') || ''
		console.log('token enviado', token)
		await firstValueFrom(
			this.forgotPasswordService.verifyPasswordResetToken(token)
		)

		this.forgotPasswordService.isExpiredToken =
			this.handleError.currentError.status !== 0
		return true
	}
}
