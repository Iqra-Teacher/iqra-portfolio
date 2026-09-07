import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/experience" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/testimonials" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
