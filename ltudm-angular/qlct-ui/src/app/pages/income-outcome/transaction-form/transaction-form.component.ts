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
  dateTime: string;
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
          this.router.navigate(['/income-outcome']);
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

  checkBudgetBeforeAdd() {
    // if (!this.addTransactionForm.valid || !this.userId || !this.categoryName || !this.type) {
    //   alert('Vui lòng điền đầy đủ thông tin giao dịch.');
    //   return;
    // }

    if (this.type !== 'chi') {
      // Nếu không phải giao dịch chi, thêm ngay mà không kiểm tra ngân sách
      this.addTransaction();
      return;
    }

    const date = new Date(this.dateTime);
    const checkDate = date.toISOString().slice(0, 10); // yyyy-MM-dd
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString();

    // Lấy ngân sách cho danh mục và ngày cụ thể
    this.transactionService.getBudgetAmount(this.userId, this.categoryName, checkDate).subscribe({
      next: (budget: number) => {
        if (!budget || budget <= 0) {
          alert('Không tìm thấy ngân sách cho danh mục này hoặc ngân sách bằng 0.');
          return;
        }

        // Lấy tổng chi trong khoảng thời gian
        const request = { userId: this.userId, categoryName: this.categoryName, startDate, endDate };
        this.transactionService.getTotalChi(request).subscribe({
          next: (totalChi: number) => {
            const totalAfter = Number(totalChi || 0) + Number(this.amount);
            if (totalAfter > budget) {
              const confirmAdd = confirm(
                `⚠️ Giao dịch này sẽ vượt ngân sách!\n` +
                `- Ngân sách: ${budget.toLocaleString()} VND\n` +
                `- Tổng chi hiện tại: ${totalChi.toLocaleString()} VND\n` +
                `- Số tiền giao dịch mới: ${this.amount.toLocaleString()} VND\n` +
                `- Tổng chi sau khi thêm: ${totalAfter.toLocaleString()} VND\n` +
                `Bạn có muốn tiếp tục thêm giao dịch không?`
              );
              if (confirmAdd) {
                this.addTransaction();
              }
            } else {
              this.addTransaction();
            }
          },
          error: (err) => {
            console.error('Error fetching total chi:', err);
            alert('Lỗi khi kiểm tra tổng chi: ' + (err.error?.message || 'Vui lòng thử lại.'));
          }
        });
      },
      error: (err) => {
        console.error('Error fetching budget amount:', err);
        alert('Lỗi khi kiểm tra ngân sách: ' + (err.error?.message || 'Vui lòng thử lại.'));
      }
    });
  }

  checkBudgetBeforeAdd1() {
  if (this.type !== 'chi') {
    // Nếu không phải giao dịch chi, thêm luôn
    this.addTransaction();
    return;
  }

  const userId = localStorage.getItem('userid')!;
  const categoryName = this.categoryName;
  const amount = this.amount;

  const date = new Date(this.dateTime);
  const dateStr = date.toISOString().slice(0, 10); // yyyy-MM-dd

  // Gọi API lấy ngân sách cho ngày cụ thể
  this.transactionService.getBudgetAmount(userId, categoryName, dateStr).subscribe({
    next: (budget: number) => {
      if (!budget || budget <= 0) {
        this.addTransaction();
        return;
      }

      // Gọi API lấy tổng chi trong tháng chứa ngày đó
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString();

      const request = { userId, categoryName, startDate, endDate };
      this.transactionService.getTotalChi(request).subscribe({
        next: (totalChi: number) => {
          const totalAfter = Number(totalChi || 0) + Number(amount);
          if (totalAfter > budget) {
            const confirmAdd = confirm(
              `⚠️ Giao dịch này sẽ vượt ngân sách!\n\n` +
              `- Ngân sách: ${budget.toLocaleString()} VND\n` +
              `- Đã chi: ${totalChi.toLocaleString()} VND\n` +
              `- Giao dịch mới: ${amount.toLocaleString()} VND\n` +
              `- Tổng sau khi thêm: ${totalAfter.toLocaleString()} VND\n\n` +
              `Bạn vẫn muốn thêm giao dịch?`
            );
            if (confirmAdd) {
              this.addTransaction();
            }
          } else {
            this.addTransaction();
          }
        },
        error: (err) => {
          console.error('Lỗi khi lấy tổng chi:', err);
          alert('Không thể kiểm tra tổng chi. Vui lòng thử lại.');
        }
      });
    },
    error: (err) => {
      console.error('Lỗi khi lấy ngân sách:', err);
      alert('Không thể kiểm tra ngân sách. Vui lòng thử lại.');
    }
  });
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
