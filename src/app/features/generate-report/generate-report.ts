import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Generate Report</h2>
    <mat-dialog-content>
      <form [formGroup]="reportForm" class="flex flex-col gap-4">
        <mat-form-field appearance="fill">
          <mat-label>Report Type</mat-label>
          <mat-select formControlName="reportType">
            <mat-option value="timesheet">Timesheet Report</mat-option>
            <mat-option value="project">Project Report</mat-option>
            <mat-option value="team">Team Performance Report</mat-option>
            <mat-option value="financial">Financial Summary</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="flex gap-4">
          <mat-form-field appearance="fill" class="flex-1">
            <mat-label>Start Date</mat-label>
            <input matInput [matDatepicker]="startPicker" formControlName="startDate">
            <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
            <mat-datepicker #startPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="fill" class="flex-1">
            <mat-label>End Date</mat-label>
            <input matInput [matDatepicker]="endPicker" formControlName="endDate">
            <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
            <mat-datepicker #endPicker></mat-datepicker>
          </mat-form-field>
        </div>

        <mat-form-field appearance="fill">
          <mat-label>Project</mat-label>
          <mat-select formControlName="project">
            <mat-option value="all">All Projects</mat-option>
            <mat-option value="web-dev">Web Development</mat-option>
            <mat-option value="mobile-app">Mobile App</mat-option>
            <mat-option value="design">Design</mat-option>
            <mat-option value="marketing">Marketing</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Include in Report:</label>
          <mat-checkbox formControlName="includeHours">Total Hours Worked</mat-checkbox>
          <mat-checkbox formControlName="includeTasks">Task Details</mat-checkbox>
          <mat-checkbox formControlName="includeCharts">Charts and Graphs</mat-checkbox>
          <mat-checkbox formControlName="includeComments">Comments and Notes</mat-checkbox>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Format</mat-label>
          <mat-select formControlName="format">
            <mat-option value="pdf">PDF</mat-option>
            <mat-option value="excel">Excel</mat-option>
            <mat-option value="csv">CSV</mat-option>
            <mat-option value="html">HTML</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Recipient Email (optional)</mat-label>
          <input matInput formControlName="email" type="email" placeholder="Enter email to send report">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="reportForm.invalid" (click)="onGenerate()">Generate Report</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 600px;
    }
    mat-form-field {
      max-height: 80px !important;
    }
  `]
})
export class GenerateReportComponent {
  reportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenerateReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reportForm = this.fb.group({
      reportType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      project: ['all'],
      includeHours: [true],
      includeTasks: [true],
      includeCharts: [false],
      includeComments: [false],
      format: ['pdf', Validators.required],
      email: ['']
    });
  }

  onGenerate() {
    if (this.reportForm.valid) {
      this.dialogRef.close(this.reportForm.value);
    }
  }
}
