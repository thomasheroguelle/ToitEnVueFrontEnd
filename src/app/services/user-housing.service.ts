import { Injectable } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { HousingOwner } from '../../HousingOwner';
import { Observable } from 'rxjs';

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

  getHousingByUserId(userId: number): Observable<HousingOwner[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.httpClient.get<HousingOwner[]>(url);
  }
}
