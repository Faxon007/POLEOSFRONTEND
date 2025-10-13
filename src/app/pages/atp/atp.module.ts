import { AlertModalModule } from '../../components/modals/alert-modal/alert-modal.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { AtpPageRoutingModule } from './atp-routing.module'

import { AtpPage } from './atp.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { AtpModalModule } from './modal/atp-modal.module'
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
        AtpModalModule,
        TableModule,
        AlertModalModule,
        AtpPageRoutingModule,
  ],
  declarations: [AtpPage]
})
export class AtpPageModule {}
