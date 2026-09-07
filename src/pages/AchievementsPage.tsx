import React from 'react';
import { Navbar } from '../components/Navbar';
import { AchievementsSection } from '../sections/AchievementsSection';
import { Footer } from '../components/Footer';

export const AchievementsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col text-charcoal">
      <Navbar activeSection="achievements" />
      <main className="flex-grow pt-16">
        <AchievementsSection />
      </main>
      <Footer />
    </div>
  );
};
