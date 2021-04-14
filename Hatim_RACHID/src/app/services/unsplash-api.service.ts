import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UnsplashApiService {
   entry : string = "https://api.unsplash.com/";


   key : string ="client_id="+environment.UnsplashApi;

  constructor(private http: HttpClient) { 
    
  }

  getFilms() {
    return this.http.get('https://swapi.dev/api/films');
  }

  getRandomPhotos(count:number){
    return this.http.get(this.entry+"/photos/random?count="+count+"&"+this.key);
  }

  getByQuery(query){
    return this.http.get(this.entry+"/search/photos?per_page=30&query="+query+"&"+this.key);
  }
}
