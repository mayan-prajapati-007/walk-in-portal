import { Injectable } from '@angular/core';
import { TimeSlot } from '../../interfaces/time-slot';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotsService {
  url = 'http://localhost:3000/time-slots';
  
  async getTimeSlotData(): Promise<TimeSlot[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getTimeSlotDataById(id: string): Promise<TimeSlot> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {} as TimeSlot;
  }
}
