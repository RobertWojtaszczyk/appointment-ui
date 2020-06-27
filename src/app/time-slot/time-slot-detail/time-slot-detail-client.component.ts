import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeSlot, TimeSlotResolved} from '../../model/timeSlot';

@Component({
  selector: 'app-time-slot-detail-client',
  templateUrl: './time-slot-detail-client.component.html',
  styleUrls: ['./time-slot-detail-client.component.sass']
})
export class TimeSlotDetailClientComponent implements OnInit {
  pageTitle = 'Client Detail';
  timeSlot: TimeSlot;
  errorMessage: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // niepotrzebne po dodaniu resolvera
    // const id = this.route.snapshot.paramMap.get('id');
    // this.getTimeSlot(id);

    // with resolver-parent: this.route.parent.data.subscribe
    const resolvedData: TimeSlotResolved = this.route.parent.snapshot.data['resolvedData'];
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
      this.pageTitle = `Client Detail: ${this.timeSlot.timeSlotStart}`;
    } else {
      this.pageTitle = 'No time slot found';
    }
  }
}
