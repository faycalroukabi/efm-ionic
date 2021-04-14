import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService} from '../services/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  username:any =""
  password:any =""
  constructor(private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private chatService: AuthService) {
    
   }

  ngOnInit() {
  }
  async signUp() { 
    alert(this.username+this.password)
    const loading = await this.loadingController.create();
    await loading.present();
    this.chatService
      .signup(this.username,this.password)
      .then(
        (user) => {
          loading.dismiss();
          this.router.navigateByUrl('/chat', { replaceUrl: true });
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Sign up failed',
            message: err.message,
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
  }
}
