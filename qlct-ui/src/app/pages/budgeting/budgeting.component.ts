import { Component } from '@angular/core';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-budgeting',
  imports: [BudgetSummaryComponent, BudgetTableComponent,TopbarComponent,SidebarComponent],
  templateUrl: './budgeting.component.html',
  styleUrl: './budgeting.component.css'
})
export class BudgetingComponent {

}
