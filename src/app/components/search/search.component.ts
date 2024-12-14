import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  onSearch(){
    console.log(this.searchForm.value['cityName']);
    
  }
}
