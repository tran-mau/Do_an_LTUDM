import { Component } from '@angular/core';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgeting',
  imports: [BudgetSummaryComponent, BudgetTableComponent, CommonModule],
  templateUrl: './budgeting.component.html',
  styleUrl: './budgeting.component.css'
})
export class BudgetingComponent {
  
  selectedButton: HTMLElement | null;
  budget: string | undefined;

  constructor() {
    this.selectedButton = document.querySelector('.add-budget-btn');

    if (this.selectedButton) {
      this.selectedButton.addEventListener('click', () => {
         if (this.budget = 'add-budget') {
          
         }
      });
    }
  }
}
