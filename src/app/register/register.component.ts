import { Component } from '@angular/core';
import { RegisterSubmitComponent } from './components/register-submit/register-submit.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { Subject, Subscription } from 'rxjs';
import { FormStatusService } from './services/form-status/form-status.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterSubmitComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  n = 2;
  eventSubject: Subject<void> = new Subject<void>();
  personalFormSubmissionSignal: Subject<void> = new Subject<void>();

  emitEventChild() {
    // this.eventSubject.next();
    this.personalFormSubmissionSignal.next();
  }

  constructor(private formStatusService: FormStatusService) {}









  // Handling the form submission
  submitForm(s: any) : void {
    console.log(s);
    console.log(this.n);
    console.log("Form submitted");
  }

  // Handling the form status
  getFormStatus() {
    return this.formStatusService.getFormStatus();
  }

  nextForm() {
    this.formStatusService.nextForm();
    window.scrollTo(0, 0);
  }

  previousForm() {
    this.formStatusService.previousForm();
    window.scrollTo(0, 0);
  }
}
