import {Component, OnInit} from '@angular/core';


import {UserModel} from '../../../User';
import * as firebase from 'firebase';
import {SharedDataService} from '../../services/shared-data.service';


@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.page.html',
    styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
    user: UserModel;
    data: any;
    db: any;


    constructor(public sharedDataService: SharedDataService) {
        // this.user.email = User.uid;
        // this.authData = firebase.auth().currentUser;

        this.sharedDataService.currentUser.subscribe(user => (this.user = user));
    }

    ngOnInit() {
    }
}
