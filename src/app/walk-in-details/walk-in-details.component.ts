import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccordianBodyElementComponent } from './components/accordian-body-element/accordian-body-element.component';
import { JobRoleAccordianComponent } from './components/job-role-accordian/job-role-accordian.component';
import { WalkInApplicationDetails } from '../interfaces/walk-in-application-data';
import { WalkInApplicationFormatService } from '../services/format/walk-in-application-format.service';
import { CommonModule, NgForOf } from '@angular/common';
import { JobRole } from '../interfaces/job-role';
import { WalkInApplicationsService } from '../services/data/walk-in-applications.service';
import { TimeSlot } from '../interfaces/time-slot';
import { UserApplication } from '../interfaces/user-application';
import { UserApplicationService } from '../services/data/user-application.service';

@Component({
  selector: 'walk-in-details',
  standalone: true,
  imports: [AccordianBodyElementComponent, JobRoleAccordianComponent, RouterModule, CommonModule, NgForOf],
  templateUrl: './walk-in-details.component.html',
  styleUrl: './walk-in-details.component.scss'
})
export class WalkInDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  walk_in_id: string;
  walkInApplication: WalkInApplicationDetails = {} as WalkInApplicationDetails;
  jobRoles: JobRole[] = [];
  timeSlots: TimeSlot[] = [];
  formattedStartDate: string = '';
  formattedEndDate: string = '';
  token: string | null = localStorage.getItem('token');
  errorMessage: string | undefined = undefined;
  successMessage: string | undefined = undefined;

  userApplication: UserApplication = {} as UserApplication;

  constructor(
    private walkInApplicationService: WalkInApplicationsService,
    private walkInApplicationFormatService: WalkInApplicationFormatService,
    private userApplicationService: UserApplicationService
  ) {
    this.walk_in_id = this.route.snapshot.params['id'];
    if (this.token) {
      this.walkInApplicationService.getWalkInApplicationDataById(this.walk_in_id, this.token).then((walkInApplication) => {
        if (walkInApplication === null) {
          window.location.href = '/login';
        } else if (walkInApplication.errors) {
          window.location.href = '/';
        }
        this.walkInApplication = this.formatData(walkInApplication);
      });
    }
  }

  formatData(data: WalkInApplicationDetails) {
    this.formattedStartDate = this.walkInApplicationFormatService.formatDate(new Date(data.startDate));
    this.formattedEndDate = this.walkInApplicationFormatService.formatDate(new Date(data.endDate));
    return data;
  }

  ngOnInit() {
    if (!this.token) {
      window.location.href = '/login';
    }
  }

  handleTimeSlotSelection(timeSlotId: number) {
    this.walkInApplication.timeSlots.forEach((slot) => {
      if (slot.id === timeSlotId) {
        slot.selected = !slot.selected;
      } else {
        slot.selected = false;
      }
    });
  }

  handleJobRoleSelection(jobRoleId: number) {
    this.walkInApplication.jobRoles.forEach((role) => {
      if (role.jobRoleId === jobRoleId) {
        role.selected = !role.selected;
      }
    });
  }

  applyForJob() {
    var timeSlot = this.walkInApplication.timeSlots.find((timeSlot) => timeSlot.selected);
    if (!timeSlot) {
      this.errorMessage = 'Please select a time slot';
      this.clearErrorMessage();
      return;
    }
    this.userApplication.timeSlot = timeSlot;
    var jobRoles = this.walkInApplication.jobRoles.filter((role) => role.selected).map((role) => role.jobRoleId);
    if (jobRoles.length === 0) {
      this.errorMessage = 'Please select at least one job role';
      this.clearErrorMessage();
      return;
    }
    this.userApplication.jobRoles = jobRoles;
    this.userApplication.date = this.toDBDate(this.walkInApplication.startDate);
    this.userApplication.email = localStorage.getItem('email') ?? '';
    this.userApplication.resume = 'path/to/resume';
    this.userApplication.applicationId = +this.walkInApplication.id;
    this.userApplicationService.applyForApplication(this.userApplication).then((response) => {
      if (response.errors) {
        this.errorMessage = response.errors[0];
        this.clearErrorMessage();
      } else {
        this.successMessage = 'Application submitted successfully';
        this.clearErrorMessage();
        setTimeout(() => {
          window.location.href = '/applications';
        }, 1000);
      }
    });
  }

  toDBDate(date: string) {
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = (newDate.getMonth() + 1).toString();
    month = +month < 10 ? `0${month}` : `${month}`;
    let day = newDate.getDate().toString();
    day = +day < 10 ? `0${day}` : `${day}`;
    return `${year}-${month}-${day}`;
  }

  clearErrorMessage() {
    setTimeout(() => {
      this.errorMessage = undefined;
      this.successMessage = undefined;
    }, 1000);
  }
}
