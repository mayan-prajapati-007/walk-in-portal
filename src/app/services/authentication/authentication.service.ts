import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = environment.API_URL;
  

  async login(email: string, password: string, role: number) {
    const response = await fetch(`${this.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, role })
    });
    const data = await response.json();
    return data;
  }

  async logout(token: string) {
    const response = await fetch(`${this.API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        token: token
      }
    });
    const data = await response.json();
    if(data.ok) {
      return true;
    }
    return false;
  }

  async register(user: User) {
    const response = await fetch(`${this.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  }
}
