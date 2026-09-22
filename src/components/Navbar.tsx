import React from 'react';
import { ShieldCheck, Sparkles, TrendingUp, Target, Layers, Bot } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  totalCollected: number;
  targetGoal: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  totalCollected,
  targetGoal
}) => {
  const percentCompleted = Math.min(100, Math.round((totalCollected / targetGoal) * 100));

  const navItems = [
    { id: 'overview', label: 'Painel Geral', icon: Target },
    { id: 'campaigns', label: 'Rastreador de Bônus', icon: Layers },
    { id: 'ai-analyzer', label: 'IA Estratégica', icon: Bot },
    { id: 'simulator', label: 'Simulador dos Milhões', icon: TrendingUp },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950/40">
              <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white tracking-tight">Projecto Milhões 2026</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PayPay & FinTech
                </span>
              </div>
              <p className="text-xs text-slate-400">Automação, Estratégia Segura & IA de Bônus</p>
            </div>
          </div>

          {/* Progress towards 1,000,000 Milestone */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Meta dos Milhões</div>
              <div className="text-sm font-bold text-emerald-400">
                {totalCollected.toLocaleString()} / {targetGoal.toLocaleString()}
                <span className="text-xs text-slate-400 ml-1.5 font-normal">({percentCompleted}%)</span>
              </div>
            </div>
            <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentCompleted}%` }}
              />
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400/90 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Anti-Detecção: 98.4%</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
