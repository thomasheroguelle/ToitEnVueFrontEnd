import { TestBed } from '@angular/core/testing';

import { HousingCRUDService } from './housing-crud.service';

describe('HousingCRUDService', () => {
  let service: HousingCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
