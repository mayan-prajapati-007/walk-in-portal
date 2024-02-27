import { Injectable } from '@angular/core';
import { UserApplication } from '../../interfaces/user-application';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApplicationService {

  private API_URL = environment.API_URL;

  userApplication: UserApplication = {} as UserApplication;

  setUserApplication(userApplication: UserApplication) {
    this.userApplication = userApplication;
  }

  getUserApplication() {
    return this.userApplication;
  }

  async applyForApplication(userApplication: UserApplication) {
    const response = await fetch(`${this.API_URL}/applications/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        email: userApplication.email,
        applicationId: userApplication.applicationId,
        timeSlotId: userApplication.timeSlot.id,
        date: userApplication.date,
        resume: userApplication.resume,
        jobRoleIds: userApplication.jobRoles
      })
    });
    const data = await response.json();
    return data;
  }

  constructor() { }
}
