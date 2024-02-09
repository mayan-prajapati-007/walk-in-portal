import { Component, Inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WalkInApplicationData } from '../../../interfaces/walk-in-application-data';
import { CommonModule, NgForOf } from '@angular/common';
import { WalkInApplicationFormatService } from '../../../services/format/walk-in-application-format.service';
import { JobRolesService } from '../../../services/data/job-roles.service';
import { JobRole } from '../../../interfaces/job-role';

@Component({
  selector: 'walk-in-single',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './walk-in-single.component.html',
  styleUrl: './walk-in-single.component.scss'
})
export class WalkInSingleComponent {
  @Input() walkInApplication!: WalkInApplicationData;
  jobRoles: JobRole[] = [];
  expiryDays: number = 0;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(
    private walkInApplicationFormatService: WalkInApplicationFormatService,
    private jobRolesService: JobRolesService
  ) { }

  ngOnInit() {
    this.expiryDays = this.walkInApplicationFormatService.calculateExpiryDays(this.walkInApplication.expiry_date);
    this.walkInApplication.start_date = this.walkInApplicationFormatService.formatDate(new Date(this.walkInApplication.start_date));
    this.walkInApplication.end_date = this.walkInApplicationFormatService.formatDate(new Date(this.walkInApplication.end_date));
    this.walkInApplication.job_roles.forEach((job_role) => {
      this.jobRolesService.getJobRoleDataById(job_role.toString()).then((jobRole) => {
        this.jobRoles.push(jobRole);
      });
    });
  }
}
