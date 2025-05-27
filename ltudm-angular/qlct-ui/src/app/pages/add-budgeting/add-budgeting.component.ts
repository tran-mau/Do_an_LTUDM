import { Component } from '@angular/core';
import { BudgetFormComponent } from './budget-form/budget-form.component';

@Component({
  selector: 'app-add-budgeting',
  imports: [BudgetFormComponent],
  templateUrl: './add-budgeting.component.html',
  styleUrl: './add-budgeting.component.css'
})
export class AddBudgetingComponent {
  userId: string | null;
  constructor(){
    this.userId = localStorage.getItem('userid');
  }
  public onTestUserId(){
    alert(this.userId);
  }
}
