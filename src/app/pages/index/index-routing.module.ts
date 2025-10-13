import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { IndexPage } from './index.page'

const routes: Routes = [
	{
		path: '',
		component: IndexPage,
		children: [
			{ path: '', redirectTo: '/oym-reports', pathMatch: 'full' },
			/*{
				path: 'robots',
				loadChildren: () =>
					import('../robots/robots.module').then(
						(m) => m.RobotsPageModule
					),
			},
			{
				path: 'executions',
				loadChildren: () =>
					import('../executions/execution.module').then(
						(m) => m.ExecutionsPageModule
					),
			},*/
			{
				path: 'oym-reports',
				loadChildren: () =>
					import('../reports-oym/reports-oym.module').then(
						(m) => m.ReportsOymPageModule
					),
			},
			/*{
				path: 'oym-reports',
				redirectTo:'index',
				pathMatch: 'full'

			},*/
			{
				path: 'rpa',
				loadChildren: () =>
					import('../rpa/rpa.module').then(
						(m) => m.RpaPageModule
					),
			},

			{
				path: 'administrative-reports/:name',
				loadChildren: () =>
					import('../report/report.module').then(
						(m) => m.ReportPageModule
					),
			},
			{
				path: 'management',
				loadChildren: () =>
					import('../management/management.module').then(
						(m) => m.ManagementPageModule
					),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class IndexPageRoutingModule {}
