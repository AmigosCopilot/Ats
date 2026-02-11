export interface Candidate {
  id: string;
  name: string;
  email: string;
  photo: string;
  appliedJob: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Psychometric Test' | 'Final Interview' | 'Hired' | 'Rejected';
  psychometricTestStatus: 'Not Started' | 'In Progress' | 'Completed' | 'N/A';
  appliedDate: string;
  phone: string;
  location: string;
  experience: string;
  ravenScore?: number;
  cleaverScore?: string;
  personalityType?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  status: 'Open' | 'Closed' | 'Draft';
  candidatesCount: number;
  createdDate: string;
  description: string;
  type: string;
}

export interface MetricCard {
  title: string;
  value: number;
  change: number;
  icon: string;
}

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    appliedJob: 'Senior Frontend Developer',
    status: 'Interview',
    psychometricTestStatus: 'Completed',
    appliedDate: '2026-02-05',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    experience: '5 years',
    ravenScore: 85,
    cleaverScore: 'D-I-S-C',
    personalityType: 'ENTJ'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    appliedJob: 'Product Manager',
    status: 'Psychometric Test',
    psychometricTestStatus: 'In Progress',
    appliedDate: '2026-02-03',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    experience: '7 years',
    ravenScore: 92,
    cleaverScore: 'I-D-S-C',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    appliedJob: 'UX Designer',
    status: 'Screening',
    psychometricTestStatus: 'Not Started',
    appliedDate: '2026-02-07',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    experience: '4 years'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    appliedJob: 'Backend Engineer',
    status: 'Applied',
    psychometricTestStatus: 'Not Started',
    appliedDate: '2026-02-08',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    experience: '6 years'
  },
  {
    id: '5',
    name: 'Aisha Patel',
    email: 'aisha.patel@email.com',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    appliedJob: 'Senior Frontend Developer',
    status: 'Final Interview',
    psychometricTestStatus: 'Completed',
    appliedDate: '2026-01-28',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    experience: '8 years',
    ravenScore: 88,
    cleaverScore: 'S-I-D-C',
    personalityType: 'INFJ'
  },
  {
    id: '6',
    name: 'David Kim',
    email: 'david.kim@email.com',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    appliedJob: 'Product Manager',
    status: 'Hired',
    psychometricTestStatus: 'Completed',
    appliedDate: '2026-01-15',
    phone: '+1 (555) 678-9012',
    location: 'Los Angeles, CA',
    experience: '6 years',
    ravenScore: 90,
    cleaverScore: 'D-I-C-S',
    personalityType: 'ESTJ'
  },
  {
    id: '7',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    appliedJob: 'Data Analyst',
    status: 'Rejected',
    psychometricTestStatus: 'Completed',
    appliedDate: '2026-01-20',
    phone: '+1 (555) 789-0123',
    location: 'Chicago, IL',
    experience: '3 years',
    ravenScore: 72
  },
  {
    id: '8',
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    appliedJob: 'DevOps Engineer',
    status: 'Interview',
    psychometricTestStatus: 'Completed',
    appliedDate: '2026-02-01',
    phone: '+1 (555) 890-1234',
    location: 'Denver, CO',
    experience: '5 years',
    ravenScore: 86,
    cleaverScore: 'C-S-I-D'
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    status: 'Open',
    candidatesCount: 24,
    createdDate: '2026-01-15',
    description: 'Looking for an experienced frontend developer...',
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    status: 'Open',
    candidatesCount: 18,
    createdDate: '2026-01-20',
    description: 'Seeking a strategic product manager...',
    type: 'Full-time'
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    status: 'Open',
    candidatesCount: 32,
    createdDate: '2026-01-22',
    description: 'Join our design team as a UX Designer...',
    type: 'Full-time'
  },
  {
    id: '4',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    status: 'Open',
    candidatesCount: 15,
    createdDate: '2026-02-01',
    description: 'We need a skilled backend engineer...',
    type: 'Full-time'
  },
  {
    id: '5',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Chicago, IL',
    status: 'Closed',
    candidatesCount: 12,
    createdDate: '2025-12-10',
    description: 'Analyze and interpret complex data...',
    type: 'Full-time'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    status: 'Open',
    candidatesCount: 9,
    createdDate: '2026-01-28',
    description: 'Build and maintain our infrastructure...',
    type: 'Full-time'
  },
  {
    id: '7',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    status: 'Draft',
    candidatesCount: 0,
    createdDate: '2026-02-08',
    description: 'Lead our marketing initiatives...',
    type: 'Full-time'
  }
];

export const dashboardMetrics = {
  totalCandidates: 156,
  activeJobs: 12,
  candidatesInProcess: 45,
  hiredCandidates: 8,
  pendingEvaluations: 12
};

export const hiringFunnelData = [
  { stage: 'Applied', count: 156 },
  { stage: 'Screening', count: 89 },
  { stage: 'Interview', count: 45 },
  { stage: 'Psychometric', count: 28 },
  { stage: 'Final', count: 15 },
  { stage: 'Hired', count: 8 }
];

export const candidatesPerJobData = [
  { job: 'Frontend Dev', count: 24 },
  { job: 'Product Manager', count: 18 },
  { job: 'UX Designer', count: 32 },
  { job: 'Backend Eng', count: 15 },
  { job: 'DevOps', count: 9 }
];

export const testScoreData = [
  { range: '0-20', count: 2 },
  { range: '21-40', count: 5 },
  { range: '41-60', count: 12 },
  { range: '61-80', count: 18 },
  { range: '81-100', count: 15 }
];
