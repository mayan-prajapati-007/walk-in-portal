import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data/form-data.service';
import { CommonModule } from '@angular/common';
import { RegistrationDataService } from '../../../../../services/authentication/registration-data.service';

@Component({
  selector: 'professional-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professional-form.component.html',
  styleUrl: './professional-form.component.scss'
})
export class ProfessionalFormComponent {
  technologies: any = [];

  applicantType: string | undefined = undefined;
  selectedKnownTechnologies: string = '';
  selectedExpertTechnologies: string = '';
  disabledAppliedEarlier: boolean = true;

  ngOnInit() {
    this.technologies = FormDataService.Technologies;
  }

  constructor(
    private formDataService: FormDataService,
    private registrationDataService: RegistrationDataService
  ) {}

  handleApplicantTypeChange(event: any) {
    this.applicantType = event.target.value;
    if(this.applicantType === 'fresher') {
      this.registrationDataService.userExperience.applicantType = 1;
    } else if (this.applicantType === 'experienced'){
      this.registrationDataService.userExperience.applicantType = 2;
    } else {
      this.registrationDataService.userExperience.applicantType = 0;
    }
  }

  onChangesText(event: any) {
    this.registrationDataService.userExperience = {
      ...this.registrationDataService.userExperience,
      [event.name]: event.value
    };
  }

  handleExpertTechnologies(event: any){
    if(this.selectedExpertTechnologies == '') {
      this.selectedExpertTechnologies = event.target.value;
    } else if (event.target.value === '0') {
    } else {
      if(this.selectedExpertTechnologies.includes(","+event.target.value)) {
        this.selectedExpertTechnologies = this.selectedExpertTechnologies.replace(","+event.target.value, '');
      } else if(this.selectedExpertTechnologies.includes(event.target.value)) {
        this.selectedExpertTechnologies = this.selectedExpertTechnologies.replace(event.target.value, '');
      } else {
        this.selectedExpertTechnologies = this.selectedExpertTechnologies.concat(',', event.target.value);
      }
    }
    this.registrationDataService.userExperience.expertTechnologies = this.selectedExpertTechnologies;
  }

  handleKnownTechnologies(event: any){
    if(this.selectedKnownTechnologies == '') {
      this.selectedKnownTechnologies = event.target.value;
    } else if (event.target.value === '0') {
    } else {
      if(this.selectedKnownTechnologies.includes(","+event.target.value)) {
        this.selectedKnownTechnologies = this.selectedKnownTechnologies.replace(","+event.target.value, '');
      } else if(this.selectedKnownTechnologies.includes(event.target.value)) {
        this.selectedKnownTechnologies = this.selectedKnownTechnologies.replace(event.target.value, '');
      } else {
        this.selectedKnownTechnologies = this.selectedKnownTechnologies.concat(',', event.target.value);
      }
    }
    this.registrationDataService.userExperience.knownTechnologies = this.selectedKnownTechnologies;
  }

  toggleAppliedEarlier(event: any) {
    if(event.target.value == "appliedY") {
      this.disabledAppliedEarlier = false;
      this.registrationDataService.userExperience.appliedEarlier = true;
    } else if (event.target.value == "appliedN"){
      this.registrationDataService.userExperience.appliedEarlier = false;
      this.disabledAppliedEarlier = true;
    }
  }

  toggleNoticePeriod(event: any) {
    if(event.target.value == "noticeY") {
      this.registrationDataService.userExperience.onNoticePeriod = true;
    } else if (event.target.value == "noticeN"){
      this.registrationDataService.userExperience.onNoticePeriod = false;
    }
  }
}
