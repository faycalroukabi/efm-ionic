import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable, of } from 'rxjs'
import { ChatService } from '../../services/chat.service';

import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: Observable<any[]>;
  newMsg = '';
  image=null;

  constructor(private chatService: ChatService, private router: Router, private camera:Camera) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }

  sendMessage(type) {
    this.chatService.addChatMessage(this.newMsg,type).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }



  getPic(){
    const options: CameraOptions = {
      quality: 100,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.newMsg = 'data:image/jpeg;base64,' + imageData;
     this.sendMessage("image")
    }, (err) => {
     // Handle error
    });
  }

  

}