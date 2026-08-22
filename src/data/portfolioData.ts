export interface Project {
  id: string;
  name: string;
  category: 'Decentralized' | 'Security Infrastructure' | 'Developer Tooling' | 'Design Systems';
  tagline: string;
  description: string;
  architectureDetails: string[];
  status: 'active' | 'under development';
  statusLabel: string;
  url: string;
  githubUrl: string;
  logo: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  flowNodes?: { title: string; desc: string; icon: string }[];
}

export interface SkillItem {
  name: string;
  category: 'Languages & Core' | 'Decentralized & Security' | 'Mobile Native' | 'DevOps & Cloud';
  percentage: number;
  level: 'Mastery' | 'Expert' | 'Advanced' | 'Specialist';
  years: string;
  highlight: string;
}

export interface TimelineItem {
  id: string;
  era: string;
  date: string;
  title: string;
  role: string;
  badge: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export const PORTFOLIO_DATA = {
  hero: {
    handle: "Løid",
    name: "Ankush Das",
    title: "Chief Technology Officer",
    company: "Sednium Technologies",
    tagline: "Mobile-First Systems Architect & Decentralized Infrastructure Engineer",
    badge: "SYSTEM OPERATIONAL • CTO @ SEDNIUM",
    status: "Available for Architecture & Strategic Engineering",
    bio: "I engineer decentralized peer-to-peer protocols, zero-compromise security layers, and mobile-native developer tooling from the ground up. Self-taught and forged under extreme hardware constraints, my core engineering philosophy is simple: constraints breed leaner, faster, and more resilient software.",
    location: "West Bengal, India",
    coordinates: "22.9868° N, 87.8550° E",
    roles: [
      "Mobile-Native Architect",
      "Decentralized Protocol Engineer",
      "Sub-ms Edge Security Specialist",
      "DevOps Automation Lead"
    ],
    telemetry: {
      uptime: "99.998%",
      nodeLatency: "< 0.8ms",
      activeNodes: "128 P2P Nodes",
      buildEngine: "Native On-Device (Termux / AIDE)"
    }
  },

  stats: [
    { value: "4+", label: "Flagship Production Systems", change: "100% Deployed" },
    { value: "98%", label: "Kotlin & Jetpack Mastery", change: "Core Foundation" },
    { value: "Sub-ms", label: "Edge Security Latency", change: "eBPF Blind Routing" },
    { value: "100%", label: "Self-Taught & Mobile-Native", change: "Zero Bloat Discipline" }
  ],

  company: {
    name: "Sednium Technologies",
    url: "https://www.sednium.com",
    githubOrg: "https://github.com/Sednium-Technologies",
    coFounder: "Ayush",
    focus: "Next-generation secure communication protocols, developer tooling, and distributed systems.",
    founded: "January 20, 2024"
  },

  identityPhilosophy: {
    headline: "Forged Under Hardware Constraints",
    subheadline: "How coding on mobile devices became an unbeatable engineering edge",
    intro: "My path into software engineering was not paved with multi-monitor desktop rigs or high-end servers. I built my foundation writing, compiling, and debugging complex distributed systems directly on an Android smartphone using Termux and AndroidIDE.",
    coreArgument: "Navigating massive compilation chains on a mobile processor forces a ruthless, zero-bloat discipline. You cannot afford memory leaks, unoptimized loops, or unnecessary dependencies. You are forced to understand every byte in the cache and every branch in the AST. What began as a hardware constraint became my greatest architectural advantage.",
    comparison: [
      {
        aspect: "Resource Allocation",
        mobileNative: "Strict byte-level memory budgeting & CPU throttling awareness",
        conventional: "Frequent reliance on high-RAM servers and heavy Docker overhead"
      },
      {
        aspect: "Architecture Design",
        mobileNative: "Decentralized, offline-first mesh networks with local-first persistence",
        conventional: "Heavy centralized clouds with single points of failure"
      },
      {
        aspect: "Tooling & Dependencies",
        mobileNative: "Lean, direct compilation via Tree-sitter, raw sockets, and native binaries",
        conventional: "Multi-gigabyte node_modules and bloated electron wrappers"
      }
    ],
    pillars: [
      {
        id: "hardware-discipline",
        title: "Hardware Discipline & Zero Bloat",
        desc: "Every algorithm is optimized for low thermal dissipation, zero background leakage, and maximum throughput.",
        icon: "Cpu"
      },
      {
        id: "p2p-mesh",
        title: "Decentralized P2P Mesh Systems",
        desc: "Peer-to-peer transport with zero central server eavesdropping and automatic offline message queues.",
        icon: "Network"
      },
      {
        id: "edge-hardening",
        title: "Sub-Millisecond Edge Hardening",
        desc: "Protecting public surfaces with kernel-level eBPF packet inspection and automated blind routing.",
        icon: "ShieldCheck"
      },
      {
        id: "mobile-ide",
        title: "Mobile-Native Tooling",
        desc: "Building KryptonIDE Native so developers can build, run, and ship from any touchscreen device worldwide.",
        icon: "Terminal"
      }
    ]
  },

  projects: [
    {
      id: "onyxchat",
      name: "OnyxChat",
      category: "Decentralized",
      tagline: "Offline-first P2P messaging with Triple-Lock cryptographic architecture.",
      description: "An encrypted communication client routing messages directly between peer devices over encrypted transport. No central servers store or inspect messages. Conversations queue locally when peers are offline and sync automatically upon reconnection.",
      status: "active",
      statusLabel: "Active / Live Mesh",
      url: "https://onyxchat.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      logo: "https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f4ac.svg",
      metrics: [
        { label: "Encryption Overhead", value: "< 1.2ms" },
        { label: "Mesh Sync Speed", value: "Instant P2P" },
        { label: "Centralized Logs", value: "0 bytes" }
      ],
      stack: ["Kotlin", "libp2p", "Noise Protocol", "SQLCipher", "Android SDK"],
      architectureDetails: [
        "Noise Protocol handshake with ephemeral Curve25519 key negotiation.",
        "SQLCipher zero-knowledge local database encryption with ChaCha20-Poly1305.",
        "Dynamic peer discovery via libp2p Kademlia DHT and mDNS local mesh fallback.",
        "Automatic ratchet rekeying on every 50 message exchanges."
      ],
      flowNodes: [
        { title: "Local Store", desc: "SQLCipher Encrypted Queue", icon: "Lock" },
        { title: "DHT Discovery", desc: "libp2p Peer Discovery", icon: "Radio" },
        { title: "Handshake", desc: "Noise Protocol Session", icon: "Key" },
        { title: "Mesh Delivery", desc: "Direct Peer-to-Peer Transmission", icon: "Send" }
      ]
    },
    {
      id: "shield-protocol",
      name: "SHIELD Protocol",
      category: "Security Infrastructure",
      tagline: "Edge security infrastructure with automated blind routing & eBPF inspection.",
      description: "A defensive infrastructure layer built to absorb volumetric network abuse at the edge before packets ever hit internal application servers. Employs automated blind routing and sub-millisecond inspection with near-zero latency impact.",
      status: "active",
      statusLabel: "Production Hardened",
      url: "https://sednium.com/shield",
      githubUrl: "https://github.com/Sednium-Technologies",
      logo: "https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f6e1.svg",
      metrics: [
        { label: "Filter Latency", value: "< 0.4ms" },
        { label: "Edge Throughput", value: "100k req/s" },
        { label: "False Positive Rate", value: "< 0.001%" }
      ],
      stack: ["Go", "eBPF", "Redis Cluster", "Docker & CI/CD", "Linux XDP"],
      architectureDetails: [
        "Kernel-level XDP / eBPF packet filter executing directly in driver space.",
        "Sliding-window token bucket rate limiter backed by high-throughput Redis nodes.",
        "Dynamic IP reputation heuristics powered by automated blind routing algorithms.",
        "Sub-millisecond latency overhead on verified production traffic."
      ],
      flowNodes: [
        { title: "Ingress Packet", desc: "Linux XDP Interface", icon: "Activity" },
        { title: "eBPF Filter", desc: "Kernel-Level Inspection", icon: "Shield" },
        { title: "Reputation Engine", desc: "Distributed Redis Check", icon: "Database" },
        { title: "Target App", desc: "Secure Direct Pass", icon: "CheckCircle" }
      ]
    },
    {
      id: "kryptonide-native",
      name: "KryptonIDE Native",
      category: "Developer Tooling",
      tagline: "High-performance on-device native development environment for Android.",
      description: "A ground-up native IDE engineered to write, compile, lint, and manage complex modern codebases entirely from a mobile touchscreen. Features syntax highlighting, Tree-sitter incremental parsing, built-in terminal, and one-tap builds.",
      status: "under development",
      statusLabel: "In Active R&D",
      url: "https://kryptonide.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      logo: "https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f4bb.svg",
      metrics: [
        { label: "AST Parse Speed", value: "< 15ms" },
        { label: "Memory Footprint", value: "< 95 MB" },
        { label: "Build Targets", value: "Native / JVM / Web" }
      ],
      stack: ["Kotlin", "Jetpack Compose", "Tree-sitter", "Docker & CI/CD", "Termux Core"],
      architectureDetails: [
        "Native C/Rust Tree-sitter grammar bindings for ultra-fast real-time syntax tree generation.",
        "Virtual scroll viewport layout engine tuned for 120Hz mobile displays.",
        "Integrated PTY terminal bridge with full ANSI color and virtual keyboard gestures.",
        "Declarative build pipeline runner executing local compilers directly on Android."
      ],
      flowNodes: [
        { title: "Touch Editor", desc: "Jetpack Compose 120Hz Canvas", icon: "Code2" },
        { title: "Tree-sitter", desc: "Incremental AST Grammar", icon: "Cpu" },
        { title: "Embedded PTY", desc: "Termux Linux Subsystem", icon: "Terminal" },
        { title: "Compiler Pipeline", desc: "On-Device Artifact Output", icon: "Package" }
      ]
    },
    {
      id: "sednicon",
      name: "Sednicon",
      category: "Design Systems",
      tagline: "Scalable unified iconography engine and distributed asset delivery library.",
      description: "High-performance icon delivery and configuration system designed for modern multiplatform applications. Provides automated SVG optimization, versioned icon pipelines, and instant atomic updates across distributed client nodes.",
      status: "active",
      statusLabel: "Active Library",
      url: "https://sednicon.sednium.com",
      githubUrl: "https://github.com/Sednium-Technologies",
      logo: "https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f3a8.svg",
      metrics: [
        { label: "Vector Compression", value: "85% reduced" },
        { label: "Render Time", value: "< 1.5ms" },
        { label: "Supported Formats", value: "SVG, Compose, React" }
      ],
      stack: ["TypeScript", "React", "gRPC", "P2P Protocols", "Tailwind CSS"],
      architectureDetails: [
        "Automated SVGO optimization pipeline stripping redundant paths and precision bloat.",
        "Dual-target code generator for both React JSX and Jetpack Compose VectorDrawables.",
        "gRPC asset streaming service for rapid runtime synchronization.",
        "Zero-runtime footprint tree-shakeable iconography exports."
      ],
      flowNodes: [
        { title: "Vector Ingestion", desc: "Raw SVG Analysis", icon: "Palette" },
        { title: "SVGO Engine", desc: "85% Path Compression", icon: "Minimize2" },
        { title: "Code Generator", desc: "React & Compose Output", icon: "FileCode" },
        { title: "CDN / Mesh", desc: "Instant Atomic Rollout", icon: "Zap" }
      ]
    }
  ],

  techStack: [
    {
      name: "Kotlin & Jetpack Compose",
      category: "Mobile Native",
      percentage: 98,
      level: "Mastery",
      years: "4+ yrs",
      highlight: "On-device IDE engines, custom UI rendering pipelines, multiplatform logic."
    },
    {
      name: "Decentralized & P2P Protocols",
      category: "Decentralized & Security",
      percentage: 92,
      level: "Mastery",
      years: "3+ yrs",
      highlight: "libp2p, Noise Protocol handshakes, mesh routing, zero-knowledge sync."
    },
    {
      name: "Go & Kernel Security (eBPF)",
      category: "Decentralized & Security",
      percentage: 88,
      level: "Expert",
      years: "3+ yrs",
      highlight: "XDP packet filters, rate limiters, distributed edge routing."
    },
    {
      name: "React, TypeScript & Vite",
      category: "Languages & Core",
      percentage: 92,
      level: "Expert",
      years: "4+ yrs",
      highlight: "High-performance reactive interfaces, motion physics, custom design systems."
    },
    {
      name: "Docker, CI/CD & Linux DevOps",
      category: "DevOps & Cloud",
      percentage: 86,
      level: "Advanced",
      years: "3+ yrs",
      highlight: "Automated test-and-deploy pipelines, container orchestration, edge nodes."
    },
    {
      name: "Mobile Tooling (Termux / AndroidIDE)",
      category: "Mobile Native",
      percentage: 99,
      level: "Mastery",
      years: "5+ yrs",
      highlight: "Linux environment orchestration, cross-compilation on mobile processors."
    }
  ] as SkillItem[],

  timeline: [
    {
      id: "the-foundation",
      era: "ORIGINS",
      date: "The Foundation",
      title: "Mobile-First Engineering Mastery",
      role: "Self-Taught Systems Developer",
      badge: "Discipline Breakthrough",
      description: "Started without a desktop rig. Built a rock-solid foundation writing, compiling, and debugging complex software directly from an Android smartphone using Termux and AndroidIDE. Mastered zero-bloat architecture under strict CPU and RAM limits.",
      tech: ["Kotlin", "Termux", "AndroidIDE", "Linux Shell", "Git"],
      achievements: [
        "Successfully compiled large-scale native Android projects on-device.",
        "Developed deep intuition for memory hierarchies and CPU cache utilization.",
        "Built custom automation scripts for mobile terminal compilation workflows."
      ]
    },
    {
      id: "sednium-founded",
      era: "FOUNDATION",
      date: "January 20, 2024",
      title: "Co-Founded Sednium Technologies",
      role: "Co-Founder & Chief Technology Officer",
      badge: "Company Milestone",
      description: "Teamed up with best friend and co-founder Ayush to formalize Sednium Technologies. Scaled from experimental side initiatives into a serious, high-performance tech ecosystem focused on security, P2P communication, and mobile-native developer tools.",
      tech: ["Architecture Planning", "Go", "Kotlin", "Docker", "DevOps"],
      achievements: [
        "Defined technical roadmaps and product architecture for the entire Sednium portfolio.",
        "Established automated CI/CD deployment pipelines across distributed servers.",
        "Orchestrated development cycles with clear security and performance standards."
      ]
    },
    {
      id: "architecture-phase",
      era: "R&D",
      date: "Mid 2024",
      title: "OnyxChat & SHIELD Protocol R&D",
      role: "Lead Systems Architect",
      badge: "Cryptographic R&D",
      description: "Shifted focus to core cryptographic and edge-hardening infrastructure. Designed the Onyx Triple-Lock security architecture and engineered the SHIELD edge inspection protocol with sub-millisecond filtering and automated blind routing.",
      tech: ["libp2p", "Noise Protocol", "eBPF", "SQLCipher", "Redis"],
      achievements: [
        "Delivered zero-knowledge P2P message delivery without central storage.",
        "Achieved < 0.4ms edge packet evaluation with kernel-level XDP filters.",
        "Integrated end-to-end encrypted backup protocols for decentralized mesh nodes."
      ]
    },
    {
      id: "present-day",
      era: "CURRENT",
      date: "Present",
      title: "CTO, Scaling Sednium & KryptonIDE",
      role: "CTO, Sednium Technologies",
      badge: "Continuous Innovation",
      description: "Leading technical strategy, scaling production infrastructure, and shipping KryptonIDE Native to empower engineers to build directly from mobile devices. Leading the future of decentralized and mobile-native software.",
      tech: ["Jetpack Compose", "Tree-sitter", "gRPC", "Distributed Mesh", "TypeScript"],
      achievements: [
        "Developing touch-native AST parsing and on-device code execution engine.",
        "Expanding Sednium's global network footprint and secure edge nodes.",
        "Mentoring rising engineers on constraint-driven, mobile-native development."
      ]
    }
  ] as TimelineItem[],

  contact: {
    name: "Ankush Das (Løid)",
    email: "loid@sednium.com",
    phone: "+91 90645 18100",
    location: "West Bengal, India",
    github: "https://github.com/AnkushDas4",
    sedniumGithub: "https://github.com/Sednium-Technologies",
    sedniumWeb: "https://www.sednium.com",
    pgpFingerprint: "4A8F 9C12 E5B7 88D1 32A4 F0E9 77B2 C19A",
    matrixHandle: "@loid:sednium.org"
  }
};
