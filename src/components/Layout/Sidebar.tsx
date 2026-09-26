import React from 'react';
import { 
  Activity, 
  Cpu, 
  Terminal, 
  HeartPulse, 
  TrendingUp,
  Zap,
  Menu,
  X,
  Server,
  Layers,
  ChevronRight,
  BookOpen,
  BarChart3,
  ExternalLink
} from 'lucide-react';

export type NavViewId = 'command-center' | 'bot-matrix' | 'live-terminal' | 'system-health' | 'performance' | 'pricing' | 'rapoarte';

interface NavItem {
  id: NavViewId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'command-center',
    label: 'Command Center',
    icon: Activity,
    badge: '10 LIVE',
    description: 'Fleet overview & telemetry'
  },
  {
    id: 'bot-matrix',
    label: 'Bot Matrix',
    icon: Cpu,
    badge: '10 NODES',
    description: 'Direct & Gateway strategies'
  },
  {
    id: 'live-terminal',
    label: '🔴 Live Feed',
    icon: Terminal,
    badge: 'V5 VIBE',
    description: 'Surgical injection console'
  },
  {
    id: 'system-health',
    label: 'System Health',
    icon: HeartPulse,
    badge: '5/5 FIX',
    description: 'cTrader topology & sentinels'
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: TrendingUp,
    badge: '51.15% WR',
    description: 'Audited returns & track record'
  },
  {
    id: 'rapoarte',
    label: 'Rapoarte',
    icon: BarChart3,
    badge: 'ITA TEST',
    description: 'Strategy Tester Results'
  },
  {
    id: 'pricing',
    label: 'Pricing & Access',
    icon: Zap,
    badge: 'VIP TIERS',
    description: 'Copy trading & VIP licenses'
  }
];

// 4 essential quick-access items for mobile bottom bar
const MOBILE_ESSENTIAL_ITEMS: {
  id: NavViewId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'command-center', label: 'Overview', icon: Activity },
  { id: 'bot-matrix', label: 'Matrix', icon: Cpu },
  { id: 'live-terminal', label: '🔴 Live Feed', icon: Terminal },
  { id: 'pricing', label: 'Pricing', icon: Zap },
];

