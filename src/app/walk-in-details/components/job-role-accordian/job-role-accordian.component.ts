import { Component } from '@angular/core';
import { AccordianBodyElementComponent } from '../accordian-body-element/accordian-body-element.component';

@Component({
  selector: 'job-role-accordian',
  standalone: true,
  imports: [AccordianBodyElementComponent],
  templateUrl: './job-role-accordian.component.html',
  styleUrl: './job-role-accordian.component.scss'
})
export class JobRoleAccordianComponent {

}
