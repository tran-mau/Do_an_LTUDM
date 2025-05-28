import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { TransactionService } from '../../../services/transaction.service';
import { forkJoin, Subject, takeUntil, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TransactionData {
  total: number;
  name: string;
}

interface TransactionHistoryData {
  type: string;
  notice: string | null;
  amount: number;
  dateTime: Date;
  icon?: string;
}

interface DashboardData {
  balance: number;
  amountIn: number;
  amountOut: number;
  income: TransactionData[];
  expenses: TransactionData[];
  monthlyIn: number[];
  monthlyOut: number[];
}

@Component({
  selector: 'app-content',
  templateUrl: './content-dashboard.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./content-dashboard.component.css']
})
export class ContentComponent implements AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly charts = new Map<string, Chart>();

  // Data properties
  readonly currentDate = new Date();
  readonly currentMonth = this.currentDate.getMonth() + 1;
  readonly currentYear = this.currentDate.getFullYear();
  selectedOption = 'year2025';

  // Dashboard data
  dashboardData: DashboardData = {
    balance: 0,
    amountIn: 0,
    amountOut: 0,
    income: [],
    expenses: [],
    monthlyIn: new Array(12).fill(0),
    monthlyOut: new Array(12).fill(0),
  };

  // Transaction history data
  transactionHistory: TransactionHistoryData[] = [];

  // Chart colors - consistent palette
  private readonly CHART_COLORS = [
    '#4CAF50', '#8BC34A', '#CDDC39', '#AED581',
    '#FFC107', '#FF9800', '#FF5722', '#F44336',
    '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
    '#2196F3', '#03A9F4', '#00BCD4', '#009688',
    '#795548', '#9E9E9E', '#607D8B', '#FFEB3B'
  ];

  // Chart configuration templates
  private readonly DOUGHNUT_CONFIG = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw as number;
            if (value === 1) {
              return `${label}`;
            }
            return `${label}: ${this.formatCurrency(value)}`;
          }
        }
      }
    }
  };

  constructor(
    private readonly transactionService: TransactionService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyAllCharts();
  }

  // Updated method to handle year selection change
  onOptionChange(): void {
    console.log('Selected option:', this.selectedOption);
    // Extract year from selected option (e.g., 'year2025' -> 2025)
    const selectedYear = parseInt(this.selectedOption.replace('year', ''));
    this.loadMonthlyChartData(selectedYear);
  }

  // New method to load monthly chart data for specific year
  private loadMonthlyChartData(year: number): void {
    const monthlyIn$ = this.createMonthlyObservables('in', year);
    const monthlyOut$ = this.createMonthlyObservables('out', year);

    combineLatest([monthlyIn$, monthlyOut$]).pipe(
      takeUntil(this.destroy$),
      map(([monthlyIn, monthlyOut]) => ({
        monthlyIn,
        monthlyOut
      }))
    ).subscribe({
      next: (data) => {
        // Update only the monthly data in dashboardData
        this.dashboardData.monthlyIn = data.monthlyIn;
        this.dashboardData.monthlyOut = data.monthlyOut;

        // Update the monthly chart with new data
        this.updateMonthlyChart();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading monthly chart data:', error);
      }
    });
  }

  private loadDashboardData(): void {
    // Create observables for all data
    const balance$ = this.transactionService.getBalanceTransaction();
    const amountIn$ = this.transactionService.getAmountInTransaction(this.currentMonth, this.currentYear);
    const amountOut$ = this.transactionService.getAmountOutTransaction(this.currentMonth, this.currentYear);
    const income$ = this.transactionService.getListAmountInTransaction();
    const expenses$ = this.transactionService.getListAmountOutTransaction();
    const top4transactionHistory$ = this.transactionService.getListTop4Transaction();

    // Create monthly data observables for current year initially
    const selectedYear = parseInt(this.selectedOption.replace('year', ''));
    const monthlyIn$ = this.createMonthlyObservables('in', selectedYear);
    const monthlyOut$ = this.createMonthlyObservables('out', selectedYear);

    // Combine all observables
    combineLatest([
      balance$,
      amountIn$,
      amountOut$,
      income$,
      expenses$,
      monthlyIn$,
      monthlyOut$,
      top4transactionHistory$
    ] as const).pipe(
      takeUntil(this.destroy$),
      map(([balance, amountIn, amountOut, income, expenses, monthlyIn, monthlyOut, transactionHistory]) => ({
        balance,
        amountIn,
        amountOut,
        income,
        expenses,
        monthlyIn,
        monthlyOut,
        transactionHistory
      }))
    ).subscribe({
      next: (data) => {
        this.dashboardData = {
          balance: data.balance,
          amountIn: data.amountIn,
          amountOut: data.amountOut,
          income: data.income,
          expenses: data.expenses,
          monthlyIn: data.monthlyIn,
          monthlyOut: data.monthlyOut
        };
        this.transactionHistory = data.transactionHistory;
        this.updateDOM();
        this.updateTransactionHistoryDOM();
        this.initializeAllCharts();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  // Updated to accept year parameter
  private createMonthlyObservables(type: 'in' | 'out', year: number = this.currentYear): Observable<number[]> {
    const calls = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      return type === 'in'
        ? this.transactionService.getAmountInTransaction(month, year)
        : this.transactionService.getAmountOutTransaction(month, year);
    });

    return forkJoin(calls);
  }

  private updateDOM(): void {
    this.updateElementContent('balance', this.dashboardData.balance);
    this.updateElementContent('amount-in', this.dashboardData.amountIn);
    this.updateElementContent('amount-out', this.dashboardData.amountOut);
  }

  private updateElementContent(elementId: string, amount: number): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `${this.formatCurrency(amount, false)} <span class="currency">₫</span>`;
    }
  }

  private updateTransactionHistoryDOM(): void {
    const transactionList = document.querySelector('.recent-transactions ul');
    if (!transactionList || !this.transactionHistory.length) return;

    // Clear existing static transactions
    transactionList.innerHTML = '';

    // Generate transaction items from API data
    this.transactionHistory.forEach(transaction => {
      const listItem = this.createTransactionListItem(transaction);
      transactionList.appendChild(listItem);
    });
  }

  private createTransactionListItem(transaction: TransactionHistoryData): HTMLLIElement {
    const li = document.createElement('li');

    // Determine transaction type and styling
    const isIncome = transaction.type === 'thu';
    const transactionClass = isIncome ? 'income' : 'expense';
    const amountClass = isIncome ? 'plus' : 'minus';
    const amountPrefix = isIncome ? '+' : '-';

    // Get icon based on transaction type or notice
    const icon = this.getTransactionIcon(transaction);

    // Format date
    console.log("transaction.date: ", transaction.dateTime);
    const formattedDate = this.formatTransactionDate(transaction.dateTime.toString());

    const typeClass = transaction.type === 'thu' ? 'bg-income' : 'bg-expense';
    li.classList.add(typeClass);
    li.innerHTML = `
      <div class="transaction-icon ${transactionClass}">
        <i class="fas ${icon}"></i>
      </div>
      <div class="transaction-details">
        <span class="transaction-title">${transaction.notice || 'Giao dịch'}</span>
        <span class="transaction-date">${formattedDate}</span>
      </div>
      <span class="transaction-amount ${amountClass}">
        ${amountPrefix}${this.formatCurrency(Math.abs(transaction.amount))}
      </span>
    `;

    return li;
  }

  private getTransactionIcon(transaction: TransactionHistoryData): string {
    // Map transaction types or notices to appropriate icons
    const notice = (transaction.notice || '').toLowerCase();
    const isIncome = transaction.type === 'thu';

    // Income icons
    if (isIncome) {
      if (notice.includes('lương') || notice.includes('salary')) return 'fa-money-bill-wave';
      if (notice.includes('lãi') || notice.includes('tiết kiệm')) return 'fa-piggy-bank';
      if (notice.includes('thưởng') || notice.includes('bonus')) return 'fa-gift';
      return 'fa-plus-circle';
    }

    // Expense icons
    if (notice.includes('ăn') || notice.includes('thức ăn') || notice.includes('food')) return 'fa-utensils';
    if (notice.includes('xăng') || notice.includes('gas') || notice.includes('fuel')) return 'fa-gas-pump';
    if (notice.includes('quần áo') || notice.includes('clothes')) return 'fa-tshirt';
    if (notice.includes('mua sắm') || notice.includes('shopping')) return 'fa-shopping-basket';
    if (notice.includes('y tế') || notice.includes('health')) return 'fa-medkit';
    if (notice.includes('giải trí') || notice.includes('entertainment')) return 'fa-gamepad';
    if (notice.includes('giao thông') || notice.includes('transport')) return 'fa-car';

    return 'fa-minus-circle';
  }

  private formatTransactionDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Hôm nay, ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Hôm qua, ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước, ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  }

  private initializeAllCharts(): void {
    // Initialize charts with delay to ensure DOM is ready
    setTimeout(() => {
      this.initChart('incomeChart', 'doughnut', this.dashboardData.income);
      this.initChart('expenseChart', 'doughnut', this.dashboardData.expenses);
      this.initMonthlyChart();
    }, 100);
  }

  private initChart(canvasId: string, type: 'doughnut', data: TransactionData[]): void {
    // if (!data.length) return;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    // Destroy existing chart
    this.destroyChart(canvasId);
    if (data.length === 0) {
      const chart = new Chart(canvas, {
        type,
        data: {
          labels: ['No data available'],
          datasets: [{
            data: [1],
            backgroundColor: '#5A827E',
            borderWidth: 0
          }]
        },
        options: this.DOUGHNUT_CONFIG
      });

      this.charts.set(canvasId, chart);
    } else {
      const chart = new Chart(canvas, {
        type,
        data: {
          labels: data.map(item => item.name),
          datasets: [{
            data: data.map(item => item.total),
            backgroundColor: this.CHART_COLORS.slice(0, data.length),
            borderWidth: 0
          }]
        },
        options: this.DOUGHNUT_CONFIG
      });

      this.charts.set(canvasId, chart);
    }
  }

  private initMonthlyChart(): void {
    const canvas = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!canvas) return;

    this.destroyChart('monthlyChart');

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Thu nhập',
            data: this.dashboardData.monthlyIn,
            backgroundColor: '#4CAF50',
            borderRadius: 4
          },
          {
            label: 'Chi tiêu',
            data: this.dashboardData.monthlyOut,
            backgroundColor: '#F44336',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#f0f0f0' },
            ticks: {
              callback: (value: any) => (value / 1000000) > 0.0001 ? `${(value / 1000000)}M` : `0đ`
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                return `${label}: ${this.formatCurrency(context.raw)}`;
              }
            }
          }
        }
      }
    });

    this.charts.set('monthlyChart', chart);
  }

  // New method to update existing monthly chart with new data
  private updateMonthlyChart(): void {
    const existingChart = this.charts.get('monthlyChart');
    if (existingChart) {
      // Update chart data
      existingChart.data.datasets[0].data = this.dashboardData.monthlyIn;
      existingChart.data.datasets[1].data = this.dashboardData.monthlyOut;

      // Update chart
      existingChart.update('active');
    } else {
      // If chart doesn't exist, initialize it
      this.initMonthlyChart();
    }
  }

  private destroyChart(chartId: string): void {
    const existingChart = this.charts.get(chartId);
    if (existingChart) {
      existingChart.destroy();
      this.charts.delete(chartId);
    }
  }

  private destroyAllCharts(): void {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }

  private formatCurrency(amount: number, includeCurrency: boolean = true): string {
    const formatted = new Intl.NumberFormat('vi-VN').format(amount);
    return includeCurrency ? `${formatted} đ` : formatted;
  }

  // Public getters for template access
  get formattedBalance(): string {
    return this.formatCurrency(this.dashboardData.balance);
  }

  get formattedAmountIn(): string {
    return this.formatCurrency(this.dashboardData.amountIn);
  }

  get formattedAmountOut(): string {
    return this.formatCurrency(this.dashboardData.amountOut);
  }

  // Getter for transaction history to use in template
  get recentTransactions(): TransactionHistoryData[] {
    return this.transactionHistory;
  }
}