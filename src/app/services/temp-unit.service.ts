import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempUnitService {

  constructor() { }

  private unitSubject = new BehaviorSubject<'C' | 'F'>('C');
  unit$ = this.unitSubject.asObservable();

  setUnit(unit: 'C' | 'F') {
    this.unitSubject.next(unit);
  }
}
