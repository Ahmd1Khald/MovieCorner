// src/app/pages/register/register.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [FormsModule, CommonModule]
})
export class Register {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(() => {
        this.message = 'Registered successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      })
      .catch(err => this.message = 'Error: ' + err.message);
  }
}
