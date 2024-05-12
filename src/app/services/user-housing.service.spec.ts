import { TestBed } from '@angular/core/testing';

import { UserHousingService } from './user-housing.service';

describe('UserHousingService', () => {
  let service: UserHousingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHousingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
