import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService:AuthService,
    private router:Router) {}

    option = {
       SlidesPerView:1,
      initialSlide: 0,
      loop: true,
      autoplay:true
    };
    
signOut(){
  this.authService.signOut();
  this.router.navigateByUrl('/');
 // this.router.navigateByUrl("/");
}

}

