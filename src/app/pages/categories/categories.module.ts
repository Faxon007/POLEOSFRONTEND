import { AlertModalModule } from './../../components/modals/alert-modal/alert-modal.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { CategoriesPageRoutingModule } from './categories-routing.module'

import { CategoriesPage } from './categories.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { CategoryModalModule } from './modal/category-modal/category-modal.module'
import { TableModule } from 'src/app/components/table/table.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HeaderModule,
		ButtonModule,
		SearchModule,
		CategoryModalModule,
		TableModule,
		AlertModalModule,
		CategoriesPageRoutingModule,
	],
	declarations: [CategoriesPage],
})
export class CategoriesPageModule {}
