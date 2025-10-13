import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RolModalComponent } from './rol-modal.component'
import { SearchModule } from 'src/app/components/search/search.module'
// import { AccordionModule } from 'src/app/components/accordion/accordion.module';
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { CheckboxListModule } from 'src/app/components/checkbox-list/checkbox-list.module'
import { AccordeonChecklistModule } from 'src/app/components/accordeon-checklist/accordeon-checklist.module'
@NgModule({
	declarations: [RolModalComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		SearchModule,
		ButtonModule,
		CheckboxListModule,
		AccordeonChecklistModule,
	],
	exports: [RolModalComponent],
})
export class RolModalModule {}
