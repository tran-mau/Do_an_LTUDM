import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent {
  
  verificationCode: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  
  @Output() closeVerification = new EventEmitter<void>();
  
  constructor(
    private authService: AuthService, 
    private router: Router 
  ) { }
  onSubmit() {
    const username = localStorage.getItem('username');
    if (!username) {
      this.errorMessage = 'Username not found';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    
    // Make sure to send both the username and confirmation code
    const verificationData = {
      username: username,
      confirmationCode: this.verificationCode
    };
    
    console.log('Sending verification data:', verificationData);
    
    this.authService.verify(verificationData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Verification successful', response);
        localStorage.setItem('auth_token', response.token); // Store token if returned
        this.router.navigate(['/dashboard']); 
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Verification failed. Please check your code.';
        console.error('Verification error', error);
      }
    });
  }
  
  onResend() {
    this.isLoading = true;
    this.errorMessage = '';
    const username = localStorage.getItem('username');
    if (!username) {
      this.errorMessage = 'Username not found';
      return;
    }
    console.log('Resending verification code for username:', username);
    this.authService.resendVerificationEmail(username).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Verification code resent', response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to resend verification code.';
        console.error('Resend error', error);
      }
    });
  }
  
  close() {
    this.closeVerification.emit();
  }
}