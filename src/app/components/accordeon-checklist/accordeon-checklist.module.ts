import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccordeonChecklistComponent } from './accordeon-checklist.component'
import { CheckboxListModule } from '../checkbox-list/checkbox-list.module'
import { IonicModule } from '@ionic/angular'

@NgModule({
	declarations: [AccordeonChecklistComponent],
	exports: [AccordeonChecklistComponent],
	imports: [CommonModule, CheckboxListModule, IonicModule],
})
export class AccordeonChecklistModule {}
