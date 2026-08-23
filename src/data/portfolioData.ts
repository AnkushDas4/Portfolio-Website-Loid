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
    github: "https://github.com/AnkushDas4",
    linkedin: "https://www.linkedin.com/in/ankush-das",
    telegram: "https://t.me/AnkushDas",
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
      period: "Jan 2024 – Present",
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
      tagline: "Decentralized, offline-first peer-to-peer encrypted messaging client.",
      description: "A secure communication client routing messages directly between peer devices without centralized message inspection. Automatically queues and synchronizes messages upon reconnection.",
      highlights: [
        "Noise Protocol handshake with ephemeral Curve25519 key negotiation.",
        "Zero-knowledge local database encryption with SQLCipher and ChaCha20-Poly1305.",
        "Dynamic peer discovery via libp2p Kademlia DHT and local mDNS mesh."
      ],
      tech: ["Kotlin", "libp2p", "Noise Protocol", "SQLCipher", "Android"],
      url: "https://onyxchat.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true
    },
    {
      id: "shield-protocol",
      name: "SHIELD Protocol",
      tagline: "High-throughput edge security proxy and rate limiter in Go.",
      description: "A defensive infrastructure layer built to absorb volumetric network abuse at the edge with near-zero latency overhead before packets reach application servers.",
      highlights: [
        "Kernel-level packet filtering with Linux eBPF/XDP drivers.",
        "High-throughput sliding-window rate limiting backed by distributed Redis clusters.",
        "Evaluates traffic with sub-millisecond latency overhead on verified production requests."
      ],
      tech: ["Go", "eBPF", "Redis", "Docker", "Linux XDP"],
      url: "https://sednium.com/shield",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true
    },
    {
      id: "kryptonide",
      name: "KryptonIDE",
      tagline: "Lightweight, touch-optimized development environment for mobile devices.",
      description: "A native development environment designed to write, parse, and compile code on mobile devices. Features incremental syntax parsing, integrated terminal, and responsive UI.",
      highlights: [
        "Native Tree-sitter incremental AST parsing for instant syntax highlighting.",
        "Integrated PTY terminal bridge with full ANSI color support and custom gestures.",
        "Optimized memory footprint running smoothly on constrained mobile hardware."
      ],
      tech: ["Kotlin", "Jetpack Compose", "Tree-sitter", "Termux", "C/Rust"],
      url: "https://kryptonide.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true
    },
    {
      id: "sednicon",
      name: "Sednicon",
      tagline: "Automated SVG optimization and cross-platform iconography asset pipeline.",
      description: "Asset delivery library and CLI pipeline that compresses vector graphics and exports type-safe components for React and Android Jetpack Compose.",
      highlights: [
        "Automated SVGO optimization reducing file sizes by up to 85%.",
        "Generates tree-shakeable React TypeScript components and Compose VectorDrawables.",
        "Instant build-time synchronization for multiplatform design systems."
      ],
      tech: ["TypeScript", "React", "Node.js", "SVGO", "Tailwind CSS"],
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
