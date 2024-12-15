import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CityCardComponent } from '../../components/city-card/city-card.component';
import { SearchComponent } from "../../components/search/search.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { TempUnitService } from '../../services/temp-unit.service';
import { Subscription } from 'rxjs';


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
  private subscriptions = new Subscription();

  constructor(private weatherService: WeatherService, private unitService:TempUnitService){}

  ngOnInit(): void {
    const forecastSubscription = this.weatherService.getAllForecasts().subscribe({
      next: (data) => {
        this.forecasts = data;
      },
      error: (err) => console.error('Error fetching data', err),
    });

    const unitSubscription = this.unitService.unit$.subscribe((unit) => {
      this.unit = unit;
    });

    // Add subscriptions to the subscription container to unsubscribe from them together
    this.subscriptions.add(forecastSubscription);
    this.subscriptions.add(unitSubscription);
  }

  // Unsubscribe from all subscriptions to prevent memory leak
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
