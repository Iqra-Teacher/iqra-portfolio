import React, { useState, useEffect } from 'react';
import { FileCheck, Download, ExternalLink, Calendar, Award } from 'lucide-react';
import { Certificate } from '../types';
import { getCertificates } from '../services/store';
import { BotanicalDecoration } from '../components/BotanicalDecoration';

export const CertificatesSection: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      setLoading(true);
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section id="certificates" className="py-20 md:py-28 bg-academic-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-super-wide text-gold font-bold">
            CREDENTIALS & VERIFICATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Certificates & Qualifications
          </h2>
          <BotanicalDecoration position="divider" />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="academic-card rounded-2xl h-64 animate-pulse bg-cream-200" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && certificates.length === 0 && (
          <div className="max-w-xl mx-auto text-center py-16 px-8 academic-card rounded-2xl border-gold/30 space-y-4 relative">
            <BotanicalDecoration position="top-right" size={40} />
            <div className="w-14 h-14 rounded-full border border-gold/40 bg-cream-100 text-gold flex items-center justify-center mx-auto shadow-sm">
              <FileCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Certificates will be uploaded here soon.
            </h3>
            <p className="text-xs text-charcoal-muted max-w-md mx-auto leading-relaxed">
              Official degree certificates, teaching workshops, and seminars will be displayed here for instant online verification and download.
            </p>
          </div>
        )}

        {/* Certificates Grid */}
        {!loading && certificates.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div key={cert.id} className="academic-card rounded-2xl p-6 flex flex-col justify-between space-y-4 group hover:border-gold">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-[10px] uppercase font-bold tracking-wider">
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-charcoal-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {cert.issue_date}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold transition-colors">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="text-xs text-charcoal-medium leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-cream-200 flex items-center justify-between gap-3">
                  <a
                    href={cert.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-gold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-gold" />
                    <span>Preview Document</span>
                  </a>

                  <a
                    href={cert.file_url}
                    download
                    className="p-2 rounded-full border border-gold/40 bg-cream-50 text-gold hover:bg-gold hover:text-cream-50 transition-colors"
                    title="Download Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
