import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRoleAccordianComponent } from './job-role-accordian.component';

describe('JobRoleAccordianComponent', () => {
  let component: JobRoleAccordianComponent;
  let fixture: ComponentFixture<JobRoleAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobRoleAccordianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobRoleAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
