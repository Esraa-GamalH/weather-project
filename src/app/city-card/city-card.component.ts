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

  ngOnInit(){
    this.cityForecast = this.city.forecast;
    this.lastDayForecast = this.cityForecast[this.cityForecast.length-1];
  }
}
