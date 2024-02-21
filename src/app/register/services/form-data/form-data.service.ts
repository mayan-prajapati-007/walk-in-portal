import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private API_URL = environment.API_URL;

  static years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  static Technologies = ["Javascript" , "Angular JS", "React", "Node JS"];
  
  async getJobRoles() {
    const response = await fetch(`${this.API_URL}/jobroles`);
    const data = await response.json();
    return data;
  }

  async getQualifications() {
    const response = await fetch(`${this.API_URL}/qualifications`);
    const data = await response.json();
    return data;
  }

  async getStreams() {
    const response = await fetch(`${this.API_URL}/streams`);
    const data = await response.json();
    return data;
  }

  async getColleges() {
    const response = await fetch(`${this.API_URL}/colleges`);
    const data = await response.json();
    return data;
  }
}
