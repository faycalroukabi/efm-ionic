import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Account/authentication.service';
import { ClientService } from '../service/client.service';
import { Client } from '../client';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  ngOnInit() {
    console.log("Client Page init");
  }

  clients: Client[];
  model: Client;
  isEditing: boolean = false;
  showForm: boolean;

  constructor(private router: Router, private authService: AuthenticationService, private firestore: ClientService, public actionSheetController: ActionSheetController) {
    this.loadData();
    this.model = {
      id: '',
      name: '',
      done: false
    }
  }

  openTask() {
    console.log("Task Clicked");
    this.router.navigate(['tasks']);
  }

  async logout() {
    await this.authService.signOut().then(() => this.router.navigate(['login']));
    console.log("Sign out");
  }

  loadData() {
    this.firestore.getAllClients("clients").subscribe((e) => {
      let arr: Client[] = [];
      if (e && e.length > 0) {
        e.forEach(item => {
          const obj: Client = item.payload.doc.data() as unknown as Client;
          obj.id = item.payload.doc.id;
          arr.push(obj)
        });
      }

      this.clients = arr;
    });
  }

  toggleCheck(item): void {
    this.isEditing = true;
    item.checked = !item.checked;
    this.model = item;
    this.addClient();
  }

  addClient(): void {
    if (!this.model.name) {
      return;
    }
    if (!this.isEditing) {
      this.firestore.addClient("clients", this.model).then(() => {
        this.loadData();//refresh view
      });
    } else {
      this.firestore.updateClient("clients", this.model.id, this.model).then(() => {
        this.loadData();//refresh view
      });
    }
    this.isEditing = false;
    //clear form
    this.model.done = false;
    this.model.name = '';
    this.showForm = false;
  }

  updateClient(obj) {
    this.showForm = true;
    this.model = obj;
    this.isEditing = true;
  }

  deleteClient(id: string) {
    this.firestore.deleteClient("clients", id).then(() => {
      this.loadData();//refresh view
      this.isEditing = false;
    });
  }

  async presentActionSheet(obj) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Client options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Open',
        //icon: 'open-outline',
        handler: () => {
          this.openTask();
        }
      }, {
        text: 'Edit',
        //icon: 'create-outline',
        handler: () => {
          this.updateClient(obj);
        }
      }, {
        text: ' Delete',
        role: 'destructive',
        //icon: 'trash',
        handler: () => {
          this.deleteClient(obj.id);
        }
      }, {
        text: ' Cancel',
        //icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  addItem(): void {
    this.showForm = !this.showForm;
  }

  trackByFn(index: number, item: any): number {
    return index; // or item.id
  }

}
