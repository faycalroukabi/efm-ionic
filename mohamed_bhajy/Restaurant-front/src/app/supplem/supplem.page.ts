import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-supplem',
  templateUrl: './supplem.page.html',
  styleUrls: ['./supplem.page.scss'],
})
export class SupplemPage implements OnInit {
  products=[];

  productOrder={
    product:null,
    id:1,
    quantity:0,
    client:1,
  };
  slideOpts = {
    slidesPerView: 3.5,
  };
  constructor(
    public helper: HelperService,private route: ActivatedRoute, private router: Router
    ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.productOrder.product = this.router.getCurrentNavigation().extras.state.product;
        }
      });
       this.products =this.helper.products;
     }

  goBack() {
    this.helper.back();
  }

  addToCart() {
      this.productOrder.quantity=1;
      this.helper.addProduct(this.productOrder);
      this.goBack();


  }

  ngOnInit() {
  }
}
