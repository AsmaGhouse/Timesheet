import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusBadge]'
})
export class StatusBadge implements OnInit {
  @Input() appStatusBadge!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const element = this.el.nativeElement;
    element.classList.add('px-2', 'inline-flex', 'text-xs', 'leading-5', 'font-semibold', 'rounded-full');

    switch (this.appStatusBadge) {
      case 'Completed':
        element.classList.add('bg-green-100', 'text-green-800');
        break;
      case 'Pending':
        element.classList.add('bg-yellow-100', 'text-yellow-800');
        break;
      case 'Failed':
        element.classList.add('bg-red-100', 'text-red-800');
        break;
      default:
        element.classList.add('bg-gray-100', 'text-gray-800');
    }
  }
}
