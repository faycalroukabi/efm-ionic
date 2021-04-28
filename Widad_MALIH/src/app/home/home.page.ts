import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTitle = '';
  movieApiUrl = '';
  movieData = {
    title: '',
    description: '',
    imageUrl: ''
  };
  
  
    constructor(private http: HttpClient,
      private loginService : LoginService,
      private router : Router
      ) {
      
    }
    readAPI(URL: string) {
      return this.http.get(URL);
    }
    searchMovie() {
      const search = encodeURIComponent(this.searchTitle).trim();
      console.log('recherche du film ' + search);
      this.movieApiUrl='http://www.omdbapi.com/?apikey=526ca7e2&t='+search;
      this.readAPI(this.movieApiUrl).subscribe((data) => {
      console.log(data);
      this.movieData.title=data['Title'];
      this.movieData.description=data['Plot'];
      this.movieData.imageUrl=data['Poster'];
    });
    }

    signOut() {
      this.loginService.signOut().then(() => {
        this.router.navigateByUrl('/', { replaceUrl: true });
      });
  }}
  