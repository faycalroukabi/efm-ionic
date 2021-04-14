import { ToastController, LoadingController, Platform, NavController } from '@ionic/angular';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  loading: any = null;
  lang: string = 'fr';
  user: any = {};
  order: any = {};
  canDeactivate: boolean = true;
  orders: any = [];
  products: any = [];
  cart:any = [];
  userLoggedIn$: EventEmitter<null> = new EventEmitter();

   constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private platform: Platform,
    private storage: Storage,
    private router: Router,
    private ngZone: NgZone,
  ) {
     this.storage.create();
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      duration: 3000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  navigate(commands: any[], replaceUrl = false): void {
    this.ngZone.run(() => this.router.navigate(commands, { replaceUrl: replaceUrl })).then();
  }

  getCurrentRoute() {
    return this.router.url;
  }



  async startLoading() {
    if (this.loading) return;
    this.loading = await this.loadingController.create({ cssClass: 'transparent' });
    await this.loading.present();
  }

  stopLoading() {
    this.loading.dismiss();
    this.loading = null;
  }

  formatDate(date) {
    if (!date) return "";
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
    let day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    return day + "/" + month + "/" + year;
  }

  formatTime(date) {
    if (!date) return "";
    let newDate = new Date(date);
    let hours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    let minutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
    return hours + ":" + minutes;
  }

  formatDateTime(date) {
    if (!date) return "";
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
    let day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    let hours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    let minutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  }

  getDateTime() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let day = dd < 10 ? '0' + dd : dd.toString();
    let month = mm < 10 ? '0' + mm : mm.toString();
    return yyyy + "-" + month + "-" + day + "T10:00";
  }

  formatIonDatetime(date) {
    return `${date.substr(0, 10)} ${date.substr(11, 8)}`;
  }

  deepCopyArray(array) {
    return JSON.parse(JSON.stringify(array));
  }



  platformIsIos() {
    return this.platform.is('ios');
  }

  platformIsCordova() {
    return this.platform.is('cordova');
  }

  set(key: string, value: any): Promise<any> {
    return new Promise(async (resolve) => {
      this.storage.set(key, value).then(() => resolve(value));
    });
  }

  get(key: string): Promise<any> {
    return new Promise(async (resolve) => {
      this.storage.get(key).then((value) => resolve(value));
    });
  }

  remove(key: string): Promise<any> {
    return new Promise(async (resolve) => {
      this.storage.remove(key).then(() => resolve(key));
    });
  }

  back() {
    this.navCtrl.back();
  }

  getCart() {
    return this.cart;
  }
  addProduct(productOrder) {
    let added = false;
    for (let p of this.cart) {
      if (p.product.id === productOrder.product.id) {
        p.quantity += productOrder.quantity;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(productOrder);
    }
    console.log(this.cart.length)
  }
  addProductByOne(id) {
    for (let p of this.cart) {
      if (p.product.id === id) {
        p.quantity += 1;
        break;
      }
    }
  }
  decreaseProduct(id) {
    for (let [index, p] of this.cart.entries()) {
      if (p.product.id === id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
  }

  removeProduct(id) {
    for (let [index, p] of this.cart.entries()) {
      if (p.product.id === id) {
        this.cart.splice(index, 1);
      }
    }
  }
}
