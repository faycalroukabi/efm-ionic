import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  goToTabs() {
    this.helper.navigate(['/']);
  }


  goToRegister() {
    this.helper.navigate(['/register']);
  }

  goToLogin() {
    this.helper.navigate(['/login']);
  }
}
