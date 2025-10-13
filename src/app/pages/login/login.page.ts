import { Component, OnInit, ViewChild } from '@angular/core'
import { Form, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { IonInput } from '@ionic/angular'
import { InputPasswordComponent } from 'src/app/components/input-password/input-password.component'
import { ILogin } from 'src/app/interfaces'
import { LoginService } from 'src/app/services/login/login.service'
import { AuthStore } from 'src/app/utils/auth'

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	message: string = ''
	@ViewChild(InputPasswordComponent, { static: true })
	inputPassword?: InputPasswordComponent
	credentials: ILogin = {
		email: '',
		password: '',
	}

	loading: any = { loading: false }
	invalidCredentials: boolean = false
	images = [
		'assets/img/login/bg_1.webp',
		'assets/img/login/bg_2.webp',
		'assets/img/login/bg_3.jpg',
	]
	imagePosition = Math.floor(Math.random() * this.images.length)
	constructor(private loginService: LoginService) {}

	ngOnInit() {}
	errorsControl(): number {
		let error: number =
			Number(this.credentials.email.trim().length == 0) +
			Number(this.credentials.password.trim().length == 0) * 2
		this.invalidCredentials = error != 0
		switch (error) {
			case 1:
				this.message = 'Ingrese su correo electrónico'
				break
			case 2:
				this.message = 'Ingrese su contraseña'
				break
			case 3:
				this.message = 'Ingrese su correo electrónico y contraseña'
				break
		}
		return error
	}

	login() {
		this.loading.loading = true
		this.loginService
			.login(this.credentials, this.loading)
			.subscribe((data) => {
				this.loginService.newInvalidLogin = data ? false : true
				this.invalidCredentials = this.loginService.invalidLogin
				this.message = 'Correo electrónico o contraseña invalida'
				this.loading.loading = !this.invalidCredentials
			})
	}

	keyEnterEmail(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			this.inputPassword?.input?.setFocus()
		}
	}

	keyEnterPassword() {
		if (this.errorsControl() == 0) this.login()
	}
}
