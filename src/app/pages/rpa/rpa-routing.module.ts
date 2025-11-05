import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RpaPage } from './rpa.page'

const routes: Routes = [
	{
		path: '',
		component: RpaPage,
		children: [
			{
				path: 'robots',
				loadChildren: () =>
					import('../robots/robots.module').then(
						(m) => m.RobotsPageModule
					),
			},
			{
				path: 'poleos',
				loadChildren: () =>
					import('../poleos/poleos.module').then(
						(m) => m.PoleosPageModule
					),
			},
			{
				path: 'reports-oym',
				loadChildren: () =>
					import('../reports-oym/reports-oym.module').then(
						(m) => m.ReportsOymPageModule
					),
			},
			{
				path: 'executions',
				loadChildren: () =>
					import('../executions/execution.module').then(
						(m) => m.ExecutionsPageModule
					),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RpaPageRoutingModule {}
