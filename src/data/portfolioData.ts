export interface ProjectArchitecture {
  layers: { name: string; role: string; tech: string; detail: string }[];
  securitySpec: { title: string; desc: string }[];
  benchmarks: { label: string; value: string; detail: string }[];
  dataFlow: { step: number; title: string; desc: string }[];
}

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
  architecture?: ProjectArchitecture;
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
    timezone: "UTC+5:30 (IST)",
    email: "loid@sednium.com",
    emailLink: "mailto:loid@sednium.com?subject=Connecting%20via%20your%20portfolio&body=Hi%20Ankush,%0D%0AI%20came%20across%20your%20portfolio%20website%20and%20would%20love%20to%20chat%20about...",
    phone: "+91 90645 18100",
    phoneLink: "tel:+919064518100",
    pgpFingerprint: "4A8F 9C12 E5B7 88D1 32A4 F0E9 77B2 C19A",
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
      featured: true,
      architecture: {
        layers: [
          { name: "Client UI Layer", role: "120Hz Reactive Touch Interface", tech: "Kotlin / Jetpack Compose", detail: "Hardware-accelerated single-activity architecture with unidirectional data flow." },
          { name: "Local Storage Layer", role: "Encrypted Zero-Knowledge Vault", tech: "Room SQLite + AES-256-GCM", detail: "Master database key secured inside the Android hardware-backed TEE / Keystore." },
          { name: "Cryptographic Core", role: "S.H.I.E.L.D. Protocol Engine", tech: "Double Ratchet + ML-KEM-768", detail: "Generates ephemeral routing tokens and handles automatic session ratchet steps." },
          { name: "Blind Transport Layer", role: "Stateless Edge Dispatch", tech: "Vercel Edge + FCM Blind Push", detail: "Routes encrypted ciphertext envelopes without storing headers, IPs, or message bodies." }
        ],
        securitySpec: [
          { title: "Zero Server Persistence", desc: "Edge functions discard ciphertext immediately upon successful dispatch to push transports." },
          { title: "Hardware-Isolated Keys", desc: "Private signing and encryption keys never touch plaintext memory or user backups." },
          { title: "Non-Deterministic Addressing", desc: "Rotates ephemeral 8-character hex routing identifiers on every single message turn." }
        ],
        benchmarks: [
          { label: "Dispatch Overhead", value: "< 28ms", detail: "Global edge function routing latency" },
          { label: "Local Decryption", value: "< 1.2ms", detail: "AES-256-GCM hardware key unwrap" },
          { label: "Memory Footprint", value: "~42 MB", detail: "Optimized cold-boot memory heap" }
        ],
        dataFlow: [
          { step: 1, title: "Payload Encryption", desc: "Sender packages message payload, performs Double Ratchet step, and encrypts with AES-256-GCM." },
          { step: 2, title: "Routing ID Wrapping", desc: "Generates one-time ephemeral routing ID and encapsulates ciphertext in a blind JSON envelope." },
          { step: 3, title: "Stateless Edge Pass-through", desc: "Vercel Edge function matches routing token and triggers blind FCM push notification." },
          { step: 4, title: "Local TEE Unwrap", desc: "Receiver wakes up, pulls envelope, verifies ratchet integrity, and stores in encrypted local database." }
        ]
      }
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
      featured: true,
      architecture: {
        layers: [
          { name: "Layer 1: Identity Decoupling", role: "Routing ID Generation", tech: "HKDF-SHA256 non-deterministic", detail: "Completely separates cryptographic identity public keys from transport routing headers." },
          { name: "Layer 2: Hybrid Key Exchange", role: "Post-Quantum KEM", tech: "X25519 + ML-KEM-768 (Kyber)", detail: "Combines classical elliptic curves with NIST-ratified lattice cryptography." },
          { name: "Layer 3: Forward Secrecy", role: "Symmetric Ratchet", tech: "Double Ratchet Algorithm", detail: "Derives unique single-use encryption keys for every sent and received message." },
          { name: "Layer 4: Authenticated Cipher", role: "Data Integrity", tech: "ChaCha20-Poly1305 / AES-GCM", detail: "Ensures ciphertext tamper detection with authenticated tag verification." },
          { name: "Layer 5: Blind Edge Transport", role: "Zero-Knowledge Routing", tech: "Edge Functions / HTTPS", detail: "Transports data across edge nodes with zero database connections or query logging." },
          { name: "Layer 6: Hardware Anchor", role: "Device Vault", tech: "Android Keystore / Secure Enclave", detail: "Locks root state keys to hardware chips, preventing physical forensic extraction." }
        ],
        securitySpec: [
          { title: "Post-Quantum Resistant", desc: "Protects current encrypted communications from 'Harvest Now, Decrypt Later' quantum attacks." },
          { title: "Metadata Stripping", desc: "No phone numbers, email addresses, or hardware MAC addresses ever leave the client boundary." },
          { title: "Break-in Recovery", desc: "Compromise of a temporary session key does not compromise past messages or future ratchet branches." }
        ],
        benchmarks: [
          { label: "Hybrid Handshake", value: "~4.5ms", detail: "Combined X25519 + ML-KEM-768 execution" },
          { label: "Ratchet Step", value: "< 0.8ms", detail: "Per-message key derivation and hash cycle" },
          { label: "Envelope Overhead", value: "1.1 KB", detail: "Total cryptographic packet header size" }
        ],
        dataFlow: [
          { step: 1, title: "Ephemeral Key Generation", desc: "Alice generates ephemeral X25519 and ML-KEM-768 key pairs." },
          { step: 2, title: "Hybrid Shared Secret", desc: "Derives unified master secret via HKDF-SHA256 from classical and post-quantum keys." },
          { step: 3, title: "Ratchet Initialization", desc: "Initializes symmetric chain ratchet and derives first message transmission key." },
          { step: 4, title: "Ciphertext Dispatch", desc: "Sends encrypted packet stamped solely with ephemeral recipient routing ID." }
        ]
      }
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
      featured: true,
      architecture: {
        layers: [
          { name: "Touch Canvas Engine", role: "High-FPS Text Viewport", tech: "Jetpack Compose + Canvas", detail: "Virtual scrolling viewport that renders only visible syntax tokens at locked 120 FPS." },
          { name: "Incremental Parser", role: "AST Generation", tech: "Native Tree-sitter Grammar C-bindings", detail: "Parses only edited token ranges in real time without recompiling whole file trees." },
          { name: "Virtual PTY Bridge", role: "Pseudo-Terminal Emulator", tech: "Termux Linux Subsystem / POSIX C", detail: "Full ANSI escape code parsing, process spawning, and Unix signal management." },
          { name: "Mobile Build Runner", role: "On-device Compiler", tech: "Clang / Kotlin / Go Binaries", detail: "Executes toolchain compilers natively within Android sandbox boundaries." }
        ],
        securitySpec: [
          { title: "Sandboxed Process Execution", desc: "Executes compilations within isolated process namespaces with restricted file permissions." },
          { title: "Zero Cloud Dependency", desc: "All syntax parsing, file indexing, and compilation occur 100% offline on the device." },
          { title: "Memory Cap Throttling", desc: "Dynamic memory watchdog prevents OOM crashes on budget low-RAM Android chipsets." }
        ],
        benchmarks: [
          { label: "AST Parse Time", value: "< 3.2ms", detail: "Incremental syntax tree rebuild per keystroke" },
          { label: "PTY Render Latency", value: "< 5ms", detail: "ANSI terminal stream refresh rate" },
          { label: "Memory Footprint", value: "~65 MB", detail: "Active editor workspace with open PTY" }
        ],
        dataFlow: [
          { step: 1, title: "Keystroke Ingestion", desc: "Compose Canvas captures touch text change and triggers delta range listener." },
          { step: 2, title: "Tree-sitter Incremental Parse", desc: "C-native AST grammar updates edited node subtree in < 3.2ms." },
          { step: 3, title: "Viewport Syntax Tokenization", desc: "Virtual scroll engine applies semantic colors only to active screen lines." },
          { step: 4, title: "PTY Output Streaming", desc: "Compiler output streams through POSIX pipe into hardware-accelerated terminal view." }
        ]
      }
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
      url: "https://sednicon.sednicon.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      featured: true,
      architecture: {
        layers: [
          { name: "Vector Ingestion Pipeline", role: "SVG AST Parser", tech: "TypeScript / SVGO Core", detail: "Strips metadata, unifies viewport bounds, and simplifies precision coordinate paths." },
          { name: "Multiplatform Code Generator", role: "Component Transpiler", tech: "Babel AST / Kotlin Generator", detail: "Transforms optimized SVG paths into React JSX elements and Jetpack Compose VectorDrawables." },
          { name: "Serverless Delivery API", role: "Atomic Asset CDN", tech: "Vercel Edge Functions + Supabase", detail: "Serves versioned iconography packages with edge caching and instant atomic invalidation." }
        ],
        securitySpec: [
          { title: "SVG Sanitization", desc: "Neutralizes malicious XML entities, inline scripts, and CSS exploits before code generation." },
          { title: "Type-Safe Outputs", desc: "Every generated icon component exports strict TypeScript types and Compose parameter signatures." },
          { title: "Immutable CDN Hashes", desc: "Static icon bundles are distributed with cryptographic integrity hashes." }
        ],
        benchmarks: [
          { label: "Vector Compression", value: "~85% avg", detail: "Byte reduction compared to raw vector inputs" },
          { label: "Transpile Time", value: "< 1.4ms", detail: "Per-icon dual code generation speed" },
          { label: "Runtime Impact", value: "0 KB", detail: "Zero runtime library dependencies" }
        ],
        dataFlow: [
          { step: 1, title: "Raw SVG Upload", desc: "Asset uploaded through UI or CI/CD API endpoint." },
          { step: 2, title: "SVGO Compression", desc: "Optimizer cleans paths, rounds coordinates, and strips comments." },
          { step: 3, title: "Dual Transpilation", desc: "Generates typed React `.tsx` component and Android Kotlin `.kt` VectorDrawable." },
          { step: 4, title: "Edge Cache Distribution", desc: "Pushes bundle to CDN edge nodes with sub-20ms global delivery." }
        ]
      }
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
