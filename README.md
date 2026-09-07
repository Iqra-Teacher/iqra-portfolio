# Iqra Hasan — Teacher Personal Portfolio & CMS

A production-ready, elegant personal portfolio website and CMS portal for **Iqra Hasan** (B.Ed Aspirant & Educator). Built with React, Vite, TypeScript, Tailwind CSS, Supabase, Cloudinary, Framer Motion, and React Router.

---

## 🎨 Visual Identity & Design System

- **Background**: Warm Ivory & Cream (`#FAF8F5`, `#FDFBF7`, `#F4F0E8`)
- **Accent**: Antique Earthy Gold (`#C5A059`)
- **Typography**: 
  - Serif Headings: **Cormorant Garamond**
  - Sans-Serif Body: **Manrope**
- **Aesthetic**: Academic, refined, minimal, elegant, feminine, with subtle botanical line-art SVG decorations and thin antique gold dividers.

---

## 🚀 Features

- **Split-Screen Hero**: Eyebrow label, serif heading, stats counters (Experience, Students Guided, Environment), and replaceable teacher portrait frame with botanical line-art.
- **About Me**: Professional introduction + 4 competency cards + verified personal information card.
- **Education & Experience**: Dual side-by-side timeline cards for B.Sc. (MJPRU Bareilly 2023-2026), B.Ed preparation, and teacher tenure at The Meezan Global School (2024-2025).
- **10 Key Teaching Competencies**: Outlined grid of cards featuring custom Lucide icons.
- **Teaching Philosophy**: Academic quote highlight card.
- **Classroom Moments**: Dynamic social gallery with category filters (`Classroom`, `Activities`, `Events`, `Achievements`, `Student Work`, `School Moments`), masonry grid, image lightbox, and modal video player.
- **Achievements & Certificates**: Dynamic timelines & certificate galleries with preview/download links and elegant empty states.
- **Public Testimonials**: Public visitors can submit feedback (Name, Role, Rating 1-5, Message) without an account. Submissions default to `approved = false` for security moderation.
- **Teacher Admin CMS (`/admin`)**: Protected management dashboard with demo login mode, stat counters, testimonial moderation (Approve, Reject, Delete), Classroom Moments upload & manager, Achievements manager, and Certificates manager.
- **Direct Messaging CTAs**: Interactive contact form with Zod validation + one-click WhatsApp, Phone Call, and Email buttons.
- **SEO & Accessibility**: Open Graph metadata, Schema.org Person JSON-LD, `robots.txt`, and `sitemap.xml`.

---

## 🛠️ Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security)
- **Media CDN**: Cloudinary (Auto-formatting & optimization)
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Router**: React Router DOM

---

## 📥 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Supabase & Cloudinary credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> **Note**: The application includes a built-in LocalStorage fallback layer so all feature workflows (testimonials, admin portal, gallery lightboxes) function seamlessly out of the box even before backend keys are filled!

### 3. Supabase Database Migration

Execute `supabase/schema.sql` in your Supabase SQL Editor to create tables (`profiles`, `testimonials`, `posts`, `achievements`, `certificates`) and Row Level Security policies.

### 4. Local Development

Run local development server:

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

---

## 🔒 Security Architecture

- **Public Testimonial Insert**: Visitors can insert testimonials into Supabase, but Row Level Security restricts public read access to `approved = true` items only.
- **Admin Moderation**: Unapproved testimonials, content updates, and post deletions require authenticated admin access.

---

## 📄 License

Created for Iqra Hasan. All rights reserved.
