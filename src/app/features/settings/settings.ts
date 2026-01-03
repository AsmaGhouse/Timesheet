import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Settings</h1>
        <p class="text-gray-500 mt-1">Manage your account and application preferences</p>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden min-h-[600px]">
        <mat-tab-group animationDuration="0ms" class="h-full">
          
          <!-- Profile Settings -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">person</mat-icon>
              Profile
            </ng-template>
            <div class="p-8 max-w-3xl">
              <h2 class="text-xl font-bold mb-6 text-gray-800">Personal Information</h2>
              
              <div class="flex items-start mb-8">
                <div class="relative group cursor-pointer mr-8">
                  <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                     <img src="https://i.pravatar.cc/150?img=68" alt="Profile" class="w-full h-full object-cover">
                  </div>
                  <div class="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <mat-icon class="text-white">edit</mat-icon>
                  </div>
                </div>
                <div class="flex-1">
                  <form [formGroup]="profileForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>First Name</mat-label>
                      <input matInput formControlName="firstName">
                    </mat-form-field>
                    
                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>Last Name</mat-label>
                      <input matInput formControlName="lastName">
                    </mat-form-field>
                    
                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>Email Address</mat-label>
                      <input matInput formControlName="email" type="email">
                    </mat-form-field>

                    <mat-form-field appearance="fill" class="w-full">
                      <mat-label>Phone Number</mat-label>
                      <input matInput formControlName="phone" type="tel">
                    </mat-form-field>

                     <mat-form-field appearance="fill" class="col-span-2">
                      <mat-label>Bio</mat-label>
                      <textarea matInput formControlName="bio" rows="4"></textarea>
                    </mat-form-field>
                  </form>
                  
                  <div class="mt-6 flex justify-end">
                    <button mat-raised-button color="primary" [disabled]="profileForm.pristine">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </mat-tab>

          <!-- App Settings -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">settings</mat-icon>
              Preferences
            </ng-template>
             <div class="p-8 max-w-2xl">
                <h2 class="text-xl font-bold mb-6 text-gray-800">Application Preferences</h2>
                
                <form [formGroup]="preferencesForm" class="flex flex-col gap-6">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 class="font-medium text-gray-800">Dark Mode</h3>
                            <p class="text-sm text-gray-500">Enable dark theme for the application</p>
                        </div>
                        <mat-slide-toggle formControlName="darkMode" color="primary"></mat-slide-toggle>
                    </div>

                    <mat-divider></mat-divider>

                    <mat-form-field appearance="outline">
                        <mat-label>Language</mat-label>
                        <mat-select formControlName="language">
                            <mat-option value="en">English (US)</mat-option>
                            <mat-option value="es">Spanish</mat-option>
                            <mat-option value="fr">French</mat-option>
                            <mat-option value="de">German</mat-option>
                        </mat-select>
                    </mat-form-field>

                     <mat-form-field appearance="outline">
                        <mat-label>Time Zone</mat-label>
                        <mat-select formControlName="timezone">
                            <mat-option value="utc">UTC</mat-option>
                            <mat-option value="est">EST (New York)</mat-option>
                            <mat-option value="pst">PST (Los Angeles)</mat-option>
                            <mat-option value="ist">IST (Mumbai)</mat-option>
                        </mat-select>
                    </mat-form-field>
                     
                     <div class="mt-4 flex justify-end">
                        <button mat-raised-button color="primary">Update Preferences</button>
                    </div>
                </form>
             </div>
          </mat-tab>

          <!-- Notifications -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">notifications</mat-icon>
              Notifications
            </ng-template>
             <div class="p-8 max-w-2xl">
                <h2 class="text-xl font-bold mb-6 text-gray-800">Notification Settings</h2>
                
                <form [formGroup]="notificationsForm" class="flex flex-col gap-4">
                     <div class="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                        <div class="flex items-center">
                             <mat-icon class="text-blue-500 mr-4">email</mat-icon>
                            <div>
                                <h3 class="font-medium text-gray-800">Email Notifications</h3>
                                <p class="text-sm text-gray-500">Receive weekly summaries and important alerts</p>
                            </div>
                        </div>
                        <mat-slide-toggle formControlName="emailAlerts" color="primary"></mat-slide-toggle>
                    </div>

                     <div class="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                        <div class="flex items-center">
                             <mat-icon class="text-purple-500 mr-4">campaign</mat-icon>
                            <div>
                                <h3 class="font-medium text-gray-800">Push Notifications</h3>
                                <p class="text-sm text-gray-500">Get real-time updates on approvals</p>
                            </div>
                        </div>
                        <mat-slide-toggle formControlName="pushAlerts" color="primary"></mat-slide-toggle>
                    </div>

                    <div class="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                         <div class="flex items-center">
                             <mat-icon class="text-green-500 mr-4">calendar_today</mat-icon>
                            <div>
                                <h3 class="font-medium text-gray-800">Reminders</h3>
                                <p class="text-sm text-gray-500">Remind me to submit timesheets</p>
                            </div>
                        </div>
                        <mat-slide-toggle formControlName="reminders" color="primary"></mat-slide-toggle>
                    </div>
                    
                    <div class="mt-6 flex justify-end">
                        <button mat-button color="warn">Reset to Defaults</button>
                        <button mat-raised-button color="primary" class="ml-4">Save Configuration</button>
                    </div>
                </form>
             </div>
          </mat-tab>

          <!-- Security -->
           <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">security</mat-icon>
              Security
            </ng-template>
            <div class="p-8 max-w-2xl">
                 <h2 class="text-xl font-bold mb-6 text-gray-800">Security Settings</h2>
                 <p class="mb-6 text-gray-600">Manage your password and security questions.</p>
                 
                 <button mat-stroked-button color="primary" class="w-full mb-4 !py-6 !text-lg !justify-start">
                    <mat-icon class="mr-4">lock</mat-icon>
                    Change Password
                 </button>
                 
                  <button mat-stroked-button class="w-full mb-4 !py-6 !text-lg !justify-start">
                    <mat-icon class="mr-4">phonelink_lock</mat-icon>
                    Two-Factor Authentication
                 </button>
            </div>
           </mat-tab>

        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    /* Custom styles if needed */
  `]
})
export class SettingsComponent {
  profileForm: FormGroup;
  preferencesForm: FormGroup;
  notificationsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567'],
      bio: ['Senior Developer working on the Timesheet application.']
    });

    this.preferencesForm = this.fb.group({
      darkMode: [false],
      language: ['en'],
      timezone: ['utc']
    });

    this.notificationsForm = this.fb.group({
      emailAlerts: [true],
      pushAlerts: [false],
      reminders: [true]
    });
  }
}
