import { Component, OnInit } from '@angular/core';

import { ControllerServiceService } from 'src/app/services/controller-service.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})
export class CurrencyPage implements OnInit {

  constructor(private Cservice:ControllerServiceService) { }

  ngOnInit() {
  }

}
