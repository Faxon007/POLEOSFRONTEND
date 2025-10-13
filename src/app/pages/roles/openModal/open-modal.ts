import { Injectable } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { RolModalComponent } from '../modal/rol-modal/rol-modal.component'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { IRole, IRoles } from 'src/app/interfaces'
import { RolService } from 'src/app/services/rol/rol.service'
import { HandleError } from 'src/app/services/common/handle-error.'
@Injectable({
	providedIn: 'root',
})
export class OpenModalService {
	constructor(
		private modalCtrl: ModalController,
		private rolService: RolService,
		private handleError: HandleError
	) {}
	async openRolModal(type: string = 'create', rol: IRole) {
		const modal = await this.modalCtrl.create({
			component: RolModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				role: rol,
			},
		})
		await modal.present()
	}

	async openDeleteRolModal(rol: IRoles) {
		const modal = await this.modalCtrl.create({
			component: AlertModalComponent,
			cssClass: 'claro-oym-modal-action',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				icon: 'trash-outline',
				title: 'Eliminar rol',
				message: `¿Estás seguro de eliminar el rol "${rol.name}" ?`,
				data: rol,
				Accept: this.rolService.deleteRol,
			},
		})
		modal.onWillDismiss().then((data) => {
			if (data.data.accept) {
				if (this.handleError.currentError.status == 409) {
					this.openCantDeleteRolModal(
						rol,
						this.handleError.currentError.error.message
					)
				} else {
					this.rolService.updateTable(true)
				}
			}
		})
		await modal.present()
	}

	async openCantDeleteRolModal(rol: IRoles, message: string) {
		const modal = await this.modalCtrl.create({
			component: AlertModalComponent,
			cssClass: 'claro-oym-modal-action',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				icon: 'warning-outline',
				title: `UPSS...`,
				message: message,
				showButton: false,
				titleCancelButton: 'Entendido',
			},
		})
		await modal.present()
		const { data } = await modal.onWillDismiss()
	}
}
