import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CityCardComponent } from '../../components/city-card/city-card.component';
import { SearchComponent } from "../../components/search/search.component";
import { HeroComponent } from "../../components/hero/hero.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CityCardComponent, SearchComponent, HeroComponent],
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
