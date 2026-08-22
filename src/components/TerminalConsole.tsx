import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
}

export const TerminalConsole: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'sysinfo --node',
      response: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">&gt; LØID_SHELL v2.5.0 [Sednium OS // P2P Core]</div>
          <div>Logged in as: <span className="text-emerald-400">root@loid.sednium.org</span></div>
          <div>Node Location: {PORTFOLIO_DATA.hero.location} ({PORTFOLIO_DATA.hero.coordinates})</div>
          <div>Type <span className="text-cyan-300 font-bold">help</span> to view available system commands.</div>
        </div>
      )
    }
  ]);
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    sound.playClickSound();
    const cleanCmd = cmd.trim().toLowerCase();

    if (!cleanCmd) return;

    // Add to history list
    setCmdHistoryList(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (cleanCmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <div className="text-cyan-400 font-bold">&gt; AVAILABLE SYSTEM COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-cyan-300 font-bold">about</span> - Identity & CTO philosophy</div>
              <div><span className="text-cyan-300 font-bold">projects</span> - Production architectures</div>
              <div><span className="text-cyan-300 font-bold">skills</span> - Molecular tech stack & radar</div>
              <div><span className="text-cyan-300 font-bold">matrix</span> - Mobile-native advantage</div>
              <div><span className="text-cyan-300 font-bold">telemetry</span> - Live node diagnostics</div>
              <div><span className="text-cyan-300 font-bold">cat onyx.proto</span> - Onyx cryptographic spec</div>
              <div><span className="text-cyan-300 font-bold">contact</span> - PGP key & transmission links</div>
              <div><span className="text-cyan-300 font-bold">clear</span> - Flush terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold">&gt; SUBJECT: {PORTFOLIO_DATA.hero.name} (Handle: {PORTFOLIO_DATA.hero.handle})</div>
            <div>Role: {PORTFOLIO_DATA.hero.title} at {PORTFOLIO_DATA.company.name}</div>
            <div>Focus: {PORTFOLIO_DATA.hero.tagline}</div>
            <div className="text-slate-400 mt-1 italic">"{PORTFOLIO_DATA.hero.bio}"</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            <div className="text-cyan-400 font-bold">&gt; PRODUCTION ARCHITECTURES:</div>
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{p.name} [{p.category}]</span>
                  <span className="text-xs text-emerald-400 font-mono">{p.statusLabel}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{p.description}</div>
                <div className="text-[11px] text-cyan-400 font-mono mt-1">Stack: {p.stack.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold">&gt; CORE PROFICIENCY MATRIX:</div>
            {PORTFOLIO_DATA.techStack.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs py-0.5 border-b border-slate-800/60">
                <span className="text-white font-mono">{s.name}</span>
                <span className="text-cyan-300 font-mono">{s.level} ({s.percentage}%)</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'matrix':
        output = (
          <div className="space-y-2 text-slate-300">
            <div className="text-cyan-400 font-bold">&gt; CONSTRAINT MATRIX (MOBILE-NATIVE VS CONVENTIONAL):</div>
            {PORTFOLIO_DATA.identityPhilosophy.comparison.map(c => (
              <div key={c.aspect} className="text-xs">
                <span className="text-cyan-300 font-bold">[{c.aspect}]</span>
                <div className="text-emerald-400 pl-2">&gt; Mobile-Native: {c.mobileNative}</div>
                <div className="text-rose-400/80 pl-2">&gt; Conventional: {c.conventional}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'telemetry':
      case 'status':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold">&gt; LIVE SYSTEM TELEMETRY:</div>
            <div>• Node Uptime: {PORTFOLIO_DATA.hero.telemetry.uptime}</div>
            <div>• Edge Latency: {PORTFOLIO_DATA.hero.telemetry.nodeLatency}</div>
            <div>• Mesh Cluster: {PORTFOLIO_DATA.hero.telemetry.activeNodes}</div>
            <div>• Compiler Subsystem: {PORTFOLIO_DATA.hero.telemetry.buildEngine}</div>
          </div>
        );
        break;

      case 'cat onyx.proto':
      case 'cat onyx':
        output = (
          <div className="p-3 rounded-lg bg-black/80 text-cyan-300 font-mono text-xs space-y-1">
            <div className="text-slate-500">// Onyx Triple-Lock Cryptographic Protocol Spec</div>
            <div>syntax = "proto3";</div>
            <div>package sednium.onyx.mesh;</div>
            <br />
            <div>message HandshakePayload &#123;</div>
            <div>&nbsp;&nbsp;bytes ephemeral_public_key = 1;</div>
            <div>&nbsp;&nbsp;bytes noise_dh_signature = 2;</div>
            <div>&nbsp;&nbsp;int64 ratchet_counter = 3;</div>
            <div>&#125;</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold">&gt; ENCRYPTED TRANSMISSION CHANNELS:</div>
            <div>• Email: <span className="text-white">{PORTFOLIO_DATA.contact.email}</span></div>
            <div>• Phone: <span className="text-white">{PORTFOLIO_DATA.contact.phone}</span></div>
            <div>• GitHub: <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{PORTFOLIO_DATA.contact.github}</a></div>
            <div>• PGP Key Fingerprint: <span className="text-amber-300 font-mono">{PORTFOLIO_DATA.contact.pgpFingerprint}</span></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
        output = (
          <div className="text-rose-400 font-mono">
            &gt; Permission denied: CTO authorization key required. Access logged to Sednium Security Cluster.
          </div>
        );
        break;

      default:
        output = (
          <div className="text-rose-400 font-mono text-xs">
            &gt; Command not recognized: '{cleanCmd}'. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for available commands.
          </div>
        );
    }

    setHistory(prev => [...prev, { id: Math.random().toString(), command: cmd, response: output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playTerminalTick();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
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

  return (
    <section id="terminal" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM CLI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Direct Terminal Access
          </h2>
          <p className="text-slate-400 text-base font-light">
            Query architecture telemetry, cryptographic specs, and developer identity via live terminal emulator.
          </p>
        </div>

        {/* Terminal Window Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl glass-panel-glow border border-cyan-500/40 shadow-2xl overflow-hidden"
        >
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">root@loid-mesh:~ (zsh)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setHistory([])}
                title="Clear screen"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className="p-6 font-mono text-xs sm:text-sm bg-black/75 min-h-[360px] max-h-[500px] overflow-y-auto cursor-text space-y-4"
          >
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400 font-bold">loid@sednium:~$</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="pl-4">{item.response}</div>
              </div>
            ))}

            {/* Active Input Line */}
            <div className="flex items-center gap-2 pt-2 text-cyan-400">
              <span className="text-emerald-400 font-bold shrink-0">loid@sednium:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or command..."
                className="w-full bg-transparent text-white font-mono outline-none placeholder:text-slate-600 caret-cyan-400"
                autoComplete="off"
                spellCheck="false"
              />
              <CornerDownLeft className="w-4 h-4 text-slate-600 shrink-0" />
            </div>

            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
