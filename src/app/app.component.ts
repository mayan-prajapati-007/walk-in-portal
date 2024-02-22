import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'walk-in-portal';
  token: string | null = localStorage.getItem('token');

  constructor(private authenticationService: AuthenticationService) {}

  logout() {
    if(this.token) {
      this.authenticationService.logout(this.token);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    window.location.href = '/login';
  }
}
