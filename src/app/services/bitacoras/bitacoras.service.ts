import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs'

import { IPagination, IBitacora } from 'src/app/interfaces'
import { GeneralHttp } from '../common/generalHttp'
import * as QueryString from 'qs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthStore } from 'src/app/utils/auth'
import { EventService } from '../event.service'
import { environment } from 'src/environments/environment'
import { HandleError } from '../common/handle-error.'
import { LIMIT } from '../common/httpOptions'


@Injectable({
	providedIn: 'root',
})
export class BitacoraService {
	public currentPage = 1
	private bitacorasSubject: BehaviorSubject<IPagination>
	public bitacoras: Observable<IPagination>
	private limit = 10
	private query: any = {
		page: this.currentPage,
		limit: this.limit,
		option: undefined,
		action: undefined,
		status: undefined,
		user: undefined,
	}

	private pageSubject: BehaviorSubject<number>
	public page: Observable<number>
	constructor(
		private generalHttp: GeneralHttp,
		private httpClient: HttpClient,
		private authStore: AuthStore,
		private eventService: EventService,
		private handleError: HandleError,
	) {
		const initialState = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.bitacorasSubject = new BehaviorSubject<IPagination>(initialState)
		this.bitacoras = this.bitacorasSubject.asObservable()

		this.pageSubject = new BehaviorSubject<number>(1)
		this.page = this.pageSubject.asObservable()
	}

	setBitacoras(bitacoras: IPagination) {
		this.bitacorasSubject.next(bitacoras)
	}

	get bitacorasValue(): IPagination {
		return this.bitacorasSubject.value
	}

	setPage(page: number) {
		this.pageSubject.next(page)
	}

	get pageValue(): number {
		return this.pageSubject.value
	}

	getAllBitacoras(
  search: string = '',
  page: number = 1,
  limit: number = LIMIT,
  startDate?: string,
  endDate?: string,
  option?: string,
  action?: string,
  status?: string,
  user?: string
): Observable<IPagination> {
  const params: any = { page, limit };
  params.option = option ?? (search || undefined);
  params.action = action ?? (search || undefined);
  params.user = user ?? (search || undefined);
  params.status = status ?? (search || undefined);
  if (startDate) params.startDate = `${startDate.split('T')[0]}T00:00:00`;
  if (endDate) params.endDate = `${endDate.split('T')[0]}T23:59:59`;
  const qs = QueryString.stringify(params, { skipNulls: true, arrayFormat: 'brackets' });
  return this.generalHttp.getAll('logs', qs);
}



	getOneBitacora(id: number) {
		return this.generalHttp.getOne('logs', id, 'Bitacora')
	}


	updateUniqueParamaterBitacora(id: number, bitacora: any): Observable<IBitacora> {
		return this.generalHttp.update('logs', bitacora, id, 'El usuario', false)
	}

	updateBitacora(
		bitacora: IBitacora,
		messageUpd: string = 'Usuario actualizado'
	): Observable<IBitacora> {
		const {option,
			action,
			oldObject,
			newObject,
			status,
			message,
			dateexec,
			user,
			createdAt,
			updatedAt,
			deletedAt,

		} = bitacora
		const newData = {
			option,
			action,
			oldObject,
			newObject,
			status,
			message,
			dateexec,
			user,
			createdAt,
			updatedAt,
			deletedAt,
		}

		return this.generalHttp.update(
			'bitacoras',
			newData,
			bitacora.id || 1,
			'El usuario',
			true,
			messageUpd
		)
	}

	

	

	
	updateTable(isDelete: boolean = false) {
		if (isDelete)
			this.currentPage =
				this.bitacorasValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage
		this.getAllBitacoras(
			this.query.page,
			this.query.limit,
			this.query.option,
			this.query.startDate,
			this.query.endDate
		).subscribe((res: IPagination) => this.bitacorasSubject.next(res))
	}
}
