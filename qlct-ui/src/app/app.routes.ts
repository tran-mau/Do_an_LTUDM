import { Routes } from '@angular/router';
import { ContentComponent } from './components/content-dashboard/content-dashboard.component';
import { SettingComponent } from './pages/setting/setting.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { IncomeOutcomeComponent } from './pages/income-outcome/income-outcome.component';
import { BudgetingComponent } from './pages/budgeting/budgeting.component';
import { BudgetSummaryComponent } from './pages/budgeting/budget-summary/budget-summary.component';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}, 
    {path: 'dashboard', component: ContentComponent},
    {path: 'setting', component: SettingComponent},
    {path: 'transaction', component: TransactionHistoryComponent},
    {path: 'budget', component: BudgetSummaryComponent},
    {path: 'income-outcome', component: IncomeOutcomeComponent} 

];

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { BudgetingComponent } from './pages/budgeting/budgeting.component';

// const routes: Routes = [
//   { path: 'budget', component: BudgetingComponent },  // Định nghĩa đường dẫn cho component Budget
//   { path: '', redirectTo: '/budget', pathMatch: 'full' }  // Đường dẫn mặc định
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
