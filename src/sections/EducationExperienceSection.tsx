import React from 'react';
import { GraduationCap, Briefcase, CheckCircle2, Calendar, Building } from 'lucide-react';
import { EDUCATION_DATA, EXPERIENCE_DATA } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

export const EducationExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 bg-academic-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            ACADEMIC BACKGROUND & JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Education & Experience
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        {/* Side by side dual timeline cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-gold-subtle pb-4">
              <div className="w-10 h-10 rounded-full border border-gold/40 bg-cream-50 flex items-center justify-center text-gold shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">Education & Training</h3>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Degrees & Academic Credentials</p>
              </div>
            </div>

            <div className="space-y-6">
              {EDUCATION_DATA.map((item, index) => (
                <div key={index} className="academic-card rounded-2xl p-7 relative group">
                  <BotanicalDecoration position="top-right" size={32} />
                  
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-[10px] uppercase font-bold tracking-wider">
                      {item.status}
                    </span>
                    <span className="text-xs text-charcoal-muted flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {item.period}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold transition-colors">
                    {item.degree}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-charcoal-medium mt-1 mb-3">
                    <Building className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{item.institution}</span>
                  </div>

                  {item.details && (
                    <p className="text-xs text-charcoal-muted leading-relaxed border-t border-cream-200 pt-3">
                      {item.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-gold-subtle pb-4">
              <div className="w-10 h-10 rounded-full border border-gold/40 bg-cream-50 flex items-center justify-center text-gold shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">Teaching Experience</h3>
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Professional School Tenure</p>
              </div>
            </div>

            <div className="space-y-6">
              {EXPERIENCE_DATA.map((item, index) => (
                <div key={index} className="academic-card rounded-2xl p-7 relative group border-gold/40">
                  <BotanicalDecoration position="top-right" size={32} />

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-gold/20 text-gold-dark text-[10px] uppercase font-bold tracking-wider">
                      {item.period}
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl font-bold text-charcoal group-hover:text-gold transition-colors">
                    {item.role}
                  </h4>

                  <div className="flex items-center gap-2 text-sm font-semibold text-gold mt-1 mb-4">
                    <Building className="w-4 h-4 shrink-0" />
                    <span>{item.institution}</span>
                  </div>

                  <div className="space-y-2.5 border-t border-cream-200 pt-4">
                    <h5 className="text-xs uppercase tracking-widest text-charcoal-muted font-bold">Key Responsibilities:</h5>
                    <ul className="space-y-2">
                      {item.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-medium leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
