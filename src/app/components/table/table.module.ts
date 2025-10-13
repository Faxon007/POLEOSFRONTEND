import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableComponent } from './table.component'
import { ButtonModule } from '../common/button/button.module'
import { IonicModule } from '@ionic/angular'
import { PopoverOptionsModule } from '../popover-options/popover-options.module'
import { PaginationModule } from '../pagination/pagination.module'
import { FormsModule } from '@angular/forms'
@NgModule({
	declarations: [TableComponent],
	imports: [
		CommonModule,
		ButtonModule,
		IonicModule,
		PopoverOptionsModule,
		PaginationModule,
		FormsModule,
	],
	exports: [TableComponent],
})
export class TableModule {}
