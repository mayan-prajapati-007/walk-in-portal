import { Injectable } from '@angular/core';
import { JobRole } from '../../interfaces/job-role';

@Injectable({
  providedIn: 'root'
})
export class JobRolesService {
  url = 'http://localhost:3000/job-roles';
  
  async getJobRoleData(): Promise<JobRole[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getJobRoleDataById(id: string): Promise<JobRole> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {} as JobRole;
  }
}
