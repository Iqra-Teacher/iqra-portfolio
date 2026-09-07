import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { TEACHER_INFO } from '../data/teacherData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cream-200 border-t border-gold-subtle pt-16 pb-12 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gold-subtle/60">
          
          {/* Col 1: Brand & Monogram */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-gold bg-cream-50 flex items-center justify-center text-gold font-serif font-bold text-xl shadow-sm">
                IH
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-charcoal">
                  {TEACHER_INFO.name.toUpperCase()}
                </h3>
                <p className="text-xs uppercase tracking-widest-academic text-gold font-semibold">
                  {TEACHER_INFO.title}
                </p>
              </div>
            </div>
            <p className="text-charcoal-medium text-sm leading-relaxed max-w-md pt-2 italic">
              "Inspiring Young Minds, Building a Brighter Tomorrow."
            </p>
            <p className="text-charcoal-muted text-xs leading-relaxed max-w-md">
              Dedicated to delivering structured curricula, nurturing individual curiosity, and evaluating student performance with empathy and precision.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-lg font-semibold text-charcoal border-b border-gold/30 pb-2 inline-block">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-semibold text-charcoal-medium">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Me</a></li>
              <li><a href="#experience" className="hover:text-gold transition-colors">Education & Experience</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Classroom Moments</a></li>
              <li><a href="#testimonials" className="hover:text-gold transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-lg font-semibold text-charcoal border-b border-gold/30 pb-2 inline-block">
              Contact Details
            </h4>
            <div className="space-y-3 text-xs text-charcoal-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{TEACHER_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${TEACHER_INFO.phone}`} className="hover:text-gold transition-colors">
                  {TEACHER_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${TEACHER_INFO.email}`} className="hover:text-gold transition-colors">
                  {TEACHER_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Iqra Hasan. All rights reserved. Designed for Academic Excellence.</span>
            <a href="/admin" className="opacity-40 hover:opacity-100 hover:text-gold transition-opacity text-[10px] border-l border-gold-subtle pl-2">
              Admin Login
            </a>
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-medium uppercase tracking-wider"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-full border border-gold/40 bg-cream-50">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
