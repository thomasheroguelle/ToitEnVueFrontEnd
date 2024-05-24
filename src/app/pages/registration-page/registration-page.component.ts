import { Component } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { IUserRegistration } from '../../../interfaces/IUserRegistration';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css',
})
export class RegistrationPageComponent {
  form: IUserRegistration = {
    username: '',
    email: '',
    password: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  username?: string;

  constructor(
    private authService: AuthService,
    private route: Router,
  ) {}

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        alert(
          'Inscription réalisée avec succès ! Veuillez à présent vous connecter.',
        );
        this.route.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.isSuccessful = false;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
