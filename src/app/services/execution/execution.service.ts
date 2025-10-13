import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IPagination, IExecution } from 'src/app/interfaces'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
	providedIn: 'root',
})
export class ExecutionService {
	private executionsSubject: BehaviorSubject<IPagination>
	public executions: Observable<IPagination>
	url: string = `executions`
	public currentPage: number = 1
	QueryString: any = {}

	constructor(private generalHttp: GeneralHttp,
		private httpClient: HttpClient
	) {
		const INITIAL_STATE = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.executionsSubject = new BehaviorSubject<IPagination>(INITIAL_STATE)
		this.executions = this.executionsSubject.asObservable()
	}

	getAllExecutions(
		page: number,
		limit: number,
	): Observable<IPagination> {
		const QUERY_STRING = QueryString.stringify({
			page,
			limit
		})
		this.QueryString = {  page, limit }
		return this.generalHttp.getAll(this.url, QUERY_STRING)
	}

	setExecutions(executions: IPagination) {
		this.executionsSubject.next(executions)
	}

	get executionsValue(): IPagination {
		return this.executionsSubject.value
	}

	createExecution(execution: IExecution): Observable<IExecution> {
		console.log("exec "+execution.execRobots)
		return this.generalHttp.create(this.url, execution, 'Execution')
	}

	updateTable(isDelete?: boolean) {
		if (isDelete)
			this.currentPage =
				this.executionsValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage

		this.getAllExecutions(
			this.currentPage,
			10,
		).subscribe((data) => this.setExecutions(data))
		
	}
	updateExecution(id: number, execution: IExecution): Observable<any> {
		return this.generalHttp.update(this.url, execution, id, 'Execution')
	}

	deleteExecution = (id: number): Observable<IExecution> => {
		return this.generalHttp.delete(this.url, id, 'Execution')
	}

	getOneExecution(id: number) {
		return this.generalHttp.getOne(this.url, id, 'Execution')
	}

	
}
