import { Component } from '@angular/core';

interface StatCard {
  title: string;
  amount: number;
  icon: string;
  type: 'balance' | 'income' | 'expense';
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  stats: StatCard[] = [
    {
      title: 'Current Balance',
      amount: 3946512048,
      icon: 'fas fa-wallet',
      type: 'balance'
    },
    {
      title: 'Income',
      amount: 5246000000,
      icon: 'fas fa-arrow-down',
      type: 'income'
    },
    {
      title: 'Expenses',
      amount: 1299487952,
      icon: 'fas fa-arrow-up',
      type: 'expense'
    }
  ];

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  }
}