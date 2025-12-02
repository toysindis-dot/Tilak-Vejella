import { Job, JobType } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Video Editor',
    department: 'Content Production',
    location: 'Remote',
    type: JobType.FULL_TIME,
    postedDate: '2023-10-25',
    salaryRange: '$50k - $75k',
    description: 'We are looking for a creative Video Editor to join our team. You will be responsible for editing high-retention YouTube videos, shorts, and social media clips that align with our brand style.',
    requirements: [
      'Proficiency in Adobe Premiere Pro and After Effects',
      'Strong storytelling skills',
      'Ability to meet tight deadlines',
      '2+ years of experience in YouTube content creation'
    ],
    responsibilities: [
      'Edit 2-3 long-form videos per week',
      'Create 5+ shorts/reels from long-form content',
      'Collaborate with the creative director on thumbnails and hooks',
      'Manage file backups and project archives'
    ]
  },
  {
    id: '2',
    title: 'Community Manager',
    department: 'Marketing',
    location: 'Remote',
    type: JobType.PART_TIME,
    postedDate: '2023-10-28',
    salaryRange: '$25/hr',
    description: 'Join us as a Community Manager to engage with our vibrant audience across Discord, Twitter, and YouTube comments. You are the voice of the channel.',
    requirements: [
      'Excellent written communication skills',
      'Experience managing Discord servers',
      'Familiarity with our content and inside jokes',
      'Patience and empathy'
    ],
    responsibilities: [
      'Moderate Discord channels and YouTube comments',
      'Host weekly community events (AMAs, game nights)',
      'Gather community feedback and report to the team',
      'Draft social media posts'
    ]
  },
  {
    id: '3',
    title: 'Thumbnail Artist',
    department: 'Design',
    location: 'Freelance',
    type: JobType.CONTRACT,
    postedDate: '2023-11-01',
    salaryRange: '$100 - $300 per thumbnail',
    description: 'We need a click-worthy Thumbnail Artist who understands CTR psychology and high-contrast composition.',
    requirements: [
      'Expertise in Photoshop',
      'Strong portfolio of YouTube thumbnails',
      'Understanding of color theory and composition',
      'Quick turnaround time'
    ],
    responsibilities: [
      'Design 3-4 thumbnail variations per video',
      'A/B test concepts with the producer',
      'Retouch photos and create composite images',
      'Stay updated on current YouTube design trends'
    ]
  }
];
