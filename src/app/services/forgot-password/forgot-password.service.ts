import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HandleError } from '../common/handle-error.'
import { catchError, Observable, tap } from 'rxjs'
@Injectable({
	providedIn: 'root',
})
export class ForgotPasswordService {
	public isExpiredToken: boolean = true
	url: string = `${environment.api}/auth/`
	constructor(
		private httpClient: HttpClient,
		private handleError: HandleError
	) {}
	sendEmailForgotPassword(email: string): Observable<any> {
		return this.httpClient.post(`${this.url}forgot-password`, { email })
	}

	verifyPasswordResetToken(token: string): Observable<any> {
		this.handleError.resetError()
		const sendToken = { token }
		return this.httpClient
			.post<any>(`${this.url}verify-password-reset-token`, sendToken)
			.pipe(
				tap((res: any) => res),
				catchError(
					this.handleError.handleError<any>(
						'Fallo al verificar token',
						undefined,
						false,
						false
					)
				)
			)
	}

	resetPassword({ token, password }: { token: string; password: string }) {
		this.handleError.resetError()
		const structureResetPassword = { token, password }
		console.log('para enviar reset oass', structureResetPassword)
		return this.httpClient
			.post<any>(`${this.url}reset-password`, structureResetPassword)
			.pipe(
				tap((res: any) => res),
				catchError(
					this.handleError.handleError<any>(
						'Fallo al verificar token',
						undefined,
						false,
						false
					)
				)
			)
	}
}
