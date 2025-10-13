import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RobotsPage } from './robots.page';

const routes: Routes = [
  {
    path: '',
    component: RobotsPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotsPageRoutingModule {}
