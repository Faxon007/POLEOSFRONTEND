import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module'

import { ForgotPasswordPage } from './forgot-password.page'
import { ButtonModule } from '../../components/common/button/button.module'
import { SuccessfulElementModule } from 'src/app/components/successful-element/successful-element.module'

@NgModule({
	declarations: [ForgotPasswordPage],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ForgotPasswordPageRoutingModule,
		ButtonModule,
		SuccessfulElementModule,
	],
})
export class ForgotPasswordPageModule {}
