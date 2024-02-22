import { Component, Input } from '@angular/core';
import { AccordianBodyElementComponent } from '../accordian-body-element/accordian-body-element.component';
import { JobRole } from '../../../interfaces/job-role';
import { CommonModule } from '@angular/common';
import { elementAt } from 'rxjs';

@Component({
  selector: 'job-role-accordian',
  standalone: true,
  imports: [AccordianBodyElementComponent, CommonModule],
  templateUrl: './job-role-accordian.component.html',
  styleUrl: './job-role-accordian.component.scss'
})
export class JobRoleAccordianComponent {
  @Input() jobRole!: JobRole;
  gross_compensation_package!: string;
  isActive: boolean = false;

  ngOnInit() {
    this.gross_compensation_package = this.jobRole.grossCompensationPackage.toLocaleString('en-IN');
  }

  toggleAccordian() {
    this.isActive = !this.isActive;
  }
}
