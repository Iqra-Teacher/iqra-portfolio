import React, { useState, useEffect } from 'react';
import { Award, Calendar, Sparkles } from 'lucide-react';
import { Achievement } from '../types';
import { getAchievements } from '../services/store';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

export const AchievementsSection: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const data = await getAchievements();
        setAchievements(data);
      } catch (err) {
        console.error('Error fetching achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="py-20 md:py-28 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            HONORS & MILESTONES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Achievements & Awards
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="academic-card rounded-2xl h-28 animate-pulse bg-cream-200" />
            ))}
          </div>
        )}

        {/* Beautiful Empty State (as required by prompt) */}
        {!loading && achievements.length === 0 && (
          <div className="max-w-xl mx-auto text-center py-16 px-8 academic-card rounded-2xl border-gold/30 space-y-4 relative">
            <BotanicalDecoration position="top-right" size={40} />
            <div className="w-14 h-14 rounded-full border border-gold/40 bg-cream-100 text-gold flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Achievements and milestones will be added here.
            </h3>
            <p className="text-xs text-charcoal-muted max-w-md mx-auto leading-relaxed">
              Official academic commendations, school recognitions, and competitive milestones will be posted here as updated by Iqra Hasan.
            </p>
          </div>
        )}

        {/* Dynamic Achievements List */}
        {!loading && achievements.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-6">
            {achievements.map((item) => (
              <div key={item.id} className="academic-card rounded-2xl p-7 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-gold">
                <BotanicalDecoration position="top-right" size={32} />
                
                <div className="flex items-start gap-4">
                  {item.image_url ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gold/40 shrink-0 shadow-sm mt-0.5">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full border border-gold/40 bg-cream-100 flex items-center justify-center text-gold shrink-0 mt-1 shadow-sm group-hover:bg-gold group-hover:text-cream-50 transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold">
                      {item.category || 'Academic Milestone'}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-charcoal-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-full bg-cream-200 text-charcoal-muted text-xs font-semibold flex items-center gap-1.5 shrink-0 border border-gold-subtle">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
