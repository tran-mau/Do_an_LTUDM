import { Routes } from '@angular/router';
import { ContentComponent } from './pages/components/content-dashboard/content-dashboard.component';
import { SettingComponent } from './pages/setting/setting.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { IncomeOutcomeComponent } from './pages/income-outcome/income-outcome.component';
import { BudgetingComponent } from './pages/budgeting/budgeting.component';
import { BudgetSummaryComponent } from './pages/budgeting/budget-summary/budget-summary.component';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup-layout/signup/signup.component';
import { VerificationComponent } from './login-signup/signup-layout/verification/verification.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { PagesComponent } from './pages/pages.component';
import { SignupLayoutComponent } from './login-signup/signup-layout/signup-layout.component';
import { AddBudgetingComponent } from './pages/add-budgeting/add-budgeting.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginSignupComponent,
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          {
            path: 'signup',
            component: SignupLayoutComponent,
            children: [
              { path: '', component: SignupComponent }, 
              { path: 'verification', component: VerificationComponent } 
            ]
          }
        ]
      }
      ,
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: ContentComponent },
            { path: 'setting', component: SettingComponent },
            { path: 'transaction', component: TransactionHistoryComponent },
            { path: 'budget', component: BudgetingComponent },
            { path: 'income-outcome', component: IncomeOutcomeComponent },
            { path: 'add-budget', component: AddBudgetingComponent },
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];


