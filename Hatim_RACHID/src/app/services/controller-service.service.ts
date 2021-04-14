import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SettingsPage } from '../modals/settings/settings.page';
import { ImageViewerPage } from '../modals/image-viewer/image-viewer.page';
@Injectable({
  providedIn: 'root'
})
export class ControllerServiceService {

  constructor(private mController: ModalController) {


  }

  async openSettingModal() {
    const modal = await this.mController.create({
      component: SettingsPage,
      cssClass: 'my-custom-class',
      swipeToClose: true
    });
    return await modal.present();
  }

  async openViewerModal(url) {
    const modal = await this.mController.create({
      component: SettingsPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        'url': url,
        
      }

    });
    return await modal.present();
  }
}
