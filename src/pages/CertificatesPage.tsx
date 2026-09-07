import React from 'react';
import { Navbar } from '../components/Navbar';
import { CertificatesSection } from '../sections/CertificatesSection';
import { Footer } from '../components/Footer';

export const CertificatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col text-charcoal">
      <Navbar activeSection="certificates" />
      <main className="flex-grow pt-16">
        <CertificatesSection />
      </main>
      <Footer />
    </div>
  );
};
