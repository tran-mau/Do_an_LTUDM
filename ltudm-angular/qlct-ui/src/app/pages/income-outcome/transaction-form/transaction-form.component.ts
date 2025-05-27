import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';

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
  }

  @ViewChild('addTransactionForm') addTransactionForm!: NgForm;
  amount: number;
  categoryName: string;
  dateTime: String;
  notice: string;
  userId: string;
  moneySourceName: string;
  type: string;
  moneySources: any[] = [];
  categories: any[] = [];
  constructor(private router: Router, private transactionService: TransactionService) {
    this.amount = 0;
    this.categoryName = '';
    this.dateTime = '';
    this.notice = '';
    this.userId = ''; // Assuming a default user ID for demonstration
    this.moneySourceName = '';
    this.type = '';

  }
  addTransaction() {
    const transactionData = {
      "amount": this.amount,
      "categoryName": this.categoryName,
      "dateTime": this.dateTime,
      "notice": this.notice,
      "userId": localStorage.getItem('userid'),
      "moneySourceName": this.moneySourceName,
      "type": this.type
    }
    this.transactionService.addTransaction(transactionData).subscribe(
      {
        next: (response: any) => {
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
    )
  }
  ngOnInit() {
    this.transactionService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error("Error loading categories", err);
      }
    });
    this.transactionService.getAllMoneySource().subscribe({
      next: (data) => {
        this.moneySources = data;
      },
      error: (err) => {
        console.error("Error loading categories", err);
      }
    })
  }
}
