import { Component } from '@angular/core';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
// import { TopbarComponent } from './topbar/topbar.component';
// import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-income-outcome',
  imports: [TransactionFormComponent],
  templateUrl: './income-outcome.component.html',
  styleUrl: './income-outcome.component.css'
})
export class IncomeOutcomeComponent {

}
