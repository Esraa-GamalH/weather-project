import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TempUnitService } from '../../services/temp-unit.service';

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

  constructor(private weatherService: WeatherService, private route: ActivatedRoute, private unitService:TempUnitService){}

  ngOnInit(){
    //extract city Id from url route
    this.cityId = this.route.snapshot.paramMap.get('cityId');

    // Fetch city details from service
    this.weatherService.getCityForecast(this.cityId).subscribe((data) => {
      this.cityDetails = data;
      
      // make first date is default selected
      this.selectedDateForecast = this.cityDetails.forecast[0]; 
      this.updateTemperature();
      this.selectedDate = this.selectedDateForecast.date; 
    });

    this.unitService.unit$.subscribe((unit) => {
      this.unit = unit;
      this.updateTemperature();
    });
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

}


