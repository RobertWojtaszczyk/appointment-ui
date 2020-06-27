import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {TimeSlot} from '../model/timeSlot';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {NewTimeSlot} from '../model/newTimeSlot';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotsService {

  // Base url
  baseUrl = 'http://localhost:9091/api';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // GET
  getTimeSlots(date: string, page: string): Observable<TimeSlot[]> {
    const httpParams = new HttpParams()
      .set('date', date).set('page', page);
    console.log('Looking for timeslots for date: ', date);

    return this.http.get<TimeSlot[]>(this.baseUrl + '/timeSlots', {params: httpParams})
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getTimeSlot(id: string): Observable<TimeSlot> {
    if (id === 'new') {
      return of(this.initializeTimeSlot());
    }

    const url = `${this.baseUrl}/timeSlots/${id}`;
    return this.http.get<TimeSlot>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getTimeSlotsByDate(date: string): Observable<TimeSlot> {
    const url = `${this.baseUrl}/timeSlots/date/${date}`;
    return this.http.get<TimeSlot>(url)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  createTimeSlot(timeSlot: NewTimeSlot): Observable<TimeSlot> {
    console.log(timeSlot);
    return this.http.post<TimeSlot>(this.baseUrl + '/timeSlots', timeSlot, this.httpOptions)
      .pipe(
        tap(data => console.log('createTimeSlot: ' + JSON.stringify(data))),
        catchError(this.errorHandler)
      );
  }

  updateTimeSlot(timeSlot: TimeSlot): Observable<TimeSlot> {
    const url = `${this.baseUrl}/timeSlots/${timeSlot.id}`;
    console.log('Updating time slot: ', timeSlot);
    return this.http.patch<TimeSlot>(url, timeSlot, this.httpOptions)
      .pipe(
        map( () => timeSlot),
        catchError(this.errorHandler)
      );
  }

  deleteTimeSlot(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/timeSlots/${id}`;
    return this.http.delete<TimeSlot>(url, { headers })
      .pipe(
        tap(data => console.log('delete TimeSlot: ' + id)),
        catchError(this.errorHandler)
      );
  }

  private initializeTimeSlot(): TimeSlot {
    // Return an initialized object
    return {
      id: 'new',
      timeSlotStart: '2020-06-30T10:00',
      timeSlotEnd: '2020-06-30T12:00',
      timeSlotStatus: 'ACTIVE',
      contractor: null,
      client: null,
      address: null,
      contractorComment: null,
      clientComment: null,
      createdDate: null,
      modifiedDate: null
    };
  }

}
