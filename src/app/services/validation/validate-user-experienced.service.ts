import { Injectable } from '@angular/core';
import { UserExperience } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserExperiencedService {
  errorMessage: string | undefined = undefined;

  constructor() { }

  validateForm(userExperience: UserExperience) {
    if(userExperience.applicantType === 0) {
      this.errorMessage = "Please select an applicant type";
      return this.errorMessage;
    }
    if(!userExperience.yearsOfExperience || userExperience.yearsOfExperience === 0) {
      this.errorMessage = "Please enter years of experience";
      return this.errorMessage;
    }
    this.errorMessage = undefined;
    return this.errorMessage;
  }
}
