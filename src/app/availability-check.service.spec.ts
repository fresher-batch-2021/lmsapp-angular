import { TestBed } from '@angular/core/testing';

import { AvailabilityCheckService } from './availability-check.service';

describe('AvailabilityCheckService', () => {
  let service: AvailabilityCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
