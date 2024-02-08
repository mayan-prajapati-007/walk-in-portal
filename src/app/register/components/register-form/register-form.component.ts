import { Component } from '@angular/core';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { EducationalFormComponent } from './components/educational-form/educational-form.component';
import { ProfessionalFormComponent } from './components/professional-form/professional-form.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { CommonModule } from '@angular/common';
import { FormStatusService } from '../../services/form-status/form-status.service';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [StatusBarComponent, PersonalFormComponent, EducationalFormComponent, ProfessionalFormComponent, ReviewFormComponent, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  constructor(private formStatusService: FormStatusService) {}

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
