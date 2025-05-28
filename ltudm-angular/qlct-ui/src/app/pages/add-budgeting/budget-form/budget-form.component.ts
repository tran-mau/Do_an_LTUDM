
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';


@Component({
  selector: 'app-budget-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css'
})
export class BudgetFormComponent {
  @ViewChild('addBudgetForm') addBudgetForm!: NgForm;
  amount: number;
  categoryName: string;
  startDate: Date;
  endDate: Date;
  notice: string;
  userId: String;
  categories: any[] = [];
  budgetItems: any[] = [];

  constructor(private router: Router, private budgetService: BudgetService) {
    this.amount = 0;
    this.categoryName = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.notice = '';
    this.userId = ""; // Assuming a default user ID for demonstration
  }
  // 👉 Hàm kiểm tra trùng danh mục và thời gian
  isOverlapping(categoryName: string, newStart: any, newEnd: any): boolean {
  const start = new Date(newStart);
  const end = new Date(newEnd);

  return this.budgetItems.some(item => {
    const sameCategory = item.category.name === categoryName;
    const itemStart = new Date(item.startDate);
    const itemEnd = new Date(item.endDate);

    const newStartTime = start.getTime();
    const newEndTime = end.getTime();
    const itemStartTime = itemStart.getTime();
    const itemEndTime = itemEnd.getTime();

    const timeOverlap = !(newEndTime < itemStartTime || newStartTime > itemEndTime);

    return sameCategory && timeOverlap;
  });
}



  addBudget() {

    if (this.isOverlapping(this.categoryName, this.startDate, this.endDate)) {
      alert('❌ Danh mục này đã có ngân sách trong khoảng thời gian trùng!');
      return;
    }

    const budgetData = {
      "amount": this.amount,
      "categoryName": this.categoryName,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "notice": this.notice,
      "userId": localStorage.getItem('userid')
    }
    this.budgetService.addBudget(budgetData).subscribe({
      next: (response: any) => {
        console.log('Budget created successfully:', response);
        alert('Budget created successfully');
        this.router.navigate(['/budget']);
      },
      complete: () => {
        console.log('Request completed');
      },
      error: (error: any) => {
        console.error('Error creating budget:', error);
        alert('Error creating budget');
      }
    })
  }
  ngOnInit() {
    this.budgetService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error("Error loading categories", err);
      }
    });
    this.budgetService.getAllBudget(localStorage.getItem('userid')).subscribe({
      next: (data) => {
        this.budgetItems = data;
      },
      error: (err) => {
        console.error("Error loading budgets", err);
      }
    });
  }

}
