import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CityForecastComponent } from './pages/city-forecast/city-forecast.component';

export const routes: Routes = [
    // both / and /forecast paths navigate to landing page with cities list
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'forecast',
        component: HomeComponent,
        title: 'Home'
    },
    
    // /cityForecast/:cityId navigates to city forecast details
    {
        path: 'cityForecast/:cityId',
        component: CityForecastComponent,
        title: 'Forecast Details'
    }
];
