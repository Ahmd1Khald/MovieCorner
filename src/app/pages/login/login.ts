// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.message = 'Login successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/']), 2000);
      })
      .catch(err => this.message = 'Error: ' + err.message);
  }
}
