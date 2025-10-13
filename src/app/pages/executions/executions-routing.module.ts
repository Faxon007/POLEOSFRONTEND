import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ExecutionsPage } from './execution.page'

const routes: Routes = [
	{
		path: '',
		component: ExecutionsPage,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ExecutionsPageRoutingModule {}
