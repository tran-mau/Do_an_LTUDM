import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent implements OnInit {

  transactions: any[] = [];
  categories: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  clickedRemoveTransactionId: number | null = null;
  clickUpdateTransactionId: string | null = null;

  updateTransactionData: any = {
    amount: null,
    transaction_date: null,
    category_name: '',
    transaction_type: '',
    note: null
  };

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories(); // Load categories when component initializes
  }

  loadTransactions(): void {
    this.loading = true;
    this.transactionService.showTransactionHistory().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
        console.log('Transaction history:', this.transactions);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error fetching transaction history';
        console.error('Error fetching transaction history:', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.showCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  deleteTransaction(transactionId: string): void {
    this.transactionService.deleteTransaction(transactionId).subscribe({
      next: () => {
        this.loadTransactions();
        this.clickedRemoveTransactionId = null;
      },
      error: (error) => {
        console.error('Error deleting transaction:', error);
      }
    });
  }

  openEditModal(transaction: any): void {
    // Clone the transaction data to avoid modifying the original directly
    this.updateTransactionData = {
      amount: transaction.amount,
      transaction_date: this.formatDateForInput(transaction.transaction_date),
      category_name: transaction.category_name,
      transaction_type: transaction.transaction_type,
      note: transaction.note || ''
    };
    
    this.clickUpdateTransactionId = transaction.transaction_id.toString();
  }

  // Helper method to format date for datetime-local input
  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    // Format to YYYY-MM-DDThh:mm
    return date.toISOString().slice(0, 16);
  }

  updateTransaction(): void {
    if (!this.clickUpdateTransactionId) return;
    
    this.transactionService.updateTransaction(this.clickUpdateTransactionId, this.updateTransactionData).subscribe({
      next: () => {
        this.loadTransactions();
        this.cancelUpdateTransaction();
      },
      error: (error) => {
        console.error('Error updating transaction:', error);
      }
    });
  }

  cancelUpdateTransaction(): void {
    this.clickUpdateTransactionId = null;
    this.updateTransactionData = {
      amount: null,
      transaction_date: null,
      category_name: '',
      transaction_type: '',
      note: null
    };
  }

  confirmClick(transactionId: number): void {
    this.clickedRemoveTransactionId = transactionId;
  }

  cancelDeleteTransaction(): void {
    this.clickedRemoveTransactionId = null;
  }
}