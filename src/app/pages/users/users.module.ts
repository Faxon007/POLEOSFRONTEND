import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { UsersPageRoutingModule } from './users-routing.module'

import { UsersPage } from './users.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { TableModule } from 'src/app/components/table/table.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { UserModalModule } from './modal/user-modal/user-modal.module'
import { ChangePasswordModalModule } from './modal/change-password-modal/change-password-modal.module'
import { ActivateUserModalModule } from './modal/activate-user/activate-user.module'
import { InputSelectModule } from 'src/app/components/input-select/input-select.module'
import { InputSelectMultipleModule } from 'src/app/components/input-select-multiple/input-select-multiple.module'
import { InputSearchMultipleModule } from 'src/app/components/input-search-multiple/input-search-multiple.module'
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HeaderModule,
		UsersPageRoutingModule,
		SearchModule,
		TableModule,
		ButtonModule,
		UserModalModule,
		ChangePasswordModalModule,
		ActivateUserModalModule,
		InputSelectModule,
		InputSelectMultipleModule,
		InputSearchMultipleModule,
	],
	declarations: [UsersPage],
})
export class UsersPageModule {}
