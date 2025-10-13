import { REPORTS_MOOKS } from './../report/report-mooks'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { uuid } from 'src/app/helpers'
import { IPagination } from 'src/app/interfaces'

@Injectable({
	providedIn: 'root',
})
export class ControlDevelopmentService {
	private controlDevelopmentSubject: BehaviorSubject<IPagination>
	public controlDevelopment: Observable<IPagination>
	constructor() {
		const initialState = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.controlDevelopmentSubject = new BehaviorSubject<IPagination>(
			initialState
		)
		this.controlDevelopment = this.controlDevelopmentSubject.asObservable()
	}

	getControlDevelopment() {
		return {
			rows: REPORTS_MOOKS,
			count: 100,
			pages: 10,
		}
	}

	setControlDevelopment(data: any) {
		this.controlDevelopmentSubject.next(data)
	}

	get controlDevelopmentValue(): IPagination {
		return this.controlDevelopmentSubject.value
	}

	addControlDevelopment(dadta: any) {
		let controlDevelopment = this.controlDevelopmentSubject.value
		controlDevelopment.rows = [
			{ ...dadta, id: uuid() },
			...controlDevelopment.rows,
		]
		this.controlDevelopmentSubject.next(controlDevelopment)
	}

	updateControlDevelopment(data: any) {
		const controlDevelopment = this.controlDevelopmentSubject.value
		const index = controlDevelopment.rows.findIndex((r) => r.id === data.id)
		controlDevelopment.rows[index] = data
		this.controlDevelopmentSubject.next(controlDevelopment)
	}

	deleteControlDevelopment(id: number) {
		const controlDevelopment = this.controlDevelopmentSubject.value
		const index = controlDevelopment.rows.findIndex((r) => r.id === id)
		controlDevelopment.rows.splice(index, 1)
		this.controlDevelopmentSubject.next(controlDevelopment)
	}
}
