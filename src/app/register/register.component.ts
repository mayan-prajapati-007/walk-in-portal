import { Component } from '@angular/core';
import { RegisterSubmitComponent } from './components/register-submit/register-submit.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { Subject, Subscription } from 'rxjs';
import { FormStatusService } from './services/form-status/form-status.service';
import { User, UserPersonal } from '../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterSubmitComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  personalFormSubmissionSignal: Subject<void> = new Subject<void>();
  user: User = {} as User;

  copyUserPersonal() {
    console.log("personal form data copied");
  }

  emitPersonalFormSubmissionSignal() {
    console.log("Inside emitPersonalFormSubmissionSignal()-------")
    this.personalFormSubmissionSignal.next();
  }

  constructor(private formStatusService: FormStatusService) {
    
  }


  ngOnInit() {
    this.user = {
      id: 0,
      email: '',
      password: '',
      role: 2,
      profileImage: null,
      firstName: '',
      lastName: '',
      phone: null,
      jobRoles: [],
      resume: null,
      portfolio: null,
      refEmpName: null,
      emailSubscription: false,
      collegeId: 0,
      collegeName: '',
      collegeLocation: '',
      qualificationId: 0,
      streamId: 0,
      yearOfPassing: 0,
      aggregatePercentage: 0,
      applicantType: 0,
      appliedEarlier: null,
      knownTechnologies: null,
      expertTechnologies: null,
      yearsOfExperience: null,
      currentCtc: null,
      expectedCtc: null,
      noticePeriodEndDate: null,
      noticePeriodDuration: null
    }
  }








  // Handling the form submission
  submitForm(s: any) : void {
    console.log("Form submitted");
  }

  // Handling the form status
  getFormStatus() {
    return this.formStatusService.getFormStatus();
  }

  nextForm() {
    console.log("clicked on next button");
    console.log("emmitting personal form submission signal");
    this.emitPersonalFormSubmissionSignal();
    console.log("emitted personal form submission signal");
    console.log("moving to next form");
    this.formStatusService.nextForm();
    window.scrollTo(0, 0);
  }

  previousForm() {
    this.formStatusService.previousForm();
    window.scrollTo(0, 0);
  }
}
