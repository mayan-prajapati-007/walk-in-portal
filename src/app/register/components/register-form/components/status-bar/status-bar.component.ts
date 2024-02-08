import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormStatusService } from '../../../../services/form-status/form-status.service';

@Component({
  selector: 'status-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss'
})
export class StatusBarComponent {
  constructor(private formStatusService: FormStatusService) {}
  getFormStatus() {
    return this.formStatusService.getFormStatus();
  }
}
