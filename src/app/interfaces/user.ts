export interface User {
    id: number;
    email: string;
    password: string;
    role: number;
    profileImage: string | null;
    firstName: string;
    lastName: string;
    phone: string | null;
    jobRoles: number[];
    resume: string | null;
    portfolio: string | null;
    refEmpName: string | null;
    emailSubscription: boolean;
    collegeId: number;
    collegeName: string;
    collegeLocation: string;
    qualificationId: number;
    streamId: number;
    yearOfPassing: number;
    aggregatePercentage: number;
    applicantType: number;
    appliedEarlier: string | null;
    knownTechnologies: string | null;
    expertTechnologies: string | null;
    yearsOfExperience: number | null;
    currentCtc: number | null;
    expectedCtc: number | null;
    noticePeriodEndDate: string | null;
    noticePeriodDuration: number | null;
}

export interface UserPersonal {
    email: string;
    password: string;
    role: number;
    profileImage: string | null;
    firstName: string;
    lastName: string;
    phone: string | null;
    jobRoles: { id:number, name: string }[];
    resume: string | null;
    portfolio: string | null;
    refEmpName: string | null;
    emailSubscription: boolean;
}

export interface UserEducation {
    college: { id: number, name: string, location: string };
    qualification: { id: number, name: string };
    stream: { id: number, name: string };
    yearOfPassing: number;
    aggregatePercentage: number;
}

export interface UserExperience {
    applicantType: number;
    appliedEarlier: boolean;
    appliedEarlierRole: string | null;
    knownTechnologies: string | null;
    expertTechnologies: string | null;
    yearsOfExperience: number | null;
    currentCtc: number | null;
    expectedCtc: number | null;
    onNoticePeriod: boolean;
    noticePeriodEndDate: string | null;
    noticePeriodDuration: number | null;
}

export interface UserReview {
    id: number;
    email: string;
    password: string;
    role: number;
    profileImage: string | null;
    firstName: string;
    lastName: string;
    phone: string | null;
    jobRoles: { id:number, name: string }[];
    resume: string | null;
    portfolio: string | null;
    refEmpName: string | null;
    emailSubscription: boolean;
    college: { id: number, name: string, location: string };
    qualification: { id: number, name: string };
    stream: { id: number, name: string };
    yearOfPassing: number;
    aggregatePercentage: number;
    applicantType: number;
    appliedEarlier: boolean;
    appliedEarlierRole: string | null;
    knownTechnologies: string | null;
    expertTechnologies: string | null;
    yearsOfExperience: number | null;
    currentCtc: number | null;
    expectedCtc: number | null;
    onNoticePeriod: boolean;
    noticePeriodEndDate: string | null;
    noticePeriodDuration: number | null;
}