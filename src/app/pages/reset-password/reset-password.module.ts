import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module'

import { ResetPasswordPage } from './reset-password.page'
import { InputPasswordModule } from 'src/app/components/input-password/input-password.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { SuccessfulElementModule } from 'src/app/components/successful-element/successful-element.module'
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ResetPasswordPageRoutingModule,
		InputPasswordModule,
		ButtonModule,
		SuccessfulElementModule,
	],
	declarations: [ResetPasswordPage],
})
export class ResetPasswordPageModule {}
