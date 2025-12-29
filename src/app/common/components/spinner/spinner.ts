import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  @Input() size: string = 'h-12 w-12';
  @Input() color: string = 'border-blue-500';
  @Input() type: 'border' | 'dots' | 'bars' | 'wave' | 'ring' | 'pulse' | 'ellipsis' = 'border';
}
