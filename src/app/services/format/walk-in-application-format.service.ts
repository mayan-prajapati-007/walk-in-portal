import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalkInApplicationFormatService {

  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  formatDate(date: Date) {
    return `${date.getDate()}-${this.months[date.getMonth()]}-${date.getFullYear()}`;
  }

  formatTime(time: string) {
    const hours = +time.split(":")[0];
    const minutes = time.split(":")[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hours % 12}:${minutes} ${ampm}`;
  }

  calculateExpiryDays(expiry_date: string) {
    const currentDate = new Date();
    const expiryDate = new Date(expiry_date);
    const timeDifference = expiryDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.round(daysDifference);
  }
}
