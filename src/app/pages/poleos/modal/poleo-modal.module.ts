import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PoleoModalComponent } from './poleo-modal.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { InputSearchModule } from 'src/app/components/input-search/input-search.module'
import { InputAutocompleteModule } from '../../../components/input-autocomplete/input-autocomplete.module'

@NgModule({
	declarations: [PoleoModalComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ButtonModule,
		InputSearchModule,
		ReactiveFormsModule,
		InputAutocompleteModule
	],
	exports: [PoleoModalComponent],
})
export class PoleoModalModule {}
