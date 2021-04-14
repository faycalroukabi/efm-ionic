import { Component, Renderer2 } from '@angular/core';
import { FavoriteService } from './services/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fService :FavoriteService,private render:Renderer2) {
    fService.getDarkStatus().then((status)=>{
      if(status==null){
        fService.setDarkStatus(false);
      }
     
      this.render.setAttribute(document.body, 'dark', status);
    })

  
  }
}
