import { Component, signal, OnInit } from '@angular/core';
import { Layout } from './layout/layout';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Spinner } from './common/components/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Layout, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('timesheet-application');
  isLoading = true;
  private loadingTimeout: any;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart || event instanceof NavigationEnd))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.isLoading = true;
          this.loadingTimeout = setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        } else if (event instanceof NavigationEnd) {
          if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      });
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
