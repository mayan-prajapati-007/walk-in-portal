import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  role = 2;
  rememberMe = new FormControl(false);
  errorMessage: string | undefined = undefined;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    if(localStorage.getItem('rememberMe') === 'true') {
      this.email.setValue(localStorage.getItem('email'));
      this.rememberMe.setValue(true);
      window.location.href = '/';
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('rememberMe');
    }
  }

  login(e: any) {
    e.preventDefault();
    this.authenticationService.login(this.email.value ?? '', this.password.value ?? '', this.role).then((data) => {
      if(data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', <string>data.role);
        localStorage.setItem('email', this.email.value ?? '');
        localStorage.setItem('rememberMe', this.rememberMe.value ? 'true' : 'false');
        window.location.href = '/';
      } else if(data.errors.Email) {
        this.errorMessage = data.errors.Email[0];
      } else if(data.errors.Password) {
        this.errorMessage = data.errors.Password[0];
      } else if(data.errors.User) {
        this.errorMessage = data.errors.User[0];
      } 
    });
  }

  previewPassword() {
    const passwordField = document.getElementById('password');
    if(passwordField) {
      if(passwordField.getAttribute('type') === 'password') {
        passwordField.setAttribute('type', 'text');
      } else {
        passwordField.setAttribute('type', 'password');
      }
    }
  }
}