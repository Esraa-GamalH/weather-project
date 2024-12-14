import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  forecasts!: any[];

  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.weatherService.getAllForecasts().subscribe({
      next: (data) => {
        console.log("data", data);
        
        this.forecasts = data
      },
      error: (err) => 'error'
    });
  }
}
