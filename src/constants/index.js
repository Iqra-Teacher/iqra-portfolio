import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaWhatsapp,
  FaAward,
  FaBuilding,
  FaLaptopCode,
  FaMobileAlt,
  FaDatabase
} from 'react-icons/fa';

import { 
  SiReact, 
  SiJavascript, 
  SiHtml5, 
  SiCss, 
  SiTailwindcss, 
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVscodium,
  SiVercel,
  SiNetlify,
  SiFramer
} from 'react-icons/si';

// Social Profiles & Links
export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/Abdul00Kadir',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/abdul-kadir-b1a084310/',
    icon: FaLinkedin,
  },
  {
    name: 'Email',
    url: 'mailto:788abdulkadir788@gmail.com',
    icon: FaEnvelope,
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/918433041563',
    icon: FaWhatsapp,
  }
];

// What I Build - Connected Pillars
export const WHAT_I_BUILD = [
  {
    id: 'business-apps',
    title: 'BUSINESS APPLICATIONS',
    icon: FaBuilding,
    code: 'SYS.01',
    description: 'ERP systems, internal operational tools, automated workflows, and custom enterprise software engineered for usability and efficiency.',
    highlights: ['ERP Systems', 'Internal Dashboards', 'Workflow Automation']
  },
  {
    id: 'web-apps',
    title: 'WEB APPLICATIONS',
    icon: FaLaptopCode,
    code: 'SYS.02',
    description: 'Modern, responsive web applications, SaaS interfaces, and high-performance digital product experiences.',
    highlights: ['React & Next.js', 'Single Page Apps', 'Component Systems']
  },
  {
    id: 'mobile-apps',
    title: 'MOBILE APPLICATIONS',
    icon: FaMobileAlt,
    code: 'SYS.03',
    description: 'Business-focused mobile solutions, progressive web apps, and touch-optimized responsive digital interfaces.',
    highlights: ['Responsive PWA', 'Cross-Device UX', 'Mobile First']
  },
  {
    id: 'digital-platforms',
    title: 'DIGITAL PLATFORMS',
    icon: FaDatabase,
    code: 'SYS.04',
    description: 'API integrations, data-driven backends, product catalog platforms, and scalable digital architectures.',
    highlights: ['API Integration', 'Data Syncing', 'Catalog Systems']
  }
];

// Selected Work / Case Studies dataset with Asymmetric Layout metadata
export const PROJECTS = [
  {
    title: 'Ninja Modular Bath & Kitchen',
    category: 'Featured Business Case Study',
    featured: true,
    accent: '#22C55E',
    tech: ['Wix Studio', 'Velo JS', 'Responsive UX', 'Catalog Architecture'],
    description: 'A premium corporate showcase and catalog platform featuring an intelligent filtering system for large product inventories, custom client workflows, and conversion-optimized navigation.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
    liveUrl: 'https://ninjambk.com/',
  },
  {
    title: 'AH Pharmacy',
    category: 'Full Stack Application',
    featured: false,
    accent: '#F97316',
    tech: ['Next.js', 'Tailwind CSS', 'Node.js', 'Google Sheets API'],
    description: 'A data-driven storefront application featuring real-time synchronization with a Google Sheets backend and near-instant product search indexes.',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://ah-pharmacy.vercel.app/',
    githubUrl: 'https://github.com/Abdul00kadir/ah-pharmacy',
  },
  {
    title: 'Quiz Application',
    category: 'React Application',
    featured: false,
    accent: '#F59E0B',
    tech: ['React.js', 'Framer Motion', 'QuizAPI.io', 'Tailwind CSS'],
    description: 'An interactive quiz interface dynamically fetching question endpoints with real-time scoring, state tracking, and motion feedback.',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://quiz-by-abdul.netlify.app/',
    githubUrl: 'https://github.com/Abdul00kadir/quiz-app',
  },
  {
    title: 'Personal Portfolio',
    category: 'Product Portfolio',
    featured: false,
    accent: '#10B981',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Lenis', 'EmailJS'],
    description: 'Modern developer portfolio built with clean product design language, smooth scroll interactions, and integrated email messaging.',
    image: 'https://images.unsplash.com/photo-1581091870622-3e0b9f1c8d6e?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://abdulkadir.vercel.app/',
    githubUrl: 'https://github.com/Abdul00kadir/portfolio-website',
  }
];

