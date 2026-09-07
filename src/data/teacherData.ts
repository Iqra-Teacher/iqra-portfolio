import { EducationItem, ExperienceItem, CompetencyItem } from '../types';

export const TEACHER_INFO = {
  name: "Iqra Hasan",
  title: "B.Ed Aspirant | Aspiring Teacher",
  phone: "+91 8077241972",
  email: "Iqrahasan848@gmail.com",
  address: "Near Shahab Masjid, 18/7 Ground Floor, Batla House, Okhla, New Delhi",
  eyebrow: "INSPIRING YOUNG MINDS",
  heroBio: "Passionate about creating a positive and engaging learning environment where every student feels valued, confident and motivated to learn.",
  aboutTitle: "A Dedicated and Passionate Teacher",
  aboutBio: "I am a Bachelor of Science (B.Sc.) graduate from Mahatma Jyotiba Phule Rohilkhand University and an active B.Ed aspirant preparing to dedicatedly serve in secondary education. Having taught at The Meezan Global School, I specialize in planning structured curricula, managing dynamic classroom environments, resolving student queries with clarity, and evaluating student performance with empathy and precision.",
  
  stats: [
    { label: "Teaching Experience", value: "1+ Year" },
    { label: "Completed", value: "B.Sc." },
    { label: "Aspirant", value: "B.Ed." },
  ],

  personalDetails: {
    fatherName: "Mr. Mehhndi Hasan",
    dateOfBirth: "08 December 2004",
    gender: "Female",
    maritalStatus: "Unmarried",
    nationality: "Indian",
    languages: ["English", "Hindi"],
  },

  philosophyQuote: "Every child learns differently. My goal is to create a positive classroom where every student feels confident, respected, and motivated to learn.",

  resumeUrl: "#", // Replaceable URL for Iqra Hasan's PDF resume
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Bachelor of Science (B.Sc.)",
    institution: "Mahatma Jyotiba Phule Rohilkhand University, Bareilly",
    period: "2023 – 2026",
    status: "Completed",
    details: "Foundational studies in Science & Analytical Methods."
  },
  {
    degree: "B.Ed Aspirant",
    institution: "Bachelor of Education Preparation",
    period: "Ongoing",
    status: "Preparing",
    details: "Developing modern pedagogical techniques, educational psychology, and classroom instructional strategies."
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Teacher",
    institution: "The Meezan Global School",
    period: "2024 – 2025",
    responsibilities: [
      "Planned and delivered lessons according to the school curriculum.",
      "Managed classroom activities and maintained discipline.",
      "Effectively resolved students' doubts with clear explanations.",
      "Conducted tests and evaluated student performance.",
      "Prepared lesson plans and academic reports using MS Word.",
      "Communicated with parents regarding students' academic progress."
    ]
  }
];

export const COMPETENCIES_DATA: CompetencyItem[] = [
  {
    id: "lesson-planning",
    title: "Lesson Planning",
    description: "Structuring comprehensive academic sessions aligned with school curriculum goals.",
    iconName: "BookOpen"
  },
  {
    id: "classroom-mgmt",
    title: "Classroom Management",
    description: "Fostering an organized, disciplined, and supportive environment for active learning.",
    iconName: "Users"
  },
  {
    id: "student-assessment",
    title: "Student Assessment",
    description: "Conducting systematic evaluations, progress tracking, and diagnostic tests.",
    iconName: "CheckSquare"
  },
  {
    id: "communication",
    title: "Communication Skills",
    description: "Clear, empathetic communication with students, fellow staff, and school leadership.",
    iconName: "MessageCircle"
  },
  {
    id: "time-mgmt",
    title: "Time Management",
    description: "Balancing curriculum pacing, doubt sessions, and administrative tasks efficiently.",
    iconName: "Clock"
  },
  {
    id: "discipline-mgmt",
    title: "Discipline Management",
    description: "Encouraging positive behavior and respectful peer interaction in class.",
    iconName: "ShieldCheck"
  },
  {
    id: "report-prep",
    title: "Report Preparation",
    description: "Drafting detailed student progress reports and lesson documentation.",
    iconName: "FileText"
  },
  {
    id: "ms-office",
    title: "MS Office",
    description: "Proficient in preparing academic reports and presentations using MS Word & tools.",
    iconName: "Laptop"
  },
  {
    id: "parent-interaction",
    title: "Parent Interaction",
    description: "Conducting insightful parent-teacher consultations to support student development.",
    iconName: "HeartHandshake"
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    description: "Addressing student learning challenges and adaptively explaining difficult concepts.",
    iconName: "Lightbulb"
  }
];
