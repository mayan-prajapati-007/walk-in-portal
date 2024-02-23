import { Injectable } from '@angular/core';
import { UserPersonal } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserPersonalService {
  errorMessage: string | undefined = undefined;

  constructor() { }

  logMe() {
    console.log("Hola");
  }

  validateForm(userPersonal: UserPersonal) {
    while(this.errorMessage === undefined) {
      this.errorMessage = this.validateEmail(userPersonal.email);
      if (this.errorMessage !== undefined) {
        return this.errorMessage;
      }
      this.errorMessage = this.validateName(userPersonal.firstName);
      if (this.errorMessage !== undefined) {
        return this.errorMessage;
      }
      this.errorMessage = this.validateName(userPersonal.lastName);
      if (this.errorMessage !== undefined) {
        return this.errorMessage;
      }
      this.errorMessage = this.validatePhone(userPersonal.phone);
      if (this.errorMessage !== undefined) {
        return this.errorMessage;
      }
    }
    return this.errorMessage;
  }

  validateEmail(email: string) {
    if (email.length === 0) {
      return "Email is required";
    } else if (!email.includes('@')) {
      return "Email is invalid";
    } else {
      return undefined;
    }
  }

  validatePassword(password: string) {
    if (password.length === 0) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password is too short";
    } else {
      return undefined;
    }
  }

  validateName(name: string) {
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
}
