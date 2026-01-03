import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { TimesheetApprovals } from './features/timesheet-approvals/timesheet-approvals';
import { ReportsComponent } from './features/reports/reports';
import { SettingsComponent } from './features/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'timesheet-approvals', component: TimesheetApprovals },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
];
