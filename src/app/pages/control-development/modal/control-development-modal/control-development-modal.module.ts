import { ControlDevelopmentModalComponent } from './control-development-modal.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'src/app/components/common/button/button.module'

@NgModule({
	declarations: [ControlDevelopmentModalComponent],
	imports: [CommonModule, IonicModule, FormsModule, ButtonModule],
	exports: [ControlDevelopmentModalComponent],
})
export class ControlDevelopmentModalModule {}
