import React from 'react';
import { Navbar } from '../components/Navbar';
import { ClassroomMomentsSection } from '../sections/ClassroomMomentsSection';
import { Footer } from '../components/Footer';

export const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col text-charcoal">
      <Navbar activeSection="gallery" />
      <main className="flex-grow pt-16">
        <ClassroomMomentsSection />
      </main>
      <Footer />
    </div>
  );
};
