import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputSearchComponent } from './input-search.component'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@NgModule({
	declarations: [InputSearchComponent],
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [InputSearchComponent],
})
export class InputSearchModule {}
