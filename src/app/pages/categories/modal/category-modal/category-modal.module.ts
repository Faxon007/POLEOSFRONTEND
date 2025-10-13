import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoryModalComponent } from './category-modal.component'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { InputSearchModule } from 'src/app/components/input-search/input-search.module'

@NgModule({
	declarations: [CategoryModalComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ButtonModule,
		InputSearchModule,
	],
	exports: [CategoryModalComponent],
})
export class CategoryModalModule {}
