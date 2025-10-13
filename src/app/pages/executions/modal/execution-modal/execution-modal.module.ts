import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExecutionModalComponent } from './execution-modal.component'
import { SearchModule } from 'src/app/components/search/search.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { InputSearchModule } from 'src/app/components/input-search/input-search.module'
import { InputAutocompleteModule } from 'src/app/components/input-autocomplete/input-autocomplete.module'
import { CheckboxListModule } from 'src/app/components/checkbox-list/checkbox-list.module'
import { AccordeonChecklistModule } from 'src/app/components/accordeon-checklist/accordeon-checklist.module'

@NgModule({
	declarations: [ExecutionModalComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ButtonModule,
		ReactiveFormsModule,
		InputSearchModule,
		InputAutocompleteModule,
		CheckboxListModule,
		AccordeonChecklistModule,
		SearchModule
	],
	exports: [ExecutionModalComponent],
})
export class ExecutionModalModule {}
