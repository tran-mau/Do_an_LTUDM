import { Component, OnInit } from '@angular/core';
import { SettingComponent } from '../pages/setting/setting.component';
import { ContentComponent } from '../pages/components/content-dashboard/content-dashboard.component';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from '../pages/transaction-history/transaction-history.component';
import { IncomeOutcomeComponent } from '../pages/income-outcome/income-outcome.component';
import { BudgetingComponent } from '../pages/budgeting/budgeting.component';

@Component({
  selector: 'app-shared',
  imports: [
    SettingComponent,
    ContentComponent,
    TransactionHistoryComponent,
    IncomeOutcomeComponent,
    BudgetingComponent,
    CommonModule
  ],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent implements OnInit {
  activeSection: string = 'home';
  
  ngOnInit(): void {
    this.setupMenuListeners();
  }
  
  setupMenuListeners() {
    const menuItems = document.querySelectorAll('.nav-item');

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.activeSection = item.getAttribute('data-section') || 'home';
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    }); 
  }
}
