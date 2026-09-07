import React from 'react';

interface BotanicalProps {
  className?: string;
  size?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'divider' | 'hero-corner';
}

export const BotanicalDecoration: React.FC<BotanicalProps> = ({ 
  className = '', 
  size = 48,
  position = 'top-right' 
}) => {
  if (position === 'divider') {
    return (
      <div className={`flex items-center justify-center my-6 gap-3 ${className}`}>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold/60" />
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-gold"
        >
          <path d="M12 2v20M12 2c3.5 3 6 7.5 6 12s-2.5 8-6 8M12 2c-3.5 3-6 7.5-6 12s2.5 8 6 8" />
          <path d="M6 10c2-1 4-1 6 0M12 10c2-1 4-1 6 0" />
        </svg>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold/60" />
      </div>
    );
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-3 right-3 text-gold/30';
      case 'top-left':
        return 'top-3 left-3 text-gold/30 -scale-x-100';
      case 'bottom-right':
        return 'bottom-3 right-3 text-gold/30 -scale-y-100';
      case 'bottom-left':
        return 'bottom-3 left-3 text-gold/30 -scale-x-100 -scale-y-100';
      case 'hero-corner':
        return '-top-6 -right-6 text-gold/40 scale-125';
      default:
        return 'top-3 right-3 text-gold/30';
    }
  };

  return (
    <div className={`absolute pointer-events-none ${getPositionClasses()} ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 64 64" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M8 56C24 48 38 34 56 8" />
        <path d="M56 8C48 20 38 28 26 34" />
        <path d="M56 8C44 16 36 26 30 38" />
        <path d="M38 34C28 38 18 44 8 56" />
        <path d="M26 34C18 42 12 50 8 56" />
        <circle cx="56" cy="8" r="2" fill="currentColor" />
        <circle cx="38" cy="22" r="1.5" fill="currentColor" />
        <circle cx="24" cy="36" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};
