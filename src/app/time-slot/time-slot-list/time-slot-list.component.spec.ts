import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotListComponent } from './time-slot-list.component';

describe('TimeslotsComponent', () => {
  let component: TimeSlotListComponent;
  let fixture: ComponentFixture<TimeSlotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
