import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CityCardComponent } from '../../components/city-card/city-card.component';
import { SearchComponent } from "../../components/search/search.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { TempUnitService } from '../../services/temp-unit.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CityCardComponent, SearchComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  forecasts!: any[];
  unit: 'C' | 'F' = 'C';

  constructor(private weatherService: WeatherService, private unitService:TempUnitService){}

  ngOnInit(): void {
    this.weatherService.getAllForecasts().subscribe({
      next: (data) => {
        this.forecasts = data;
      },
      error: (err) => console.error('Error fetching data', err),
    });

    this.unitService.unit$.subscribe((unit) => {
      this.unit = unit;
    });
  }

}
