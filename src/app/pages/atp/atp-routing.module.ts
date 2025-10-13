import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtpPage } from './atp.page';

const routes: Routes = [
  {
    path: '',
    component: AtpPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtpPageRoutingModule {}
