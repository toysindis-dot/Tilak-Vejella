export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  FREELANCE = 'Freelance'
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  postedDate: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface ApplicationFormState {
  fullName: string;
  email: string;
  portfolioUrl: string;
  coverLetter: string;
  resume: File | null;
}

export interface AIGenerateResponse {
  coverLetter: string;
}
