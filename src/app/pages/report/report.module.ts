import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ReportPageRoutingModule } from './report-routing.module'

import { ReportPage } from './report.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { PipesModule } from 'src/app/pipes/pipes.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReportPageRoutingModule,
		HeaderModule,
		ButtonModule,
		PipesModule,
	],
	declarations: [ReportPage],
})
export class ReportPageModule {}
