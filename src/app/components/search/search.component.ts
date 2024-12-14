import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchForm = new FormGroup({
    cityName: new FormControl(''),
  });

  constructor(private router: Router){}
  
  // filtered cities according to user input in search bar
  @Input() forecasts!: any[];
  cities: {cityName: string, cityId: number}[] = [];
  filteredCities: {cityName: string, cityId: number}[] = [];

  ngOnInit(){
    // extract cities names from JSON data
    this.cities = this.forecasts.map((data) => ({
      cityName: data.city,
      cityId: data.id,
    }));
    console.log("my cities", this.cities);
    

    // listen to value changes in user input
    this.searchForm.get('cityName')?.valueChanges.subscribe((value) => {
      this.filteredCities = this.filterCities(value || '');
    });
  }

  // function to be called every filtering time
  filterCities(query: string): { cityName: string; cityId: number }[] {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery !== ''){
      return this.cities.filter((city) =>
        city.cityName.toLowerCase().includes(lowerCaseQuery)  // if the city includes the letters it will also appear
      );
    }
    return [];
  }

    // Navigate to show city forecast details
    navigateToCityDetails(cityId: number) {
      this.router.navigate([`/cityForecast`, cityId]);
    }
  
}
