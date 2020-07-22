import { TestBed } from '@angular/core/testing';

import { TimeSlotEditGuard } from './time-slot-edit.guard';

describe('TimeSlotEditGuard', () => {
  let guard: TimeSlotEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimeSlotEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
