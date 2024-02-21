import { Component } from '@angular/core';
import { RegisterSubmitComponent } from './components/register-submit/register-submit.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterSubmitComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  eventSubject: Subject<void> = new Subject<void>();

  emitEventChild() {
    this.eventSubject.next();
  }
}
