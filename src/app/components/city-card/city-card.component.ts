import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css'
})
export class CityCardComponent {
  @Input() city!: any;
  cityForecast: any[] = [];
  lastDayForecast: any;
  lastDayForecastIcon: string = "";

  ngOnInit(){
    this.cityForecast = this.city.forecast;

    // showing forecast of latest day available
    this.lastDayForecast = this.cityForecast[this.cityForecast.length-1];
    
    this.lastDayForecastIcon = this.getWeatherIcon(this.lastDayForecast.temperatureCelsius);
  }

  // Determine weather icon based on temperature
  getWeatherIcon(temperature: number): string {
    if (temperature < 10) {
      return 'assets/icons/rainy.png';
    } else if (temperature >= 10 && temperature < 20) {
      return 'assets/icons/cloudy.png';
    } else if (temperature >= 20 && temperature < 25) {
      return 'assets/icons/sunny-rainy.png';
    } else {
      return 'assets/icons/sunny.png';
    }
  }
}
