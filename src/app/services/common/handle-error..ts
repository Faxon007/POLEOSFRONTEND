import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AuthStore } from 'src/app/utils/auth'
import { EventService } from '../event.service'

@Injectable({
	providedIn: 'root',
})
export class HandleError {
	constructor(
		private authStore: AuthStore,
		private eventService: EventService
	) {}

	public currentError: any
	resetError() {
		this.currentError = { status: 0, error: { message: '' } }
	}
	public handleError<T>(
		operation = 'operation',
		result?: T,
		showToast: boolean = true,
		isVerifyTokenExpires: boolean = true
	) {
		return (error: any): Observable<T> => {
			console.log('error handle', error)
			if (error.status === 401 && isVerifyTokenExpires)
				this.authStore.logOut()
			this.currentError = error

			if (showToast)
				this.eventService.presentToast(
					'No tienes conexión a internet, inténtalo nuevamente',
					2000,
					'warning'
				)
			return of(result as T)
		}
	}
}
