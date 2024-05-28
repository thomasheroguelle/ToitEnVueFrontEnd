import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHousing } from '../../../interfaces/IHousing';

@Injectable({
  providedIn: 'root',
})
export class UserHousingService {
  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient,
  ) {}
  userId = this.storageService.getUser().id;

  private apiUrl = `http://localhost:8091/api/v1/housing/users`;

  getHousingByUserId(userId: number): Observable<IHousing[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.httpClient.get<IHousing[]>(url);
  }
}
