import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TimeSlotEditComponent} from './time-slot-edit.component';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotEditGuard implements CanDeactivate<TimeSlotEditComponent> {
  canDeactivate(
    component: TimeSlotEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.isDirty) {
      const timeSlotStartDate = component.timeSlot.timeSlotStart || 'New TimeSlot';
      return confirm(`Navigate away and lose all changes to ${timeSlotStartDate}?`);
    }
    return true;
  }

}
