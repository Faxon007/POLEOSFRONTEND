import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ReportsOymPageRoutingModule } from './reports-oym-routing.module'

import { ReportsOymPage } from './reports-oym.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { ListItemModule } from 'src/app/components/list-item/list-item.module'
import { Execution2ModalModule } from '../executions/modal/execution2-modal/execution2-modal.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HeaderModule,
		SearchModule,
		ListItemModule,
		ReportsOymPageRoutingModule,
		Execution2ModalModule,
	],
	declarations: [ReportsOymPage],
})
export class ReportsOymPageModule {}
