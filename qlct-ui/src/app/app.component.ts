import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetingComponent } from './pages/budgeting/budgeting.component';
import { AddBudgetingComponent } from './pages/add-budgeting/add-budgeting.component';
import { IncomeOutcomeComponent } from './pages/income-outcome/income-outcome.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetingComponent,AddBudgetingComponent,IncomeOutcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qlct-ui';
}
