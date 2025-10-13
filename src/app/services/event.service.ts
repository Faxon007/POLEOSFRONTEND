import { Injectable } from '@angular/core'
import {
	ToastController,
	AlertController,
	LoadingController,
} from '@ionic/angular'

@Injectable({
	providedIn: 'root',
})
export class EventService {
	constructor(
		public toastController: ToastController,
		public alertController: AlertController,
		public loadingController: LoadingController
	) {}

	async presentToast(
		message: string,
		duration: number = 2000,
		color: string
	) {
		const toast = await this.toastController.create({
			message: message || 'Your settings have been saved.',
			duration,
			color,
			mode: 'md',
			cssClass: 'toast',
		})
		toast.present()
	}

	async presentAlertConfirm(input?: any) {
		let response: any
		const alert = await this.alertController.create({
			header: input.header,
			message: input.message,
			mode: 'md',
			translucent: true,
			cssClass: input.css,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						alert.dismiss(false)
						return false
					},
				},
				{
					text: input.confirmText,
					handler: () => {
						alert.dismiss(true)
						return false
					},
				},
			],
		})
		await alert.present()
		await alert.onDidDismiss().then((data) => {
			response = data
		})
		return response
	}

	async presentLoading(message: string, duration: number = 2000) {
		const toast = await this.loadingController.create({
			spinner: 'lines',
			message: message || 'Your settings have been saved.',
			duration,
			mode: 'md',
		})
		await toast.present()
	}
}
