import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ReportsOymPage } from './reports-oym.page'

const routes: Routes = [
	{
		path: '',
		component: ReportsOymPage,
	},
	{
		path: ':id',
		loadChildren: () =>
			import('../report/report.module').then((m) => m.ReportPageModule),
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReportsOymPageRoutingModule {}
