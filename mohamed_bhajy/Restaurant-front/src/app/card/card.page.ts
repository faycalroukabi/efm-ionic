import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  Cart:any=[];

 constructor(private helper:HelperService,private api:ApiService) {}
 ngOnInit() {
  }

  goBack() {
    this.helper.back();
  }

ionViewWillEnter(){
 this.Cart = this.helper.getCart();

}

increaseQuantity(id){
 this.helper.addProductByOne(id);
 this.Cart = this.helper.getCart();
}
decreaseQuantity(id){
 this.helper.decreaseProduct(id);
 this.Cart = this.helper.getCart();
}
remove(id){
this.helper.removeProduct(id);
}

}
