import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-time',
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
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Request Time Off</h2>
    <mat-dialog-content>
      <form [formGroup]="timeOffForm" class="flex flex-col gap-4">
        <mat-form-field appearance="outline">
          <mat-label>Leave Type</mat-label>
          <mat-select formControlName="leaveType">
            <mat-option value="vacation">Vacation</mat-option>
            <mat-option value="sick">Sick Leave</mat-option>
            <mat-option value="personal">Personal Leave</mat-option>
            <mat-option value="maternity">Maternity Leave</mat-option>
            <mat-option value="paternity">Paternity Leave</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Start Date</mat-label>
          <input matInput [matDatepicker]="startPicker" formControlName="startDate">
          <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
          <mat-datepicker #startPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>End Date</mat-label>
          <input matInput [matDatepicker]="endPicker" formControlName="endDate">
          <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
          <mat-datepicker #endPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Number of Days</mat-label>
          <input matInput type="number" formControlName="days" readonly>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Reason</mat-label>
          <textarea matInput formControlName="reason" rows="3" placeholder="Please provide a reason for your time off request"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Contact Information (while on leave)</mat-label>
          <input matInput formControlName="contactInfo" placeholder="Phone number or email">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="timeOffForm.invalid" (click)="onSubmit()">Submit Request</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 500px;
    }
    textarea {
      resize: vertical;
    }
  `]
})
export class RequestTimeComponent {
  timeOffForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RequestTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.timeOffForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      days: [0],
      reason: ['', Validators.required],
      contactInfo: ['', Validators.required]
    });

    // Calculate days when dates change
    this.timeOffForm.get('startDate')?.valueChanges.subscribe(() => this.calculateDays());
    this.timeOffForm.get('endDate')?.valueChanges.subscribe(() => this.calculateDays());
  }

  calculateDays() {
    const start = this.timeOffForm.get('startDate')?.value;
    const end = this.timeOffForm.get('endDate')?.value;
    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      this.timeOffForm.get('days')?.setValue(diffDays);
    }
  }

  onSubmit() {
    if (this.timeOffForm.valid) {
      this.dialogRef.close(this.timeOffForm.value);
    }
  }
}
