import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface TerminalLine {
  text: string;
  type?: 'header' | 'info' | 'success' | 'warn' | 'dim' | 'code' | 'proto';
}

interface CommandOutput {
  id: string;
  command: string;
  lines: TerminalLine[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

export const TerminalConsole: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'sysinfo --node',
      lines: [
        { text: '> LØID_SHELL v2.5.0 [Sednium OS // P2P Core Active]', type: 'header' },
        { text: 'Authenticated Session: root@loid.sednium.org', type: 'success' },
        { text: `Base Station: ${PORTFOLIO_DATA.hero.location} (${PORTFOLIO_DATA.hero.coordinates})`, type: 'info' },
        { text: 'Security Protocol: Onyx Triple-Lock Encrypted Mesh', type: 'info' },
        { text: 'Type "help" or tap quick command chips above for system diagnostics.', type: 'dim' },
      ],
    },
  ]);

  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isTypingAnimation, setIsTypingAnimation] = useState<boolean>(false);
  const [typingCommandText, setTypingCommandText] = useState<string>('');

  const quickCommands = ['help', 'about', 'projects', 'skills', 'telemetry', 'matrix', 'contact', 'clear'];

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Only scroll the internal terminal container, never the window
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, typingCommandText]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let responseLines: TerminalLine[] = [];

    switch (cleanCmd) {
      case 'help':
        responseLines = [
          { text: '> AVAILABLE SYSTEM COMMANDS & DIAGNOSTICS:', type: 'header' },
          { text: '  about        - Executive identity & CTO mobile-native philosophy', type: 'info' },
          { text: '  projects     - Active production architectures & protocols', type: 'info' },
          { text: '  skills       - Molecular technology stack & proficiency metrics', type: 'info' },
          { text: '  matrix       - Hardware constraints engineering advantage', type: 'info' },
          { text: '  telemetry    - Real-time node status, latency & cluster load', type: 'info' },
          { text: '  cat proto    - Inspect Onyx cryptographic P2P handshake spec', type: 'code' },
          { text: '  contact      - Encrypted channels, PGP fingerprint & comms', type: 'success' },
          { text: '  clear        - Flush terminal buffer', type: 'dim' },
        ];
        break;

      case 'about':
      case 'whoami':
        responseLines = [
          { text: `> IDENTITY: ${PORTFOLIO_DATA.hero.name} (Handle: ${PORTFOLIO_DATA.hero.handle})`, type: 'header' },
          { text: `Position: ${PORTFOLIO_DATA.hero.title} at ${PORTFOLIO_DATA.company.name}`, type: 'success' },
          { text: `Engineering Doctrine: ${PORTFOLIO_DATA.hero.tagline}`, type: 'info' },
          { text: `Bio: "${PORTFOLIO_DATA.hero.bio}"`, type: 'dim' },
          { text: `Pillars: Zero Bloat • Mobile-Native • High-Throughput • Formal Security`, type: 'info' },
        ];
        break;

      case 'projects':
        responseLines = [
          { text: '> PRODUCTION ARCHITECTURES & REPOSITORIES:', type: 'header' },
          ...PORTFOLIO_DATA.projects.flatMap((p) => [
            { text: `● ${p.name} [${p.category}] — ${p.statusLabel}`, type: 'success' as const },
            { text: `  Tagline: ${p.tagline}`, type: 'info' as const },
            { text: `  Stack: ${p.stack.join(', ')}`, type: 'dim' as const },
          ]),
        ];
        break;

      case 'skills':
        responseLines = [
          { text: '> MOLECULAR PROFICIENCY RADAR:', type: 'header' },
          ...PORTFOLIO_DATA.techStack.map((s) => ({
            text: `  [${s.category}] ${s.name.padEnd(20, ' ')} ${s.percentage}% (${s.level})`,
            type: 'info' as const,
          })),
        ];
        break;

      case 'matrix':
        responseLines = [
          { text: '> CONSTRAINT ADVANTAGE MATRIX (MOBILE-NATIVE VS CONVENTIONAL):', type: 'header' },
          ...PORTFOLIO_DATA.identityPhilosophy.comparison.flatMap((c) => [
            { text: `[${c.aspect}]`, type: 'warn' as const },
            { text: `  ✔ Mobile-Native : ${c.mobileNative}`, type: 'success' as const },
            { text: `  ✖ Conventional  : ${c.conventional}`, type: 'dim' as const },
          ]),
        ];
        break;

      case 'telemetry':
      case 'status':
        responseLines = [
          { text: '> REAL-TIME NODE TELEMETRY:', type: 'header' },
          { text: `  Node Uptime        : ${PORTFOLIO_DATA.hero.telemetry.uptime}`, type: 'success' },
          { text: `  P2P Edge Latency   : ${PORTFOLIO_DATA.hero.telemetry.nodeLatency}`, type: 'success' },
          { text: `  Decentralized Mesh : ${PORTFOLIO_DATA.hero.telemetry.activeNodes}`, type: 'info' },
          { text: `  Compiler Subsystem : ${PORTFOLIO_DATA.hero.telemetry.buildEngine}`, type: 'info' },
          { text: `  Packet Drop Rate   : 0.000% (eBPF XDP Filter Armed)`, type: 'success' },
        ];
        break;

      case 'cat proto':
      case 'cat onyx.proto':
      case 'cat onyx':
        responseLines = [
          { text: '// Onyx Triple-Lock Cryptographic Protocol Specification', type: 'dim' },
          { text: 'syntax = "proto3";', type: 'proto' },
          { text: 'package sednium.onyx.mesh;', type: 'proto' },
          { text: 'message HandshakePayload {', type: 'proto' },
          { text: '  bytes ephemeral_public_key = 1;', type: 'proto' },
          { text: '  bytes noise_dh_signature = 2;', type: 'proto' },
          { text: '  int64 ratchet_counter = 3;', type: 'proto' },
          { text: '}', type: 'proto' },
        ];
        break;

      case 'contact':
        responseLines = [
          { text: '> ENCRYPTED COMMS DIRECTORY:', type: 'header' },
          { text: `  Direct Email : ${PORTFOLIO_DATA.contact.email}`, type: 'success' },
          { text: `  Voice/Telegram: ${PORTFOLIO_DATA.contact.phone}`, type: 'info' },
          { text: `  GitHub       : ${PORTFOLIO_DATA.contact.github}`, type: 'info' },
          { text: `  PGP Key      : ${PORTFOLIO_DATA.contact.pgpFingerprint}`, type: 'warn' },
        ];
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
        responseLines = [
          { text: '> PERMISSION DENIED: CTO Root Key required. Access logged to Sednium Security Cluster.', type: 'warn' },
        ];
        break;

      default:
        responseLines = [
          { text: `> Command not recognized: "${cleanCmd}". Type "help" for valid commands.`, type: 'warn' },
        ];
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: cmd,
        lines: responseLines,
      },
    ]);
  };

  const handleQuickCommandClick = (cmd: string) => {
    if (isTypingAnimation) return;

    sound.playClickSound();
    setIsTypingAnimation(true);
    setTypingCommandText('');

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < cmd.length) {
        sound.playTerminalTick();
        setTypingCommandText(cmd.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingAnimation(false);
        setTypingCommandText('');
        executeCommand(cmd);
      }
    }, 30);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playTerminalTick();

    if (e.key === 'Enter') {
      if (!inputVal.trim()) return;
      const cmd = inputVal;
      setCmdHistoryList((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      setInputVal('');
      executeCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistoryList.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistoryList.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const renderLineColor = (type?: string) => {
    switch (type) {
      case 'header':
        return 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]';
      case 'success':
        return 'text-emerald-400 font-semibold drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]';
      case 'warn':
        return 'text-amber-400';
      case 'dim':
        return 'text-slate-500 italic';
      case 'proto':
        return 'text-cyan-300 font-mono';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <section id="terminal" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative w-full overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM CLI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Direct Terminal Access
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light px-2">
            Query architecture telemetry, cryptographic specs, and developer identity via live terminal emulator.
          </p>
        </div>

        {/* Quick Action Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-2 w-full">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Quick:</span>
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleQuickCommandClick(cmd)}
              disabled={isTypingAnimation}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-300 font-mono text-[11px] shrink-0 whitespace-nowrap active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-2xl sm:rounded-3xl glass-panel-glow border border-cyan-500/40 shadow-2xl overflow-hidden w-full">
          {/* Top Bar */}
          <div className="px-4 sm:px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] sm:text-xs font-mono text-slate-400 ml-2 truncate">
                root@loid-mesh:~
              </span>
            </div>

            <button
              onClick={() => setHistory([])}
              title="Clear screen"
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm bg-black/85 min-h-[280px] sm:min-h-[340px] max-h-[460px] overflow-y-auto cursor-text space-y-4 no-scrollbar"
          >
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                {/* Executed Command Line */}
                <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm">
                  <span className="text-emerald-400 font-bold shrink-0 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]">
                    loid@sednium:~$
                  </span>
                  <span className="text-white break-all font-semibold">{item.command}</span>
                </div>

                {/* Staggered Line Output */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="pl-3 sm:pl-4 space-y-1"
                >
                  {item.lines.map((line, lIdx) => (
                    <motion.div
                      key={lIdx}
                      variants={lineVariants}
                      className={`text-xs sm:text-sm leading-relaxed ${renderLineColor(line.type)}`}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}

            {/* Active Simulated Typewriter Line */}
            {isTypingAnimation && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm">
                <span className="text-emerald-400 font-bold shrink-0">loid@sednium:~$</span>
                <span className="text-white font-semibold">{typingCommandText}</span>
                <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-0.5 align-middle shadow-[0_0_8px_#00f0ff]" />
              </div>
            )}

            {/* Active User Input Line */}
            {!isTypingAnimation && (
              <div className="flex items-center gap-2 pt-1 text-cyan-400">
                <span className="text-emerald-400 font-bold shrink-0 text-xs sm:text-sm">
                  loid@sednium:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type command..."
                  autoCapitalize="none"
                  autoCorrect="off"
                  className="w-full bg-transparent text-white font-mono text-xs sm:text-sm outline-none placeholder:text-slate-600 caret-cyan-400"
                  autoComplete="off"
                  spellCheck="false"
                />
                <CornerDownLeft className="w-4 h-4 text-slate-600 shrink-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
