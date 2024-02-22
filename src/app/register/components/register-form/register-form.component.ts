import { Component, Input } from '@angular/core';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { EducationalFormComponent } from './components/educational-form/educational-form.component';
import { ProfessionalFormComponent } from './components/professional-form/professional-form.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { CommonModule } from '@angular/common';
import { FormStatusService } from '../../services/form-status/form-status.service';
import { Observable, Subscription } from 'rxjs';

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
  @Input() events: Observable<void> = new Observable<void>();
  @Input() personalFormSubmissionEvent: Observable<void> = new Observable<void>();

  private eventsSubscription: Subscription = new Subscription();
  constructor(
    private formStatusService: FormStatusService
    ) { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => {
      console.log("Hola");
    });
  }


}
