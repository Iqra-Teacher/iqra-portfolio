import React, { useEffect } from 'react';
import { X, Play } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  title: string;
  caption: string;
  category?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  mediaUrl,
  mediaType,
  title,
  caption,
  category,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-md p-4 sm:p-6 transition-all duration-300">
      <div 
        className="relative max-w-4xl w-full bg-cream-50 rounded-2xl border border-gold-subtle shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold-subtle/80 bg-cream-100">
          <div className="flex items-center gap-3">
            {category && (
              <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-[10px] uppercase font-bold tracking-wider">
                {category}
              </span>
            )}
            <h3 className="font-serif text-lg font-bold text-charcoal truncate">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-200 text-charcoal-muted hover:text-charcoal transition-colors"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Content Container */}
        <div className="relative bg-charcoal/95 flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
          {mediaType === 'video' ? (
            <video 
              controls 
              autoPlay 
              className="max-h-[60vh] max-w-full object-contain"
              src={mediaUrl}
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <img 
              src={mediaUrl} 
              alt={title}
              className="max-h-[60vh] max-w-full object-contain"
            />
          )}
        </div>

        {/* Caption bar */}
        <div className="p-6 bg-cream-50 space-y-2">
          <h4 className="font-serif text-xl font-bold text-charcoal">{title}</h4>
          <p className="text-sm text-charcoal-medium leading-relaxed">{caption}</p>
        </div>
      </div>
    </div>
  );
};
