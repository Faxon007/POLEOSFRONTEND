import { Component, OnInit, resolveForwardRef } from '@angular/core'
import { IonLabel, ModalController } from '@ionic/angular'
import { IColumn, IUser } from 'src/app/interfaces'
import { UserService } from 'src/app/services/user/user.service'
import { UserModalComponent } from './modal/user-modal/user-modal.component'
import { ChangePasswordModalComponent } from './modal/change-password-modal/change-password-modal.component'
import { ActivateUserComponent } from './modal/activate-user/activate-user.component'
import { RolService } from 'src/app/services/rol/rol.service'
import { LIMIT } from 'src/app/services/common/httpOptions'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { AuthStore } from 'src/app/utils/auth'
import { isExceptionUser } from 'src/app/utils/user-exceptions'
@Component({
	selector: 'app-users',
	templateUrl: './users.page.html',
	styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
	listOptions: any[] = [
		{
			title: 'Activar usuario',
			icon: 'power-outline',
			event: (user: IUser) => {
				const type = user.isActive ? 'deactivate' : 'activate'
				this.openActiveUserdModal(user, type)
			},
		},
		{
			title: 'Restablecer contraseña',
			icon: 'lock-open-outline',
			event: (user: IUser) => {
				this.openResetPasswordModal(user)
			},
		},
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (user: IUser) => {
				const data = JSON.parse(JSON.stringify(user))
				this.openUserModal(data, 'update')
			},
		},
		// {
		// 	title: 'Eliminar',
		// 	icon: 'trash-outline',
		// 	event: (user: IUser) => {
		// 		// this.openActiveUserdModal(user)
		// 		this.openDeleteUserModal(user)
		// 	},
		// },

		{
				title: 'Cambiar contraseña',
				icon: 'key-outline',
				event: (user: IUser) => {
					this.openChangePasswordModal(user)
				},
			},

	]

	columns: IColumn[] = [
		{
			label: 'Nombre',
			field: 'name',
			klass: 'w-[300px]',
		},
		{
			label: 'Correo electrónico',
			field: 'email',
			klass: 'w-[300px]',
		},
		{
			label: 'Rol asignado',
			field: 'role.name',
			klass: 'w-[300px]',
		},
		{
			label: 'Estado',
			field: 'isActive',
			klass: '',
		},
		{
			label: 'No. FAR',
			field: 'far',
			klass: '',
		},
		{
			label: 'Bar',
			field: 'BAR',
			klass: '',
		},
		{
			label: '',
			field: 'actions',
			klass: 'w-[100px]',
		},
	]

	rows: any = []
	limit: number = LIMIT
	totalPages: number = 0
	count: number = 0
	loading: boolean = false
	search: string = ''
	optionsRoles: any
	roles: any[] = []
	roleId: any = []
	isActive: boolean | undefined = undefined

	// Variables de excepción
	isVisible: boolean = false


	constructor(
		public modalCtrl: ModalController,
		public userService: UserService,
		private rolService: RolService,
		private authStore: AuthStore
	) {}

	ngOnInit() {
		 this.exeptionUser()
		// this.userService.setPage(1)
		this.userService.currentPage = 1
		this.getUsers()
		this.rolService.getAllRoles(1, -1).subscribe((res) => {
			const roles = res.rows
			this.optionsRoles = roles.map((rol) => {
				return {
					label: rol.name,
					value: rol.id,
				}
			})
		})
	}

	filterUsersByRolesOrStatus(e: any, type: string) {
		if (type === 'roles') {
			this.roleId = e.map((rol: any) => rol.value)
		} else {
			const arrayStatus = e
			arrayStatus.length === 0 || arrayStatus.length === 2
				? (this.isActive = undefined)
				: (this.isActive = arrayStatus[0].value)
		}
		// this.userService.setPage(1)
		this.userService.currentPage = 1
		this.getUsers()
	}

	searchUsers(e: string) {
		this.search = e.trim()
		// this.userService.setPage(1)
		this.userService.currentPage = 1
		this.getUsers()
	}

	getUsers(
		page: number = this.userService.currentPage,
		limit: number = this.limit
	) {
		this.loading = true
		this.userService
			.getAllUsers(this.search, this.roleId, this.isActive, page, limit)
			.subscribe((res) => {
				this.userService.setUsers(res)
				this.loading = false
			})
	}

	createUser() {
		this.openUserModal()
	}

	async onChangePage(page: number) {
		if (page === this.userService.currentPage) return
		// this.userService.setPage(page)
		this.userService.currentPage = page
		this.getUsers(this.userService.currentPage)
	}

	//* functions to Open modals
	async openUserModal(user: any = undefined, type: string = 'create') {
		const modal = await this.modalCtrl.create({
			component: UserModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				user: user || {
					name: '',
					email: '',
				},
			},
		})
		await modal.present()
	}

	async openResetPasswordModal(user: any) {
		const modal = await this.modalCtrl.create({
			component: AlertModalComponent,
			cssClass: 'claro-oym-modal-action',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				icon: 'refresh-outline',
				title: 'Restablecer contraseña del usuario',
				titleButton: 'Restablecer contraseña',
				message: `¿Estás seguro de restablecer la contraseña del usuario "${user.name}" ? Se le enviará un correo electrónico con la nueva contraseña.`,
				data: user,
				Accept: this.userService.resetPassword,
			},
		})
		modal.present()
	}

	async openActiveUserdModal(user: any, type: string = 'delete') {
		const modal = await this.modalCtrl.create({
			component: ActivateUserComponent,
			cssClass: 'claro-oym-modal-action',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				user,
			},
		})
		await modal.present()
		const { data } = await modal.onWillDismiss()
		if (data) {
			const { id } = data
			this.userService.deleteUser(id).subscribe()
		}
	}

	async openDeleteUserModal(user: IUser) {
		const modal = await this.modalCtrl.create({
			component: AlertModalComponent,
			cssClass: 'claro-oym-modal-action',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				icon: 'trash-outline',
				title: 'Eliminar usuario',
				message: `¿Estás seguro de eliminar al usuario "${user.name}"?`,
				data: user,
				Accept: this.userService.deleteUser,
			},
		})
		await modal.present()
		await modal.onWillDismiss()
		this.userService.updateTable(true)
	}

	exeptionUser() {
		const user = this.authStore.user;
	
		if (isExceptionUser(user)) {
			this.isVisible = false
		}
		else {
			this.isVisible = true
		}
	}

	async openChangePasswordModal(user: IUser) {
	const modal = await this.modalCtrl.create({
		component: ChangePasswordModalComponent,
		cssClass: 'claro-oym-modal-action',
		swipeToClose: true,
		mode: 'ios',
		componentProps: {
			user,
			type: 'changePasswordAdmin',
		},
	})
	await modal.present()
}

	
}
