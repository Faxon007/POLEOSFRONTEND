import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserModalComponent } from './user-modal.component'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { FormsModule } from '@angular/forms'
import { InputSelectModule } from 'src/app/components/input-select/input-select.module'
import { InputAutocompleteModule } from 'src/app/components/input-autocomplete/input-autocomplete.module'

@NgModule({
	declarations: [UserModalComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ButtonModule,
		InputSelectModule,
		InputAutocompleteModule,
	],
	exports: [UserModalComponent],
})
export class UserModalModule {}
