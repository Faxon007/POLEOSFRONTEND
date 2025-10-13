import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputSelectMultipleComponent } from './input-select-multiple.component'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

@NgModule({
	declarations: [InputSelectMultipleComponent],
	imports: [CommonModule, IonicModule, FormsModule],
	exports: [InputSelectMultipleComponent],
})
export class InputSelectMultipleModule {}