interface SidebarProps {
  currentView: NavViewId;
  onSelectView: (view: NavViewId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  mobileOpen,
  onCloseMobile,
  onOpenMobile
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B0C10] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo & Branding */}
        <div>
          <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between bg-[#0B0C10]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#1F2833] via-[#16212e] to-[#0d141f] border border-[#66FCF1]/30 flex items-center justify-center shadow-lg shadow-[#66FCF1]/5 group">
                <Activity className="w-5 h-5 text-[#66FCF1] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold tracking-tight text-white font-sans text-sm">
                    TRINITY FUND
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30">
                    INSTITUTIONAL
                  </span>
                </div>
                <p className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">
                  Algorithmic Quant Fleet
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-md text-[#94A3B8] hover:text-white hover:bg-[#1F2833]/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Fleet Navigation
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-all duration-300 group border-l-2 ${
                    isActive
                      ? 'border-[#66FCF1] bg-[#1F2833]/90 text-[#E2E8F0] shadow-[inset_4px_0_12px_rgba(102,252,241,0.08)]'
                      : 'border-transparent text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#1F2833]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-[#66FCF1]' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />
                    <div>
                      <div className={`text-xs font-medium font-sans ${
                        isActive ? 'text-[#E2E8F0] font-semibold' : 'text-[#94A3B8]'
                      }`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono hidden group-hover:block transition-all">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                        isActive 
                          ? 'bg-[#66FCF1]/15 text-[#66FCF1] border-[#66FCF1]/30 font-semibold' 
                          : 'bg-slate-800/80 text-slate-400 border-slate-700/60'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isActive ? 'text-[#66FCF1] translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick External Links: Documentation & Statistics */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
            <div className="px-3 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
              Ecosystem Hubs

              <a
                href="https://ai.amx.today"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0B0C10]/80 border border-[#66FCF1]/40 hover:border-[#66FCF1] hover:bg-[#66FCF1]/10 transition-all duration-300 shadow-[0_0_10px_rgba(102,252,241,0.1)] hover:shadow-[0_0_15px_rgba(102,252,241,0.3)]"
              >
                <span className="text-[#66FCF1] group-hover:text-[#66FCF1] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 12a10.1 10.1 0 0 0 9.9 9.9V12z"/><path d="M12 12V2.1A10.1 10.1 0 0 0 2.1 12H12z"/></svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#66FCF1] tracking-wide">AI Architect</span>
                  <span className="text-[10px] font-mono text-[#66FCF1]/70">OpenClaw Core</span>
                </div>
              </a>

            </div>

            <a
              href="https://doc.g4trade.online"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[38px] px-3 py-2 rounded-lg flex items-center justify-between text-xs font-mono text-slate-400 hover:text-[#66FCF1] hover:bg-[#1F2833]/50 transition-all duration-200 group"
              title="Full Documentation"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#66FCF1]/70 group-hover:text-[#66FCF1]" />
                <span>Documentation</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>

            <a
              href="https://stats.g4trade.online"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[38px] px-3 py-2 rounded-lg flex items-center justify-between text-xs font-mono text-slate-400 hover:text-[#66FCF1] hover:bg-[#1F2833]/50 transition-all duration-200 group"
              title="Live Statistics"
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-[#66FCF1]/70 group-hover:text-[#66FCF1]" />
                <span>Live Statistics</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Bottom Section: Server & Gateway Connection Status */}
        <div className="p-4 border-t border-slate-800/80 bg-[#08090D]">
          <div className="p-3 rounded-lg bg-[#1F2833]/60 border border-slate-700/50 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-[#66FCF1]" />
                Primary Host
              </span>
              <span className="text-[#E2E8F0] font-semibold">srv1595784</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#10B981]" />
                Gateway Protocol
              </span>
              <span className="text-[#10B981] font-semibold">cTrader FIX/API</span>
            </div>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Sync Commit:</span>
              <span className="text-[#66FCF1] bg-[#66FCF1]/10 px-1 rounded">
                87f447c
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (below md breakpoint) */}
      <nav 
        aria-label="Mobile Bottom Navigation" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0C10]/95 backdrop-blur-md border-t border-slate-800/90 shadow-2xl px-2 py-1 flex items-center justify-around"
      >
        {MOBILE_ESSENTIAL_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectView(item.id);
                onCloseMobile();
              }}
              className={`flex-1 min-h-[48px] py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-200 select-none ${
                isActive
                  ? 'text-[#66FCF1] bg-[#1F2833]/60'
                  : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/40'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#66FCF1]' : 'text-slate-400'}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#66FCF1] animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] font-mono leading-none tracking-tight ${isActive ? 'font-bold text-[#66FCF1]' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* 5th Item: 'More' / Hamburger Drawer Trigger for Topology & Performance */}
        <button
          onClick={() => {
            if (onOpenMobile) {
              onOpenMobile();
            }
          }}
          className={`flex-1 min-h-[48px] py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-200 select-none ${
            (currentView === 'system-health' || currentView === 'performance')
              ? 'text-[#66FCF1] bg-[#1F2833]/60'
              : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/40'
          }`}
          aria-label="Open More Fleet Navigation Menu"
        >
          <div className="relative">
            <Menu className="w-5 h-5" />
            {(currentView === 'system-health' || currentView === 'performance') && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#66FCF1] animate-pulse" />
            )}
          </div>
          <span className={`text-[10px] font-mono leading-none tracking-tight ${(currentView === 'system-health' || currentView === 'performance') ? 'font-bold text-[#66FCF1]' : 'font-medium'}`}>
            More
          </span>
        </button>
      </nav>
    </>
  );
};
