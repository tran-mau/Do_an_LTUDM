
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
  userId : String;
  categories:any[] = [];
  
  constructor( private router: Router , private budgetService : BudgetService) {
    this.amount = 0;
    this.categoryName = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.notice = '';
    this.userId = ""; // Assuming a default user ID for demonstration
  }

  addBudget() {
    const budgetData = {
      "amount": this.amount,
      "categoryName": this.categoryName,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "notice": this.notice,
      "userId":localStorage.getItem('userid')
    }
    this.budgetService.addBudget(budgetData).subscribe({
        next: (response : any) => {
          console.log('Budget created successfully:', response);
          alert('Budget created successfully');
          this.router.navigate(['/budgeting']);
        },
        complete: () => {
          console.log('Request completed');
        },
        error: (error : any) => {
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
  }
}
