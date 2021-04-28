import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

//IMPORT THE COMPONENT.

import {  UpdaterecordComponent } from '../../components/updaterecord/updaterecord.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  //ADD THE ENTRY COMPONENT AND THE DECLARATION
  entryComponents:[UpdaterecordComponent],
  declarations: [Tab1Page, UpdaterecordComponent]
})
export class Tab1PageModule {}
