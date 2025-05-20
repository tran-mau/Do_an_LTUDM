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
import { FormsModule , NgForm } from '@angular/forms';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-budget-form',
  imports: [FormsModule , CommonModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css'
})
export class BudgetFormComponent {
  @ViewChild('addBudgetForm') addBudgetForm!: NgForm;
  amount: number;
  category: string;
  startdate: Date;
  enddate: Date;
  notice: string;
  constructor(private http: HttpClient, private router: Router) {
    this.amount = 0;
    this.category = '';
    this.startdate = new Date();
    this.enddate = new Date();
    this.notice = '';

  }
  onAmountChange() {
    console.log('Amount changed:', this.amount);  
  }
  onCategoryChange() {
    console.log('Catagory changed:', this.category);  
  }
  onNoticeChange() {
    console.log('Notice changed:', this.notice);  
  }
  onStartDateChange() {
    console.log('Start date changed:', this.startdate);  
  }
  onEndDateChange() {
    console.log('End date changed:', this.enddate);  
  }
  onCreateBudget(){
    const message = `Budget created with amount: ${this.amount}, category: ${this.category}, start date: ${this.startdate} , end date : ${this.enddate}, notice: ${this.notice}`;
    alert(message);
  }
}
