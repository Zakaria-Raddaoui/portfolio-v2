export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = {
  Frontend: [
    "React.js",
    "TypeScript",
    "TailwindCSS",
    "HTML5",
    "CSS3 / SASS",
    "Bootstrap",
    "Responsive Design",
    "Figma",
  ],
  Backend: [
    "PHP / Moodle",
    "Node.js",
    "Spring Boot",
    "Python",
    "Java",
    "C",
    "MySQL",
    "PostgreSQL",
    "REST APIs",
  ],
  Tools: [
    "Docker",
    "Git / GitHub",
    "Keycloak",
    "Ollama",
    "Vite",
    "Agile / Scrum",
    "CI/CD",
    "Linux",
  ],
};

export const EXPERIENCE = [
  {
    period: "Feb 2025 – Jun 2025",
    role: "Final Year Project",
    company: "Skilevo",
    logoFile: "skilevo.png",
    desc: "Full Moodle-based LMS with AI chatbot (Ollama), code playground supporting Python/C/Java, course recommendation engine, custom onboarding flow, and a fully redesigned UI.",
    tags: ["Moodle", "PHP", "Docker", "Ollama", "AI"],
  },
  {
    period: "Sep 2024 – Oct 2024",
    role: "Freelance Developer",
    company: "Rayacomint",
    logoFile: "rayacomint.png",
    desc: "Responsive website for an import/export company with a dynamic product catalog and full internationalization supporting French, Portuguese, Russian, and English.",
    tags: ["React", "TailwindCSS", "i18n"],
  },
];

export const PROJECTS = [
  {
    num: "01",
    title: "Skilevo",
    desc: "A complete LMS platform built on Moodle, featuring an integrated AI chatbot powered by Ollama, a multi-language code playground, and a smart course recommendation system.",
    tags: ["Moodle", "PHP", "Docker", "Ollama", "AI"],
    live: null,
    featured: true,
  },
  {
    num: "02",
    title: "DevTrack",
    desc: "A collaborative developer task tracker built with React and Node.js — real-time kanban boards, sprint planning, GitHub integration, and team analytics. Designed for dev teams who move fast.",
    tags: ["React", "Node.js", "TypeScript", "TailwindCSS", "REST API"],
    github: "https://github.com/Zakaria-Raddaoui/devtrack-fastapi-react",
    live: null,
    featured: false,
    collab: true,
  },
  {
    num: "03",
    title: "Rayacomint",
    desc: "Responsive website for an import/export company with multilingual support across 4 languages and a dynamic product catalog.",
    tags: ["React", "TailwindCSS", "i18n"],
    github: "https://github.com/Zakaria-Raddaoui/rayacomint",
    live: "https://rayacomint.vercel.app/",
    featured: false,
  },
  {
    num: "04",
    title: "Pexelicons",
    desc: "A platform offering custom folder icon packs for Windows — personalize your desktop experience with curated icon sets.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Zakaria-Raddaoui/Pexelicons",
    live: "https://pexelicons.vercel.app/",
    featured: false,
  },
  {
    num: "05",
    title: "Labyrinthe",
    desc: "Maze-solving algorithm visualizer using BFS and DFS on randomly generated mazes, built in Python.",
    tags: ["Python", "Algorithms", "BFS / DFS"],
    github: "https://github.com/Zakaria-Raddaoui/Labyrinthe",
    live: null,
    featured: false,
  },
  {
    num: "06",
    title: "QR Generator",
    desc: "A sleek QR code generator that encodes any text into a QR code instantly, with a clean and minimal UI.",
    tags: ["HTML", "CSS", "JavaScript", "API"],
    github: "https://github.com/Zakaria-Raddaoui/QR-Generator",
    live: "https://qr-generator-pi-liart.vercel.app/",
    featured: false,
  },
];

export const STATS = [
  { num: "5", suffix: "+", label: "Years building" },
  { num: "6", suffix: "+", label: "Projects shipped" },
  { num: "4", suffix: "", label: "Languages spoken" },
  { num: "M", suffix: "", label: "Masters degree" },
];
