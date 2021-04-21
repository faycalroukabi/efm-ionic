import {Component, OnInit} from '@angular/core';
import {PlatformService} from '../../services/platform/platform.service';
import {ApiService} from 'src/app/api/api.service';
import {Router} from '@angular/router';
import {SharedDataService} from '../../services/shared-data.service';
import {UserModel} from '../../../User';
import * as firebase from 'firebase';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    user: UserModel;
    db: any;
    authData = firebase.auth().currentUser;

    constructor(public sharedDataService: SharedDataService,
                private api: ApiService,
                private router: Router) {

    }

    ngOnInit() {
/*        this.setCurrentUser();*/
    }

    signOut() {
        this.api.signOut();
    }

    myProfile() {
        this.router.navigate(['/user-profile'], {skipLocationChange: false});
    }

/*    setCurrentUser() {
        this.db = firebase.firestore();
        const id = this.authData.email.substring(0, this.authData.email.indexOf('@')).toLowerCase();

        const docRef = this.db.collection('users').doc(id);
        docRef.get().then((doc) => {
            this.user = new UserModel(doc.data()['id'], doc.data()['name'], this.authData.email);
            this.sharedDataService.setUser(this.user);
        });
        console.log(this.user);
    }*/
}
