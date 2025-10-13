import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { IUser } from 'src/app/interfaces'
import { UserService } from 'src/app/services/user/user.service'

@Component({
	selector: 'app-activate-user',
	templateUrl: './activate-user.component.html',
	styleUrls: ['./activate-user.component.scss'],
})
export class ActivateUserComponent implements OnInit {
	constructor(
		private modalController: ModalController,
		private userService: UserService
	) {}
	@Input() type!: string
	@Input() user!: IUser
	@Input() message!: string
	far: string = ''
	bar: string = ''
	loading: boolean = false
	ngOnInit() {
		this.message =
			this.type === 'activate'
				? `¿Estás seguro de activar al usuario "${this.user.name}"? Tendrá acceso a la plataforma y podrá ver los reportes según su rol asignado`
				: `¿Estás seguro de dar de baja al usuario "${this.user.name}"? Para poder dar de baja a este usuario indica no. BAR`
	}

	cancel() {
		this.modalController.dismiss()
	}

	deleteUser() {
		this.loading = true
		if (this.type === 'activate') {
			this.user.isActive = !this.user.isActive
			this.userService
				.updateUser(this.user, 'Usuario activado')
				.subscribe(() => {
					this.userService.updateTable()
					this.loading = false
					this.modalController.dismiss()
				})
		} else {
			this.user.isActive = !this.user.isActive
			this.user.BAR = this.bar
			this.userService
				.updateUser(this.user, 'Usuario Dado de baja')
				.subscribe(() => {
					this.userService.updateTable()
					this.loading = false
					this.modalController.dismiss()
				})
		}
	}
}
