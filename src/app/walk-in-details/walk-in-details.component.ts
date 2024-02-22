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
  token: string | null = localStorage.getItem('token');

  constructor(
    private walkInApplicationService: WalkInApplicationsService,
    private walkInApplicationFormatService: WalkInApplicationFormatService
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
    data.startDate = this.walkInApplicationFormatService.formatDate(new Date(data.startDate));
    data.endDate = this.walkInApplicationFormatService.formatDate(new Date(data.endDate));
    return data;
  }

  ngOnInit() {
    if (!this.token) {
      window.location.href = '/login';
    }
  }
}
