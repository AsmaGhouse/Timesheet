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
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ];
  tableData: any[] = [
    { id: 1, name: 'John Doe', amount: 100, date: '2023-01-01', status: 'Completed', actions: '' },
    { id: 2, name: 'Jane Smith', amount: 200, date: '2023-01-02', status: 'Pending', actions: '' },
    { id: 3, name: 'Bob Johnson', amount: 150, date: '2023-01-03', status: 'Completed', actions: '' },
    { id: 4, name: 'Alice Brown', amount: 300, date: '2023-01-04', status: 'Failed', actions: '' },
    { id: 5, name: 'Charlie Wilson', amount: 250, date: '2023-01-05', status: 'Completed', actions: '' }
  ];
}
