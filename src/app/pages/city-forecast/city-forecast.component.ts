import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TempUnitService } from '../../services/temp-unit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-forecast',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './city-forecast.component.html',
  styleUrl: './city-forecast.component.css'
})
export class CityForecastComponent implements OnInit {
  cityDetails!: any;
  cityId!: any;
  selectedDateForecast !: any;
  selectedDate!: string;
  unit: 'C' | 'F' = 'C';
  temperature !: number;
  private subscriptions: Subscription = new Subscription();

  constructor(private weatherService: WeatherService, private route: ActivatedRoute, private unitService:TempUnitService){}

  ngOnInit(){
    //extract city Id from url route
    this.cityId = this.route.snapshot.paramMap.get('cityId');

    // Fetch city details from service
    const cityForecastSub = this.weatherService.getCityForecast(this.cityId).subscribe((data) => {
      this.cityDetails = data;
      
      // make first date is default selected
      this.selectedDateForecast = this.cityDetails.forecast[0]; 
      this.updateTemperature();
      this.selectedDate = this.selectedDateForecast.date; 
    });
    this.subscriptions.add(cityForecastSub);
    
    // Subscribe to unit changes globally
    const unitSub = this.unitService.unit$.subscribe((unit) => {
      this.unit = unit;
      this.updateTemperature();
    });
    this.subscriptions.add(unitSub);
  }

  onDateChange(event: Event){
    const selectedDate = (event.target as HTMLSelectElement).value;
    this.selectedDateForecast = this.cityDetails.forecast.find(
      (forecast: any) => forecast.date === selectedDate
    );
    this.updateTemperature();
  }

  updateTemperature(){
    this.temperature = this.unit === 'C'? this.selectedDateForecast.temperatureCelsius : this.selectedDateForecast.temperatureFahrenheit;
  }

  // Unsubscribe from all subscriptions to prevent memory leak
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}


