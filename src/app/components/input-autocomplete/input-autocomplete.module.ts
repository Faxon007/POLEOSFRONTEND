import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { InputAutocompleteComponent } from './input-autocomplete.component'
import { PipesModule } from 'src/app/pipes/pipes.module'

@NgModule({
	declarations: [InputAutocompleteComponent],
	imports: [CommonModule, IonicModule, FormsModule, PipesModule],
	exports: [InputAutocompleteComponent],
})
export class InputAutocompleteModule {}
