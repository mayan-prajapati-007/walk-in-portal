import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data/form-data.service';

@Component({
  selector: 'educational-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './educational-form.component.html',
  styleUrl: './educational-form.component.scss'
})
export class EducationalFormComponent {

  yearsOfPassing: any = [];
  qualifications: any = [];
  streams: any = [];
  colleges: any = [];
  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.yearsOfPassing = FormDataService.years;
    this.getQualifications();
    this.getStreams();
    this.getColleges();
  }

  getQualifications() {
    this.formDataService.getQualifications().then((res) => {
      this.qualifications = res;
    });
  }

  getStreams() {
    this.formDataService.getStreams().then((res) => {
      this.streams = res;
      console.log(res);
    });
  }

  getColleges() {
    this.formDataService.getColleges().then((res) => {
      this.colleges = res;
    });
  }
}
