export interface Profile {
  id?: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  resume_url?: string;
  role?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  message: string;
  approved: boolean;
  created_at: string;
}

export type MomentCategory = 
  | 'All' 
  | 'Classroom' 
  | 'Activities' 
  | 'Events' 
  | 'Achievements' 
  | 'Student Work' 
  | 'School Moments';

export interface ClassroomPost {
  id: string;
  title: string;
  caption: string;
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string;
  category: MomentCategory;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  image_url?: string;
  created_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  description?: string;
  thumbnail_url?: string;
  file_url: string;
  created_at?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface CompetencyItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ExperienceItem {
  role: string;
  institution: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  details?: string;
}
