import { Component } from '@angular/core';
import { DynamicTable, TableColumn } from '../../common/components/dynamic-table/dynamic-table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../common/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-recent-transactions',
  imports: [DynamicTable],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css',
})
export class RecentTransactions {
  constructor(private dialog: MatDialog) {}

  tableColumns: TableColumn[] = [
  { key: 'dateRange', label: 'Date Range' },
  { key: 'project', label: 'Primary Project' },
  { key: 'hours', label: 'Hours' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
];

 tableData: any[] = [
  {
    dateRange: 'Oct 16 - Oct 22, 2023',
    project: 'Website Redesign (Alpha)',
    hours: '40.0 hrs',
    status: 'Approved',
    actions: 'delete'
  },
  {
    dateRange: 'Oct 09 - Oct 15, 2023',
    project: 'Mobile App API',
    hours: '38.5 hrs',
    status: 'Approved',
    actions: 'delete'
  },
  {
    dateRange: 'Oct 02 - Oct 08, 2023',
    project: 'Website Redesign (Alpha)',
    hours: '36.0 hrs',
    status: 'Pending',
    actions: 'delete'
  },
  {
    dateRange: 'Sep 25 - Oct 01, 2023',
    project: 'Internal Tools Upgrade',
    hours: '42.0 hrs',
    status: 'Rejected',
    actions: 'delete'
  }
];

onActionClick(event: { action: string; row: any }) {
  if (event.action === 'delete') {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Delete Timesheet',
        message: `Are you sure you want to delete the timesheet for ${event.row.project}?`
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
}
