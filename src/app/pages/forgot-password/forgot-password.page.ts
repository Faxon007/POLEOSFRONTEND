import {
	AfterContentInit,
	AfterViewInit,
	Component,
	OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { ForgotPasswordService } from 'src/app/services/forgot-password/forgot-password.service'
@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.page.html',
	styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
	email: string = ''
	sent: boolean = false
	invalidEmail: boolean = false
	loading: boolean = false
	constructor(
		private router: Router,
		private forgotService: ForgotPasswordService
	) {}

	ngOnInit() {}

	keyEnterEmail(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			this.sendEmail()
		}
	}
	sendEmail(): void {
		// const emailRegex = /[a-z0-9.]+@[a-z]+\.com/
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		this.email = this.email.trim()
		// console.log(emailRegex.test(this.email))
		// return
		this.invalidEmail = !emailRegex.test(this.email)
		if (!this.invalidEmail) {
			this.loading = true
			this.forgotService
				.sendEmailForgotPassword(this.email)
				.subscribe((data) => {
					this.email = ''
					this.loading = false
					this.sent = true
				})
		}
	}

	goToLogin(): void {
		this.router.navigate(['/login'])
	}

	reset(): void {
		this.sent = false
	}
}
