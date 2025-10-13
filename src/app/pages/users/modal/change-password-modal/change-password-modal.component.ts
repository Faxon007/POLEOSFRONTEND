import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { IUser } from 'src/app/interfaces'
import { HandleError } from 'src/app/services/common/handle-error.'
import { EventService } from 'src/app/services/event.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
	selector: 'app-change-password-modal',
	templateUrl: './change-password-modal.component.html',
	styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
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
	@Input() type: string = 'changePasswordAdmin'
	@Input() user!: IUser
	currentPassword: string = ''
	newPassword: string = ''
	disabled: boolean = true
	loading: boolean = false
	constructor(
		private modalController: ModalController,
		private userService: UserService,
		private eventService: EventService,
		private handleError: HandleError
	) {}

	ngOnInit() {}

	cancel() {
		this.modalController.dismiss()
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
			this.newPassword.length < 6 ||
			this.type !== 'changePasswordAdmin'
				? this.currentPassword.trim() === ''
				: false
	}
	saveUser() {
		this.loading = true
		this.user.password = this.newPassword
		if (this.type === 'changePasswordAdmin') {
			this.userService
				.updateUser(
					this.user,
					`Se ha actualizado la contraseña del usuario ${this.user.name}`
				)
				.subscribe((updatedUser) => {
					this.loading = false
					this.modalController.dismiss()
				})
		} else {
			this.userService
				.updatePassword(this.newPassword, this.currentPassword)
				.subscribe((res) => {
					this.loading = false
					if (this.handleError.currentError.status === 400) {
						this.eventService.presentToast(
							'La contraseña actual no es válida',
							2000,
							'danger'
						)
						return
					}
					this.modalController.dismiss()
				})
		}
	}
}
