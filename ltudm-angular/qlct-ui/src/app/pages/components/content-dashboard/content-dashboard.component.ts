import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-content',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.css']
})
export class ContentComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Move chart initialization code from config.js here
    // Income Chart
    const incomeChart = new Chart('incomeChart', {
      type: 'doughnut',
      data: {
        labels: ['Lương', 'Kinh doanh', 'Đầu tư', 'Khác'],
        datasets: [{
          data: [65, 15, 15, 5],
          backgroundColor: ['#4CAF50', '#8BC34A', '#CDDC39', '#AED581'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    // Expense Chart
    const expenseChart = new Chart('expenseChart', {
      type: 'doughnut',
      data: {
        labels: ['Ăn uống', 'Đi lại', 'Giải trí', 'Khác'],
        datasets: [{
          data: [30, 25, 25, 20],
          backgroundColor: ['#FF7043', '#FFB74D', '#FFCC80', '#FFD54F'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    // Monthly Chart
    const monthlyChart = new Chart('monthlyChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Thu nhập',
            data: [4500000, 5000000, 6000000, 5500000, 7000000, 6500000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000],
            backgroundColor: '#4CAF50',
            borderRadius: 4
          },
          {
            label: 'Chi tiêu',
            data: [3000000, 3500000, 4000000, 4500000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000],
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
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#f0f0f0'
            },
            ticks: {
              callback: function (value: any) {
                return (value / 1000000) + 'M';
              }
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
              label: function (context: any) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' đ';
                return label;
              }
            }
          }
        }
      }
    });

    // Format currency in stats cards
    document.querySelectorAll('.stat-info p').forEach(el => {
      const amount = el.textContent?.match(/\d+/g)?.join('');
      if (amount) {
        el.innerHTML = new Intl.NumberFormat('vi-VN').format(parseInt(amount)) + ' <span class="currency">₫</span>';
      }
    });

    // Format transaction amounts
    document.querySelectorAll('.transaction-amount').forEach(el => {
      const text = el.textContent;
      const amount = text?.match(/[+-]\d+/g);
      if (amount) {
        const formatted = new Intl.NumberFormat('vi-VN').format(parseInt(amount[0].replace(/[+-]/, '')));
        if (text) {
          el.textContent = text.replace(/\d+/g, formatted);
        }
      }
    });
  }
}