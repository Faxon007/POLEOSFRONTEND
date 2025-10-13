import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs'

import { IPagination, IUser } from 'src/app/interfaces'
import { GeneralHttp } from '../common/generalHttp'
import * as QueryString from 'qs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthStore } from 'src/app/utils/auth'
import { EventService } from '../event.service'
import { environment } from 'src/environments/environment'
import { HandleError } from '../common/handle-error.'
import { BitacoraService } from 'src/app/utils/BitacoraService'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public currentPage = 1
	private usersSubject: BehaviorSubject<IPagination>
	public users: Observable<IPagination>
	private limit = 10
	private query: any = {
		page: this.currentPage,
		limit: this.limit,
		name: undefined,
		email: undefined,
		roleId: undefined,
		isActive: undefined,
	}

	private pageSubject: BehaviorSubject<number>
	public page: Observable<number>
	constructor(
		private generalHttp: GeneralHttp,
		private httpClient: HttpClient,
		private authStore: AuthStore,
		private eventService: EventService,
		private handleError: HandleError,
		 private bitacoraService: BitacoraService
	) {
		const initialState = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.usersSubject = new BehaviorSubject<IPagination>(initialState)
		this.users = this.usersSubject.asObservable()

		this.pageSubject = new BehaviorSubject<number>(1)
		this.page = this.pageSubject.asObservable()
	}

	setUsers(users: IPagination) {
		this.usersSubject.next(users)
	}

	get usersValue(): IPagination {
		return this.usersSubject.value
	}

	setPage(page: number) {
		this.pageSubject.next(page)
	}

	get pageValue(): number {
		return this.pageSubject.value
	}

	getAllUsers(
		search: string | undefined = undefined,
		roleId: any = undefined,
		isActive: boolean | undefined = undefined,
		page: number = this.currentPage,
		limit: number = this.limit
	): Observable<IPagination> {
		search = search === '' ? undefined : search
		this.query = {
			page: this.currentPage,
			limit: this.limit,
			name: search,
			email: search,
			far: search,
			roleId: roleId,
			isActive: isActive,
		}

		const queryString = QueryString.stringify(this.query)
		return this.generalHttp.getAll('users', queryString)
	}

	getOneUser(id: number) {
		return this.generalHttp.getOne('users', id, 'Usuario')
	}

	createUser(user: IUser): Observable<IUser> {

		return this.bitacoraService.ejecutarConBitacora('usuario','create',this.generalHttp.create(
			'users',
			user,
			'Usuario'),
			'',
        	user,
        	`Se creó el usuario "${user.name}"`
      );
	}

	updateUniqueParamaterUser(id: number, user: any): Observable<IUser> {
		return this.generalHttp.update('users', user, id, 'El usuario', false)
	}

	updateUser(
		user: IUser,
		message: string = 'Usuario actualizado'
	): Observable<IUser> {
		const {
			name,
			email,
			far,
			roleId,
			password,
			isActive,
			options,
			LASTVIEW,
			BAR,
		} = user
		const newData = {
			name,
			email,
			far,
			roleId,
			password,
			isActive,
			options,
			LASTVIEW,
			BAR,
		}

		// Buscar la categoría anterior en el BehaviorSubject
		const oldUser = this.usersValue.rows.find(c => c.id === user.id);

		return this.bitacoraService.ejecutarConBitacora(
		'usuario',
		'update',
		this.generalHttp.update(
			'users',
			newData,
			user.id || 1,
			'El usuario',
			true,
			message
		),
		oldUser,              
		newData,          
		`Se actualizó el usuario "${newData.name}"`
		);
	}

	deleteUser = (id: number) => {

		const oldUser = this.usersValue.rows.find(c => c.id === id);
		return this.bitacoraService.ejecutarConBitacora(
			'usuario',
			'delete',
			this.generalHttp.delete(
			'users',
			id,
			'Usuario'
			),
			oldUser,              
			'',          
			`Se elimino el usuario`
		);
	}

	resetPassword = (id: number) => {
		return this.generalHttp.update(
			'users/reset-password',
			{},
			id,
			'Usuario',
			true,
			'Se ha generado una nueva contraseña'
		)
	}

	updatePassword(password: string, oldPassword: string): Observable<any> {
		this.handleError.resetError()
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				authorization: `bearer ${this.authStore.token}`,
			}),
		}
		const updatePasswordStructure = { password, oldPassword }
		return this.httpClient
			.post<any>(
				`${environment.api}/me/change-password`,
				updatePasswordStructure,
				httpOptions
			)
			.pipe(
				tap((res: any) =>
					this.eventService.presentToast(
						'Contraseña actualizada',
						2000,
						'success'
					)
				),
				catchError(
					this.handleError.handleError<any>(
						'Fallo al actualizar contraseña',
						undefined,
						false
					)
				)
			)
	}

	updateTable(isDelete: boolean = false) {
		if (isDelete)
			this.currentPage =
				this.usersValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage
		this.getAllUsers(
			this.query.name,
			this.query.roleId,
			this.query.isActive,
			this.query.page,
			this.query.limit
		).subscribe((res: IPagination) => this.usersSubject.next(res))
	}
}
