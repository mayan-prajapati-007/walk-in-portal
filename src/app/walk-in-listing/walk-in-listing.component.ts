import { Component } from '@angular/core';
import { WalkInSingleComponent } from './components/walk-in-single/walk-in-single.component';
import { NgForOf } from '@angular/common';
import { WalkInApplicationsService } from '../services/data/walk-in-applications.service';
import { WalkInApplicationList } from '../interfaces/walk-in-application-data';

@Component({
  selector: 'app-walk-in-listing',
  standalone: true,
  imports: [WalkInSingleComponent, NgForOf],
  templateUrl: './walk-in-listing.component.html',
  styleUrl: './walk-in-listing.component.scss'
})
export class WalkInListingComponent {
  walkInApplications: WalkInApplicationList[] = [];
  token: string | null = localStorage.getItem('token');

  constructor(private walkInApplicationService: WalkInApplicationsService) {
    if (this.token) {
      this.walkInApplicationService.getWalkInApplicationData(this.token).then((walkInApplications) => {
        if (walkInApplications === null) {
          window.location.href = '/login';
        }
        this.walkInApplications = walkInApplications;
      }).catch((error) => {
        console.error(error);
      });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      window.location.href = '/login';
    }
  }

  ngOnInit() {
    if (!this.token) {
      window.location.href = '/login';
    }
  }
}
