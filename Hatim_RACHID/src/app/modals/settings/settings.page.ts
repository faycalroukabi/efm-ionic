import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  darkMode : boolean;

  constructor(public modalController: ModalController,
    private chatService: ChatService,
    private router: Router,
    private render: Renderer2,
    private fService:FavoriteService) {
      fService.getDarkStatus().then((status)=>{
      
       this.darkMode=status;
      })

  }

  ngOnInit() {
   
   
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });

  }

  signOut() {
    this.dismiss();
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });

  }

  toggleDarkTheme(event) {

    let dark = event.detail.checked;

    if (dark) {
      this.render.setAttribute(document.body, 'dark', 'true');
    
    } else {
      this.render.setAttribute(document.body, 'dark', 'false');
    }
    this.fService.setDarkStatus(dark);
  }


}
