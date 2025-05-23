import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { AmdModule } from 'src/app/amd.module';
import {SwipeCardLibModule} from 'ng-swipe-card';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwipeCardLibModule,
    AmdModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
