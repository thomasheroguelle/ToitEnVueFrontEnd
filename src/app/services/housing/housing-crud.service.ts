import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IHousing } from '../../../interfaces/IHousing';

@Injectable({
  providedIn: 'root',
})
export class HousingCRUDService {
  private apiUrl = 'http://localhost:8091/api/v1/housing';

  constructor(private httpClient: HttpClient) {}

  createHousing(createHousingData: IHousing): Observable<IHousing> {
    return this.httpClient
      .post<IHousing>(this.apiUrl, createHousingData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while processing your request.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error ? error.error : errorMessage;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
