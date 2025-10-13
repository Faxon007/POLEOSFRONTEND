import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, of, tap } from 'rxjs'
import { IPagination, IRole } from 'src/app/interfaces'
import { AuthStore } from 'src/app/utils/auth'
import { environment } from '../../../environments/environment'
import { EventService } from '../event.service'
import { HandleError } from './handle-error.'
@Injectable({
	providedIn: 'root',
})
export class GeneralHttp {
	constructor(
		private httpClient: HttpClient,
		private eventService: EventService,
		private authStore: AuthStore,
		private handleError: HandleError
	) {}

	currentError: any

	httpOptions() {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `bearer ${this.authStore.token}`,
			}),
		}
	}

	getAllNoPagination(url: string, queryString: string): Observable<any> {
		this.handleError.resetError()
		return this.httpClient
			.get<any>(
				`${environment.api}/${url}?${queryString}`,
				this.httpOptions()
			)
			.pipe(
				tap((res: any) => console.log('Registros recibidos')),
				catchError(
					this.handleError.handleError<any>(
						'Registros recibidos fallidos',
						[]
					)
				)
			)
	}

	getAll(url: string, queryString: string): Observable<IPagination> {
		this.handleError.resetError()
		return this.httpClient
			.get<IPagination>(
				`${environment.api}/${url}?${queryString}`,
				this.httpOptions()
			)
			.pipe(
				tap((res: IPagination) => console.log('registros recibidos')),
				catchError(
					this.handleError.handleError<any>(
						'registro recibidos fallidos',
						{
							rows: [],
							pages: 0,
							count: 0,
						}
					)
				)
			)
	}

	getOne(url: string, id: number, type: string): Observable<any> {
		this.handleError.resetError()
		return this.httpClient
			.get<any>(`${environment.api}/${url}/${id}`, this.httpOptions())
			.pipe(
				tap((register: any) => register),
				catchError(
					this.handleError.handleError<any>(
						`Fallo al obtener un ${type}`
					)
				)
			)
	}

	create(
		url: string,
		newRegister: any,
		type: string,
		isMale: boolean = true
	): Observable<any> {
		this.handleError.resetError()
		return this.httpClient
			.post<any>(
				`${environment.api}/${url}`,
				newRegister,
				this.httpOptions()
			)
			.pipe(
				tap((newRegister: any) => {
					const lastLetter = isMale ? 'o' : 'a'
					const message = `${type} cread${lastLetter}`
					this.eventService.presentToast(message, 2000, 'success')
				}),
				catchError(
					this.handleError.handleError<any>(`Fallo al crea ${type}`)
				)
			)
	}

	update(
		url: string,
		updatedRegister: any,
		id: number,
		type: string,
		showMessage: boolean = true,
		message: string = `${type} actualizado`
	): Observable<any> {
		this.handleError.resetError()
		return this.httpClient
			.put<any>(
				`${environment.api}/${url}/${id}`,
				updatedRegister,
				this.httpOptions()
			)
			.pipe(
				tap((updatedRegister: any) => {
					showMessage &&
						this.eventService.presentToast(
							message,
							2000,
							'secondary'
						)
				}),
				catchError(
					this.handleError.handleError<any>(
						'Fallo al actualizar registro'
					)
				)
			)
	}
	delete(
		url: string,
		id: number,
		type: string,
		showMessage: boolean = true,
		isMale: boolean = true
	): Observable<any> {
		this.handleError.resetError()
		return this.httpClient
			.delete<any>(`${environment.api}/${url}/${id}`, this.httpOptions())
			.pipe(
				tap((updatedRegister: any) => {
					const lastLetter = isMale ? 'o' : 'a'
					const message = `${type} eliminad${lastLetter}`
					this.eventService.presentToast(message, 2000, 'danger')
				}),
				catchError(
					this.handleError.handleError<any>(
						'Fallo al eliminar registro',
						undefined,
						showMessage
					)
				)
			)
	}

	createLog(
		url: string,
		newRegister: any,
		type: string,
		isMale: boolean = true
	): Observable<any> {
		this.handleError.resetError()
		return this.httpClient
			.post<any>(
				`${environment.api}/${url}`,
				newRegister,
				this.httpOptions()
			)
			.pipe(
				tap((newRegister: any) => {
					/*const lastLetter = isMale ? 'o' : 'a'
					const message = `${type} cread${lastLetter}`
					this.eventService.presentToast(message, 2000, 'success')*/
				}),
				catchError(
					this.handleError.handleError<any>(`Fallo al crea ${type}`)
				)
			)
	}

}
