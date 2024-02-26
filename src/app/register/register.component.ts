import { Component } from '@angular/core';
import { RegisterSubmitComponent } from './components/register-submit/register-submit.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { Subject, Subscription } from 'rxjs';
import { FormStatusService } from './services/form-status/form-status.service';
import { User, UserPersonal } from '../interfaces/user';
import { RegistrationDataService } from '../services/authentication/registration-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterSubmitComponent, RegisterFormComponent, CommonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [FormStatusService, RegistrationDataService]
})
export class RegisterComponent {

  errorMessage: string | undefined = undefined;
  successMessage: string | undefined = undefined;

  constructor(
    private formStatusService: FormStatusService,
    private registrationDataService: RegistrationDataService
  ) { }


  // Handling the form submission
  submitForm(s: any) : void {
    console.log("Form submitted");
  }

  // Handling the form status
  getFormStatus() {
    return this.formStatusService.getFormStatus();
  }

  nextForm() {
    var formStatus = this.formStatusService.getFormStatus();
    if(formStatus === 0) { // If the form is the first form
      var erroMessage = this.registrationDataService.copyUserPersonalData();
      if (erroMessage) {
        alert(erroMessage);
        return;
      }
    } else if(formStatus === 1) { // If the form is the second form
      var erroMessage = this.registrationDataService.copyUserEducationData();
      if (erroMessage) {
        alert(erroMessage);
        return;
      }
      erroMessage = this.registrationDataService.copyUserExperienceData();
      if (erroMessage) {
        alert(erroMessage);
        return;
      }
    }
    this.formStatusService.nextForm();
    window.scrollTo(0, 0);
  }

  previousForm() {
    this.formStatusService.previousForm();
    window.scrollTo(0, 0);
  }
}
