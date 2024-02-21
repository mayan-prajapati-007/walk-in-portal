import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'professional-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professional-form.component.html',
  styleUrl: './professional-form.component.scss'
})
export class ProfessionalFormComponent {
  technologies: any = [];

  ngOnInit() {
    this.technologies = FormDataService.Technologies;
  }

  constructor() {}
}
