import React from 'react';
import { UserCheck, BookOpen, Heart, Sparkles, User, Calendar, Languages, Globe, Shield } from 'lucide-react';
import { TEACHER_INFO } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: UserCheck,
      title: "Student-Centered Approach",
      desc: "Tailoring instructional explanations to individual student learning paces, ensuring clarity and confidence."
    },
    {
      icon: BookOpen,
      title: "Creative Lesson Planning",
      desc: "Developing structured academic lesson plans using MS Word and interactive teaching aids aligned with school curriculum."
    },
    {
      icon: Heart,
      title: "Positive Classroom Environment",
      desc: "Maintaining respectful discipline and encouragement where every child feels valued, motivated, and supported."
    },
    {
      icon: Sparkles,
      title: "Continuous Learning",
      desc: "Actively pursuing Bachelor of Education (B.Ed.) methodologies to implement modern pedagogy and evaluation."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            ABOUT ME
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            {TEACHER_INFO.aboutTitle}
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        {/* Top Grid: Bio + Personal Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Main Professional Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="academic-card rounded-2xl p-8 relative overflow-hidden">
              <BotanicalDecoration position="top-right" size={40} />
              
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-4 border-b border-gold-subtle pb-3">
                Educational Philosophy & Background
              </h3>

              <p className="text-charcoal-medium leading-relaxed text-base mb-4">
                {TEACHER_INFO.aboutBio}
              </p>

              <p className="text-charcoal-medium leading-relaxed text-base">
                During my tenure as a teacher at <span className="font-semibold text-charcoal">The Meezan Global School (2024–2025)</span>, I successfully managed daily classroom activities, evaluated student progress through systematic assessments, conducted parent communication, and maintained consistent academic documentation.
              </p>
            </div>
          </div>

          {/* Personal Details Card */}
          <div className="lg:col-span-5">
            <div className="academic-card rounded-2xl p-8 relative border-gold/40">
              <div className="flex items-center gap-3 mb-6 border-b border-gold-subtle pb-4">
                <div className="p-2.5 rounded-full bg-gold/10 text-gold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-charcoal">Personal Details</h4>
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Verified Profile Information</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-cream-200">
                  <span className="text-charcoal-muted flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gold" /> Father's Name:
                  </span>
                  <span className="font-semibold text-charcoal">{TEACHER_INFO.personalDetails.fatherName}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-cream-200">
                  <span className="text-charcoal-muted flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold" /> Date of Birth:
                  </span>
                  <span className="font-semibold text-charcoal">{TEACHER_INFO.personalDetails.dateOfBirth}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-cream-200">
                  <span className="text-charcoal-muted flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-gold" /> Marital Status:
                  </span>
                  <span className="font-semibold text-charcoal">{TEACHER_INFO.personalDetails.maritalStatus}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-cream-200">
                  <span className="text-charcoal-muted flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-gold" /> Nationality:
                  </span>
                  <span className="font-semibold text-charcoal">{TEACHER_INFO.personalDetails.nationality}</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-charcoal-muted flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5 text-gold" /> Languages Spoken:
                  </span>
                  <span className="font-semibold text-gold">
                    {TEACHER_INFO.personalDetails.languages.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Competency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="academic-card rounded-xl p-6 space-y-3 relative group hover:border-gold transition-all"
              >
                <div className="w-12 h-12 rounded-full border border-gold/40 bg-cream-100 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-cream-50 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-charcoal">
                  {item.title}
                </h4>
                <p className="text-xs text-charcoal-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
