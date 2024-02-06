import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccordianBodyElementComponent } from './components/accordian-body-element/accordian-body-element.component';
import { JobRoleAccordianComponent } from './components/job-role-accordian/job-role-accordian.component';

@Component({
  selector: 'walk-in-details',
  standalone: true,
  imports: [AccordianBodyElementComponent, JobRoleAccordianComponent, RouterModule],
  templateUrl: './walk-in-details.component.html',
  styleUrl: './walk-in-details.component.scss'
})
export class WalkInDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  walk_in_id: number;
  constructor() {
    this.walk_in_id = Number(this.route.snapshot.params['id']);
  }
}
