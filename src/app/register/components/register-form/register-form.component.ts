import { Component } from '@angular/core';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [StatusBarComponent, PersonalFormComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

}
