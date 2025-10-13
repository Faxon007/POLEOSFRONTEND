import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { IndicatorsPageRoutingModule } from './indicators-routing.module'

import { IndicatorsPage } from './indicators.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		IndicatorsPageRoutingModule,
		HeaderModule,
	],
	declarations: [IndicatorsPage],
})
export class IndicatorsPageModule {}
