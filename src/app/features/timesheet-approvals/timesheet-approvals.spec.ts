import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetApprovals } from './timesheet-approvals';

describe('TimesheetApprovals', () => {
  let component: TimesheetApprovals;
  let fixture: ComponentFixture<TimesheetApprovals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetApprovals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetApprovals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