// Professional Progression dataset
export const EXPERIENCE = [
  {
    period: '2026 — PRESENT',
    role: 'Software Developer',
    company: 'Ninja Modular Bath & Kitchen',
    stage: 'SOFTWARE & BUSINESS SYSTEMS',
    description: 'Leading software development initiatives focusing on business applications, ERP/business workflows, web & mobile digital solutions, and internal systems optimization.',
    highlights: [
      'Engineered business-critical web & catalog application features',
      'Developed internal workflow tools and operational solutions',
      'Architected responsive user interfaces and digital platforms'
    ]
  },
  {
    period: '2025 — 2026',
    role: 'Web Developer',
    company: 'Ninja Modular Bath & Kitchen',
    stage: 'WEB DEVELOPMENT & UI',
    description: 'Developed responsive web applications and product showcases. Optimized digital user journeys, catalog filtering systems, and frontend implementation.',
    highlights: [
      'Implemented custom catalog filtering and navigation structures',
      'Built pixel-perfect responsive layouts for business presentation',
      'Collaborated on web platform performance and conversion optimization'
    ]
  }
];

// Engineering Toolkit Categorized Dataset
export const ENGINEERING_STACK = [
  {
    category: 'Frontend',
    description: 'Building responsive, scalable, and user-centric interfaces',
    skills: [
      { name: 'React.js', icon: SiReact },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Next.js', icon: SiNextdotjs },
    ]
  },
  {
    category: 'Backend & Data',
    description: 'Data flow, APIs, server runtime, and storage layers',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'REST APIs', icon: FaDatabase },
    ]
  },
  {
    category: 'Tools & Workflow',
    description: 'Development environment, version control, and deployment pipelines',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: SiVscodium },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Netlify', icon: SiNetlify },
    ]
  },
  {
    category: 'Motion & UX',
    description: 'Refined UI motion and smooth scrolling engines',
    skills: [
      { name: 'Framer Motion', icon: SiFramer },
      { name: 'GSAP', icon: FaLaptopCode },
      { name: 'Lenis Scroll', icon: FaLaptopCode },
    ]
  }
];

// Education history dataset
export const EDUCATION = [
  {
    year: '2023 — 2026',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'IFTM University',
    location: 'Moradabad, India',
    description: 'Foundational computer science degree focusing on software engineering, programming paradigms, data structures, database management systems, and web technologies.'
  },
  {
    year: '2022',
    degree: '12th Standard (PCM)',
    institution: 'HBM Inter College',
    location: 'Moradabad, India',
    description: 'Completed secondary education with focused study in Physics, Chemistry, and Advanced Mathematics.'
  },
  {
    year: '2020',
    degree: '10th Standard',
    institution: 'HBM Inter College',
    location: 'Moradabad, India',
    description: 'Completed general secondary education with strong foundations in science and mathematics.'
  }
];

// Certifications dataset
export const CERTIFICATIONS = [
  {
    title: 'Google Digital Garage',
    subtitle: 'Frontend Development Fundamentals',
    year: '2023',
    issuer: 'Google',
    icon: FaAward,
  },
  {
    title: 'Meta Front-End Developer',
    subtitle: 'Professional Certificate',
    year: '2023',
    issuer: 'Coursera / Meta',
    icon: FaAward,
  },
  {
    title: 'Responsive Web Design',
    subtitle: 'Developer Certification',
    year: '2022',
    issuer: 'freeCodeCamp',
    icon: FaAward,
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    subtitle: 'Developer Certification',
    year: '2022',
    issuer: 'freeCodeCamp',
    icon: FaAward,
  }
];
