import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { IAuth, IUser } from '../interfaces'

@Injectable({
	providedIn: 'root',
})
export class AuthStore {
	private authSubject: BehaviorSubject<IAuth>
	public auth: Observable<IAuth>
	constructor(private router: Router) {
		const initialState = {
			token: '',
			isAuthenticated: false,
			user: null,
		}
		const session: any = localStorage?.getItem('session')
			? localStorage.getItem('session')
			: null

			const openModal: any = localStorage?.getItem('openModal')
			? localStorage.getItem('openModal')
			: null
console.log('openModal componenet ',openModal)
		this.authSubject = new BehaviorSubject<IAuth>(
			JSON.parse(session) ?? initialState
		)
		this.auth = this.authSubject.asObservable()
	}

	get user(): IUser {
		return this.authSubject.value.user
	}

	get isAuthenticated(): boolean {
		return this.authSubject.value?.isAuthenticated
	}

	get token(): string {
		return this.authSubject.value.token
	}

	public setAuth(auth: IAuth): void {
		this.authSubject.next(auth)
		localStorage.setItem('session', JSON.stringify(auth))
	}

	public logOut() {
		localStorage.removeItem('session')
		const user: IUser = {
			name: '',
			email: '',
			role: {
				id: 0,
				name: '',
				permissions: {
					reports: [],
					administrativeReports: false,
					management: false,
					rpa:false,
					 robotPermissions: {}
				},
			},
		}
		const session: IAuth = {
			token: '',
			user,
			isAuthenticated: false,
		}
		this.authSubject.next(session)
		this.router.navigate(['/login'])
	}
}
