import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  @Output() menuClick = new EventEmitter<void>();
  pageTitle = 'Dashboard';
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTitle(this.router.url);
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateTitle(event.url);
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateTitle(url: string) {
    if (url.includes('timesheet-approvals')) {
      this.pageTitle = 'Timesheet Approvals';
    } else if (url.includes('dashboard')) {
      this.pageTitle = 'Dashboard';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }

  onMenuClick() {
    this.menuClick.emit();
  }
}
