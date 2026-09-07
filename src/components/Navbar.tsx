import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { TEACHER_INFO } from '../data/teacherData';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      if (location.pathname === '/' || location.pathname === '') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-50/95 backdrop-blur-md border-b border-gold-subtle/80 py-3 shadow-academic'
          : 'bg-cream-100/70 backdrop-blur-sm py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Monogram & Name */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full border border-gold/40 bg-cream-50 flex items-center justify-center text-gold font-serif font-bold text-lg shadow-sm group-hover:border-gold group-hover:bg-gold/10 transition-all">
              IH
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-charcoal group-hover:text-gold transition-colors">
                {TEACHER_INFO.name.toUpperCase()}
              </span>
              <span className="text-[10px] tracking-widest-academic uppercase text-charcoal-muted font-medium">
                B.Ed Aspirant | Aspiring Teacher
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs uppercase tracking-widest-academic font-semibold transition-colors duration-200 hover:text-gold ${
                  activeSection === link.name.toLowerCase()
                    ? 'text-gold border-b-2 border-gold pb-1'
                    : 'text-charcoal-medium'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold bg-cream-50 text-charcoal text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-cream-50 transition-all duration-300 shadow-sm"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:text-cream-50 transition-colors" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal hover:text-gold focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50 border-b border-gold-subtle px-6 py-6 space-y-4 shadow-xl transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm uppercase tracking-widest-academic font-semibold text-charcoal hover:text-gold py-1 border-b border-cream-200"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex justify-end">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold bg-gold text-cream-50 text-xs uppercase tracking-wider font-semibold"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
