import { Component } from '@angular/core';
import { WalkInSingleComponent } from './components/walk-in-single/walk-in-single.component';
import { WalkInApplicationData } from '../interfaces/walk-in-application-data';
import { NgForOf } from '@angular/common';
import { WalkInApplicationsService } from '../services/data/walk-in-applications.service';

@Component({
  selector: 'app-walk-in-listing',
  standalone: true,
  imports: [WalkInSingleComponent, NgForOf],
  templateUrl: './walk-in-listing.component.html',
  styleUrl: './walk-in-listing.component.scss'
})
export class WalkInListingComponent {
  walkInApplications: WalkInApplicationData[] = [];

  constructor(private walkInApplicationService: WalkInApplicationsService) {
    this.walkInApplicationService.getWalkInApplicationData().then((walkInApplications) => {
      this.walkInApplications = walkInApplications;
    });
  }
}
