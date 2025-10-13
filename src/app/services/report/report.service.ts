import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IPagination, IReport } from 'src/app/interfaces'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BitacoraService } from 'src/app/utils/BitacoraService'
import { AuthStore } from 'src/app/utils/auth';

@Injectable({
	providedIn: 'root',
})
export class ReportService {
	private reportsSubject: BehaviorSubject<IPagination>
	public reports: Observable<IPagination>
	//URL para unicamente este servicio

	url: string = `reports`
	public currentPage: number = 1
	QueryString: any = ''

	constructor(
		private generalHttp: GeneralHttp,
		private httpClient: HttpClient,private bitacoraService: BitacoraService,private auth: AuthStore
	) {
		const INITIAL_STATE = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.reportsSubject = new BehaviorSubject<IPagination>(INITIAL_STATE)
		this.reports = this.reportsSubject.asObservable()
	}

	getAllReports(
		page: number,
		limit: number,
		name?: string | undefined,
		url?: string | undefined,
		categoryId?: number[]
	): Observable<IPagination> {
		const QUERY_STRING = QueryString.stringify({
			url,
			name,
			page,
			limit,
			categoryId,
		})
		this.QueryString = { url, name, page, limit, categoryId }
		return this.generalHttp.getAll(this.url, QUERY_STRING)
	}

	setReports(reports: IPagination) {
		this.reportsSubject.next(reports)
	}

	get reportsValue(): IPagination {
		return this.reportsSubject.value
	}

	createReport(report: IReport): Observable<IReport> {

		return this.bitacoraService.ejecutarConBitacora('reporte','create',this.generalHttp.create(
			this.url,
			report,
			'Reporte'),
			'',
        	report,
        	`Se creó el reporte "${report.name}"`
      );
	}

	updateTable(isDelete?: boolean) {
		if (isDelete)
			this.currentPage =
				this.reportsValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage

		this.getAllReports(
			this.currentPage,
			10,
			this.QueryString.name,
			this.QueryString.url,
			this.QueryString.categoryId
		).subscribe((data) => this.setReports(data))
	}
	updateReport(id: number, report: IReport): Observable<any> {

		// Buscar la categoría anterior en el BehaviorSubject
		const oldReport = this.reportsValue.rows.find(c => c.id === id);

		return this.bitacoraService.ejecutarConBitacora(
		'categoria',
		'update',
		this.generalHttp.update(
			this.url,
			report,
			id,
			'Reporte'
		),
		oldReport,              
		report,          
		`Se actualizó el reporte "${report.name}"`
		);
	}

	deleteReport = (id: number): Observable<IReport> => {

		const oldReport = this.reportsValue.rows.find(c => c.id === id);
		return this.bitacoraService.ejecutarConBitacora(
			'reporte',
			'delete',
			this.generalHttp.delete(
			this.url,
			id,
			'Reporte'
			),
			oldReport,              
			'',          
			`Se elimino el reporte`
		);
	}

	getOneReport(id: number) {
		return this.generalHttp.getOne(this.url, id, 'Reporte')
	}

	increaseVisits(id: string, name: string, user: string) {
		const headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'X-Access-Token': `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQyNzMyOTUwNzcsInVzZXIiOiJqb3NlLmhlcnJlcmEiLCJlbWFpbCI6Impvc2UuaGVycmVyYUBjbGFyby5jb20uZ3QiLCJyb2wiOjYyfQ.6v7tbihMaf1p7qdbn75Jn_RqWYrPjjnEfsxObWKdZbk`,
			}),
		}
		return this.httpClient.post<any>(
			`${environment.reportsApi}/controlVisitas/insertarReporteVisitado/${id}`,
			{ name, user },
			headers
		)
	}
}
