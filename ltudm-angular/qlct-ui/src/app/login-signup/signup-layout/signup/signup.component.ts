import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userData = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.isLoading = false;
      return;
    }
    this.authService.signup(this.userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Signup successful', response); 
        localStorage.setItem('username', this.userData.username); // Store token if returned
        this.router.navigate(['/signup/verification']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Signup failed. Please check your credentials.';
        console.error('Signup error', error);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onShowPassword(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const rePassword = document.getElementById('confirmPassword') as HTMLInputElement;

    if (isChecked) {
      passwordField.type = 'text';
      rePassword.type = 'text';
    } else {
      passwordField.type = 'password';
      rePassword.type = 'password';
    }
  }
}