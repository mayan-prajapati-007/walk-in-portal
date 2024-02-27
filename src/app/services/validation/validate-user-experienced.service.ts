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
    if (userExperience.applicantType === 2) {
      if(userExperience.yearsOfExperience === null || userExperience.yearsOfExperience === 0) {
        this.errorMessage = "Please enter years of experience";
        return this.errorMessage;
      }
      if(userExperience.currentCtc === null || userExperience.currentCtc === 0) {
        this.errorMessage = "Please enter current CTC";
        return this.errorMessage;
      }
      if(userExperience.expectedCtc === null || userExperience.expectedCtc === 0) {
        this.errorMessage = "Please enter expected CTC";
        return this.errorMessage;
      }
      if(userExperience.expertTechnologies === '' || !userExperience.expertTechnologies) {
        this.errorMessage = "Please select at least one expert technology";
        return this.errorMessage;
      }
      if(userExperience.onNoticePeriod == true) {
        if(userExperience.noticePeriodEndDate === null) {
          this.errorMessage = "Please enter notice period end date";
          return this.errorMessage;
        }
        if(userExperience.noticePeriodDuration === null || userExperience.noticePeriodDuration === 0) {
          this.errorMessage = "Please enter notice period duration";
          return this.errorMessage;
        }
      } else {
        userExperience.noticePeriodEndDate = null;
        userExperience.noticePeriodDuration = null;
      }
    }
    if(userExperience.knownTechnologies === '' || !userExperience.knownTechnologies) {
      this.errorMessage = "Please select at least one known technology";
      return this.errorMessage;
    }
    if(userExperience.appliedEarlier == true) {
      if(userExperience.appliedEarlierRole === null || userExperience.appliedEarlierRole === '') {
        this.errorMessage = "Please enter role";
        return this.errorMessage;
      }
    } else {
      userExperience.appliedEarlierRole = null;
    }
    this.errorMessage = undefined;
    return this.errorMessage;
  }
}
