import React from 'react';
import { Download, Mail, Award, GraduationCap, BookOpen } from 'lucide-react';
import { TEACHER_INFO } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-academic-pattern">
      {/* Background Soft Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-cream-50/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] uppercase tracking-super-wide text-gold font-bold">
                {TEACHER_INFO.eyebrow}
              </span>
            </div>

            {/* Name Heading */}
            <div className="space-y-2">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-charcoal leading-[1.05]">
                IQRA HASAN
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-gold font-semibold tracking-wide">
                {TEACHER_INFO.title}
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-charcoal-medium text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              "{TEACHER_INFO.heroBio}"
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={TEACHER_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-gold bg-gold text-cream-50 text-xs uppercase tracking-widest font-bold hover:bg-gold-dark transition-all duration-300 shadow-academic hover:shadow-academic-hover"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-gold/40 bg-cream-50 text-charcoal text-xs uppercase tracking-widest font-bold hover:border-gold hover:bg-gold/10 transition-all duration-300 shadow-sm"
              >
                <Mail className="w-4 h-4 text-gold" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-gold-subtle via-gold/40 to-transparent my-6" />

            {/* Verified Stat Counters */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">1+ Year</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Teaching Experience</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">B.Sc.</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Completed</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">B.Ed.</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Aspirant</p>
              </div>
            </div>

          </div>

          {/* Right Column: Teacher Portrait Placeholder Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Corner Botanical SVG decorations */}
              <BotanicalDecoration position="hero-corner" size={72} />

              {/* Decorative Outer Border */}
              <div className="relative rounded-3xl border border-gold/40 p-3 bg-cream-50/60 shadow-academic">
                <div className="relative rounded-2xl overflow-hidden bg-cream-200 aspect-[4/5] border border-gold-subtle flex flex-col items-center justify-center p-6 text-center group">
                  
                  {/* Clean SVG Placeholder Avatar */}
                  <div className="w-32 h-32 rounded-full border-2 border-gold/50 bg-cream-50 flex items-center justify-center text-gold mb-4 shadow-sm group-hover:scale-105 transition-transform duration-500">
                    <span className="font-serif font-bold text-4xl">IH</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-charcoal">IQRA HASAN</h3>
                  <p className="text-xs uppercase tracking-widest text-gold font-semibold mt-1">B.Ed Aspirant & Educator</p>
                  
                  <div className="mt-4 px-4 py-2 rounded-lg border border-gold/20 bg-cream-50/80 text-[11px] text-charcoal-muted">
                    <span>Teacher Portrait Placeholder</span>
                    <p className="text-[10px] text-gold mt-0.5">(Actual teacher photo to be added)</p>
                  </div>
                  
                  {/* Outer subtle gold accent ring */}
                  <div className="absolute inset-0 border border-gold/20 rounded-2xl pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
