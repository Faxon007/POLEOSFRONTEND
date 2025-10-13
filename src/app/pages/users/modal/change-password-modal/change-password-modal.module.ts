import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChangePasswordModalComponent } from './change-password-modal.component'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { FormsModule } from '@angular/forms'
import { InputPasswordModule } from 'src/app/components/input-password/input-password.module'
@NgModule({
	declarations: [ChangePasswordModalComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ButtonModule,
		InputPasswordModule,
	],
	exports: [ChangePasswordModalComponent],
})
export class ChangePasswordModalModule {}

