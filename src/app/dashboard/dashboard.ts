import { Component, OnInit } from '@angular/core';
import { Chart } from '../chart/chart';
import { DashboardService } from '../dashboard';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [Chart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  barChartData!: ChartConfiguration;
  lineChartData!: ChartConfiguration;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.barChartData = this.dashboardService.getBarChartData();
    this.lineChartData = this.dashboardService.getLineChartData();
  }
}
