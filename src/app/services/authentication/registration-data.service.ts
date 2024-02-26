import { Injectable } from '@angular/core';
import { User, UserEducation, UserExperience, UserPersonal, UserReview } from '../../interfaces/user';
import { ValidateUserPersonalService } from '../validation/validate-user-personal.service';
import { ValidateUserEducationalService } from '../validation/validate-user-educational.service';
import { ValidateUserExperiencedService } from '../validation/validate-user-experienced.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {

  // user: User = {} as User;

  user: UserReview = {} as UserReview;

  userPersonal: UserPersonal = {} as UserPersonal;

  userEducation: UserEducation = {} as UserEducation;

  userExperience: UserExperience = {} as UserExperience;

  constructor(
    private validateUserPersonalService: ValidateUserPersonalService,
    private validateUserEducationService: ValidateUserEducationalService,
    private validateUserExperienceService: ValidateUserExperiencedService
  ) { }

  copyUserPersonalData() {
    console.log(this.userPersonal);
    var erroMessage = this.validateUserPersonalService.validateForm(this.userPersonal);
    if (erroMessage) {
      return erroMessage;
    }
    this.user.email = this.userPersonal.email;
    this.user.password = this.userPersonal.email.split('@')[0];
    this.user.role = 2;
    this.user.profileImage = "path/to/image.jpg";
    this.user.firstName = this.userPersonal.firstName;
    this.user.lastName = this.userPersonal.lastName;
    this.user.phone = this.userPersonal.phone;
    this.user.jobRoles = this.userPersonal.jobRoles;
    this.user.resume = "path/to/resume.pdf";
    this.user.portfolio = this.userPersonal.portfolio;
    this.user.refEmpName = this.userPersonal.refEmpName;
    this.user.emailSubscription = this.userPersonal.emailSubscription;
    console.log(this.user);
    return null;
  }

  copyUserEducationData() {
    if(!this.userEducation.yearOfPassing) {
      this.userEducation.yearOfPassing = 2010;
    }
    this.userEducation.yearOfPassing = +this.userEducation.yearOfPassing;
    this.userEducation.aggregatePercentage = +this.userEducation.aggregatePercentage;
    var erroMessage = this.validateUserEducationService.validateForm(this.userEducation);
    if (erroMessage) {
      return erroMessage;
    }
    this.user.college = this.userEducation.college;
    this.user.qualification = this.userEducation.qualification;
    this.user.stream = this.userEducation.stream;
    this.user.yearOfPassing = this.userEducation.yearOfPassing;
    this.user.aggregatePercentage = this.userEducation.aggregatePercentage;

    console.log(this.user);
    return null;
  }

  copyUserExperienceData() {
    console.log(this.userExperience)
    if(!this.userExperience.applicantType) {
      this.userExperience.applicantType = 0;
    }
    if(!this.userExperience.yearsOfExperience) {
      this.userExperience.yearsOfExperience = 0;
    }
    this.userExperience.yearsOfExperience = +this.userExperience.yearsOfExperience;
    console.log(this.userExperience)
    var erroMessage = this.validateUserExperienceService.validateForm(this.userExperience);
    if (erroMessage) {
      console.log(erroMessage)
      return erroMessage;
    }
    this.user.applicantType = this.userExperience.applicantType;
    this.user.appliedEarlier = this.userExperience.appliedEarlier;
    this.user.knownTechnologies = this.userExperience.knownTechnologies;
    this.user.expertTechnologies = this.userExperience.expertTechnologies;
    this.user.yearsOfExperience = this.userExperience.yearsOfExperience;
    this.user.currentCtc = this.userExperience.currentCtc;
    this.user.expectedCtc = this.userExperience.expectedCtc;
    this.user.noticePeriodEndDate = this.userExperience.noticePeriodEndDate;
    this.user.noticePeriodDuration = this.userExperience.noticePeriodDuration;

    console.log(this.user);
    return null;
  }

  getUser() {
    return this.user;
  }
}
