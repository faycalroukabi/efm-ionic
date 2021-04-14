import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Clients';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_client(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_clients() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_client(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_client(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
