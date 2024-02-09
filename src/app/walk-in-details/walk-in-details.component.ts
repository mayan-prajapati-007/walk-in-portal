import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccordianBodyElementComponent } from './components/accordian-body-element/accordian-body-element.component';
import { JobRoleAccordianComponent } from './components/job-role-accordian/job-role-accordian.component';
import { WalkInApplicationData } from '../interfaces/walk-in-application-data';
import { WalkInApplicationFormatService } from '../services/format/walk-in-application-format.service';
import { CommonModule, NgForOf } from '@angular/common';
import { JobRole } from '../interfaces/job-role';
import { JobRolesService } from '../services/data/job-roles.service';
import { WalkInApplicationsService } from '../services/data/walk-in-applications.service';
import { TimeSlot } from '../interfaces/time-slot';
import { TimeSlotsService } from '../services/data/time-slots.service';

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
  walkInApplication: WalkInApplicationData = {} as WalkInApplicationData;
  jobRoles: JobRole[] = [];
  timeSlots: TimeSlot[] = [];

  constructor(
    private walkInApplicationService: WalkInApplicationsService,
    private walkInApplicationFormatService: WalkInApplicationFormatService,
    private jobRolesService: JobRolesService,
    private timeSlotService: TimeSlotsService
  ) {
    this.walk_in_id = this.route.snapshot.params['id'];
    this.walkInApplicationService.getWalkInApplicationDataById(this.walk_in_id).then((walkInApplication) => {
      this.walkInApplication = this.formatData(walkInApplication);
      this.getJobRoles(walkInApplication);
      this.getTimeSlots(walkInApplication);
    });
    
  }

  getJobRoles(walkInApplication: WalkInApplicationData) {
    walkInApplication.job_roles.forEach((job_role) => {
      this.jobRolesService.getJobRoleDataById(job_role.toString()).then((jobRole) => {
        this.jobRoles.push(jobRole);
      });
    });
  }

  getTimeSlots(walkInApplication: WalkInApplicationData) {
    walkInApplication.time_slots.forEach((time_slot) => {
      this.timeSlotService.getTimeSlotDataById(time_slot.toString()).then((timeSlot) => {
        timeSlot.start_time = this.walkInApplicationFormatService.formatTime(timeSlot.start_time);
        timeSlot.end_time = this.walkInApplicationFormatService.formatTime(timeSlot.end_time);
        this.timeSlots.push(timeSlot);
      });
    });
  }

  formatData(data: WalkInApplicationData) {
    data.start_date = this.walkInApplicationFormatService.formatDate(new Date(data.start_date));
    data.end_date = this.walkInApplicationFormatService.formatDate(new Date(data.end_date));
    return data;
  }
}
