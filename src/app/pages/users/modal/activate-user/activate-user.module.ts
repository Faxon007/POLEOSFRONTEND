import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivateUserComponent } from './activate-user.component'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { FormsModule } from '@angular/forms'

@NgModule({
	declarations: [ActivateUserComponent],
	imports: [CommonModule, IonicModule, FormsModule, ButtonModule],
	exports: [ActivateUserComponent],
})
export class ActivateUserModalModule {}
