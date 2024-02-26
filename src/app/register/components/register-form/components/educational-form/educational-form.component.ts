import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data/form-data.service';
import { RegistrationDataService } from '../../../../../services/authentication/registration-data.service';

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
  selectedCollegeName: string = '';
  selectedCollegeLocation: string = '';

  constructor(
    private formDataService: FormDataService,
    private registrationDataService: RegistrationDataService
  ) { }

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

  onChangesText(event: any) {
    if (event.name == 'collegeName') {
      this.registrationDataService.userEducation.college = {
        ...this.registrationDataService.userEducation.college,
        id: 0,
        name: event.value
      };
      this.selectedCollegeLocation = '';
    }
    this.registrationDataService.userEducation = {
      ...this.registrationDataService.userEducation,
      [event.name]: event.value
    };
  }

  handleQualificationSelection(event: any) {
    let selectedQualification = this.qualifications.find((qualification: { id: number; }) => qualification.id === +event.target.value);
    this.registrationDataService.userEducation.qualification = {
      id: selectedQualification.id,
      name: selectedQualification.name
    };
  }

  handleStreamSelection(event: any) {
    let selectedStream = this.streams.find((stream: { id: number; }) => stream.id === +event.target.value);
    this.registrationDataService.userEducation.stream = {
      id: selectedStream.id,
      name: selectedStream.name
    }
  }

  handleCollegeSelection(event: any) {
    let selectedCollege = this.colleges.find((college: { id: number; }) => college.id === +event.target.value);
    if (selectedCollege) {
      this.registrationDataService.userEducation.college = {
        id: selectedCollege.id,
        name: selectedCollege.name,
        location: selectedCollege.location
      };
    }
  }
}
