import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'http://localhost:4454';

  constructor(private http: HttpClient) { }

   // Fetch all cities' weather
  getAllForecasts():Observable<any>{
    return this.http.get(`${this.apiUrl}/forecast`);
  }

  // Fetch city by ID
  getCityForecast(cityId: number):Observable<any> {
    return this.http.get(`${this.apiUrl}/cityForecast/${cityId}`);
  }

}
