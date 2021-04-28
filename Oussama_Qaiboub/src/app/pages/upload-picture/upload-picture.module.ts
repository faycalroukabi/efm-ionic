import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {UploadPicturePage} from './upload-picture.page';
import {FileSizeFormatPipe} from './file-size-format.pipe';


const routes: Routes = [
    {
        path: '',
        component: UploadPicturePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [UploadPicturePage, FileSizeFormatPipe]
})
export class UploadPicturePageModule {}
