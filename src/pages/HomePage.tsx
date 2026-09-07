import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { EducationExperienceSection } from '../sections/EducationExperienceSection';
import { CompetenciesSection } from '../sections/CompetenciesSection';
import { PhilosophySection } from '../sections/PhilosophySection';
import { ClassroomMomentsSection } from '../sections/ClassroomMomentsSection';
import { AchievementsSection } from '../sections/AchievementsSection';
import { CertificatesSection } from '../sections/CertificatesSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { ContactSection } from '../sections/ContactSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col text-charcoal">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <EducationExperienceSection />
        <CompetenciesSection />
        <PhilosophySection />
        <ClassroomMomentsSection />
        <AchievementsSection />
        <CertificatesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
