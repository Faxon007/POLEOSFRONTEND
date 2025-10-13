import { ButtonModule } from './../../components/common/button/button.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { LoginPageRoutingModule } from './login-routing.module'

//import { ParticlesModule } from 'angular-particle';
import { LoginPage } from './login.page'
import { InputPasswordModule } from 'src/app/components/input-password/input-password.module'
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ButtonModule,
		LoginPageRoutingModule,
		InputPasswordModule,
	],
	declarations: [LoginPage],
})
export class LoginPageModule {}
