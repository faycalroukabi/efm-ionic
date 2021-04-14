import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Account } from './account';

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: User = null;
  constructor(private ngAuth: AngularFireAuth, private ngStore: AngularFirestore) {
    this.ngAuth.onAuthStateChanged(user => {
      console.log("Changed :" + user);
      this.currentUser = user;
    });
  }

  async signup({ email, password }): Promise<any> {
    const credential = await this.ngAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const uid = credential.user.uid;

    return this.ngStore.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
  }

  signIn({ email, password }) {
    return this.ngAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.ngAuth.signOut();
  }

}
