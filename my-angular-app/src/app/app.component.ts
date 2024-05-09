import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'weather app';
  weatherData: any;

  constructor(private weatherService: WeatherService){
    //console.log(this.weatherService.getData)
  }

  ngOnInit(): void {
    //this.getWeatherData('New York');
  }

  // getWeatherData(city: string): void {
  //   this.weatherService.getWeather(city)
  //     .subscribe(data => {
  //       this.weatherData = data;
  //       console.log(this.weatherData); 
  //     });
  // }
 
}
