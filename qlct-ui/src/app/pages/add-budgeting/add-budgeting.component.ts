import { Component } from '@angular/core';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-add-budgeting',
  imports: [TopbarComponent,SidebarComponent,BudgetFormComponent],
  templateUrl: './add-budgeting.component.html',
  styleUrl: './add-budgeting.component.css'
})
export class AddBudgetingComponent {

}
