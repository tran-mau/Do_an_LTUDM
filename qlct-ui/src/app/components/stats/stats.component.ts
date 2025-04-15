import {
  Component,
  AfterViewInit
} from '@angular/core';
import {
  Chart
} from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
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
  }
}
