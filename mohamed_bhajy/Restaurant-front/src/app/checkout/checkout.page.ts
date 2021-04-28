import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  order={
    client:{
      id:this.helper.user.id
    },
    items:[],
  };
  Cart:any=[];
  total:number=0;
  paymentMethode=1;
  user:any;
  card = {
    cardType: '',
    cardNumber: '',
    redactedCardNumber: '',
    expiryMonth: null,
    expiryYear: null,
    cvv: '',
    postalCode: ''
  };
  cardImage = 'assets/img/misc/credit-card.png';
  fabGone = false;
  constructor(private helper:HelperService,private router: Router,private api:ApiService) {}

  ngOnInit() {
    this.Cart = this.helper.getCart();
    this.total=this.Cart.reduce((a, b) => a + (b.product.price * b.quantity), 0);
    this.user=this.helper.user;
    this.user.address="47 hay hassani, CasaBlanca, Maroc";
  }
  choosePaymentMethod(value) {
    this.paymentMethode = value
  }
  async makeOrder(){
    console.log("enter");
    this.Cart.forEach(x => {
      this.order.items.push({product:{
        id:x.product.id
      },
        quantity:x.quantity
      })
    });
    console.log(this.order);
    // this.order={
    //   client: {
    //     id:1
    //   },
    //   items:[{
    //       quantity:5,
    //       product:{
    //           id:1
    //       },
    //   }]
    // }
    // console.log(this.order);
    let headers = this.api.getHeadersWithAuthorization();
   this.api.post("makeOrder",this.order,{headers}).catch(err=>console.log(err));
   this.Cart=[];
   this.helper.cart=[];
   this.router.navigate([''])

   }

   goBack() {
    this.helper.back();
  }
   ionViewWillEnter() {
    this.fabGone = false;
  }

  ionViewWillLeave() {
    this.fabGone = true;
  }



}
