import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { HandleError } from 'src/app/services/common/handle-error.'
import { ForgotPasswordService } from 'src/app/services/forgot-password/forgot-password.service'

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.page.html',
	styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
	passwordRequirements = [
		{
			icon: 'remove-circle-outline',
			title: 'Debe contener una mayúscula',
		},
		{
			icon: 'remove-circle-outline',
			title: 'Debe contener un signo (@#$&*)',
		},
		{
			icon: 'remove-circle-outline',
			title: 'Debe contener un número',
		},
		{
			icon: 'remove-circle-outline',
			title: 'Debe tener un mínimo de 6 caracteres',
		},
	]
	newPassword: string = ''
	disabled: boolean = true
	loading: boolean = false
	isSuccesfullyChanged: boolean = false
	isExpiredToken: boolean = false
	isLoading: boolean = false
	// token: string = ''
	constructor(
		public router: Router,
		private activatedRoute: ActivatedRoute,
		public forgotPasswordService: ForgotPasswordService,
		private handleError: HandleError
	) {}

	ngOnInit() {
		// this.token = this.activatedRoute.snapshot.paramMap.get('token') || ''
		// this.forgotPasswordService
		// 	.verifyPasswordResetToken(this.token)
		// 	.subscribe((res) => {
		// 		this.isLoading = false
		// 		if (this.handleError.currentError.status === 401) {
		// 			this.isExpiredToken = true
		// 			return
		// 		}
		// 		console.log('res desde reset password', res)
		// 	})
	}

	handleChange() {
		const regexNum = /\d/
		const regexUpperCase = /[A-Z]/
		const regexSign = /[@#$&*]/

		this.passwordRequirements[0].icon = regexUpperCase.test(
			this.newPassword
		)
			? 'checkmark-circle-outline'
			: 'remove-circle-outline'

		this.passwordRequirements[1].icon = regexSign.test(this.newPassword)
			? 'checkmark-circle-outline'
			: 'remove-circle-outline'

		this.passwordRequirements[2].icon = regexNum.test(this.newPassword)
			? 'checkmark-circle-outline'
			: 'remove-circle-outline'

		this.passwordRequirements[3].icon =
			this.newPassword.length >= 6
				? 'checkmark-circle-outline'
				: 'remove-circle-outline'

		this.disabled =
			!regexUpperCase.test(this.newPassword) ||
			!regexSign.test(this.newPassword) ||
			!regexNum.test(this.newPassword) ||
			this.newPassword.length < 6
	}

	savePassword() {
		this.loading = true
		this.loading = false
		const token =
			this.activatedRoute.snapshot.queryParamMap.get('token') || ''
		this.forgotPasswordService
			.resetPassword({
				token,
				password: this.newPassword,
			})
			.subscribe((res) => {
				this.isSuccesfullyChanged =
					this.handleError.currentError.status === 0
				this.forgotPasswordService.isExpiredToken =
					this.handleError.currentError.status === 401
			})
	}

	redirectLogin() {
		this.router.navigate(['/login'])
	}
	p() {
		this.forgotPasswordService.isExpiredToken = false
		console.log('ppp', this.forgotPasswordService.isExpiredToken)
	}
}
