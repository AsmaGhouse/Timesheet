import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTable } from '../../common/components/dynamic-table/dynamic-table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../common/components/confirmation-dialog/confirmation-dialog';

interface Timesheet {
  id: number;
  employee: { name: string; role: string; avatar: string };
  period: string;
  projects: string[];
  totalHours: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-timesheet-approvals',
  imports: [CommonModule, FormsModule, DynamicTable],
  templateUrl: './timesheet-approvals.html',
  styleUrl: './timesheet-approvals.css',
})
export class TimesheetApprovals {
  totalPending = 12;
  hoursToReview = 480;
  teamUtilization = 92;
  activeTab = 'all';
  searchTerm = '';
  selectedDepartment = 'All Departments';
  currentPage = 1;
  itemsPerPage = 5;
  math = Math;
  loading = true;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  timesheets: Timesheet[] = [
    {
      id: 1,
      employee: { name: 'John Doe', role: 'Developer', avatar: '' },
      period: 'Dec 16 - Dec 22',
      projects: ['Web Dev', 'Mobile'],
      totalHours: 40,
      status: 'Pending'
    },
    {
      id: 2,
      employee: { name: 'Jane Smith', role: 'Designer', avatar: '' },
      period: 'Dec 16 - Dec 22',
      projects: ['Design'],
      totalHours: 38,
      status: 'Approved'
    },
    {
      id: 3,
      employee: { name: 'Bob Johnson', role: 'Developer', avatar: '' },
      period: 'Dec 16 - Dec 22',
      projects: ['Web Dev'],
      totalHours: 42,
      status: 'Pending'
    },
    {
      id: 4,
      employee: { name: 'Alice Brown', role: 'Designer', avatar: '' },
      period: 'Dec 16 - Dec 22',
      projects: ['Design', 'Mobile'],
      totalHours: 35,
      status: 'Rejected'
    },
    {
      id: 5,
      employee: { name: 'Charlie Wilson', role: 'Developer', avatar: '' },
      period: 'Dec 16 - Dec 22',
      projects: ['Web Dev'],
      totalHours: 45,
      status: 'Approved'
    },
    {
      id: 6,
      employee: { name: 'Diana Lee', role: 'Designer', avatar: '' },
      period: 'Dec 16 - Dec 22',
      projects: ['Design'],
      totalHours: 37,
      status: 'Pending'
    },
    {
      id: 7,
      employee: { name: 'Eve Davis', role: 'Developer', avatar: '' },
      period: 'Dec 16 - Dec 22',
      projects: ['Mobile'],
      totalHours: 41,
      status: 'Approved'
    }
  ];

  selectedTimesheets: number[] = [];

  columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'period', label: 'Period' },
    { key: 'projects', label: 'Projects' },
    { key: 'totalHours', label: 'Total Hours' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ];

  get tableData() {
    return this.paginatedTimesheets.map(timesheet => ({
      employee: `${timesheet.employee.name} (${timesheet.employee.role})`,
      period: timesheet.period,
      projects: timesheet.projects.join(', '),
      totalHours: timesheet.totalHours,
      status: timesheet.status,
      actions: '' // placeholder
    }));
  }

  get filteredTimesheets() {
    return this.timesheets.filter(timesheet => {
      const matchesSearch = timesheet.employee.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesTab = this.activeTab === 'all' || timesheet.status.toLowerCase() === this.activeTab;
      const matchesDepartment = this.selectedDepartment === 'All Departments' || timesheet.employee.role === this.selectedDepartment;
      return matchesSearch && matchesTab && matchesDepartment;
    });
  }

  get paginatedTimesheets() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredTimesheets.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredTimesheets.length / this.itemsPerPage);
  }

  toggleSelection(id: number) {
    const index = this.selectedTimesheets.indexOf(id);
    if (index > -1) {
      this.selectedTimesheets.splice(index, 1);
    } else {
      this.selectedTimesheets.push(id);
    }
  }

  approveAllSelected() {
    if (this.selectedTimesheets.length === 0) return;

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Approve All Selected',
        message: `Are you sure you want to approve ${this.selectedTimesheets.length} selected timesheets?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logic to approve
        console.log('Approved selected timesheets');
        this.selectedTimesheets = [];
      }
    });
  }

  onActionClick(event: { action: string; row: any }) {
    if (event.action === 'delete') {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Delete Timesheet',
          message: `Are you sure you want to delete the timesheet for ${event.row.employee}?`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Logic to delete
          console.log('Deleted timesheet', event.row);
        }
      });
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.currentPage = 1; // Reset to first page
  }

  onSearchChange() {
    this.currentPage = 1; // Reset to first page
  }

  onDepartmentChange() {
    this.currentPage = 1; // Reset to first page
  }

  onPageSizeChange() {
    this.currentPage = 1; // Reset to first page
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get pendingCount() {
    return this.timesheets.filter(t => t.status === 'Pending').length;
  }

  get approvedCount() {
    return this.timesheets.filter(t => t.status === 'Approved').length;
  }

  get rejectedCount() {
    return this.timesheets.filter(t => t.status === 'Rejected').length;
  }

  exportToCSV() {
    const data = this.filteredTimesheets.map(timesheet => ({
      'Employee': `${timesheet.employee.name} (${timesheet.employee.role})`,
      'Period': timesheet.period,
      'Projects': timesheet.projects.join(', '),
      'Total Hours': timesheet.totalHours,
      'Status': timesheet.status
    }));

    const csvContent = this.convertToCSV(data);
    this.downloadCSV(csvContent, 'timesheet-approvals.csv');
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
