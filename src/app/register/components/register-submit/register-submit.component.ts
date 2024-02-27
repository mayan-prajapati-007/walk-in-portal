import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormStatusService } from '../../services/form-status/form-status.service';
import { RegistrationDataService } from '../../../services/authentication/registration-data.service';

@Component({
  selector: 'register-submit',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './register-submit.component.html',
  styleUrl: './register-submit.component.scss'
})
export class RegisterSubmitComponent {
  @Input() submitForm: () => void = () => {};

  constructor(private formStatusService: FormStatusService, private registrationDataService: RegistrationDataService) {}

  isReviewed() {
    if (this.formStatusService.getFormStatus() === 2) {
      return true;
    }
    return false;
  }
}
