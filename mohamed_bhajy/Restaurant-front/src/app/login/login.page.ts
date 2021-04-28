import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() marginTop: number = 0;
  password: string = '';
  username: string = '';
  constructor(
    private zone: NgZone,
    private router: Router,
    public helper: HelperService,
    private api: ApiService,) { }

  ngOnInit() {

  }
  logIn() {
    this.helper.startLoading();
    let headers = this.api.getHeaders();
    let body = { username: this.username, password: this.password }
    this.api.post('signIn', body, headers)
      .then((res: any) => {
        this.helper.user=res.client;
        this.helper.user.accessToken = res.token;
        console.log(this.helper.user.accessToken);
        this.helper.set('user', this.helper.user);
        this.helper.stopLoading();
        this.helper.navigate(['/'])
      })
      .catch(err => {
        console.error(err);
        this.helper.stopLoading();
      });
      this.helper.stopLoading();
  }


  goToTabs() {
    this.helper.user.role = 'guest';
    this.helper.navigate(['/']);
  }

  gotoRegister(){
    this.helper.navigate(['/register']);
  }

}
