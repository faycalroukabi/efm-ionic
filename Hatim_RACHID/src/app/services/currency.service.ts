import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  entryPoint : string = "https://free.currconv.com";

  constructor(private HttpClient:HttpClientModule) {

   }

   
}
