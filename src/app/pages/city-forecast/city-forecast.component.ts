import { Component, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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

  constructor(private weatherService: WeatherService, private route: ActivatedRoute){}

  ngOnInit(){
    //extract city Id from url route
    this.cityId = this.route.snapshot.paramMap.get('cityId');

    // Fetch city details from service
    this.weatherService.getCityForecast(this.cityId).subscribe((data) => {
      this.cityDetails = data;
      
      // make first date is default selected
      this.selectedDateForecast = this.cityDetails.forecast[0];    
      this.selectedDate = this.selectedDateForecast.date; 
    });
  }

  onDateChange(event: Event){
    const selectedDate = (event.target as HTMLSelectElement).value;
    this.selectedDateForecast = this.cityDetails.forecast.find(
      (forecast: any) => forecast.date === selectedDate
    );
    }
  }


