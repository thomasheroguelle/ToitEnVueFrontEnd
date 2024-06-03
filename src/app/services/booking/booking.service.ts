import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { OwnerChoice } from '../../../interfaces/IValidatedBooking';
import { UserBookings } from '../../../interfaces/IUserBooking';
import { IBookingDetails } from '../../../interfaces/IBookingDetails';
import { IMakeBooking } from '../../../interfaces/IMakeBooking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8091/api/v1/booking';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  makeBooking(
    housingId: number,
    beginningDate: Date,
    endDate: Date,
  ): Observable<IMakeBooking> {
    const url = `${this.apiUrl}?&housingId=${housingId}&beginningDate=${beginningDate}&endDate=${endDate}`;
    return this.http.post<IMakeBooking>(url, {}).pipe(catchError(this.handleError));
  }

  getBookingsByHousingId(housingId: number): Observable<IBookingDetails[]> {
    const url = `${this.apiUrl}/details/${housingId}`;
    return this.http.get<IBookingDetails[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  
  

  ownerChoice(ownerChoice: OwnerChoice) {
    const url = `${this.apiUrl}/owner-choice`;
    return this.http
      .patch(url, ownerChoice, {})
      .pipe(catchError(this.handleError));
  }

  getAllBookingsFromUser(): Observable<UserBookings[]> {
    const url = `${this.apiUrl}/user-bookings`;
    return this.http
      .get<UserBookings[]>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      alert('Vous devez être connecté pour réserver une location');
    } else {
      let errorMessage = 'Mince, il semble y avoir une erreur';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = error.error;
      }
      alert(errorMessage);
      console.error(errorMessage);
    }
    return throwError('Quelque chose a mal tourné');
  }
}
