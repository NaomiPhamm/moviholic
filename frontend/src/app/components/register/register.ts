import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username = '';
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.successMessage = 'Register successful';
        this.errorMessage = '';

        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Register failed';
        this.successMessage = '';
      }
    });
  }
}