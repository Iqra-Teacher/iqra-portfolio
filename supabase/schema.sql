-- =================================================================
-- SUPABASE DATABASE SCHEMA & ADMIN RLS POLICIES FOR IQRA HASAN PORTFOLIO
-- (Fully Idempotent & Safe to Re-Run Against Existing Database)
-- =================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------
-- 1. PROFILES TABLE (With Admin Role Authorization)
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Iqra Hasan',
  title TEXT NOT NULL DEFAULT 'B.Ed Aspirant | Aspiring Teacher',
  bio TEXT NOT NULL DEFAULT 'Passionate about creating a positive and engaging learning environment where every student feels valued, confident and motivated to learn.',
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT 'New Delhi, India',
  resume_url TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user', -- 'admin' or 'user'
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure role column exists if table was previously created without it
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------
-- SECURITY DEFINER HELPER FUNCTION FOR ADMIN AUTHORIZATION
-- -----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() 
      AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies (Safely Drop Existing Policies First)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin can delete profiles" ON public.profiles;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Admin can update profiles" 
  ON public.profiles FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admin can insert profiles" 
  ON public.profiles FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete profiles" 
  ON public.profiles FOR DELETE USING (public.is_admin());

-- -----------------------------------------------------------------
-- 2. TESTIMONIALS TABLE
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Parent / Visitor',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Testimonials Policies (Safely Drop Existing Policies First)
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can submit testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin full select access on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin update access on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin delete access on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin can delete testimonials" ON public.testimonials;

-- Public can ONLY view approved testimonials (or Admin can view all)
CREATE POLICY "Public can view approved testimonials" 
  ON public.testimonials FOR SELECT 
  USING (approved = true OR public.is_admin());

-- Public visitors can submit new testimonials (must be default approved = false)
CREATE POLICY "Public can submit testimonials" 
  ON public.testimonials FOR INSERT 
  WITH CHECK (approved = false);

-- ONLY Admin can approve/update testimonials
CREATE POLICY "Admin can update testimonials" 
  ON public.testimonials FOR UPDATE 
  USING (public.is_admin());

-- ONLY Admin can delete testimonials
CREATE POLICY "Admin can delete testimonials" 
  ON public.testimonials FOR DELETE 
  USING (public.is_admin());

-- -----------------------------------------------------------------
-- 3. POSTS TABLE (Classroom Moments Feed)
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL DEFAULT 'Classroom',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Posts Policies (Safely Drop Existing Policies First)
DROP POLICY IF EXISTS "Public can view classroom posts" ON public.posts;
DROP POLICY IF EXISTS "Admin can insert classroom posts" ON public.posts;
DROP POLICY IF EXISTS "Admin can update classroom posts" ON public.posts;
DROP POLICY IF EXISTS "Admin can delete classroom posts" ON public.posts;

CREATE POLICY "Public can view classroom posts" 
  ON public.posts FOR SELECT USING (true);

CREATE POLICY "Admin can insert classroom posts" 
  ON public.posts FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update classroom posts" 
  ON public.posts FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admin can delete classroom posts" 
  ON public.posts FOR DELETE USING (public.is_admin());

-- -----------------------------------------------------------------
-- 4. ACHIEVEMENTS TABLE
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT DEFAULT 'Milestone',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure image_url column exists if table was previously created without it
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Achievements Policies (Safely Drop Existing Policies First)
DROP POLICY IF EXISTS "Public can view achievements" ON public.achievements;
DROP POLICY IF EXISTS "Admin can insert achievements" ON public.achievements;
DROP POLICY IF EXISTS "Admin can update achievements" ON public.achievements;
DROP POLICY IF EXISTS "Admin can delete achievements" ON public.achievements;

CREATE POLICY "Public can view achievements" 
  ON public.achievements FOR SELECT USING (true);

CREATE POLICY "Admin can insert achievements" 
  ON public.achievements FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update achievements" 
  ON public.achievements FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admin can delete achievements" 
  ON public.achievements FOR DELETE USING (public.is_admin());

-- -----------------------------------------------------------------
-- 5. CERTIFICATES TABLE
-- -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Certificates Policies (Safely Drop Existing Policies First)
DROP POLICY IF EXISTS "Public can view certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admin can insert certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admin can update certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admin can delete certificates" ON public.certificates;

CREATE POLICY "Public can view certificates" 
  ON public.certificates FOR SELECT USING (true);

CREATE POLICY "Admin can insert certificates" 
  ON public.certificates FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update certificates" 
  ON public.certificates FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admin can delete certificates" 
  ON public.certificates FOR DELETE USING (public.is_admin());

-- -----------------------------------------------------------------
-- 6. AUTOMATIC TRIGGER FOR AUTH.USERS & ADMIN SEEDING
-- -----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'), 
    CASE WHEN LOWER(NEW.email) = 'iqrahasan848@gmail.com' THEN 'admin' ELSE 'user' END
  )
  ON CONFLICT (id) DO UPDATE 
  SET role = CASE WHEN LOWER(EXCLUDED.email) = 'iqrahasan848@gmail.com' THEN 'admin' ELSE public.profiles.role END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach Trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed / Update existing user with email 'iqrahasan848@gmail.com' as Admin
INSERT INTO public.profiles (id, email, name, role)
SELECT id, email, 'Iqra Hasan', 'admin'
FROM auth.users
WHERE LOWER(email) = 'iqrahasan848@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
