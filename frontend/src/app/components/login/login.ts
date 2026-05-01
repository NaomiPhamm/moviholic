import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
  const loginData = {
    email: this.email,
    password: this.password
  };

  this.authService.login(loginData).subscribe({
    next: (res) => {
      this.authService.saveToken(res.token);

      this.successMessage = 'Login successful';
      this.errorMessage = '';

      this.router.navigate(['/movies']);
    },
    error: (err) => {
      this.errorMessage = err.error.message || 'Login failed';
      this.successMessage = '';
    }
  });
}
}