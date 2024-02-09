import { Injectable } from '@angular/core';
import { WalkInApplicationData } from '../../interfaces/walk-in-application-data';

@Injectable({
  providedIn: 'root'
})
export class WalkInApplicationsService {
  url = 'http://localhost:3000/walk-in-applications';
  
  async getWalkInApplicationData(): Promise<WalkInApplicationData[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getWalkInApplicationDataById(id: string): Promise<WalkInApplicationData> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {} as WalkInApplicationData;
  }
}
