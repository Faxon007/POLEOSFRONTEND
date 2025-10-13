import {
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { IUser } from 'src/app/interfaces'
import { AuthStore } from 'src/app/utils/auth'
import { ChangePasswordModalComponent } from 'src/app/pages/users/modal/change-password-modal/change-password-modal.component'
import { ModalController } from '@ionic/angular'
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component'

@Component({
	selector: 'app-profile-dropdown',
	templateUrl: './profile-dropdown.component.html',
	styleUrls: ['./profile-dropdown.component.scss'],
})
export class ProfileDropdownComponent implements OnInit {
	@ViewChild('button') button: ElementRef | undefined
	@ViewChild('dropdown') dropdown: ElementRef | undefined
	open: boolean | undefined
	hoverItem: string | undefined
	user: IUser = {} as IUser

	constructor(
		private renderer: Renderer2,
		private auth: AuthStore,
		private modalCtrl: ModalController
	) {
		this.renderer.listen('window', 'click', (e: Event) => {
			if (
				!this.button?.nativeElement?.contains(e?.target) &&
				!this.dropdown?.nativeElement?.contains(e?.target)
			) {
				this.open = false
			}
		})
	}

	ngOnInit() {
		this.auth.auth.subscribe((user) => {
			if (user.user) {
				this.user = user.user
			}
		})
	}

	toggleDropdown() {
		// console.log('opened')
		this.open = !this.open
	}

	handleHoverItem(item: string) {
		this.hoverItem = item
	}

	closeSession() {
		this.auth.logOut()
	}

	async openChangePasswordModal() {
		const modal = await this.modalCtrl.create({
			component: ChangePasswordModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				user: this.user,
				type: 'changePasswordUser',
			},
		})
		await modal.present()
	}

	async openHelpModal() {
		// console.log('clicked')
		const modal = await this.modalCtrl.create({
			component: AlertModalComponent,
			cssClass: 'claro-oym-modal-action',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				icon: 'help-circle-outline',
				title: 'Información de usuarios',
				message: `Para resolución de dudas sobre algún tema relacionado al Portal Claro, comunicarse al siguiente contacto.
        Correo: portalclaro.oym@claro.com.gt 
        Teléfono: 4154-8776`,
				showButton: false,
				secondMessage: `Descargar manual de usuario`,
				secondIcon: 'download-outline',
				downloadPath:
					'assets/support/MANUAL DE USUARIO PORTAL CLARO.pdf',
				// data: category,
				// Accept: this.categoryService.deleteCategory,
			},
		})
		await modal.present()
	}
}
