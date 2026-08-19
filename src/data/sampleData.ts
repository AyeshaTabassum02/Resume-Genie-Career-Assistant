import { ResumeFormData } from '../types';

export const SAMPLE_STUDENT_PROFILE: ResumeFormData = {
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@example.edu',
  phone: '+91 98765 43210',
  location: 'Bengaluru, India',
  linkedIn: 'https://linkedin.com/in/aarav-sharma-cs',
  gitHub: 'https://github.com/aaravsharma-dev',
  portfolio: 'https://aaravsharma.dev',
  targetRole: 'Junior Full Stack Developer',
  technicalSkills: 'JavaScript, TypeScript, React.js, Node.js, Express, Python, SQL, MongoDB, Tailwind CSS, Git, Docker basics, REST APIs',
  softSkills: 'Problem Solving, Agile Teamwork, Technical Writing, Adaptability, Communication, Time Management',
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'National Institute of Technology Karnataka',
      year: '2022 - 2026',
      cgpaOrPercentage: '8.75 CGPA',
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary School Certificate (Class XII - PCM)',
      institution: 'Delhi Public School',
      year: '2020 - 2022',
      cgpaOrPercentage: '94.2%',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Campus Food Delivery & Pre-Order Portal',
      description: 'Built a responsive full-stack web application allowing campus students to order food from university canteens and track pickup times in real-time.',
      technologies: 'React, Node.js, Express, MongoDB, Socket.io, Tailwind CSS',
      roleOrContribution: 'Designed MongoDB database schemas, built REST API endpoints, and created the responsive frontend dashboard with live order tracking status.',
    },
    {
      id: 'proj-2',
      title: 'AI Smart Flashcards & Quiz Generator',
      description: 'Developed an automated study companion that generates structured quiz questions and spaced-repetition flashcards from uploaded course lecture notes.',
      technologies: 'Python, FastAPI, Gemini API, TypeScript, React',
      roleOrContribution: 'Implemented backend NLP prompt pipelines, handled rate limiting and structured JSON generation, and designed the clean student revision interface.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      organization: 'TechSprint Solutions (Campus Incubator)',
      role: 'Frontend Developer Intern',
      duration: 'May 2024 - July 2024',
      description: 'Collaborated with a team of 4 to revamp client dashboard UI in React, decreased page load time by 30% via lazy loading and image optimization, and resolved 25+ frontend bug tickets.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      year: '2024',
    },
    {
      id: 'cert-2',
      name: 'Postman API Fundamentals Student Expert',
      issuer: 'Postman',
      year: '2024',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Runner Up - HackNITK 2024',
      description: 'Built an accessible offline-first learning platform for rural education in a 36-hour hackathon with 120+ participating teams.',
    },
    {
      id: 'ach-2',
      title: 'Department Academic Merit List',
      description: 'Ranked in top 5% of CSE department across consecutive semesters for academic excellence.',
    },
  ],
};

