import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { IHousing } from '../../../interfaces/IHousing';

@Injectable({
  providedIn: 'root',
})
export class HousingCRUDService {
  private apiUrl = 'http://localhost:8091/api/v1/housing';

  constructor(private httpClient: HttpClient) {}

  createHousing(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpClient.post<any>(this.apiUrl, formData, { headers }).pipe(
      catchError((error) => {
        alert(error);
        return of(null);
      }),
    );
  }

  getHousingList(): Observable<IHousing[]> {
    return this.httpClient.get<IHousing[]>(this.apiUrl);
  }
}
