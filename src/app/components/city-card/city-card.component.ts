import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css'
})
export class CityCardComponent {
  @Input() city!: any;
  @Input() unit!: 'C' | 'F';
  temperature!: number;
  cityForecast: any[] = [];
  lastDayForecast: any;
  lastDayForecastIcon: string = "";

  ngOnInit(){
    this.cityForecast = this.city.forecast;

    // showing forecast of latest day available
    this.lastDayForecast = this.cityForecast[this.cityForecast.length-1];
    this.updateTemperature();

    // change weather icon
    this.lastDayForecastIcon = this.getWeatherIcon(this.lastDayForecast.temperatureCelsius);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unit'] && this.lastDayForecast) {
      this.updateTemperature();
    }
  }

  updateTemperature(){
    this.temperature = this.unit === 'C'? this.lastDayForecast.temperatureCelsius : this.lastDayForecast.temperatureFahrenheit;
  }

  // Determine weather icon based on temperature in C
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
