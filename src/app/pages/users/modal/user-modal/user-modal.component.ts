import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { roles } from 'src/app/utils/catalog'
import { IUser, IOptions, IRole } from 'src/app/interfaces'
import { UserService } from 'src/app/services/user/user.service'
import { RolService } from 'src/app/services/rol/rol.service'
import { EventService } from 'src/app/services/event.service'
import { HandleError } from 'src/app/services/common/handle-error.'
import { Utils } from 'src/app/utils/imgPdf';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { COUNTRIES } from 'src/app/utils/constants'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
	selector: 'app-user-modal',
	templateUrl: './user-modal.component.html',
	styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
	@Input() type: string | undefined
	@Input() user: IUser = {
		name: '',
		email: '',
	}
	optionsRoles!: any
	role: any
	frequencyChangePassword: any
	loading: boolean = false
	optionsFrequencyChangePassword = [
		{
			label: 'Cada 7 días',
			value: 'WEEK',
		},
		{
			label: 'Cada 30 días',
			value: 'MONTH',
		},
		{
			label: 'Cada 90 días',
			value: 'QUARTER',
		},
		{
			label: 'Sin expiración',
			value: 'NONE',
		},
	]
	logoPentcloud: string
	logoClaro: string
	constructor(
		private modalController: ModalController,
		private userService: UserService,
		private rolService: RolService,
		private eventService: EventService,
		private handleError: HandleError,
	) {}

	ngOnInit() {
		this.rolService.getAllRoles(1, -1).subscribe((res) => {
			this.optionsRoles = res.rows.map((rol) => {
				return { label: rol.name, value: rol.id }
			})
		})

		if (this.type === 'update') {
			this.role = {
				label: this.user.role?.name,
				value: this.user.role?.id,
			}
			const label =
				this.user.options?.every === 'WEEK'
					? 'Cada 7 días'
					: this.user.options?.every === 'MONTH'
					? 'Cada 30 días'
					: this.user.options?.every === 'QUARTER'
					? 'Cada 90 días'
					: this.user.options?.every === 'NONE'
					? 'Sin expiración'
					: null
			this.frequencyChangePassword = {
				label,
				value: this.user.options?.every,
			}
		}

		//Formato de Imagenes
		Utils.getImageDataUrlFromLocalPath1('assets/img/logo.png').then(
      result => this.logoClaro = result
    )
		Utils.getImageDataUrlFromLocalPath1('assets/img/logoPentcloud.png').then(
      result => this.logoPentcloud = result
    )
	}

	cancel() {
		this.modalController.dismiss()
	}

	saveUser() {
		// let name = this.user.name
		// name = name.replace(/\s+/g, ' ').trim()
		// console.log('saving user', name)
		// return
		// console.log('saving user')

		// this.user.name.trim()
		this.user.name = this.user.name.replace(/\s+/g, ' ').trim()
		this.user.far?.trim()
		this.user.roleId = this.role.value
		this.user.options = {
			every: 'NONE',
		}
		this.user.options.every = this.frequencyChangePassword.value

		this.loading = true
		this.type === 'create'
			? this.userService
					.createUser(this.user)
					.subscribe((newUser: IUser) => {
						this.loading = false
						if (this.handleError.currentError.status === 409) {
							this.eventService.presentToast(
								`El correo electrónico "${this.user.email}" ya tiene una cuenta asociada`,
								2000,
								'danger'
							)
							return
						}
						this.userService.updateTable()
						this.modalController.dismiss()
					})
			: this.userService
					.updateUser(this.user)
					.subscribe((updatedUser) => {
						this.loading = false
						if (this.handleError.currentError.status === 409) {
							this.eventService.presentToast(
								`El correo electrónico "${this.user.email}" ya tiene una cuenta asociada`,
								2000,
								'danger'
							)
							return
						}
						this.userService.updateTable()
						this.modalController.dismiss()
					})
	}

	createPdf() {
		let date: Date = new Date()
		// Define los nombres de los meses en español
		const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

		// Obtiene el día, el mes y el año de la fecha actual
		let dia = date.getDate();
		let mes = meses[date.getMonth()];
		let ano = date.getFullYear();

		// Construye la fecha en el formato deseado
		let fechaFormateada = `${dia} de ${mes} de ${ano}`;
		
		this.user.roleId = this.role.label

    const countryValue = this.user.email.split('.').pop();
    const countryLabel = COUNTRIES.find((country) => country.value.toLocaleLowerCase() === countryValue)?.label ?? 'País no disponible';

		const pdfDefinition: any = {
			content: [
				{
					alignment: 'justify',
					columns: [
						{image: this.logoPentcloud, width: 100, height: 30},
						{text: ' '},
						{image: this.logoClaro, width: 80, height: 25, alignment: 'center' },
						{text: ' '},
						{text: 'info@pentcloud.com', margin: [0,10,0,0]},
					]
				},
				{
					text: 'ACCESO PORTAL CLARO',
					style: 'header',
					alignment: 'center'
				},
				{
					style: 'tableExample',
					table: {
						widths: [150, 275],
						body: [
							[{text:'FECHA DE CREACIÓN:', bold: true}, `${fechaFormateada}`],
							[{text:'NUMERO DE FAR:', bold: true}, `${this.user.far}`],
							[{text: 'PAÍS QUE SOLICITA:', bold: true}, countryLabel],
							[{text: 'NOMBRE COMPLETO:', bold: true}, `${this.user.name}`],
							[{text: 'CORREO:', bold: true}, `${this.user.email}`],
							[{text: 'PERFIL:', bold: true}, `${this.user.roleId}`],
							[{text: 'USUARIO:', bold: true}, `${this.user.email}`],
							[{text: 'CONTRASEÑA:' , bold: true}, 'Enviada por correo desde portalclaro.oym@claro.com.gt'],
							[{text: 'DIRECCION PORTAL CLARO:', bold: true}, 'http://172.17.114.206/oym-frontend/login']
						]
					},
					layout: {
						fillColor: function (rowIndex, node, columnIndex) {
							return (rowIndex % 2 === 0) ? '#F2F2F2' : null;
						}
					}
				}
			],
			/* images: {
				img1: 'data:image/jpeg;base64,/assets/img/login/bg_3.jpg'
			}, */
			styles: {
				header: {
					alignment: 'center',
					fontSize: 32,
					bold: true,
					margin: [0, 45, 0, 0],
					color: '#595959',
				},
				tableExample: {
					margin: [30,25,0,25],
					fontSize: 11,
				}
			}
			
		}

		const pdf = pdfMake.createPdf(pdfDefinition)
		pdf.open()

	}
}
