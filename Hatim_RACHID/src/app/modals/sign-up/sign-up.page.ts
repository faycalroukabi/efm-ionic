import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  credentialForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private chatService: ChatService,
    public modalController: ModalController) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Fname: ['', [Validators.required]],

      
    });
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  // Easy access for form fields
  get email() {
    return this.credentialForm.get('email');
  }

  get password() {
    return this.credentialForm.get('password');
  }

  get fullname() {
    return this.credentialForm.get('Fname');
  }
  
  async signUp() {
   
    const loading = await this.loadingController.create();
    await loading.present();

    console.log(this.credentialForm.value);
    this.chatService
      .signup(this.credentialForm.value)
      .then(
        async (user) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Account Creation ',
            message: "Your account has been Succesfully Created \n Check your email for verification",
            buttons: ['OK'],
          });

          await alert.present();

          this.dismiss();
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
