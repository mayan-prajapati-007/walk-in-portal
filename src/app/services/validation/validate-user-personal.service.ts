import { Injectable } from '@angular/core';
import { UserPersonal } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserPersonalService {
  errorMessage: string | undefined = undefined;

  constructor() { }

  validateForm(userPersonal: UserPersonal) {
    this.errorMessage = this.validateName(userPersonal.firstName, "First Name");
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    this.errorMessage = this.validateName(userPersonal.lastName, "Last Name");
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    this.errorMessage = this.validateEmail(userPersonal.email);
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    this.errorMessage = this.validatePhone(userPersonal.phone);
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    userPersonal.phone = userPersonal.phone ? userPersonal.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : '123-456-7890';
    this.errorMessage = this.validateJobRoles(userPersonal.jobRoles);
    if (this.errorMessage !== undefined) {
      return this.errorMessage;
    }
    this.errorMessage = undefined;
    return this.errorMessage;
  }

  validateEmail(email: string) {
    if (email === undefined) return "Email is required";
    if (email.length === 0) {
      return "Email is required";
    } else if (!email.includes('@')) {
      return "Email is invalid";
    } else {
      return undefined;
    }
  }

  validatePassword(password: string) {
    if (password === undefined) return "Password is required";
    if (password.length === 0) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password is too short";
    } else {
      return undefined;
    }
  }

  validateName(name: string, fieldName: string) {
    if (name === undefined) return `${fieldName} is required`;
    if (name.length === 0) {
      return "Name is required";
    } else {
      return undefined;
    }
  }

  validatePhone(phone: string | null) {
    if (phone === null) {
      return "Phone is required";
    } else if (phone.length === 0) {
      return "Phone is required";
    } else if (phone.length < 10) {
      return "Phone is invalid";
    } else {
      return undefined;
    }
  }

  validateJobRoles(jobRoles: any[]) {
    if (jobRoles === undefined) return "Select at least one job role";
    return undefined;
  }
}
