import { Component, OnInit } from '@angular/core';
import { UnsplashApiService } from '../../services/unsplash-api.service';
import { Observable } from 'rxjs';
import { ControllerServiceService } from 'src/app/services/controller-service.service';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {

  isSearch = false;
  isSearched = false;
  photos: Observable<any>;
  title = "Images";
  typingTimer;                //timer identifier
  doneTypingInterval = 3000;


  constructor(private unsplashApi: UnsplashApiService, 
    private Cservice: ControllerServiceService, private downloader: Downloader,
    private photoViewer: PhotoViewer  ) { }

  ngOnInit() {

    this.photos = this.unsplashApi.getRandomPhotos(30);

  }

  toggleSearch() {
    this.isSearch = true;

  }

  // launchSearch(e) {

  //   clearTimeout(this.typingTimer);
  //   this.typingTimer = setTimeout(()=>{
  //     this.isSearch=false;
  //     this.title=e.target.value;
  //     this.photos  = this.unsplashApi.getByQuery(e.target.value);
  //     this.photos.subscribe((data) =>{
  //       console.log(data);
  //     })
  //     this.isSearched=true;
  //   }, this.doneTypingInterval);

  // }


  launchSearch(e) {
    this.isSearch = false;
    this.title = e.target.value;
    this.photos = this.unsplashApi.getByQuery(e.target.value);
    this.isSearched = true;
  }
  reload() {
    this.isSearched = false;
    this.isSearch = false;
    this.title = "Images";
    this.photos = this.unsplashApi.getRandomPhotos(30);
  }

  download(url) {
   
    var request: DownloadRequest = {
      uri: url,
      title: 'unsplashImages',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'Unsp.png'
      }
    };


    this.downloader.download(request)
      .then((location: string) => console.log('File downloaded at:' + location))
      .catch((error: any) => console.error(error));
  }


  showImage(url){
    this.photoViewer.show(url);
  }


}
