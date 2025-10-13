import { AlertModalModule } from './../../components/modals/alert-modal/alert-modal.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { RobotsPageRoutingModule } from './robots-routing.module'

import { RobotsPage } from './robots.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { RobotModalModule } from './modal/robot-modal.module'
import { TableModule } from 'src/app/components/table/table.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'


@NgModule({
  imports: [
    CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        ButtonModule,
        SearchModule,
        RobotModalModule,
        TableModule,
        AlertModalModule,
        RobotsPageRoutingModule,
  ],
  declarations: [RobotsPage]
})
export class RobotsPageModule {}
