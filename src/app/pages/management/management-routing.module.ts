import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ManagementPage } from './management.page'

const routes: Routes = [
	{
		path: '',
		component: ManagementPage,
		children: [
			{
				path: 'categories',
				loadChildren: () =>
					import('../categories/categories.module').then(
						(m) => m.CategoriesPageModule
					),
			},
			{
				path: 'roles',
				loadChildren: () =>
					import('../roles/roles.module').then(
						(m) => m.RolesPageModule
					),
			},
			{
				path: 'users',
				loadChildren: () =>
					import('../users/users.module').then(
						(m) => m.UsersPageModule
					),
			},
			{
				path: 'reports',
				loadChildren: () =>
					import('../reports/reports.module').then(
						(m) => m.ReportsPageModule
					),
			},
			{
				path: 'bitacoras',
				loadChildren: () =>
					import('../bitacoras/bitacoras.module').then(
						(m) => m.BitacorasPageModule
					),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ManagementPageRoutingModule {}
