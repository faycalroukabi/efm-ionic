import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {SnackbarService} from '../services/snackbar.service';
import {Router} from '@angular/router';
import {UserModel} from '../../User';
import {SharedDataService} from '../services/shared-data.service';

const config = {
    databaseURL: 'https://ionicchat-7859d-default-rtdb.firebaseio.com/',
    apiKey: 'AIzaSyAOaY0JSQIiJtLeew0vRAQezHMVPSG4abQ',
    authDomain: 'ionicchat-7859d.firebaseapp.com',
    projectId: 'ionicchat-7859d',
    storageBucket: 'ionicchat-7859d.appspot.com',
    messagingSenderId: '220266897080',
    appId: '1:220266897080:web:d414bdafda3feb4e6a9e4d'
};


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    loader = false;
    user: any;
    db: any;
    admin = false;
    userModel: UserModel;


    constructor(
        public sharedDataService: SharedDataService,
        private snack: SnackbarService,
        private router: Router
    ) {

    }

    configApp() {
        firebase.initializeApp(config);
        this.db = firebase.firestore(); // firebase.database();
    }

    signin(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.loader = false;

                this.user = {
                    id: email.substring(0, email.indexOf('@')).toLowerCase()
                };

                localStorage.setItem('loggedIn', this.user.id);
                this.setCurrentUser();

                console.log('login', user);

            })
            .catch((error) => {
                // Handle Errors here.
                this.loader = false;
                console.log('error while signin', error);
                this.snack.openSnackBar(error.message, 'ok');
                // ...
            });

    }

    signUp(name: string, email: string, password: string) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.loader = false;

                this.user = {
                    name,
                    id: email.substring(0, email.indexOf('@')).toLowerCase()
                };
                localStorage.setItem('loggedIn', this.user.id);

                // create user list on firebase
                this.db.collection('users').doc(this.user.id).set({
                    name,
                    id: this.user.id
                });
                this.setCurrentUser();
                console.log('register', user);
            })
            .catch((error) => {
                // Handle Errors here.
                this.loader = false;
                console.log('error while signup', error);
                this.snack.openSnackBar(error.message, 'ok');
                // ...
            });
    }

    signOut() {
        firebase.auth().signOut().then(() => {
            this.user = {};
            localStorage.removeItem('loggedIn');
            this.router.navigate(['/login'], {skipLocationChange: false});

        }).catch((error) => {
            console.log('error while logout', error);
        });

    }

    sendMsg(id: string, msg: string, type: string) {
        const key = this.generateRandomString(16);
        this.db.collection('Home/').doc(key).set({
            type,
            id,
            key,
            msg,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

    }

    generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    setCurrentUser() {
        const authData = firebase.auth().currentUser;
        this.db = firebase.firestore();
        const id = authData.email.substring(0, authData.email.indexOf('@')).toLowerCase();

        const docRef = this.db.collection('users').doc(id);
        docRef.get().then((doc) => {
            this.userModel = new UserModel(doc.data().id, doc.data().name, authData.email);
            this.sharedDataService.setUser(this.userModel);
            this.router.navigate(['/tabs/chats/'], {
                queryParams: {
                    name: 'Messenger',
                    id: this.user.id
                }, skipLocationChange: false
            });
        });
    }
}
