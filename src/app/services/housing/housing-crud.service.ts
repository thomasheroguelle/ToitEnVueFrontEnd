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

  createHousing(formData: FormData): Observable<IHousing> {
    const headers = new HttpHeaders();
    return this.httpClient.post<IHousing>(this.apiUrl, formData, { headers }).pipe(
      catchError((error) => {
        alert(`Sniff, une erreur s'est produite : ${error.message}`);
        return throwError(error);
      }),
    );
  }

  getHousingList(): Observable<IHousing[]> {
    return this.httpClient.get<IHousing[]>(this.apiUrl);
  }

  getHousingById(id: number): Observable<IHousing> {
    return this.httpClient.get<IHousing>(`${this.apiUrl}/${id}`);
  }

  deleteHousing(id: number): Observable<IHousing> {
    return this.httpClient.delete<IHousing>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  newHousingId!: number;
  setNewHousingId(id: number) {
    this.newHousingId = id;
  }
}

//         return of({ success: false, message: 'La requête a échouée' });   Retourne un objet par défaut en cas d'erreur
