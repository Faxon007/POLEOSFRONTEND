import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { BitacorasPage } from './bitacoras.page'

const routes: Routes = [
	{
		path: '',
		component: BitacorasPage,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BitacorasPageRoutingModule {}
