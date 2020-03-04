import { Component, OnInit } from '@angular/core';
import {TimeSlotsService} from '../../shared/time-slots.service';

@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.sass']
})
export class TimeslotsComponent implements OnInit {

  TimeSlotsList: any = [];

  ngOnInit(): void {
    this.loadTimeSlots();
  }

  constructor(public timeSlotsService: TimeSlotsService) { }


  // TimeSlots list
  loadTimeSlots() {
    return this.timeSlotsService.GetTimeSlots().subscribe((data: {}) => {
      this.TimeSlotsList = data;
    });
  }
}
