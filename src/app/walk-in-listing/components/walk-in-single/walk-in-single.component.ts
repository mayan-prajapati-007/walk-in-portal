import { Component, Inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WalkInApplicationList } from '../../../interfaces/walk-in-application-data';
import { CommonModule, NgForOf } from '@angular/common';
import { WalkInApplicationFormatService } from '../../../services/format/walk-in-application-format.service';
import { JobRole } from '../../../interfaces/job-role';

@Component({
  selector: 'walk-in-single',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './walk-in-single.component.html',
  styleUrl: './walk-in-single.component.scss'
})
export class WalkInSingleComponent {
  @Input() walkInApplication!: WalkInApplicationList;
  jobRoles: JobRole[] = [];
  expiryDays: number = 0;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(
    private walkInApplicationFormatService: WalkInApplicationFormatService,
  ) { }

  ngOnInit() {
    this.expiryDays = this.walkInApplicationFormatService.calculateExpiryDays(this.walkInApplication.expiryDate);
    this.walkInApplication.startDate = this.walkInApplicationFormatService.formatDate(new Date(this.walkInApplication.startDate));
    this.walkInApplication.endDate = this.walkInApplicationFormatService.formatDate(new Date(this.walkInApplication.endDate));
  }
}
