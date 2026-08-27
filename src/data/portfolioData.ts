export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  url: string;
  githubUrl: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ankush Das",
    title: "Full-Stack Developer & Systems Enthusiast",
    bio: "I build responsive web applications, robust backend services, and developer tooling. Passionate about clean code, Linux systems, and open-source.",
    location: "West Bengal, India",
    email: "loid@sednium.com",
    emailLink: "mailto:loid@sednium.com?subject=Connecting%20via%20your%20portfolio&body=Hi%20Ankush,%0D%0AI%20came%20across%20your%20portfolio%20website%20and%20would%20love%20to%20chat%20about...",
    phone: "+91 90645 18100",
    phoneLink: "tel:+919064518100",
    github: "https://github.com/AnkushDas4",
    linkedin: "https://www.linkedin.com/in/ankush-das",
    telegram: "https://t.me/ankushdas4?text=Hey%20Ankush!%20I%20checked%20out%20your%20portfolio%20and%20wanted%20to%20connect.",
    telegramHandle: "@ankushdas4",
    sedniumWeb: "https://www.sednium.com",
    sedniumGithub: "https://github.com/Sednium-Technologies",
    resumeUrl: "#contact",
  },

  experience: [
    {
      id: "sednium",
      role: "Co-Founder & Chief Technology Officer",
      company: "Sednium Technologies",
      companyUrl: "https://www.sednium.com",
      period: "Jan 20, 2024 – Present",
      location: "Remote / West Bengal, India",
      description: "Co-founded Sednium Technologies focusing on decentralized communication protocols, developer productivity tools, and edge infrastructure.",
      achievements: [
        "Architected and deployed high-performance distributed systems in Go and Node.js with sub-millisecond routing efficiency.",
        "Engineered the Onyx encrypted P2P messaging protocol with end-to-end local-first cryptographic storage.",
        "Built automated CI/CD deployment workflows and containerized production microservices with Docker."
      ],
      tech: ["Go", "TypeScript", "React", "Node.js", "Docker", "eBPF", "libp2p", "PostgreSQL"]
    },
    {
      id: "independent-dev",
      role: "Full-Stack & Systems Developer",
      company: "Independent / Open Source",
      period: "2022 – 2024",
      location: "West Bengal, India",
      description: "Built open-source developer tooling, mobile-native applications, and responsive web platforms under strict hardware and performance constraints.",
      achievements: [
        "Authored mobile development workflows and native compilation pipelines on Android Linux subsystems.",
        "Built responsive frontends with React, Vite, and Tailwind CSS focusing on accessibility and fast load times.",
        "Contributed to open-source developer tools, CLI utilities, and cryptographic libraries."
      ],
      tech: ["TypeScript", "React", "Kotlin", "Tailwind CSS", "Linux Shell", "Git", "REST APIs"]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "onyxchat",
      name: "OnyxChat",
      tagline: "Zero-knowledge encrypted messaging client.",
      description: "A local-first Android chat application built on the S.H.I.E.L.D. protocol, featuring stateless routing and hardware-backed storage.",
      highlights: [
        "Stateless message routing via Vercel Edge Functions with zero data retention.",
        "Local-first SQLite database encrypted with AES-256-GCM via the Android Keystore.",
        "Uses Firebase Cloud Messaging strictly as a blind push transport for ciphertext."
      ],
      tech: ["Kotlin", "Jetpack Compose", "Android", "End to end messaging app", "Built on serverless functions"],
      url: "https://onyxchat.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true
    },
    {
      id: "shield-protocol",
      name: "S.H.I.E.L.D. Protocol",
      tagline: "Six-layer zero-knowledge messaging architecture.",
      description: "A defense-in-depth cryptographic framework designed to eliminate server-side data retention, identity correlation, and metadata leakage.",
      highlights: [
        "Replaces real-world identifiers with non-deterministic 8-character hex Routing IDs.",
        "Combines X25519 and ML-KEM-768 via HKDF-SHA256 for hybrid post-quantum encryption.",
        "Runs alongside the Signal Double Ratchet to maintain per-message forward secrecy."
      ],
      tech: ["Protocol Design", "Zero-Knowledge", "Post-Quantum", "System Architecture"],
      url: "https://sednium.com/shield",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true
    },
    {
      id: "kryptonide",
      name: "KryptonIDE",
      tagline: "Native Android integrated development environment.",
      description: "A lightweight, touch-optimized environment designed to write, parse, and compile code directly on mobile devices.",
      highlights: [
        "Built natively using Kotlin and Jetpack Compose.",
        "Features incremental syntax parsing and an integrated PTY terminal bridge.",
        "Optimized memory footprint for constrained mobile hardware performance."
      ],
      tech: ["Kotlin", "Jetpack Compose", "Mobile IDE", "Terminal", "Android"],
      url: "https://kryptonide.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true
    },
    {
      id: "sednicon",
      name: "Sednicon",
      tagline: "Automated SVG optimization and cross-platform iconography API.",
      description: "An asset delivery pipeline that compresses vector graphics and exports type-safe components.",
      highlights: [
        "Automated SVGO optimization to reduce file sizes.",
        "Generates tree-shakeable React components and Compose VectorDrawables.",
        "Deployed as a multi-platform design utility via Vercel and Supabase."
      ],
      tech: ["HTML/CSS/JS", "Headless API", "Icon API", "SVG Engine"],
      url: "https://sednicon.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true
    }
  ] as Project[],

  skills: [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "Go", "Kotlin", "Python", "SQL", "C", "HTML / CSS"]
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "Vite", "Framer Motion", "Jetpack Compose", "Responsive UI"]
    },
    {
      title: "Backend & Systems",
      skills: ["Node.js", "Express", "Go", "REST APIs", "PostgreSQL", "Redis", "libp2p", "eBPF"]
    },
    {
      title: "DevOps & Tooling",
      skills: ["Git & GitHub", "Docker", "Linux Shell / Bash", "CI/CD Actions", "Vercel", "Termux", "Android Studio"]
    }
  ] as SkillCategory[],

  about: {
    paragraphs: [
      "I'm a full-stack developer and systems engineer based in West Bengal, India. My journey into software development started with a strong curiosity for how computers and networks operate under the hood.",
      "Having built applications and compiled large codebases directly on mobile Linux environments early on, I developed a strong appreciation for writing lean, efficient, and well-structured code without unnecessary bloat.",
      "Today, as Co-Founder & CTO at Sednium Technologies, I work across the entire stack—from building clean, accessible web interfaces in React and TypeScript to architecting high-performance backend services in Go and Node.js."
    ]
  }
};
