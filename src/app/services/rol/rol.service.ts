import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IPagination, IRole } from 'src/app/interfaces'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
import { BitacoraService } from 'src/app/utils/BitacoraService'
import { AuthStore } from 'src/app/utils/auth';
@Injectable({
	providedIn: 'root',
})
export class RolService {
	private rolesSubject: BehaviorSubject<IPagination>
	public roles: Observable<IPagination>
	private url: string = 'roles'
	public currentPage: number = 1
	queryString: any = {}

	constructor(private generalHttp: GeneralHttp, private bitacoraService: BitacoraService,private auth: AuthStore) {
		const initialState = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.rolesSubject = new BehaviorSubject<IPagination>(initialState)
		this.roles = this.rolesSubject.asObservable()
	}

	getAllRoles(
		page: number,
		limit: number,
		name?: string
	): Observable<IPagination> {
		const QUERY_STRING = QueryString.stringify({ page, limit, name })
		this.queryString = { page, limit, name }
		return this.generalHttp.getAll(this.url, QUERY_STRING)
	}

	setRoles(roles: IPagination) {
		this.rolesSubject.next(roles)
	}

	get rolesValue(): IPagination {
		return this.rolesSubject.value
	}

	createRol(rol: any): Observable<IPagination> {

		return this.bitacoraService.ejecutarConBitacora('rol','create',this.generalHttp.create(
			this.url,
			rol,
			'Rol'),
			'',
        	rol,
        	`Se creó el rol "${rol.name}"`
      );
	}

	updateRol(id: number, rol: any): Observable<IRole> {

		// Buscar la categoría anterior en el BehaviorSubject
		const oldRol = this.rolesValue.rows.find(c => c.id === id);

		return this.bitacoraService.ejecutarConBitacora(
		'rol',
		'update',
		this.generalHttp.update(
			this.url,
			rol,
			id,
			'Rol'
		),
		oldRol,              
		rol,          
		`Se actualizó el rol "${rol.name}"`
		);
	}

	getOneRol(id: number): Observable<IRole> {
		return this.generalHttp.getOne(this.url, id, 'Rol')
	}

	deleteRol = (id: number): Observable<IRole> => {
		const oldRol = this.rolesValue.rows.find(c => c.id === id);

		return this.bitacoraService.ejecutarConBitacora(
			'rol',
			'delete',
			this.generalHttp.delete(
			this.url,
			id,
			'Rol',
			false
			),
			this.url,              
			'',          
			`Se elimino el rol`
		);
	}

	updateTable(isDelete?: boolean) {
		if (isDelete)
			this.currentPage =
				this.rolesValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage

		this.getAllRoles(this.currentPage, 10, this.queryString.name).subscribe(
			(data) => this.setRoles(data)
		)
	}
}
