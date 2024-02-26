import { Injectable } from '@angular/core';
import { UserEducation } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserEducationalService {
  errorMessage: string | undefined = undefined;

  constructor() { }

  validateForm(userEducation: UserEducation) {
    if(!userEducation.aggregatePercentage) {
      return "Aggregate Percentage is invalid";
    }
    this.errorMessage = this.validateQualification(userEducation.qualification.id);
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    this.errorMessage = this.validateStream(userEducation.stream.id);
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    this.errorMessage = this.validateCollege(userEducation.college.id, userEducation.college.name, userEducation.college.location);
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    this.errorMessage = undefined;
    return this.errorMessage;
  }

  validateQualification(qualificationId: number) {
    if (qualificationId === 0) {
      return "Qualification is required";
    }
    return undefined;
  }

  validateStream(streamId: number) {
    if (streamId === 0) {
      return "Stream is required";
    }
    return undefined;
  }

  validateCollege(collegeId: number, collegeName: string, collegeLocation: string) {
    if (collegeId === 0) {
      if (!collegeName) {
        return "College Name is required";
      } else if (!collegeLocation) {
        return "College Location is required";
      }
    }
    return undefined;
  }
}
