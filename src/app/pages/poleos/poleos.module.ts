import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { PoleosPageRoutingModule } from './poleos-routing.module'

import { PoleosPage } from './poleos.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { TableModule } from 'src/app/components/table/table.module'
import { PoleoModalModule } from './modal/poleo-modal.module'
import { InputSearchMultipleModule } from 'src/app/components/input-search-multiple/input-search-multiple.module'

@NgModule({
  imports: [
    CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        ButtonModule,
        SearchModule,
        PoleoModalModule,
        TableModule,
        PoleosPageRoutingModule,
        InputSearchMultipleModule
  ],
  declarations: [PoleosPage]
})
export class PoleosPageModule {}
