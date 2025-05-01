import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent {
  @Output() closeVerification = new EventEmitter<void>();

  onSubmit() {
    // Handle the verification logic here
    alert('Verification successful!');
  }
  
  onResend() {
    // Handle the resend verification logic here
    alert('Verification code resent successfully!');
  }
  
  close() {
    this.closeVerification.emit();
  }
}