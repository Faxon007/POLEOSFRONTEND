import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { InputSearchMultipleComponent } from './input-search-multiple.component'
import { PipesModule } from 'src/app/pipes/pipes.module'

@NgModule({
	declarations: [InputSearchMultipleComponent],
	imports: [CommonModule, IonicModule, FormsModule, PipesModule],
	exports: [InputSearchMultipleComponent],
})
export class InputSearchMultipleModule {}
