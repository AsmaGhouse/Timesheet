import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quick-actions',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.css',
})
export class QuickActions {
  @Output() newProjectTask = new EventEmitter<void>();
  @Output() requestTime = new EventEmitter<void>();
  @Output() generateReport = new EventEmitter<void>();
}
