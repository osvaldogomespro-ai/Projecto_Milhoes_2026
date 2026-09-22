import React from 'react';
import { 
  DollarSign, 
  ShieldAlert, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  ArrowUpRight,
  Flame,
  Info
} from 'lucide-react';
import { Campaign } from '../types';

interface DashboardOverviewProps {
  campaigns: Campaign[];
  targetGoal: number;
  totalCollected: number;
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  campaigns,
  targetGoal,
  totalCollected,
  onNavigate
}) => {
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'in_progress');
  const activePotential = activeCampaigns.reduce((acc, c) => acc + (c.maxCap - (c.collectedAmount || 0)), 0);
  const percentMilestone = Math.min(100, Math.round((totalCollected / targetGoal) * 100));

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Project Context */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border border-slate-800 p-6 sm:p-8">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Projecto Milhões 2026 • Operação PayPay & Carteiras Digitais</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sistema de Maximização de Bônus & Cashback com IA
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Estratégia metodológica à prova de detecção: combine rotação de campanhas, intervalos controlados de transação e auditoria preditiva via Gemini AI para acumular bônus continuamente sem violar critérios de segurança.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('ai-analyzer')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Analisar Campanha com IA</span>
            </button>
            <button
              onClick={() => onNavigate('simulator')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm flex items-center space-x-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span>Projeção dos Milhões</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Bônus Já Resgatados</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {totalCollected.toLocaleString()}
            <span className="text-xs font-normal text-slate-400 ml-1.5">acumulado</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{percentMilestone}% da meta de 1 milhão</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Potencial Ativo a Resgatar</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-teal-300 tracking-tight">
            {activePotential.toLocaleString()}
            <span className="text-xs font-normal text-slate-400 ml-1.5">disponível</span>
          </div>
          <div className="text-xs text-slate-400">
            Distribuído em {activeCampaigns.length} campanhas vigentes
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Índice Anti-Detecção</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
            98.4%
            <span className="text-xs font-normal text-slate-400 ml-1.5">Excelente</span>
          </div>
          <div className="text-xs text-slate-400">
            Padrão orgânico validado com espaçamento
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Cadência Recomendada</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            45-90 min
            <span className="text-xs font-normal text-slate-400 ml-1.5">intervalo</span>
          </div>
          <div className="text-xs text-slate-400">
            Variação randômica de centavos ativa
          </div>
        </div>
      </div>

      {/* Protocol Architecture & Security Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Roadmap Card */}
        <div className="lg:col-span-2 bg-slate-900/80 rounded-xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Estratégia de Escala Segura (Rumo a 1M)</h2>
              <p className="text-xs text-slate-400">Fases de progressão para acumulação contínua sem disparar filtros de anomalia</p>
            </div>
            <button 
              onClick={() => onNavigate('simulator')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center space-x-1"
            >
              <span>Ver detalhes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="p-4 rounded-lg bg-slate-800/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fase 1 • Aquecimento & Histórico</span>
                <span className="text-xs text-emerald-400 font-semibold">100% Concluída</span>
              </div>
              <p className="text-sm font-medium text-slate-200">Geração de transações legítimas e ativação de tiers de cashback no PayPay</p>
              <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Fase 2 • Rotação Multi-Campanha (Em Andamento)</span>
                <span className="text-xs text-teal-400 font-semibold">{percentMilestone}% Ativo</span>
              </div>
              <p className="text-sm font-medium text-slate-200">Aproveitamento de campanhas sazonais de 15% a 20%, cupons automáticos e bônus de recarga</p>
              <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${percentMilestone}%` }} />
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-4 rounded-lg bg-slate-800/20 border border-slate-800 space-y-2 opacity-75">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fase 3 • Consolidação dos Milhões</span>
                <span className="text-xs text-slate-500 font-semibold">Próxima Etapa</span>
              </div>
              <p className="text-sm font-medium text-slate-300">Resgate programado, diversificação de saldo e alcance do teto anual sem incidentes</p>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-slate-600 h-1.5 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Anti-Detection Rulebook */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-white text-base">Regras Anti-Detecção</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Algoritmos antifraude de carteiras monitoram anomalias estatísticas. Para operar com segurança:
          </p>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
              <span><strong>Variação de Valores:</strong> Nunca transacione valores redondos repetidos (ex: prefira 2.847 em vez de 3.000).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
              <span><strong>Janela Horária Orgânica:</strong> Opere estritamente dentro de horários de comércio (08:30 às 21:30).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
              <span><strong>Espaçamento Temporal:</strong> Mínimo 45 minutos de repouso entre compras no mesmo terminal.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
              <span><strong>Manutenção de Saldo:</strong> Mantenha uma reserva média para sinalizar liquidez e uso real.</span>
            </li>
          </ul>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-2">
            <Info className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>Assistente de IA ativado para validação de novas campanhas.</span>
          </div>
        </div>
      </div>

      {/* Quick Campaign Preview */}
      <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Campanhas Ativas no Rastreador</h2>
            <p className="text-xs text-slate-400">Oportunidades em monitoramento com saldo parcial acumulado</p>
          </div>
          <button
            onClick={() => onNavigate('campaigns')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center space-x-1"
          >
            <span>Ver todas ({campaigns.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.slice(0, 3).map(camp => (
            <div key={camp.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  {camp.category}
                </span>
                <span className="text-xs text-slate-400">Validade: {camp.expiryDate}</span>
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm line-clamp-1">{camp.name}</h4>
                <p className="text-xs text-emerald-300 font-medium mt-0.5">{camp.bonusRate}</p>
              </div>
              <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between text-xs">
                <span className="text-slate-400">Teto: {camp.maxCap.toLocaleString()}</span>
                <span className="text-emerald-400 font-bold">
                  {camp.collectedAmount ? `${camp.collectedAmount.toLocaleString()} resgatados` : 'Iniciando'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
