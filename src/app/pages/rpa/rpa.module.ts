import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {RpaPageRoutingModule } from './rpa-routing.module';

import { RpaPage } from './rpa.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RpaPageRoutingModule
  ],
  declarations: [RpaPage]
})
export class RpaPageModule {}
