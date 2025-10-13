import { Injectable } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { ExecutionModalComponent } from '../modal/execution-modal/execution-modal.component'
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component'
import { IExecution, IExecutions } from 'src/app/interfaces'
import { ExecutionService } from 'src/app/services/execution/execution.service'
import { HandleError } from 'src/app/services/common/handle-error.'
@Injectable({
	providedIn: 'root',
})
export class OpenModalService {
	constructor(
		private modalCtrl: ModalController,
		private executionService: ExecutionService,
		private handleError: HandleError
	) {}
	async openExecutionModal(type: string = 'create', execution: IExecution) {
		const modal = await this.modalCtrl.create({
			component: ExecutionModalComponent,
			cssClass: 'claro-oym-modal',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				type,
				executions: execution,
			},
		})
		await modal.present()
	}

	async openDeleteExecutionModal(execution: IExecutions) {
		const modal = await this.modalCtrl.create({
			component: AlertModalComponent,
			cssClass: 'claro-oym-modal-action',
			swipeToClose: true,
			mode: 'ios',
			componentProps: {
				icon: 'trash-outline',
				title: 'Eliminar execution',
				message: `¿Estás seguro de eliminar el execution "${execution.id}" ?`,
				data: execution,
				Accept: this.executionService.deleteExecution,
			},
		})
		modal.onWillDismiss().then((data) => {
			if (data.data.accept) {
				if (this.handleError.currentError.status == 409) {
					this.openCantDeleteExecutionModal(
						execution,
						this.handleError.currentError.error.message
					)
				} else {
					this.executionService.updateTable(true)
				}
			}
		})
		await modal.present()
	}

	async openCantDeleteExecutionModal(execution: IExecutions, message: string) {
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
