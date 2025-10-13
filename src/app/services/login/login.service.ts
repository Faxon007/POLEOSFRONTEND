import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, firstValueFrom, Observable, of, tap } from 'rxjs'
import { ILogin, IAuth, IUser } from 'src/app/interfaces'
import { AuthStore } from 'src/app/utils/auth'
import { environment } from 'src/environments/environment'
import { HandleError } from '../common/handle-error.'
@Injectable({
	providedIn: 'root',
})
export class LoginService {
	//url para este servicio
	private url: string = `${environment.api}/auth/login`
	private errorLogin: boolean = false
	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private auth: AuthStore,
		private handleError: HandleError
	) {}

	login(credentials: ILogin, loading: any): Observable<any> {
		this.handleError.resetError()
		return this.httpClient.post<any>(this.url, credentials).pipe(
			tap((token: any) => {
				this.newInvalidLogin = false
				this.getUser(token.token).then((user) => {
					loading.loading = false
					credentials.email = ''
					credentials.password = ''
					const auth: IAuth = {
						token: token.token,
						isAuthenticated: true,
						user: user,
					}
					this.auth.setAuth(auth)
					//this.router.navigate(['/oym-reports'])
					this.router.navigate(['/reset-password'])
				})
			}),
			catchError(
				this.handleError.handleError<ILogin>(
					'Error login',
					undefined,
					false
				)
			)
		)
	}

	async getUser(token: string) {
		this.handleError.resetError()
		const HTTP_OPTIONS = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				authorization: `bearer ${token}`,
			}),
		}
		const user = await firstValueFrom(
			this.httpClient
				.get<IUser>(`${environment.api}/me`, HTTP_OPTIONS)
				.pipe(
					tap((user: any) => user),
					catchError(
						this.handleError.handleError<any>('Me service failed')
					)
				)
		)
		return user
	}

	set newInvalidLogin(value: boolean) {
		this.errorLogin = value
	}

	get invalidLogin() {
		return this.errorLogin
	}
}
