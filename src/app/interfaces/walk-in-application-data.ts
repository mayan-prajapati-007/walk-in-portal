import { JobRole } from "./job-role";
import { TimeSlot } from "./time-slot";

export interface WalkInApplicationList {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    expiryDate: string;
    location: string;
    additionalInfo: string | null;
    jobRoles: JobRole[];
}

export interface WalkInApplicationDetails extends WalkInApplicationList {
    preRequisites: {
        generalInstruction: string;
        examInstruction: string;
        minSysReqs: string;
        applicationProcess: string;
    };
    venue: {
        line1: string;
        line2: string;
        landmark: string;
        city: string;
        pincode: string;
        phone: string;
    };
    timeSlots: TimeSlot[];
}