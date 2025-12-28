import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from '../chart/chart';
import { RecentTransactions } from '../features/recent-transactions/recent-transactions';
import { QuickActions } from '../features/quick-actions/quick-actions';
import { NewProjectTaskComponent } from '../features/new-project-task/new-project-task';
import { RequestTimeComponent } from '../features/request-time/request-time';
import { GenerateReportComponent } from '../features/generate-report/generate-report';
import { DashboardService } from '../dashboard';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [Chart, RecentTransactions, QuickActions],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  barChartData!: ChartConfiguration;
  lineChartData!: ChartConfiguration;
  currentDate!: string;

  constructor(private dashboardService: DashboardService, private dialog: MatDialog) {}

  ngOnInit() {
    this.barChartData = this.dashboardService.getBarChartData();
    this.lineChartData = this.dashboardService.getLineChartData();
    this.currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(' ', ', ');
  }

  onNewProjectTask() {
    const dialogRef = this.dialog.open(NewProjectTaskComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New project/task created:', result);
        // Handle the result, e.g., save to backend or update UI
      }
    });
  }

  onRequestTime() {
    const dialogRef = this.dialog.open(RequestTimeComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Time off requested:', result);
        // Handle the result, e.g., save to backend or update UI
      }
    });
  }

  onGenerateReport() {
    const dialogRef = this.dialog.open(GenerateReportComponent, {
      width: '90vw',
      maxWidth: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Report generated:', result);
        // Handle the result, e.g., download file or send email
      }
    });
  }
}
