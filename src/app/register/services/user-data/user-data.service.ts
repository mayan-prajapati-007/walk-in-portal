import { Injectable } from '@angular/core';
import { User } from '../../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: User = {
    id: 0,
    email: '',
    password: '',
    role: 0,
    profileImage: '',
    firstName: '',
    lastName: '',
    phone: '',
    jobRoles: [],
    resume: '',
    portfolio: '',
    refEmpName: '',
    emailSubscription: false,
    collegeId: 0,
    collegeName: '',
    collegeLocation: '',
    qualificationId: 0,
    streamId: 0,
    yearOfPassing: 0,
    aggregatePercentage: 0,
    applicantType: 0,
    appliedEarlier: '',
    knownTechnologies: '',
    expertTechnologies: '',
    yearsOfExperience: 0,
    currentCtc: 0,
    expectedCtc: 0,
    noticePeriodEndDate: new Date(),
    noticePeriodDuration: 0
  };

  getUser() {
    return this.user;
  }

  constructor() { }
}
