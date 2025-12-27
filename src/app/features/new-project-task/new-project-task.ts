import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-project-task',
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
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Create New Project/Task</h2>
    <mat-dialog-content>
      <form [formGroup]="projectForm" class="flex flex-col gap-4">
        <mat-form-field appearance="outline">
          <mat-label>Project Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter project name">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3" placeholder="Project description"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Priority</mat-label>
          <mat-select formControlName="priority">
            <mat-option value="low">Low</mat-option>
            <mat-option value="medium">Medium</mat-option>
            <mat-option value="high">High</mat-option>
            <mat-option value="urgent">Urgent</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Start Date</mat-label>
          <input matInput [matDatepicker]="startPicker" formControlName="startDate">
          <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
          <mat-datepicker #startPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Due Date</mat-label>
          <input matInput [matDatepicker]="duePicker" formControlName="dueDate">
          <mat-datepicker-toggle matSuffix [for]="duePicker"></mat-datepicker-toggle>
          <mat-datepicker #duePicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Assigned Team Members</mat-label>
          <mat-chip-grid #chipGrid>
            <mat-chip-row *ngFor="let member of selectedMembers" (removed)="removeMember(member)">
              {{member}}
              <button matChipRemove>
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
          </mat-chip-grid>
          <input matInput formControlName="newMember" placeholder="Add team member" (keydown.enter)="addMember()">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Estimated Hours</mat-label>
          <input matInput type="number" formControlName="estimatedHours" placeholder="0">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="projectForm.invalid" (click)="onCreate()">Create Project</button>
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
export class NewProjectTaskComponent {
  projectForm: FormGroup;
  selectedMembers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewProjectTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['medium', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      newMember: [''],
      estimatedHours: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addMember() {
    const member = this.projectForm.get('newMember')?.value?.trim();
    if (member && !this.selectedMembers.includes(member)) {
      this.selectedMembers.push(member);
      this.projectForm.get('newMember')?.setValue('');
    }
  }

  removeMember(member: string) {
    this.selectedMembers = this.selectedMembers.filter(m => m !== member);
  }

  onCreate() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      const projectData = {
        ...formValue,
        teamMembers: this.selectedMembers
      };
      delete projectData.newMember;
      this.dialogRef.close(projectData);
    }
  }
}
