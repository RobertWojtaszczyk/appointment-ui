import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TimeSlot, TimeSlotResolved} from '../model/timeSlot';
import {Observable, of} from 'rxjs';
import {TimeSlotsService} from './time-slots.service';
import isUUID from 'validator/es/lib/isUUID';

import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotResolverService implements Resolve<TimeSlotResolved> {


  constructor(private timeSlotsService: TimeSlotsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TimeSlotResolved> {
    const id = route.paramMap.get('id');

    if (id === null) {
      const message = 'TimeSlot id can not be null!';
      console.error(message);
      return of({timeSlot: null, error: message});
    }

    // console.log('is uuid valid: ' + isUUID(id, 'all'));  // or isUUID(id, 4)
    if (!isUUID(id, 'all') && id !== 'new') {
      const message = 'TimeSlot id is invalid!';
      console.error(message);
      return of({timeSlot: null, error: message});
    }

    // this.timeSlotsService.getTimeSlot(id);  // no need for Observable here -> Resolve handles this by itself

    return this.timeSlotsService.getTimeSlot(id)
      .pipe(
        map(timeSlot => ({timeSlot: timeSlot})),
        catchError(
          error => {
            const message = `Retrieval error: ${error}`;
            console.error(message);
            return of ({timeSlot: null, error: message});
          }
        )
      );
  }

}
