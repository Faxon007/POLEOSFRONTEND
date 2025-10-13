import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchComponent } from './search.component'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

@NgModule({
	declarations: [SearchComponent],
	imports: [CommonModule, IonicModule, FormsModule],
	exports: [SearchComponent],
})
export class SearchModule {}
