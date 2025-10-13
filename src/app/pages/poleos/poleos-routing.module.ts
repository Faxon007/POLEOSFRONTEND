import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoleosPage } from './poleos.page';

const routes: Routes = [
  {
    path: '',
    component: PoleosPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoleosPageRoutingModule {}
