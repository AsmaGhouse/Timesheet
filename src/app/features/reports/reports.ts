import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { GenerateReportComponent } from '../generate-report/generate-report';

export interface Report {
  id: number;
  name: string;
  type: string;
  date: Date;
  status: 'Completed' | 'Pending' | 'Failed';
  format: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule
  ],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Reports</h1>
          <p class="text-gray-500 mt-1">Generate and view your timesheet reports</p>
        </div>
        <button mat-raised-button color="primary" class="!py-6 !px-8 !text-lg !rounded-xl shadow-lg hover:shadow-xl transition-all" (click)="openGenerateReportDialog()">
          <mat-icon class="mr-2">add_circle</mat-icon>
          Generate New Report
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <mat-card class="p-4 !rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <mat-icon>assessment</mat-icon>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">12</h3>
                    <p class="text-sm text-gray-500">Reports Activity</p>
                </div>
            </div>
        </mat-card>
        <mat-card class="p-4 !rounded-xl shadow-sm border border-gray-100">
             <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <mat-icon>check_circle</mat-icon>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">8</h3>
                    <p class="text-sm text-gray-500">Completed</p>
                </div>
            </div>
        </mat-card>
        <mat-card class="p-4 !rounded-xl shadow-sm border border-gray-100">
             <div class="flex items-center">
                <div class="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <mat-icon>schedule</mat-icon>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">3</h3>
                    <p class="text-sm text-gray-500">Pending</p>
                </div>
            </div>
        </mat-card>
         <mat-card class="p-4 !rounded-xl shadow-sm border border-gray-100">
             <div class="flex items-center">
                <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <mat-icon>analytics</mat-icon>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">24</h3>
                    <p class="text-sm text-gray-500">Total Downloads</p>
                </div>
            </div>
        </mat-card>
      </div>

      <mat-card class="!rounded-xl shadow-md overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 class="text-xl font-bold text-gray-800">Recent Reports</h2>
           <button mat-button color="primary">View All</button>
        </div>
        
        <table mat-table [dataSource]="recentReports" class="w-full">
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef class="!font-bold !text-gray-600"> Report Name </th>
            <td mat-cell *matCellDef="let element"> 
                <div class="flex items-center py-2">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
                        <mat-icon>description</mat-icon>
                    </div>
                    <div>
                        <div class="font-medium text-gray-800">{{element.name}}</div>
                        <div class="text-xs text-gray-500">{{element.type}}</div>
                    </div>
                </div>
            </td>
          </ng-container>

          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef class="!font-bold !text-gray-600"> Date Generating </th>
            <td mat-cell *matCellDef="let element"> {{element.date | date:'mediumDate'}} </td>
          </ng-container>

          <!-- Status Column -->
           <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef class="!font-bold !text-gray-600"> Status </th>
            <td mat-cell *matCellDef="let element">
                <span class="px-3 py-1 rounded-full text-xs font-medium"
                      [ngClass]="{
                        'bg-green-100 text-green-700': element.status === 'Completed',
                        'bg-yellow-100 text-yellow-700': element.status === 'Pending',
                        'bg-red-100 text-red-700': element.status === 'Failed'
                      }">
                    {{element.status}}
                </span>
            </td>
          </ng-container>

           <!-- Format Column -->
          <ng-container matColumnDef="format">
            <th mat-header-cell *matHeaderCellDef class="!font-bold !text-gray-600"> Format </th>
            <td mat-cell *matCellDef="let element"> 
                <span class="uppercase font-mono text-xs bg-gray-100 px-2 py-1 rounded">{{element.format}}</span>
            </td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="!font-bold !text-gray-600"> Actions </th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button color="primary" [disabled]="element.status !== 'Completed'" title="Download">
                <mat-icon>download</mat-icon>
              </button>
              <button mat-icon-button color="warn" title="Delete">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-gray-50 transition-colors"></tr>
        </table>
      </mat-card>
    </div>
  `,
  styles: [`
    .mat-column-actions {
      width: 100px;
      text-align: right;
    }
  `]
})
export class ReportsComponent {
  displayedColumns: string[] = ['name', 'date', 'status', 'format', 'actions'];
  recentReports: Report[] = [
    { id: 1, name: 'Monthly Timesheet - Dec 2025', type: 'Timesheet Report', date: new Date('2025-12-31'), status: 'Completed', format: 'PDF' },
    { id: 2, name: 'Q4 Financial Summary', type: 'Financial Summary', date: new Date('2025-12-30'), status: 'Completed', format: 'Excel' },
    { id: 3, name: 'Project Alpha Performance', type: 'Team Performance', date: new Date('2026-01-02'), status: 'Pending', format: 'PDF' },
    { id: 4, name: 'Weekly Timesheet - Week 52', type: 'Timesheet Report', date: new Date('2025-12-28'), status: 'Completed', format: 'CSV' },
    { id: 5, name: 'Annual Review 2025', type: 'Project Report', date: new Date('2025-12-15'), status: 'Failed', format: 'PDF' },
  ];

  constructor(private dialog: MatDialog) {}

  openGenerateReportDialog() {
    const dialogRef = this.dialog.open(GenerateReportComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Report generation requested with:', result);
        // Simulate adding a new pending report
        const newReport: Report = {
          id: this.recentReports.length + 1,
          name: `New Report - ${new Date().toLocaleDateString()}`,
          type: result.reportType === 'timesheet' ? 'Timesheet Report' : 'Custom Report',
          date: new Date(),
          status: 'Pending',
          format: result.format.toUpperCase()
        };
        this.recentReports = [newReport, ...this.recentReports];
      }
    });
  }
}
