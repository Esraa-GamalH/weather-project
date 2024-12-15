import { Component } from '@angular/core';
import { TempUnitService } from '../../services/temp-unit.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private unitService:TempUnitService){}

  // set unit value in service according to chosen unit by user
  onUnitChange(event: Event){
    const unit = (event.target as HTMLSelectElement).value as 'C' | 'F';
    this.unitService.setUnit(unit);
  }

}
