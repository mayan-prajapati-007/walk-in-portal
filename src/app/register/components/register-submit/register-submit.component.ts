import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormStatusService } from '../../services/form-status/form-status.service';

@Component({
  selector: 'register-submit',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './register-submit.component.html',
  styleUrl: './register-submit.component.scss'
})
export class RegisterSubmitComponent {
  constructor(private formStatusService: FormStatusService) {}

  isReviewed() {
    if (this.formStatusService.getFormStatus() === 2) {
      return true;
    }
    return false;
  }
}
