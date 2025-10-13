import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'

import { FormsModule } from '@angular/forms'
import { OptionsComponent } from './options.component'
@NgModule({
	declarations: [OptionsComponent],
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [OptionsComponent],
})
export class OptionsModule {}
