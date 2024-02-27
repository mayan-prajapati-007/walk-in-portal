import { Injectable } from '@angular/core';
import { User, UserEducation, UserExperience, UserPersonal, UserReview } from '../../interfaces/user';
import { ValidateUserPersonalService } from '../validation/validate-user-personal.service';
import { ValidateUserEducationalService } from '../validation/validate-user-educational.service';
import { ValidateUserExperiencedService } from '../validation/validate-user-experienced.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {

  user: User = {} as User;

  userReview: UserReview = {} as UserReview;

  userPersonal: UserPersonal = {} as UserPersonal;

  userEducation: UserEducation = {} as UserEducation;

  userExperience: UserExperience = {} as UserExperience;

  constructor(
    private validateUserPersonalService: ValidateUserPersonalService,
    private validateUserEducationService: ValidateUserEducationalService,
    private validateUserExperienceService: ValidateUserExperiencedService,
    private authenticationService: AuthenticationService
  ) { }

  copyUserPersonalData() {
    var erroMessage = this.validateUserPersonalService.validateForm(this.userPersonal);
    if (erroMessage) {
      return erroMessage;
    }
    this.userReview.email = this.userPersonal.email;
    this.userReview.password = this.userPersonal.email.split('@')[0];
    this.userReview.role = 2;
    this.userReview.profileImage = "path/to/image.jpg";
    this.userReview.firstName = this.userPersonal.firstName;
    this.userReview.lastName = this.userPersonal.lastName;
    this.userReview.phone = this.userPersonal.phone;
    this.userReview.jobRoles = this.userPersonal.jobRoles;
    this.userReview.resume = "path/to/resume.pdf";
    this.userReview.portfolio = this.userPersonal.portfolio;
    this.userReview.refEmpName = this.userPersonal.refEmpName;
    this.userReview.emailSubscription = this.userPersonal.emailSubscription;
    return null;
  }

  copyUserEducationData() {
    this.userEducation.yearOfPassing = +this.userEducation.yearOfPassing;
    this.userEducation.aggregatePercentage = +this.userEducation.aggregatePercentage;
    var erroMessage = this.validateUserEducationService.validateForm(this.userEducation);
    if (erroMessage) {
      return erroMessage;
    }
    this.userReview.college = this.userEducation.college;
    this.userReview.qualification = this.userEducation.qualification;
    this.userReview.stream = this.userEducation.stream;
    this.userReview.yearOfPassing = this.userEducation.yearOfPassing;
    this.userReview.aggregatePercentage = this.userEducation.aggregatePercentage;
    return null;
  }

  copyUserExperienceData() {
    if (!this.userExperience.applicantType) {
      this.userExperience.applicantType = 0;
    }
    if(!this.userExperience.onNoticePeriod) {
      this.userExperience.onNoticePeriod = false;
    }
    if(!this.userExperience.appliedEarlier) {
      this.userExperience.appliedEarlier = false;
    }
    this.userExperience.yearsOfExperience = this.userExperience.yearsOfExperience ? +this.userExperience.yearsOfExperience : null;
    this.userExperience.currentCtc = this.userExperience.currentCtc ? +this.userExperience.currentCtc : null;
    this.userExperience.expectedCtc = this.userExperience.expectedCtc ? +this.userExperience.expectedCtc : null;
    this.userExperience.noticePeriodDuration = this.userExperience.noticePeriodDuration ? +this.userExperience.noticePeriodDuration : null;
    var erroMessage = this.validateUserExperienceService.validateForm(this.userExperience);
    if (erroMessage) {
      return erroMessage;
    }
    this.userReview.applicantType = this.userExperience.applicantType;
    this.userReview.appliedEarlier = this.userExperience.appliedEarlier;
    this.userReview.knownTechnologies = this.userExperience.knownTechnologies;
    this.userReview.expertTechnologies = this.userExperience.expertTechnologies;
    this.userReview.yearsOfExperience = this.userExperience.yearsOfExperience;
    this.userReview.currentCtc = this.userExperience.currentCtc;
    this.userReview.expectedCtc = this.userExperience.expectedCtc;
    this.userReview.noticePeriodEndDate = this.userExperience.noticePeriodEndDate;
    this.userReview.noticePeriodDuration = this.userExperience.noticePeriodDuration;
    return null;
  }

  copyUserReviewData() {
    this.user.id = 0;
    this.user.email = this.userReview.email;
    this.user.password = this.userReview.password;
    this.user.role = this.userReview.role;
    this.user.profileImage = this.userReview.profileImage;
    this.user.firstName = this.userReview.firstName;
    this.user.lastName = this.userReview.lastName;
    this.user.phone = this.userReview.phone;
    this.user.jobRoles = this.userReview.jobRoles.map(jobRole => jobRole.id);
    this.user.resume = this.userReview.resume;
    this.user.portfolio = this.userReview.portfolio;
    this.user.refEmpName = this.userReview.refEmpName;
    this.user.emailSubscription = this.userReview.emailSubscription;
    this.user.collegeId = this.userReview.college.id;
    this.user.collegeName = this.userReview.college.name;
    this.user.collegeLocation = this.userReview.college.location;
    this.user.qualificationId = this.userReview.qualification.id;
    this.user.streamId = this.userReview.stream.id;
    this.user.yearOfPassing = this.userReview.yearOfPassing;
    this.user.aggregatePercentage = this.userReview.aggregatePercentage;
    this.user.applicantType = this.userReview.applicantType;
    this.user.appliedEarlier = this.userReview.appliedEarlierRole;
    this.user.knownTechnologies = this.userReview.knownTechnologies;
    this.user.expertTechnologies = this.userReview.expertTechnologies;
    this.user.yearsOfExperience = this.userReview.yearsOfExperience;
    this.user.currentCtc = this.userReview.currentCtc;
    this.user.expectedCtc = this.userReview.expectedCtc;
    this.user.noticePeriodEndDate = this.userReview.noticePeriodEndDate;
    this.user.noticePeriodDuration = this.userReview.noticePeriodDuration;
  }

  registerUser() {
    return this.authenticationService.register(this.user);
  }

  getUser() {
    return this.userReview;
  }
}
