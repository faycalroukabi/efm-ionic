import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private fireStore: AngularFirestore) { }

  //CRUD operation methods------------------------------------------------------

  getAllClients(collection: string): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireStore.collection(collection).snapshotChanges();
  }

  deleteClient<T>(collectionName: string, docID: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fireStore
        .collection(collectionName)
        .doc(docID)
        .delete()
        .then(obj => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addClient<T>(collectionName: string, dataObj: T): Promise<DocumentReference> {
    return new Promise((resolve, reject) => {
      this.fireStore.collection(collectionName).add(dataObj)
        .then(obj => {
          resolve(obj);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateClient<T>(collectionName: string, docID: string, dataObj: T): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fireStore
        .collection(collectionName)
        .doc(docID)
        .update(dataObj)
        .then(obj => {
          resolve(obj);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
