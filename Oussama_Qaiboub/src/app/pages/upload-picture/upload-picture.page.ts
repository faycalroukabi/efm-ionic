import {Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

export interface MyData {
    name: string;
    filepath: string;
    size: number;
}

@Component({
    selector: 'app-upload-picture',
    templateUrl: './upload-picture.page.html',
    styleUrls: ['./upload-picture.page.scss'],
})
export class UploadPicturePage {


}