export const SAMPLE_RESUME_TEXT = `AARAV SHARMA
Bengaluru, India | +91 98765 43210 | aarav.sharma@example.edu
LinkedIn: linkedin.com/in/aarav-sharma-cs | GitHub: github.com/aaravsharma-dev

CAREER OBJECTIVE
Enthusiastic and detail-oriented Computer Science undergraduate seeking a Junior Full Stack Developer role to leverage strong foundations in React, Node.js, RESTful APIs, and modern web architectures in building scalable applications.

EDUCATION
B.Tech in Computer Science and Engineering | NIT Karnataka (2022 - 2026) | CGPA: 8.75/10
Higher Secondary Certificate (PCM) | Delhi Public School (2020 - 2022) | 94.2%

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, Python, C++, SQL
- Frontend: React.js, Redux Toolkit, Tailwind CSS, HTML5, CSS3
- Backend: Node.js, Express.js, REST APIs, FastAPI
- Databases & Tools: MongoDB, PostgreSQL, Git, GitHub, Postman, Docker (Basics), Vite

WORK EXPERIENCE
TechSprint Solutions | Frontend Developer Intern | May 2024 - July 2024 | Bengaluru
- Engineered responsive client dashboard components using React and Tailwind CSS, improving mobile usability scores by 25%.
- Optimized asset bundling and implemented route-based code splitting, reducing initial load latency by 30%.
- Integrated RESTful API endpoints and implemented client-side state caching with error boundary handling.

KEY PROJECTS
Campus Food Delivery & Pre-Order Portal (React, Node.js, MongoDB, Express, Socket.io)
- Architected end-to-end canteen ordering web platform serving 800+ active student users.
- Built authenticated REST APIs and real-time order status tracking with WebSocket notifications.
- Integrated payment simulated workflows and admin inventory management panel.

AI Smart Quiz & Flashcard Generator (Python, FastAPI, React, TypeScript, Gemini API)
- Created an NLP-driven revision tool converting PDF lecture notes into interactive flashcards and practice quizzes.
- Configured structured JSON outputs with schema validation, achieving <2.5s response processing time.

CERTIFICATIONS & AWARDS
- Meta Front-End Developer Professional Certificate (Coursera, 2024)
- Postman API Fundamentals Student Expert (2024)
- 1st Runner Up - HackNITK 2024 (Built offline rural education prototype among 120+ teams)`;

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Junior Full Stack Developer (React / Node.js)',
    company: 'Apex Cloud Technologies',
    text: `Job Title: Junior Full Stack Developer
Company: Apex Cloud Technologies
Location: Bengaluru / Remote

About the Role:
We are looking for a motivated Junior Full Stack Developer to join our growing engineering team. You will assist in developing high-performance web applications, collaborating closely with senior engineers, product managers, and designers.

Responsibilities:
- Build, test, and deploy clean, responsive web user interfaces using React.js and modern TypeScript.
- Develop and maintain scalable REST APIs and microservices using Node.js and Express.
- Work with relational and NoSQL databases such as PostgreSQL and MongoDB.
- Write clean, modular, and well-tested code following best engineering practices.
- Participate in code reviews, daily standups, and sprint planning.
- Troubleshoot, debug, and optimize application performance across browsers.

Required Skills & Qualifications:
- Bachelor's degree in Computer Science, IT, or related technical field (or currently pursuing).
- Strong proficiency in JavaScript (ES6+), TypeScript, HTML5, and CSS3.
- Hands-on experience with React.js (Hooks, Context, State Management).
- Solid knowledge of Node.js, Express, and RESTful API design.
- Familiarity with SQL/PostgreSQL or MongoDB.
- Version control proficiency using Git and GitHub.
- Good understanding of web security fundamentals, JWT authentication, and CORS.

Bonus / Nice-to-Have:
- Experience with Docker, CI/CD pipelines, or AWS/GCP cloud basics.
- Familiarity with Tailwind CSS, Next.js, or Jest unit testing.
- Strong passion for writing readable code and continuous learning.`,
  },
  {
    title: 'Frontend Developer Associate (React & TypeScript)',
    company: 'PixelCraft Digital Labs',
    text: `Job Title: Frontend Developer Associate
Company: PixelCraft Digital Labs
Location: Hyderabad / Hybrid

Key Responsibilities:
- Translate UI/UX Figma wireframes into pixel-perfect, accessible, and high-performance React web components.
- Maintain and enhance our internal UI design system using Tailwind CSS and TypeScript.
- Integrate frontend views with GraphQL and REST backend services.
- Optimize frontend web performance, Core Web Vitals, and responsive cross-browser compatibility.
- Write unit and integration tests using Vitest / React Testing Library.

Qualifications:
- Solid proficiency in Modern React (React 18+, Hooks, Custom Hooks).
- Deep knowledge of TypeScript, CSS3, Tailwind CSS, and Flexbox/Grid layouts.
- Understanding of state management (Zustand, Redux, or React Query).
- Understanding of web accessibility (WCAG AA) standards and SEO best practices.
- Excellent collaborative problem-solving skills and curiosity.`,
  },
  {
    title: 'Junior Data Analyst & Python Developer',
    company: 'InsightMetrics Analytics',
    text: `Job Title: Junior Data Analyst
Company: InsightMetrics Analytics
Location: Pune / Remote

Role Overview:
Join our analytics team to extract actionable insights from large datasets, build interactive data dashboards, and automate reporting pipelines.

Requirements:
- Strong foundations in Python, Pandas, NumPy, and SQL queries.
- Experience with Data Visualization tools such as Tableau, PowerBI, or Matplotlib/Seaborn.
- Understanding of relational database schemas and data cleaning methodologies.
- Basic familiarity with Machine Learning algorithms (Linear Regression, Decision Trees) is a plus.
- Strong analytical and quantitative problem-solving mindset.`,
  },
];

export const CAREER_ROLE_PRESETS = [
  'Full Stack Developer (MERN / TypeScript)',
  'Frontend Developer (React / Next.js)',
  'Backend Developer (Node.js / Express / Python)',
  'Junior Data Analyst / BI Developer',
  'AI / Machine Learning Engineer (Junior)',
  'Cloud & DevOps Engineer (Associate)',
  'Cybersecurity Analyst (Junior)',
  'Mobile App Developer (React Native / Flutter)',
];
