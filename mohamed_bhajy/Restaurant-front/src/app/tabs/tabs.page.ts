import { Component } from '@angular/core';
import { HelperService } from '../../services/helper.service'
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public helper: HelperService,) {}

  goToCard(){
    this.helper.navigate(['/card'])
  }
}
