import React from 'react';
import { Download, Mail, Award, GraduationCap, BookOpen } from 'lucide-react';
import { TEACHER_INFO } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';
import iqraImage from '../assets/iqra.png';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden md:pt-40 md:pb-28 bg-academic-pattern">
      {/* Background Soft Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Typography & CTAs */}
          <div className="space-y-6 text-left lg:col-span-7">
            
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
              <p className="font-serif text-2xl italic font-semibold tracking-wide sm:text-3xl text-gold">
                {TEACHER_INFO.title}
              </p>
            </div>

            {/* Short Bio */}
            <p className="max-w-2xl font-sans text-base leading-relaxed text-charcoal-medium sm:text-lg">
              "{TEACHER_INFO.heroBio}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
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
                  <span className="font-serif text-2xl font-bold sm:text-3xl text-charcoal">1+ Year</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Teaching Experience</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-serif text-2xl font-bold sm:text-3xl text-charcoal">B.Sc.</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Completed</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-serif text-2xl font-bold sm:text-3xl text-charcoal">B.Ed.</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Aspirant</p>
              </div>
            </div>

          </div>

          {/* Right Column: Teacher Portrait Frame */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-md">
              
              {/* Corner Botanical SVG decorations */}
              <BotanicalDecoration position="hero-corner" size={72} />

              {/* Decorative Outer Border */}
              <div className="relative p-3 border rounded-3xl border-gold/40 bg-cream-50/60 shadow-academic">
                <div className="relative rounded-2xl overflow-hidden bg-cream-200 aspect-[4/5] border border-gold-subtle flex flex-col items-center justify-center group">
                  <img 
                    src={iqraImage} 
                    alt="IQRA HASAN" 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                  />
                  {/* Outer subtle gold accent ring */}
                  <div className="absolute inset-0 border pointer-events-none border-gold/20 rounded-2xl" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
