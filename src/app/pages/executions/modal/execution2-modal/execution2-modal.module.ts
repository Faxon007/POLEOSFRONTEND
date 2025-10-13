import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchModule } from 'src/app/components/search/search.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { InputSearchModule } from 'src/app/components/input-search/input-search.module'
import { InputAutocompleteModule } from 'src/app/components/input-autocomplete/input-autocomplete.module'
import { CheckboxListModule } from 'src/app/components/checkbox-list/checkbox-list.module'
import { AccordeonChecklistModule } from 'src/app/components/accordeon-checklist/accordeon-checklist.module'
import { Execution2ModalComponent } from './execution2-modal.component'

@NgModule({
    declarations: [Execution2ModalComponent],
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
    exports: [Execution2ModalComponent],
})
export class Execution2ModalModule {}
