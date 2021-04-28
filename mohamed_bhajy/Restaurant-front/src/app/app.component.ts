import { Component } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private helper: HelperService,
    private platform: Platform,
    //  private statusBar: StatusBar,
    private splashScreen: SplashScreen
    ) {
this.initializeApp();

    }


  initializeApp() {
    console.log("9baaaaaaaaaal check");
    this.platform.ready().then(() => {
      //  this.statusBar.styleBlackOpaque();
      console.log("9baaaaaaaaaal check");
      this.checkUser();
    });
  }

  checkUser() {
    this.helper.get('user').then((user) => {
      if (user != null) {
        this.helper.user = user;
        console.log("user "+user);
        this.helper.navigate(['/'], true);

      }
      else{
        console.log("makiiiiiiiiiiiiiiiiiiinch");

        this.helper.navigate(['/welcome'], true);
        // this.splashScreen.hide();

      }

    });
  }

}
