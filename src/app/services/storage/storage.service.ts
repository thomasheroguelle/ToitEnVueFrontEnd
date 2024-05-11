import { Injectable } from '@angular/core';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private ownerUsernameKey = 'ownerUsername';

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  clean(): void {
    window.sessionStorage.clear();
  }

  setOwnerUsername(username: string): void {
    localStorage.setItem(this.ownerUsernameKey, username);
  }

  getOwnerUsername(): string | null {
    return localStorage.getItem(this.ownerUsernameKey);
  }
}
