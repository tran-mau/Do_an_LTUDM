import { Component } from '@angular/core';
import { VerificationComponent } from "./verification/verification.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [VerificationComponent, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  showVerification: boolean = false;

  constructor(private router: Router) {}
  
  onSubmit() {
    // Show verification component after form submission
    this.showVerification = true;
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