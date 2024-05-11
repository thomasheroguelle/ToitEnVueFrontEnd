import { Component } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { IUser } from '../../../IUser';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css',
})
export class RegistrationPageComponent {
  form: IUser = {
    username: '',
    email: '',
    password: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  getUser!: string;
  username?: string;

  constructor(
    private authService: AuthService,
    private route: Router,
    private storageService: StorageService,
  ) {}

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.storageService.saveUser(data);
        this.route.navigate(['housings']);
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
