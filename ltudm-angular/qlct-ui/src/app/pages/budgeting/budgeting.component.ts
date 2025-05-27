// import { Component } from '@angular/core';
// import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
// import { BudgetTableComponent } from './budget-table/budget-table.component';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-budgeting',
//   imports: [BudgetSummaryComponent, BudgetTableComponent, CommonModule],
//   templateUrl: './budgeting.component.html',
//   styleUrl: './budgeting.component.css'
// })
// export class BudgetingComponent {
  
//   selectedButton: HTMLElement | null;
//   budget: string | undefined;

//   constructor() {
//     this.selectedButton = document.querySelector('.add-budget-btn');

//     if (this.selectedButton) {
//       this.selectedButton.addEventListener('click', () => {
//          if (this.budget = 'add-budget') {
          
//          }
//       });
//     }
//   }
// }

import { Component, Input } from '@angular/core';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-budgeting',
  imports: [BudgetSummaryComponent, BudgetTableComponent, CommonModule , ReactiveFormsModule],
  templateUrl: './budgeting.component.html',
  styleUrl: './budgeting.component.css'
})
export class BudgetingComponent {
  constructor(private router:Router) {}
  onNavigatethemNS(){
    this.router.navigate(['/add-budget']);
  }
  totalBudget: number = 0;
  totalSpending: number = 0;
  onTotalsCalculated(totals: { budget: number; spending: number }) {
    this.totalBudget = totals.budget;
    this.totalSpending = totals.spending;
  }
}
