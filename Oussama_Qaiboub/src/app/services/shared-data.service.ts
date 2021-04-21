import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserModel} from '../../User';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private userInfo = new  BehaviorSubject(this.editDataDetails);
  currentUser = this.userInfo.asObservable();
  setUser(user: UserModel) {
    this.userInfo.next(user);
  }
}
