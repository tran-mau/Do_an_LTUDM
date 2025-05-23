// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-budget-form',
//   imports: [],
//   templateUrl: './budget-form.component.html',
//   styleUrl: './budget-form.component.css'
// })
// export class BudgetFormComponent {

// }



import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


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
  userId: number;
  constructor(private http: HttpClient, private router: Router) {
    this.amount = 0;
    this.categoryName = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.notice = '';
    this.userId = 1; // Assuming a default user ID for demonstration
  }
  addBudget() {
    const message = `amount: ${this.amount}` +
                    `categoryName: ${this.categoryName}` +
                    `startDate: ${this.startDate}` +
                    `endDate: ${this.endDate}` +
                    `notice: ${this.notice}`+
                    `userId: ${this.userId}`;
    const apiUrl = "http://localhost:8080/api/budgets/create";
    const budgetData = {
      "amount": this.amount,
      "categoryName": this.categoryName,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "notice": this.notice,
      "userId":1
    }
    
    console.log('Sending budget data:', budgetData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(apiUrl, budgetData, { headers })
      .subscribe({
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
      });
  }

}
