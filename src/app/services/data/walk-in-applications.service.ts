import { Injectable } from '@angular/core';
// import { WalkInApplicationData } from '../../interfaces/walk-in-application-data';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WalkInApplicationsService {
  private API_URL = environment.API_URL;

  async getWalkInApplicationData(token: string): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/applications`, {
      headers: {
        token: token
      }
    });
    const data = await response.json();
    if (data.errors) {
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      return null as any;
    }
    return data;
  }

  async getWalkInApplicationDataById(id: string, token: string): Promise<any> {
    const response = await fetch(`${this.API_URL}/applications/${id}`, {
      headers: {
        token: token
      }
    });
    const data = await response.json();
    if (data.errors) {
      if(data.errors.Application) {
        return null as any;
      }
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      return null as any;
    }
    return data;
  }
}
