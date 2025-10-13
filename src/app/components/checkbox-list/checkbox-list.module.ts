import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckboxListComponent } from './checkbox-list.component'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

@NgModule({
	declarations: [CheckboxListComponent],
	imports: [CommonModule, IonicModule, FormsModule],
	exports: [CheckboxListComponent],
})
export class CheckboxListModule {}
