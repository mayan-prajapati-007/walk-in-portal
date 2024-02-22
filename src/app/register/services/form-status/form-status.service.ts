import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormStatusService {
  formStatus: number = 0;

  getFormStatus() {
    return this.formStatus;
  }

  nextForm() {
    if (this.formStatus < 2) {
      this.formStatus++;
    }
  }

  previousForm() {
    if (this.formStatus > 0) {
      this.formStatus--;
    }
  }
  constructor() { }
}
