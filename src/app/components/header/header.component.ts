import { Component } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/authentication/auth.service';
import { EventBusService } from '../../services/shared/event-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
  ) {}
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
