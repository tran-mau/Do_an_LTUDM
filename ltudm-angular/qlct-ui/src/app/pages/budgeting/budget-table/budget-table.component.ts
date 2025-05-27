
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-budget-table',
  imports: [FormsModule, CommonModule],
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {
  @ViewChild('editBudgetForm') addBudgetForm!: NgForm;
  amount: number;
  // categoryName: string;
  startDate: Date;
  endDate: Date;
  notice: string;
  // userId : String;
  categories: any[] = [];
  budgetItems: any[] = [];
  selectedTimeFilter: string = 'all';
  filteredBudgetItems: any[] = [];
  customStartDate: string = '';
  customEndDate: string = '';

  @Output() totalsCalculated = new EventEmitter<{ budget: number; spending: number }>();


  constructor(private router: Router, private budgetService: BudgetService) {
    this.amount = 0;
    // this.categoryName = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.notice = '';
    // this.userId = "";
  }

  ngOnInit() {
    const userId = localStorage.getItem('userid') || '';
    console.log("UserID lấy từ localStorage:", userId);

    this.budgetService.getAllBudget(userId).subscribe({
      next: (data) => {
        this.budgetItems = data;

        // Đợi tất cả các phép tính số dư hoàn thành
        const chiPromises = this.budgetItems.map(budget => {
          const categoryName = budget.category.name;
          const startDate = budget.startDate;
          const endDate = budget.endDate;
          console.log('Gọi totalChi với:', { userId, categoryName, startDate, endDate });

          return new Promise<void>((resolve) => {
            this.budgetService.getTotalChi(userId, categoryName, startDate, endDate).subscribe({
              next: (totalChi) => {
                budget.totalChi = totalChi;
                budget.remaining = budget.amount - totalChi;
                console.log("Số dư cho ngân sách:", budget.remaining);
                resolve();
              },
              error: (err) => {
                budget.totalChi = 0;
                budget.remaining = budget.amount;
                resolve();
              }
            });
          });
        });

        Promise.all(chiPromises).then(() => {
          this.applyTimeFilter();
        });
      },
      error: (err) => {
        console.error("Error loading budget items", err);
      }
    });


    this.budgetService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error("Error loading categories", err);
      }
    });
  }

  // Hàm gọi khi chọn filter
  applyTimeFilter() {
    const now = new Date();
    let start: Date, end: Date;

    switch (this.selectedTimeFilter) {
      case 'thisWeek':
        const day = now.getDay();
        const diffToMonday = (day === 0 ? -6 : 1 - day);
        start = new Date(now);
        start.setDate(now.getDate() + diffToMonday);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;

      case 'lastWeek':
        const lastWeekEnd = new Date(now);
        lastWeekEnd.setDate(now.getDate() - (now.getDay() || 7));
        start = new Date(lastWeekEnd);
        start.setDate(lastWeekEnd.getDate() - 6);
        end = lastWeekEnd;
        break;

      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;

      case 'lastMonth':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;

      case 'custom':
        if (!this.customStartDate || !this.customEndDate) {
          this.filteredBudgetItems = [];
          return;
        }
        start = new Date(this.customStartDate);
        end = new Date(this.customEndDate);
        break;

      default:
        this.filteredBudgetItems = this.budgetItems;
        return;
    }

    this.filteredBudgetItems = this.budgetItems.filter(item => {
      const itemStart = new Date(item.startDate);
      const itemEnd = new Date(item.endDate);
      return !(itemEnd < start || itemStart > end);
    });
    // Tính tổng ngân sách và tổng đã chi
    let totalBudget = 0;
    let totalChi = 0;

    this.filteredBudgetItems.forEach(item => {
      totalBudget += item.amount || 0;
      totalChi += item.totalChi || 0;
    });

    this.totalsCalculated.emit({
      budget: totalBudget,
      spending: totalChi
    });


  }


  showModal = false;
  selectedItem: any = null;
  selectedIndex: number | null = null;

  openModal(item: any, index: number) {
    this.selectedItem = { ...item }; // tạo bản sao để chỉnh sửa tạm
    this.selectedIndex = index;
    this.showModal = true;
    console.log('budgetid la : ', this.selectedItem.budgetId);
  }

  saveEdit() {
    const budgetId = this.selectedItem.budgetId;
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error('UserID is null. Cannot update budget.');
      return;
    }
    const categoryName = this.selectedItem.category.name;
    const updatedData = {
      amount: this.selectedItem.amount,
      startDate: this.selectedItem.startDate,
      endDate: this.selectedItem.endDate,
      notice: this.selectedItem.notice,
      categoryName: this.selectedItem.category.name 
    };

    this.budgetService.updateBudget(budgetId, updatedData).subscribe({
      next: () => {
        console.log('Update thành công');
        this.budgetItems[this.selectedIndex!] = { ...updatedData };
        this.closeModal();
      },
      error: (err) => {
        console.error('Lỗi cập nhật:', err);
      }
    });
    this.applyTimeFilter();
  }

  deleteItem() {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa ngân sách này không?');
    if (!confirmDelete) return;

    if (this.selectedItem && this.selectedItem.budgetId) {
      this.budgetService.deleteBudget(this.selectedItem.budgetId).subscribe({
        next: () => {
          if (this.selectedIndex !== null) {
            this.budgetItems.splice(this.selectedIndex, 1);
          }
          this.closeModal();
          console.log('Xóa thành công ngân sách');
        },
        error: (err) => {
          console.error('Lỗi khi xóa ngân sách:', err);
        }
      });
      this.applyTimeFilter(); // Cập nhật lại danh sách sau khi xóa
    }
  }


  closeModal() {
    this.showModal = false;
    this.selectedItem = null;
    this.selectedIndex = null;
  }
}
