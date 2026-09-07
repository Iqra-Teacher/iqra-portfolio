import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Testimonial, ClassroomPost, Achievement, Certificate, Profile } from '../types';
import { TEACHER_INFO } from '../data/teacherData';

const LOCAL_STORAGE_KEYS = {
  TESTIMONIALS: 'iqra_portfolio_testimonials',
  POSTS: 'iqra_portfolio_posts',
  ACHIEVEMENTS: 'iqra_portfolio_achievements',
  CERTIFICATES: 'iqra_portfolio_certificates',
  PROFILE: 'iqra_portfolio_profile',
};

// Seed initial local storage state if empty
const getInitialLocalData = <T>(key: string, defaultData: T[]): T[] => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultData;
  } catch {
    return defaultData;
  }
};

const setLocalData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`LocalStorage write error for ${key}:`, err);
  }
};

// Default dynamic classroom posts for initial showcase
const DEFAULT_POSTS: ClassroomPost[] = [
  {
    id: 'post-1',
    title: 'Interactive Science Learning & Practical Explanation',
    caption: 'Engaging students in interactive problem-solving and clear step-by-step science demonstrations during class.',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1200',
    category: 'Classroom',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'post-2',
    title: 'Student Assessment & Group Discussion Session',
    caption: 'Facilitating active student participation and encouraging peer doubt resolution in a supportive environment.',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200',
    category: 'Activities',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
  }
];

// =================================================================
// TESTIMONIAL SERVICE
// =================================================================
export const getApprovedTestimonials = async (): Promise<Testimonial[]> => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (!error && data) return data as Testimonial[];
  }

  const local = getInitialLocalData<Testimonial>(LOCAL_STORAGE_KEYS.TESTIMONIALS, []);
  return local.filter(t => t.approved);
};

export const getAllTestimonialsAdmin = async (): Promise<Testimonial[]> => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data as Testimonial[];
  }

  return getInitialLocalData<Testimonial>(LOCAL_STORAGE_KEYS.TESTIMONIALS, []);
};

export const submitPublicTestimonial = async (
  testimonial: Omit<Testimonial, 'id' | 'approved' | 'created_at'>
): Promise<{ success: boolean; message: string }> => {
  const newEntry: Testimonial = {
    ...testimonial,
    id: `testim-${Date.now()}`,
    approved: false, // Default to false for moderation security
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('testimonials').insert([{
      name: testimonial.name,
      role: testimonial.role || 'Visitor',
      rating: testimonial.rating,
      message: testimonial.message,
      approved: false,
    }]);

    if (error) {
      console.error('Supabase testimonial insert error:', error);
      return { success: false, message: 'Failed to submit testimonial. Please try again.' };
    }
    return { success: true, message: 'Thank you! Your testimonial has been submitted for review.' };
  }

  // Local fallback
  const local = getInitialLocalData<Testimonial>(LOCAL_STORAGE_KEYS.TESTIMONIALS, []);
  local.unshift(newEntry);
  setLocalData(LOCAL_STORAGE_KEYS.TESTIMONIALS, local);

  return { success: true, message: 'Thank you! Your testimonial has been submitted for moderation review.' };
};

export const updateTestimonialStatus = async (id: string, approved: boolean): Promise<boolean> => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('testimonials').update({ approved }).eq('id', id);
    if (!error) return true;
  }

  const local = getInitialLocalData<Testimonial>(LOCAL_STORAGE_KEYS.TESTIMONIALS, []);
  const updated = local.map(t => t.id === id ? { ...t, approved } : t);
  setLocalData(LOCAL_STORAGE_KEYS.TESTIMONIALS, updated);
  return true;
};

export const deleteTestimonial = async (id: string): Promise<boolean> => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) return true;
  }

  const local = getInitialLocalData<Testimonial>(LOCAL_STORAGE_KEYS.TESTIMONIALS, []);
  const filtered = local.filter(t => t.id !== id);
  setLocalData(LOCAL_STORAGE_KEYS.TESTIMONIALS, filtered);
  return true;
};

