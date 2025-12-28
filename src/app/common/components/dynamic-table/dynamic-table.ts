import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() selectedItems: any[] = [];
  @Input() idKey: string = 'id';
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();
  @Output() selectionChange = new EventEmitter<any>();
}
