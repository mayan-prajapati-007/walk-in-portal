import { Component, Input } from '@angular/core';
import { UserPersonal } from '../../../../../interfaces/user';
import { FormDataService } from '../../../../services/form-data/form-data.service';
import { CommonModule } from '@angular/common';
import { RegistrationDataService } from '../../../../../services/authentication/registration-data.service';
import { JobRole } from '../../../../../interfaces/job-role';


@Component({
  selector: 'personal-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss'
})
export class PersonalFormComponent {
  
  userPersonal: UserPersonal = {} as UserPersonal;
  jobRoles: any[] = [];
  selectedJobRoles: { id:number, name: string }[] = [];
  errorMessage: string | undefined = undefined;
  
  ngOnInit(){
    this.getJobRoles();
  }

  getJobRoles() {
    this.formDataService.getJobRoles().then((res) => {
      this.jobRoles = res;
    });
  }

  constructor(
    private formDataService: FormDataService,
    private registrationDataService: RegistrationDataService
  ) {}

  onChangesText(event: any) {
    this.registrationDataService.userPersonal = {
      ...this.registrationDataService.userPersonal,
      [event.name]: event.value
    };
  }

  handleJobRoleSelection(jobRoleIdx: number) {
    let jobRole = this.jobRoles[jobRoleIdx - 1];
    if(this.selectedJobRoles.includes(jobRole)) {
      this.selectedJobRoles = this.selectedJobRoles.filter((role) => role.id !== jobRole.id);
    } else {
      this.selectedJobRoles.push(jobRole);
    }
    this.registrationDataService.userPersonal.jobRoles = this.selectedJobRoles;
  }
  
  handleEmailSubscription(event: any) {
    this.registrationDataService.userPersonal.emailSubscription = event.target.checked;
  }

}
