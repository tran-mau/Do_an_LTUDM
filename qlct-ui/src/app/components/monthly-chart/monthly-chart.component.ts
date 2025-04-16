import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements AfterViewInit, OnDestroy {
  private chart: Chart | null = null; // Khởi tạo ban đầu là null

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    this.chart = new Chart('monthlyChart', {
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
              callback: function (value) {
                return (Number(value) / 1000000) + 'M';
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
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                // Thêm 'as number' vào context.raw
                label += new Intl.NumberFormat('vi-VN').format(context.raw as number) + ' đ';
                return label;
              }
            }
          }
        }
      }
    });
  }
}