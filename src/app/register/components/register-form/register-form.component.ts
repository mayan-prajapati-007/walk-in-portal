import { Component, Input } from '@angular/core';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { EducationalFormComponent } from './components/educational-form/educational-form.component';
import { ProfessionalFormComponent } from './components/professional-form/professional-form.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { CommonModule } from '@angular/common';
import { FormStatusService } from '../../services/form-status/form-status.service';
import { RegistrationDataService } from '../../../services/authentication/registration-data.service';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [StatusBarComponent, PersonalFormComponent, EducationalFormComponent, ProfessionalFormComponent, ReviewFormComponent, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  @Input() getFormStatus: () => number = () => 0;
  @Input() nextForm: () => void = () => {};
  @Input() previousForm: () => void = () => {};

  constructor(private formStatusService: FormStatusService, private registrationDataService: RegistrationDataService) { }


}
