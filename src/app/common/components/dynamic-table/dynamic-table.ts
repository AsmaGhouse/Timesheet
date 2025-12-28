import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadge } from '../../directives/status-badge';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-dynamic-table',
  imports: [CommonModule, StatusBadge],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.css',
})
export class DynamicTable {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
}
