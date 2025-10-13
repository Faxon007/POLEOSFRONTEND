import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SelectComponent } from './select.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
	declarations: [SelectComponent],
	imports: [CommonModule, IonicModule],
	exports: [SelectComponent],
})
export class SelectModule {}
