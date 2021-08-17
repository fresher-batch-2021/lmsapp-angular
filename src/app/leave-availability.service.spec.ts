import { TestBed } from '@angular/core/testing';

import { LeaveAvailabilityService } from './leave-availability.service';

describe('LeaveAvailabilityService', () => {
  let service: LeaveAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
