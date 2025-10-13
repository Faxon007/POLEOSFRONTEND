import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ControlDevelopmentPage } from './control-development.page'

const routes: Routes = [
	{
		path: '',
		component: ControlDevelopmentPage,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ControlDevelopmentPageRoutingModule {}
