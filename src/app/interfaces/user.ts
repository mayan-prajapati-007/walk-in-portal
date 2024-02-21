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
    noticePeriodEndDate: Date | null;
    noticePeriodDuration: number | null;
}

export interface UserPersonal {
    email: string;
    profileImage: string | null;
    firstName: string;
    lastName: string;
    phone: string | null;
    jobRoles: number[];
    resume: string | null;
    portfolio: string | null;
    refEmpName: string | null;
    emailSubscription: boolean;
}