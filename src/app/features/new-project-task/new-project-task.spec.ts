import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectTaskComponent } from './new-project-task';

describe('NewProjectTaskComponent', () => {
  let component: NewProjectTaskComponent;
  let fixture: ComponentFixture<NewProjectTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProjectTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
