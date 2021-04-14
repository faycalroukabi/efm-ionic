import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  password: string = '';
  email: string = '';
  adress: string = '';
  constructor(private helper: HelperService,
    private router: Router,
    private api: ApiService,) { }

  ngOnInit() {
  }
  signUpFresh() {
    let headers = this.api.getHeaders();
    let body = { name: this.name, password: this.password, email: this.email, adress: this.adress };
    this.api.post('signUp', body, { headers })
      .then((data: any) => {
        this.helper.user = data.client;
        this.helper.user.accessToken =data.token;
        this.helper.set("user", this.helper.user);
        this.helper.navigate(['/'], true);

      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
      });
  }
}
