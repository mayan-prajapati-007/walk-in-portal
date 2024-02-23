import { TimeSlot } from "./time-slot";

export interface UserApplication {
    email: string;
    applicationId: number;
    timeSlot: TimeSlot;
    date: string;
    jobRoles: number[];
    resume: string;
}