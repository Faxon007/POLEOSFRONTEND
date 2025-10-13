import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ControlDevelopmentPageRoutingModule } from './control-development-routing.module'

import { ControlDevelopmentPage } from './control-development.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { TableModule } from 'src/app/components/table/table.module'
import { SearchModule } from 'src/app/components/search/search.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HeaderModule,
		ControlDevelopmentPageRoutingModule,
		ButtonModule,
		SearchModule,
		TableModule,
	],
	declarations: [ControlDevelopmentPage],
})
export class ControlDevelopmentPageModule {}
