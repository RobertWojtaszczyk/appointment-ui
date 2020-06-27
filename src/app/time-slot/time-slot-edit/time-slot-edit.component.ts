import {Component, OnInit} from '@angular/core';
import {TimeSlotsService} from '../time-slots.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TimeSlot, TimeSlotResolved} from '../../model/timeSlot';
import {NewTimeSlot} from '../../model/newTimeSlot';

@Component({
  selector: 'app-time-slot-edit',
  templateUrl: './time-slot-edit.component.html',
  styleUrls: ['./time-slot-edit.component.css']
})
export class TimeSlotEditComponent implements OnInit {
  pageTitle = 'Time Slot Edit';
  errorMessage: string;
  timeSlot: TimeSlot;
  private dataIsValid: { [key: string]: boolean } = {};

  constructor(private timeSlotsService: TimeSlotsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // niepotrzebne po dodaniu resolvera:
/*    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getTimeSlot(id);
      }
    );*/
    // const id = this.route.snapshot.paramMap.get('id');
    // this.getTimeSlot(id);

    // dane z resolvera, ale z subscribe:
    this.route.data.subscribe( data => {
      const resolvedData: TimeSlotResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onTimeSlotRetrieved(resolvedData.timeSlot);
    });
  }

  private getTimeSlot(id: string) {
    this.timeSlotsService.getTimeSlot(id).subscribe({
      next: timeSlot => this.onTimeSlotRetrieved(timeSlot),
      error: err => this.errorMessage = err
    });
  }

  onTimeSlotRetrieved(timeSlot: TimeSlot): void {
    this.timeSlot = timeSlot;
    console.log('Received time slot: ', this.timeSlot);
    if (!this.timeSlot) {
      this.pageTitle = 'No product found';
    } else {
      if (this.timeSlot.id === 'new') {
        this.pageTitle = 'Add Time Slot';
      } else {
        this.pageTitle = `Edit Time Slot: ${this.timeSlot.timeSlotStart}`;
      }
    }
  }

  deleteProduct(): void {
    console.log('Deleting timeslot id: ' + this.timeSlot.id);
    if (this.timeSlot.id === 'new') {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.timeSlot.timeSlotStart} was deleted`);
    } else {
      if (confirm(`Really delete the timeSlot: ${this.timeSlot.timeSlotStart}?`)) {
        this.timeSlotsService.deleteTimeSlot(this.timeSlot.id).subscribe({
          next: () => this.onSaveComplete(`${this.timeSlot.id} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveTimeSlot(): void {
    if (this.isValid()) {
      if (this.timeSlot.id === 'new') {
        console.log('Saving new time slot');
        this.timeSlotsService.createTimeSlot(this.timeSlotToNewTimeSlot(this.timeSlot)).subscribe({
          next: () => this.onSaveComplete(`The new ${this.timeSlot.timeSlotStart} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        console.log('Updating time slot: ', this.timeSlot);
        this.timeSlotsService.updateTimeSlot(this.timeSlot).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.timeSlot.timeSlotStart} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  // mapper
  timeSlotToNewTimeSlot(timeSlot: TimeSlot): NewTimeSlot {
    const newTimeSlot = {
      timeSlotStart: timeSlot.timeSlotStart,
      timeSlotEnd: timeSlot.timeSlotEnd,
      timeSlotStatus: timeSlot.timeSlotStatus,
      contractor: '01d8dc3d-151d-49fe-9f5b-6701d3c0c449',
    };
    return newTimeSlot;
  }

  onSaveComplete(message?: string): void {
    /*if (message) {
      this.messageService.addMessage(message);
    }*/
    console.log('Time slot saved: ' + message);
    // Navigate back to the product list
    this.router.navigate(['/timeSlots'],
      { queryParamsHandling: 'preserve'});
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid && Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  validate(): void {
    // clear the validation object
    this.dataIsValid = {};

    // 'slot' tab
    if (this.timeSlot.timeSlotStart &&
        this.timeSlot.timeSlotStart.length >= 3 &&
        this.timeSlot.timeSlotEnd &&
        this.timeSlot.timeSlotEnd.length >= 3) {
      this.dataIsValid['slot'] = true;
    } else {
      this.dataIsValid['slot'] = false;
    }

    // 'client' tab
    if (this.timeSlot.clientComment &&
      this.timeSlot.clientComment.length >= 3 &&
      this.timeSlot.contractorComment &&
      this.timeSlot.contractorComment.length >= 3) {
      this.dataIsValid['client'] = true;
    } else {
      this.dataIsValid['client'] = false;
    }
  }

}
