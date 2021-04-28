import {Component, OnInit} from '@angular/core';
import {PlatformService} from '../../services/platform/platform.service';
import {FakerService} from '../../services/faker/faker.service';
import * as firebase from 'firebase';
import {UserModel} from '../../../User';
import {SharedDataService} from '../../services/shared-data.service';


@Component({
    selector: 'app-chats',
    templateUrl: './chats.page.html',
    styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
    currentUser: UserModel;
   // users: UserModel[] = [];
    users: any;
    db: any;

    constructor(
        public sharedDataService: SharedDataService,
        public platformService: PlatformService,
        private fakerService: FakerService
    ) {
        this.db = firebase.firestore();
    }

     dataInit() {
         this.fakerService.getFaker().then((faker) => {
             this.users = Array.apply(null, Array(25)).map(() => {
                 const gender = faker.random.arrayElements([1, 0])[0];
                 return {
                     id: faker.random.uuid(),
                     first_name: faker.name.firstName(gender),
                     last_name: faker.name.lastName(gender),
                     email: faker.internet.email(),
                     avatar: faker.image.avatar(),
                     last_message: faker.lorem.sentence()
                 };
             });
         });
     }


/*    dataInit() {

        const id = this.currentUser.email.substring(0, this.currentUser.email.indexOf('@')).toLowerCase();
        this.db.collection('users').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data()['id'] !== id) {
                        const user = new UserModel(doc.data()['id'], doc.data()['name'], 'Hidden');
                        this.users.push(user);
                    }
                });
            }
        );
    }*/

    ngOnInit() {
        // this.users.shift();
        this.sharedDataService.currentUser.subscribe(user => (this.currentUser = user));
        this.dataInit();
    }
/*
    ionViewWillEnter() {
        this.sharedDataService.currentUser.subscribe(user => (this.currentUser = user));
        this.dataInit();
    }*/

}
