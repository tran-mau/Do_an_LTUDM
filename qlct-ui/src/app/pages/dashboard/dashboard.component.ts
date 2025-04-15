import { Component } from '@angular/core';
import { ChartsComponent } from '../../components/charts/charts.component';
import { MonthlyChartComponent } from '../../components/monthly-chart/monthly-chart.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ContentComponent } from '../../components/content-dashboard/content-dashboard.component';


@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, TopbarComponent, ContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
