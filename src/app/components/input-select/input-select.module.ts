import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputSelectComponent } from './input-select.component'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@NgModule({
	declarations: [InputSelectComponent],
	imports: [CommonModule, IonicModule, FormsModule],
	exports: [InputSelectComponent],
})
export class InputSelectModule {}
