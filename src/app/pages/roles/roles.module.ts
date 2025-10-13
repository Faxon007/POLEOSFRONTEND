import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { RolesPageRoutingModule } from './roles-routing.module'

import { RolesPage } from './roles.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { TableModule } from 'src/app/components/table/table.module'
import { SearchModule } from 'src/app/components/search/search.module'

import { RolModalModule } from './modal/rol-modal/rol-modal.module'
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HeaderModule,
		RolesPageRoutingModule,
		ButtonModule,
		SearchModule,
		TableModule,
		RolModalModule,
	],
	declarations: [RolesPage],
})
export class RolesPageModule {}
