import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { BitacorasPageRoutingModule } from './bitacoras-routing.module'

import { BitacorasPage } from './bitacoras.page'
import { HeaderModule } from 'src/app/components/common/header/header.module'
import { SearchModule } from 'src/app/components/search/search.module'
import { TableModule } from 'src/app/components/table/table.module'
import { ButtonModule } from 'src/app/components/common/button/button.module'
import { BitacoraModalModule } from './modal/bitacora-modal/bitacora-modal.module'

import { InputSelectModule } from 'src/app/components/input-select/input-select.module'
import { InputSelectMultipleModule } from 'src/app/components/input-select-multiple/input-select-multiple.module'
import { InputSearchMultipleModule } from 'src/app/components/input-search-multiple/input-search-multiple.module'
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

ModuleRegistry.registerModules([ExcelExportModule]);
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HeaderModule,
		BitacorasPageRoutingModule,
		SearchModule,
		TableModule,
		ButtonModule,
		BitacoraModalModule,
		InputSelectModule,
		InputSelectMultipleModule,
		InputSearchMultipleModule,
		AgGridModule
	],
	declarations: [BitacorasPage],
})
export class BitacorasPageModule {}
