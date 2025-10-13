import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SuccessfulElementComponent } from './successful-element.component'
import { IonicModule } from '@ionic/angular'
import { ButtonModule } from '../common/button/button.module'

@NgModule({
	declarations: [SuccessfulElementComponent],
	imports: [CommonModule, IonicModule, ButtonModule],
	exports: [SuccessfulElementComponent],
})
export class SuccessfulElementModule {}
