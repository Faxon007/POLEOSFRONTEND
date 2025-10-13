import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { IndexPageRoutingModule } from './index-routing.module'

import { IndexPage } from './index.page'
import { SidemenuModule } from 'src/app/components/common/sidemenu/sidemenu.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		IndexPageRoutingModule,
		SidemenuModule,
	],
	declarations: [IndexPage],
})
export class IndexPageModule {}
