import { TestBed } from '@angular/core/testing';

import { TempUnitService } from './temp-unit.service';

describe('TempUnitService', () => {
  let service: TempUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
