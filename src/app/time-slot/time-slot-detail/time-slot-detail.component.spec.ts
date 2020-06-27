import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotDetailComponent } from './time-slot-detail.component';

describe('TimeSlotDetailComponent', () => {
  let component: TimeSlotDetailComponent;
  let fixture: ComponentFixture<TimeSlotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
