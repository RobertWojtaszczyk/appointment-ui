import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TimeSlotsService} from '../time-slots.service';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-timeslots',
  templateUrl: './time-slot-list.component.html',
  styleUrls: ['./timeslots.component.sass']
})
export class TimeSlotListComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};
  dateParam: string;

  timeSlotsCollectionSize: number;
  pageNumber: number;
  TimeSlotsList: any = [];
  pageSize: number;

  constructor(private timeSlotsService: TimeSlotsService,
              private route: ActivatedRoute,
              private calendar: NgbCalendar,
              private router: Router) { }

  ngOnInit(): void {
    this.dateParam = this.route.snapshot.queryParamMap.get('date') || null;
    this.pageNumber = Number(this.route.snapshot.queryParamMap.get('page')) || 1;
    this.router.navigate([], {
      queryParams: {
        date: null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
    /*this.route.paramMap.subscribe(
      params => {
        this.pageNumber = +params.get('page') || 1;
        console.log('Reloading for page: ' + this.pageNumber);
        this.dateParam = params.get('date') || null;
        this.loadTimeSlots(this.pageNumber);
      }
    );*/
    console.log('ngOnInit:pageNumber: ' + this.pageNumber);
    if (this.dateParam) {
      this.stringToDateModel(this.dateParam);
    } else {
      this.selectToday();
    }
    this.loadTimeSlots(this.pageNumber);
    console.log('ngOnInit: timeSlotsCollectionSize: ' + this.timeSlotsCollectionSize);
  }


  selectToday() {
    this.model = this.calendar.getToday();
  }

  onDateSelect(date: NgbDate) {
    console.log('Date change on calendar! Reloading Timeslots: ' + date);
    this.loadTimeSlots(1);
  }

  // TimeSlots list
  loadTimeSlots(page: number) {
    console.log('loadTimeSlots:pageNumber:beforeRefresh: ' + this.pageNumber);
    this.pageNumber = page;
    console.log('Date: ' + this.dateModelToString());
    return this.timeSlotsService.getTimeSlots(this.dateModelToString(), '' + --page).subscribe((data: {}) => {
      this.TimeSlotsList = data['content'];
      this.timeSlotsCollectionSize = Number(data['totalElements']);
      //this.pageNumber = Number(data['number']);
      //this.pageNumber++;
      this.pageSize = Number(data['size']);
      console.log('loadTimeSlots:collectionSize: ' + this.timeSlotsCollectionSize);
      console.log('loadTimeSlots:pageNumber:afterRefresh: ' + this.pageNumber);
      console.log('loadTimeSlots:pageSize: ' + this.pageSize);
      // console.log('this.timeSlotsCollectionSize: ' + this.timeSlotsCollectionSize);
      // console.log('this.pageNumber: ' + this.pageNumber);
    });
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    console.log('Detected change on calendar! Reloading Timeslots');
    this.loadTimeSlots(this.pageNumber);
  }*/

  dateModelToString(): string {
    return `${this.model.year}-${this.model.month}-${this.model.day}`;
  }

  stringToDateModel(date: string): void {
    // TODO check for string is null and validation on numbers...
    const splittedDate = date.split('-', 3);
    this.model = { year: +splittedDate[0], month: +splittedDate[1], day: +splittedDate[2] };
  }
}