// =================================================================
// POSTS (CLASSROOM MOMENTS) SERVICE
// =================================================================
export const getClassroomPosts = async (): Promise<ClassroomPost[]> => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data as ClassroomPost[];
  }

  return getInitialLocalData<ClassroomPost>(LOCAL_STORAGE_KEYS.POSTS, DEFAULT_POSTS);
};

export const createClassroomPost = async (
  post: Omit<ClassroomPost, 'id' | 'created_at'>
): Promise<ClassroomPost | null> => {
  const newPost: ClassroomPost = {
    ...post,
    id: `post-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('posts').insert([post]).select().single();
    if (!error && data) return data as ClassroomPost;
  }

  const local = getInitialLocalData<ClassroomPost>(LOCAL_STORAGE_KEYS.POSTS, DEFAULT_POSTS);
  local.unshift(newPost);
  setLocalData(LOCAL_STORAGE_KEYS.POSTS, local);
  return newPost;
};

export const deleteClassroomPost = async (id: string): Promise<boolean> => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) return true;
  }

  const local = getInitialLocalData<ClassroomPost>(LOCAL_STORAGE_KEYS.POSTS, DEFAULT_POSTS);
  const filtered = local.filter(p => p.id !== id);
  setLocalData(LOCAL_STORAGE_KEYS.POSTS, filtered);
  return true;
};

// =================================================================
// ACHIEVEMENTS SERVICE
// =================================================================
export const getAchievements = async (): Promise<Achievement[]> => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data as Achievement[];
  }

  return getInitialLocalData<Achievement>(LOCAL_STORAGE_KEYS.ACHIEVEMENTS, []);
};

export const createAchievement = async (
  achievement: Omit<Achievement, 'id' | 'created_at'>
): Promise<Achievement | null> => {
  const newAch: Achievement = {
    ...achievement,
    id: `ach-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('achievements').insert([achievement]).select().single();
    if (!error && data) return data as Achievement;
  }

  const local = getInitialLocalData<Achievement>(LOCAL_STORAGE_KEYS.ACHIEVEMENTS, []);
  local.unshift(newAch);
  setLocalData(LOCAL_STORAGE_KEYS.ACHIEVEMENTS, local);
  return newAch;
};

export const deleteAchievement = async (id: string): Promise<boolean> => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (!error) return true;
  }

  const local = getInitialLocalData<Achievement>(LOCAL_STORAGE_KEYS.ACHIEVEMENTS, []);
  const filtered = local.filter(a => a.id !== id);
  setLocalData(LOCAL_STORAGE_KEYS.ACHIEVEMENTS, filtered);
  return true;
};

// =================================================================
// CERTIFICATES SERVICE
// =================================================================
export const getCertificates = async (): Promise<Certificate[]> => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data as Certificate[];
  }

  return getInitialLocalData<Certificate>(LOCAL_STORAGE_KEYS.CERTIFICATES, []);
};

export const createCertificate = async (
  cert: Omit<Certificate, 'id' | 'created_at'>
): Promise<Certificate | null> => {
  const newCert: Certificate = {
    ...cert,
    id: `cert-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('certificates').insert([cert]).select().single();
    if (!error && data) return data as Certificate;
  }

  const local = getInitialLocalData<Certificate>(LOCAL_STORAGE_KEYS.CERTIFICATES, []);
  local.unshift(newCert);
  setLocalData(LOCAL_STORAGE_KEYS.CERTIFICATES, local);
  return newCert;
};

export const deleteCertificate = async (id: string): Promise<boolean> => {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (!error) return true;
  }

  const local = getInitialLocalData<Certificate>(LOCAL_STORAGE_KEYS.CERTIFICATES, []);
  const filtered = local.filter(c => c.id !== id);
  setLocalData(LOCAL_STORAGE_KEYS.CERTIFICATES, filtered);
  return true;
};
