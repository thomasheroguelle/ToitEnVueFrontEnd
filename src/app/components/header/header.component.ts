import { Component } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        this.router.navigate(['housings']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
