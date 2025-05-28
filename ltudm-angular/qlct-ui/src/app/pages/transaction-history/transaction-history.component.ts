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
  clickUpdateTransactionId: number | null = null;

  selectedPeriod: string = 'all'; // Mặc định là 'all', có thể là 'week', 'month', 'year'

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

  onPeriodChange(): void {
    console.log('Period changed to:', this.selectedPeriod);
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;

    // Kiểm tra period được chọn và gọi API tương ứng
    if (this.selectedPeriod === 'all') {
      // Gọi API để lấy tất cả giao dịch
      this.transactionService.getAllTransactions().subscribe({
        next: (data) => {
          this.transactions = data;
          this.loading = false;
          console.log('All transactions:', this.transactions);
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Error fetching all transactions';
          console.error('Error fetching all transactions:', error);
        }
      });
    } else {
      // Gọi API với filter theo thời gian
      const { value, unit } = this.getPeriodParams(this.selectedPeriod);
      this.transactionService.showTransactionHistory(value, unit).subscribe({
        next: (data) => {
          this.transactions = data;
          this.loading = false;
          console.log('Filtered transactions:', this.transactions);
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Error fetching transaction history';
          console.error('Error fetching transaction history:', error);
        }
      });
    }
  }

  // Phương thức để convert period thành value và unit
  getPeriodParams(period: string): { value: number, unit: string } {
    switch (period) {
      case 'week':
        return { value: 7, unit: 'DAYS' };
      case 'month':
        return { value: 1, unit: 'MONTHS' };
      case 'year':
        return { value: 1, unit: 'YEARS' };
      default:
        return { value: 1, unit: 'DAYS' };
    }
  }
  // loadTransactions(): void {
  //   this.loading = true;
  //   this.transactionService.showTransactionHistory().subscribe({
  //     next: (data) => {
  //       this.transactions = data;
  //       this.loading = false;
  //       console.log('Transaction history:', this.transactions);
  //     },
  //     error: (error) => {
  //       this.loading = false;
  //       this.error = 'Error fetching transaction history';
  //       console.error('Error fetching transaction history:', error);
  //     }
  //   });
  // }

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
    if (this.clickUpdateTransactionId !== null) {
      console.log('=== COMPONENT UPDATE ===');
      console.log('Transaction ID:', this.clickUpdateTransactionId);
      console.log('Update Data:', this.updateTransactionData);

      this.transactionService.updateTransaction(
        this.clickUpdateTransactionId,
        this.updateTransactionData
      ).subscribe({
        next: (response) => {
          console.log('Transaction updated successfully', response);
          this.loadTransactions();
          this.cancelUpdateTransaction();
        },
        error: (error) => {
          console.error('Error updating transaction:', error);
          this.error = error.message;
        }
      });
    } else {
      console.error('No transaction ID selected for update');
    }
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

  activeFilter: string = 'all'; // Mặc định hiển thị tất cả


}