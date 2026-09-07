import React from 'react';
import { Quote } from 'lucide-react';
import { TEACHER_INFO } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-20 bg-cream-200 border-y border-gold-subtle relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-academic-pattern opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        <div className="inline-flex p-3 rounded-full border border-gold/40 bg-cream-50 text-gold shadow-sm">
          <Quote className="w-6 h-6" />
        </div>

        <span className="block text-xs uppercase tracking-super-wide text-gold font-bold">
          TEACHING PHILOSOPHY
        </span>

        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic font-semibold text-charcoal leading-relaxed max-w-3xl mx-auto">
          "{TEACHER_INFO.philosophyQuote}"
        </blockquote>

        <BotanicalDecoration position="divider" />

        <div className="space-y-1 pt-2">
          <p className="font-serif text-xl font-bold text-charcoal">IQRA HASAN</p>
          <p className="text-xs uppercase tracking-widest text-gold font-semibold">
            B.Ed Aspirant & Dedicated Educator
          </p>
        </div>

      </div>
    </section>
  );
};
