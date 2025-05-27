import { Component , Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-budget-summary',
  imports: [CommonModule],
  templateUrl: './budget-summary.component.html',
  styleUrl: './budget-summary.component.css'
})
export class BudgetSummaryComponent {
  @Input() totalBudget: number = 0;
  @Input() totalSpending: number = 0;

  get daysUntilEndOfMonth(): number {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
