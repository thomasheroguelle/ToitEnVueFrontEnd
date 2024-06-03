import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRegistration } from '../../../interfaces/IUserRegistration';
import { IUserLogin } from '../../../interfaces/IUserLogin';
import { ILogoutResponse } from '../../../interfaces/ILogoutResponse';

const AUTH_API = 'http://localhost:8091/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};
console.log(httpOptions, 'httpOptions');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<IUserRegistration> {
    return this.http.post<IUserRegistration>(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions,
    );
  }

  login(username: string, password: string): Observable<IUserLogin> {
    return this.http.post<IUserLogin>(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions,
    );
  }

  logout(): Observable<ILogoutResponse> {
    return this.http.post<ILogoutResponse>(
      AUTH_API + 'signout', {}, httpOptions);
  }
}
