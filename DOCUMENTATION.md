# Timesheet Application Documentation

## Overview
The Timesheet Application is a modern, responsive web application built with Angular 19+ and TailwindCSS. It is designed to streamline timesheet management, approvals, and reporting for teams.

## Technology Stack
- **Framework:** Angular 19+
- **Language:** TypeScript
- **Styling:** TailwindCSS, Vanilla CSS
- **UI Components:** Angular Material
- **Icons:** Material Icons
- **State Management:** Angular Core (Signals/RxJS)

## Key Features

### 1. Dashboard
The landing page of the application, providing real-time insights into:
- Current project status
- Quick actions
- Recent activities for the user

### 2. Timesheet Approvals
A dedicated section for managers to:
- Review submitted timesheets
- Approve or reject entries
- Add comments for feedback

### 3. Reports
*New Feature*
The Reports feature empowers users to generate detailed summaries of work.
- **Recent Reports:** View a history of generated reports with status indicators.
- **Generate Report:** A dialog-based wizard to create new reports with custom filters:
    - Report Type (Timesheet, Project, Team, Financial)
    - Date Range
    - Specific Projects
    - Custom inclusions (Charts, Comments, etc.)
    - Output Format (PDF, Excel, CSV, HTML)

### 4. Settings
*New Feature*
A centralized configuration hub for personal and application-wide preferences.
- **Profile:** Manage personal details (Name, Email, Bio, Avatar).
- **Preferences:** Toggle Dark Mode, set Language and Time Zone.
- **Notifications:** Configure Email alerts, Push notifications, and Reminders.
- **Security:** Options to change password or enable 2FA (UI only).

## Architecture & Project Structure
The project follows a standard Angular modular architecture with standalone components.

```
src/
├── app/
│   ├── features/           # Feature-specific modules
│   │   ├── dashboard/      # Dashboard component
│   │   ├── timesheet-approvals/
│   │   ├── reports/        # [NEW] Reports components
│   │   ├── settings/       # [NEW] Settings components
│   │   └── generate-report/# Shared report generation dialog
│   ├── sidenav/            # Navigation component
│   └── app.routes.ts       # Main routing configuration
├── assets/                 # Static assets
└── styles.css              # Global styles (Tailwind imports)
```

## Adding New Features
To add a new feature:

1.  **Create Component:** create a new folder in `src/app/features/` and generate a standalone component.
2.  **Define Route:** Add a new path in `src/app/app.routes.ts` pointing to the new component.
3.  **Update Navigation:** Add a link in `src/app/sidenav/sidenav.html` using the `routerLink` directive.

## Development Commands
- `npm start`: Serve the application locally (usually port 4200).
- `npm run build`: Build the application for production.
- `npm test`: Run unit tests.

## Notes
- The application uses mock data for demonstration purposes. Integration with a real backend API is required for production use.
- TailwindCSS is used for utility-first styling, ensuring a consistent and responsive design system.
