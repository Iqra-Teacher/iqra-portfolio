import React from 'react';
import { 
  BookOpen, Users, CheckSquare, MessageCircle, Clock, 
  ShieldCheck, FileText, Laptop, HeartHandshake, Lightbulb 
} from 'lucide-react';
import { COMPETENCIES_DATA } from '../data/teacherData';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Users,
  CheckSquare,
  MessageCircle,
  Clock,
  ShieldCheck,
  FileText,
  Laptop,
  HeartHandshake,
  Lightbulb,
};

export const CompetenciesSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            TEACHING PROFICIENCY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Key Competencies & Skills
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        {/* 10 Items Icon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {COMPETENCIES_DATA.map((item) => {
            const Icon = iconMap[item.iconName] || BookOpen;
            return (
              <div
                key={item.id}
                className="academic-card rounded-2xl p-6 flex flex-col items-center text-center space-y-3 relative group hover:border-gold transition-all"
              >
                <div className="w-12 h-12 rounded-full border border-gold/40 bg-cream-100 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-cream-50 transition-colors shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-gold transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {item.description}
                </p>

                {/* Subtle gold line accent */}
                <div className="w-8 h-[1px] bg-gold/30 group-hover:w-16 transition-all duration-300 mt-2" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
