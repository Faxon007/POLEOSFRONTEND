import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IReport } from 'src/app/interfaces'
import { ReportService } from 'src/app/services/report/report.service'
import { getReports  } from './../../utils/report'
// import { DomSanitizer } from '@angular/platform-browser'
import { AuthStore } from 'src/app/utils/auth'
@Component({
	selector: 'app-report',
	templateUrl: './report.page.html',
	styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
	report: IReport
	reportObject: any
	loading: boolean = false
	error: boolean = false
	name!: string
	randomNumber: number

	constructor(
		public route: ActivatedRoute,
		private router: Router,
		public reportService: ReportService,
		// private sanitizer: DomSanitizer,
		public http: HttpClient,
		private authStore: AuthStore
	) {
		this.randomNumber = Math.floor(Math.random() * 1000) + 1
		this.report = {
			id: 0,
			name: '',
			url: '',
			categoryId: 0,
			createdAt: '',
			category: {
				id: 17,
				name: '',
				description: '',
			},
		}
	}

	// ionViewWillEnter() {
	// 	console.log('view will enter')
	// }

	ngOnInit() {
		this.name = this.route.snapshot.paramMap.get('name') as string
	
		this.authStore.auth.subscribe((session) => {
			if (session.isAuthenticated && session.user) {
				// ✅ Asegúrate de tener el usuario completo
				this.reportObject = getReports(session.user)
	
				if (this.name) {
					this.report = this.reportObject[this.name]
				} else {
					this.getOne(true)
				}
			}
		})
	}
	

	// * Se inserta una visita del reporte en el control de visitas
	increaseVisits(id: string, name: string, user: string) {
		this.reportService.increaseVisits(id, name, user).subscribe(
			(res) => {
				// console.log('visita insertada', res)
			},
			(error) => console.log('error en el control de visitas')
		)
	}

	goTo(url: string) {
		this.router.navigate([url])
	}

	getOne(load?: boolean) {
		this.error = false
		this.loading = load ? true : false
		const id: string = this.route.snapshot.paramMap.get('id') as string
		// console.log('identificador', id)
		this.reportService.getOneReport(Number(id)).subscribe(
			(data: IReport) => {
				this.report = data
				const user = this.authStore.user.name
				const id = this.report.id?.toString() || ''
				this.increaseVisits(id, this.report.name, user)
				const token = this.authStore.token
				this.report.url = `${this.report.url}?token=${token}&randomNumber=${this.randomNumber}`
				this.loading = false
				this.error = false
				// if (this.isValidUrl(data.url)) {
				// 	this.getAppStatus(data?.url)
				// }
			},
			(error) => {
				this.loading = false
				this.error = true
			}
		)
	}

	// getUrl(url: string): any {
	// 	try {
	// 		this.error = false
	// 		return this.sanitizer.bypassSecurityTrustResourceUrl(url)
	// 	} catch (error) {
	// 		this.error = true
	// 	}
	// }

	// getAppStatus(url: string): any {
	// 	console.log('uu', url)
	// 	let headers = new HttpHeaders({
	// 		Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	// 	})

	// 	return this.http
	// 		.get(url, { observe: 'response' })
	// 		.pipe(first())
	// 		.subscribe(
	// 			(resp) => {
	// 				if (resp.status === 200) {
	// 					console.log(true)
	// 				} else {
	// 					console.log(false)
	// 				}
	// 			},
	// 			(err) => console.log(err)
	// 		)
	// }

	// isValidUrl(urlString: string) {
	// 	var urlPattern = new RegExp(
	// 		'^(https?:\\/\\/)?' + // validate protocol
	// 			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
	// 			'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
	// 			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
	// 			'(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
	// 			'(\\#[-a-z\\d_]*)?$',
	// 		'i'
	// 	) // validate fragment locator
	// 	return !!urlPattern.test(urlString)
	// }

	onLoad(event: any) {}
}
