import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeSlot, TimeSlotResolved} from '../../model/timeSlot';
import {TimeSlotsService} from '../time-slots.service';

@Component({
  selector: 'app-time-slot-detail',
  templateUrl: './time-slot-detail.component.html',
  styleUrls: ['./time-slot-detail.component.css']
})
export class TimeSlotDetailComponent implements OnInit {
  pageTitle = 'Time Slot Detail';
  timeSlot: TimeSlot;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private timeSlotsService: TimeSlotsService) {
    // console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    // niepotrzebne po dodaniu resolvera
    // const id = this.route.snapshot.paramMap.get('id');
    // this.getTimeSlot(id);

    // with resolver:
    const resolvedData: TimeSlotResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onTimeSlotRetrieved(resolvedData.timeSlot);
  }

  // niepotrzebne po dodaniu resolvera
  /*private getTimeSlot(id: string) {
    this.timeSlotsService.getTimeSlot(id).subscribe({
      next: timeSlot => this.onTimeSlotRetrieved(timeSlot),
      error: err => this.errorMessage = err
    });
  }*/

  onTimeSlotRetrieved(timeSlot: TimeSlot): void {
    this.timeSlot = timeSlot;

    if (this.timeSlot) {
      this.pageTitle = `Time Slot Detail: ${this.timeSlot.timeSlotStart}`;
    } else {
      this.pageTitle = 'No time slot found';
    }
  }
}
