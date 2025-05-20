import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
  selectedType: string | null = null;

  selectType(type: string) {
    this.selectedType = type;
    this.type = type;
    // alert(`Selected type: ${type}`);
  }

  @ViewChild('addTransactionForm') addTransactionForm!: NgForm;
  amount: number;
  categoryName: string;
  dateTime: String;
  notice: string;
  userId: number;
  moneySourceName: string;
  type: string;
  constructor(private http: HttpClient, private router: Router) {
    this.amount = 0;
    this.categoryName = '';
    this.dateTime = '';
    this.notice = '';
    this.userId = 1; // Assuming a default user ID for demonstration
    this.moneySourceName = '';
    this.type = '';
  }
  addTransaction() {
    const message = `amount: ${this.amount}` +
                    `categoryName: ${this.categoryName}` +
                    `dateTime: ${this.dateTime}` +
                    `notice: ${this.notice}`+
                    `userId: ${this.userId}`+
                    `moneySourceName: ${this.moneySourceName}`+
                    `type: ${this.type}`;
    const apiUrl = "http://localhost:8080/api/transactions/create";
    const transactionData = {
      "amount": this.amount,
      "categoryName": this.categoryName,
      "dateTime": this.dateTime,
      "notice": this.notice,
      "userId":1,
      "moneySourceName": this.moneySourceName,
      "type": this.type
    }
    console.log(transactionData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(apiUrl, transactionData, { headers })
      .subscribe({
        next: (response:any) => {
          console.log('Transaction added successfully:', response);
          alert('Transaction added successfully');
          this.router.navigate(['/transactions']);
        },
        complete: () => {
          console.log('Transaction addition completed');
        },
        error: (error: any) => {
          console.error('Error adding transaction:', error);
          alert('Error adding transaction');
        }
      }
      );
  }
}
