import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IReportByCategory } from 'src/app/interfaces'
import { GeneralHttp } from '../common/generalHttp'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { AuthStore } from 'src/app/utils/auth'

@Injectable({
	providedIn: 'root',
})
export class OymReportsService {
	private url: string = 'me/reports'
	constructor(
		private generalHttp: GeneralHttp,
		private httpClient: HttpClient,
		private authStore: AuthStore
	) {}

	httpOptions() {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `bearer ${this.authStore.token}`,
			}),
		}
	}

	get getReportsWithFavorites(): Observable<IReportByCategory[]> {
		return this.generalHttp.getAllNoPagination(this.url, '')
	}

	setDateView(user: any) {
		const headers = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY4NzkwNDQ0MywiZXhwIjoxNjg4NTA5MjQzfQ.cBpJnhbd4pqNw5oDNMO2AaQ-YeBaSYMmu6apyjqm9eU',
				}),
			}
			return this.httpClient.put<any>(
				`${environment.api}/me/${user.id}`,
				user,
				headers
			)
	  }
}
