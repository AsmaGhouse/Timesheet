import { Component } from '@angular/core';
import { DynamicTable, TableColumn } from '../../common/components/dynamic-table/dynamic-table';

@Component({
  selector: 'app-recent-transactions',
  imports: [DynamicTable],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css',
})
export class RecentTransactions {
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

}
