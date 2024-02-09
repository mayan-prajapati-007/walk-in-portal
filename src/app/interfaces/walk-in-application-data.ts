import { JobRole } from "./job-role";
import { TimeSlot } from "./time-slot";

export interface WalkInApplicationData {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    expiry_date: string;
    location: string;
    additional_info: string | null;
    pre_reqs: {
        general_instructions: string;
        exam_instructions: string;
        min_sys_reqs: string;
        application_process: string;
    };
    venue: {
        line1: string;
        line2: string;
        landmark: string;
        city: string;
        pincode: string;
        phone: string;
    };
    job_roles: JobRole[];
    time_slots: TimeSlot[];
}