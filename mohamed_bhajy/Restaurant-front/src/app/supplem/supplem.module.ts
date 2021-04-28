import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplemPageRoutingModule } from './supplem-routing.module';

import { SupplemPage } from './supplem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplemPageRoutingModule
  ],
  declarations: [SupplemPage]
})
export class SupplemPageModule {}
