import { Component } from '@angular/core';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { EducationalFormComponent } from './educational-form/educational-form.component';
import { ProfessionalFormComponent } from './professional-form/professional-form.component';
import { ReviewFormComponent } from './review-form/review-form.component';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [StatusBarComponent, PersonalFormComponent, EducationalFormComponent, ProfessionalFormComponent, ReviewFormComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

}
