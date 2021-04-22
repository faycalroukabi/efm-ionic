//ADD OnInit
import { Component, OnInit } from '@angular/core';

//Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';

//Import Component for the update function and the Modal controller to handle the component.

import { UpdaterecordComponent } from '../../components/updaterecord/updaterecord.component';
import { ModalController } from '@ionic/angular';
import { ChatService } from "../../services/chat.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  doc: any;
  records: { id: string; description: string; amount: number; type: string; }[];
  addrecord: {type: string ; description: string; amount: number};

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private chatService : ChatService,
    private  router : Router
  ) {}

  ngOnInit(){
    this.addrecord = {type :'', description :'', amount: null}
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      if(res){
        this.records = res.map(e=>{
          return{
            id: e.payload.doc.id,
            description: e.payload.doc.data()['description'],
            amount: e.payload.doc.data()['amount'],
            type: e.payload.doc.data()['type']
          }
        })
      }
    })
  }

  AddRecord(type, description, amount){
    let addrecord = {}
    addrecord['type'] = type
    addrecord['description'] = description
    addrecord['amount'] = amount
    console.log(addrecord)
    this.firestore.collection('/Records/').add(addrecord).then(()=>{
      this.addrecord = {type :'', description :'', amount: null}
    })
  }
  async UpdateRecord(id, type, description, amount) {
    const modal = await this.modalController.create({
      component:  UpdaterecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': id,
        'type': type,
        'description': description,
        'amount': amount,
      }
    });
    return await modal.present();
  }
  DeleteRecord(id){
    this.firestore.doc('/Records/'+id).delete()
  }
  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
}}
