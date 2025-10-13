import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { ReportsModalsComponent } from './reports-modals.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { InputSearchModule } from 'src/app/components/input-search/input-search.module'
import { InputSelectModule } from 'src/app/components/input-select/input-select.module'
import { InputAutocompleteModule } from '../../../components/input-autocomplete/input-autocomplete.module'

@NgModule({
	declarations: [ReportsModalsComponent],
	exports: [ReportsModalsComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ButtonModule,
		ReactiveFormsModule,
		InputAutocompleteModule,
	],
})
export class ReportsModalModule {}
