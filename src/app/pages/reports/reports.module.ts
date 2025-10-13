import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ReportsPageRoutingModule } from './reports-routing.module'

import { ReportsPage } from './reports.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { TableModule } from 'src/app/components/table/table.module'
import { ReportsModalModule } from './reports-modals/reports-modal.module'
import { InputSearchMultipleModule } from 'src/app/components/input-search-multiple/input-search-multiple.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReportsPageRoutingModule,
		HeaderModule,
		SearchModule,
		ButtonModule,
		TableModule,
		ReportsModalModule,
		InputSearchMultipleModule,
	],
	declarations: [ReportsPage],
})
export class ReportsPageModule {}
