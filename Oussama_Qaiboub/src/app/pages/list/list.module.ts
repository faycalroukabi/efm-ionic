import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {SwipeCardLibModule} from 'ng-swipe-card';
import {IonicModule} from '@ionic/angular';

import {ListPage} from './list.page';

const routes: Routes = [
    {
        path: '',
        component: ListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SwipeCardLibModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ListPage]
})
export class ListPageModule {
}
