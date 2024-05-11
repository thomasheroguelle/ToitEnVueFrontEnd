import { Component } from '@angular/core';
import { IUserLogin } from '../../../IUserLogin';
import { AuthService } from '../../services/authentication/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  isLoggedIn = false;
  getUser!: string;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
  ) {}

  form: IUserLogin = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.getUser = this.storageService.getUser();
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.isLoggedIn = true;
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.getUser = this.storageService.getUser();
        this.router.navigate(['housings']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
