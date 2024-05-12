import { Component } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
  ) {}

  userName = this.storageService.getUser();
  
  ngOnInit() {
    if (!this.isLoggedIn()) {
      alert('Veuillez vous connecter pour accéder au formulaire');
      this.router.navigate(['/login']);
    } else {
      return this.userName;
    }
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
