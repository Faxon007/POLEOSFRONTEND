import { AlertModalComponent } from './alert-modal.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { ButtonModule } from '../../common/button/button.module'
import { FormsModule } from '@angular/forms'

@NgModule({
	declarations: [AlertModalComponent],
	imports: [CommonModule, IonicModule, ButtonModule, FormsModule],
	exports: [AlertModalComponent],
})
export class AlertModalModule {}
