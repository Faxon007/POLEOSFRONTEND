import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputPasswordComponent } from './input-password.component'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

@NgModule({
	declarations: [InputPasswordComponent],
	imports: [CommonModule, IonicModule, FormsModule],
	exports: [InputPasswordComponent],
})
export class InputPasswordModule {}
