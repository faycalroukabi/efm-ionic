import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './page/client.page';
import { ClientComponent } from './component/client.component';
import { ClientService } from './service/client.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPageRoutingModule
  ],
  declarations: [ClientPage, ClientComponent],
  providers: [ClientService]
})
export class ClientModule { }
