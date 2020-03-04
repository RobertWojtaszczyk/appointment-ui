import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeSlotsComponent } from './new-time-slots.component';

describe('NewTimeSlotsComponent', () => {
  let component: NewTimeSlotsComponent;
  let fixture: ComponentFixture<NewTimeSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTimeSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
