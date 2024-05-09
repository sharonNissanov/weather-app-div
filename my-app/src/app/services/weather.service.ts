import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//DOCU

export class WeatherService {
  private apiKey = '2cc48dd34be6452386a130925240905';
 // constructor(private http: HttpClient) { }

  getData():string{
      return "sharon";
  }
  getWeather(city: string): any {
return null
   // return this.http.get(`http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`);
  }
}