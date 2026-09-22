import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Target, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { AIStrategyResult } from '../types';

interface MilhoesSimulatorProps {
  currentBalance: number;
  targetGoal: number;
}

export const MilhoesSimulator: React.FC<MilhoesSimulatorProps> = ({
  currentBalance,
  targetGoal
}) => {
  const [goal, setGoal] = useState(targetGoal || 1000000);
  const [balance, setBalance] = useState(currentBalance || 175000);
  const [accounts, setAccounts] = useState(3);
  const [dailyVolumePerAccount, setDailyVolumePerAccount] = useState(8000);
  const [averageBonusPercent, setAverageBonusPercent] = useState(12);

  // Strategy result state
  const [loadingStrategy, setLoadingStrategy] = useState(false);
  const [aiStrategy, setAiStrategy] = useState<AIStrategyResult | null>(null);

  // Calculations
  const dailyBonusPerAccount = (dailyVolumePerAccount * averageBonusPercent) / 100;
  const totalDailyBonus = dailyBonusPerAccount * accounts;
  const totalMonthlyBonus = totalDailyBonus * 30;
  const remainingTarget = Math.max(0, goal - balance);
  const estimatedDaysToGoal = totalDailyBonus > 0 ? Math.ceil(remainingTarget / totalDailyBonus) : 0;
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + estimatedDaysToGoal);

  const handleGenerateAIStrategy = async () => {
    setLoadingStrategy(true);
    try {
      const res = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetGoal: goal,
          currentBalance: balance,
          activeAccounts: accounts,
          dailyVolume: dailyVolumePerAccount
        })
      });
      const data = await res.json();
      if (data.success && data.strategy) {
        setAiStrategy(data.strategy);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStrategy(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Simulador de Rendimento & Escalabilidade</h2>
        <p className="text-xs text-slate-400">
          Modele projeções quantitativas para alcançar a meta de 1 milhão com segurança operacional
        </p>
      </div>

      {/* Simulator Inputs & Dynamic Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Parâmetros de Simulação</h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Meta Financeira (Alvo):</span>
                <span className="font-bold text-emerald-400">{goal.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Saldo Atual Acumulado:</span>
                <span className="font-bold text-white">{balance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1000000}
                step={10000}
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Contas / Carteiras Verificadas:</span>
                <span className="font-bold text-teal-400">{accounts} contas</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={accounts}
                onChange={(e) => setAccounts(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Volume Médio Diário por Conta:</span>
                <span className="font-bold text-white">{dailyVolumePerAccount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={1000}
                value={dailyVolumePerAccount}
                onChange={(e) => setDailyVolumePerAccount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Taxa Média de Bônus / Cashback:</span>
                <span className="font-bold text-emerald-400">{averageBonusPercent}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={averageBonusPercent}
                onChange={(e) => setAverageBonusPercent(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateAIStrategy}
            disabled={loadingStrategy}
            className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            {loadingStrategy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Calculando com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Plano de Ação dos Milhões</span>
              </>
            )}
          </button>
        </div>

        {/* Projection Outputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-2">
              <span className="text-xs text-slate-400 block font-medium">Rendimento Diário Estimado</span>
              <div className="text-2xl font-bold text-emerald-400 tracking-tight">
                +{Math.round(totalDailyBonus).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block">
                {dailyBonusPerAccount.toLocaleString()} / conta por dia
              </span>
            </div>

            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-2">
              <span className="text-xs text-slate-400 block font-medium">Projeção Mensal (30 Dias)</span>
              <div className="text-2xl font-bold text-teal-300 tracking-tight">
                +{Math.round(totalMonthlyBonus).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block">
                Acumulação composta contínua
              </span>
            </div>

            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-2">
              <span className="text-xs text-slate-400 block font-medium">Tempo até a Meta Final</span>
              <div className="text-2xl font-bold text-white tracking-tight">
                {estimatedDaysToGoal} dias
              </div>
              <span className="text-[11px] text-emerald-400 block font-medium">
                Conclusão aprox.: {completionDate.toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Detailed Strategy Roadmap (AI Generated or Calculated) */}
          <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Cronograma Estruturado de Execução</h3>
                <p className="text-xs text-slate-400">Divisão de metas para diluir o volume de operações sem criar picos atípicos</p>
              </div>
              {aiStrategy && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Otimizado por IA
                </span>
              )}
            </div>

            <div className="space-y-3">
              {(aiStrategy?.milestonePlan || [
                {
                  phase: 'Fase 1: Aquecimento de Contas & Validação PayPay',
                  days: 'Dias 1 a 10',
                  dailyTarget: `+${Math.round(totalDailyBonus * 0.7).toLocaleString()} / dia`,
                  focus: 'Ativar contas com compras reais em farmácias e conveniências para estabelecer score orgânico.'
                },
                {
                  phase: 'Fase 2: Escala Controlada Multi-Campanha',
                  days: 'Dias 11 a 30',
                  dailyTarget: `+${Math.round(totalDailyBonus).toLocaleString()} / dia`,
                  focus: 'Integrar cupons de 20%, campanhas de recarga e rotação de terminais com intervalo seguro.'
                },
                {
                  phase: 'Fase 3: Consolidação e Resgate da Meta de 1M',
                  days: `Dias 31 a ${Math.max(35, estimatedDaysToGoal)}`,
                  dailyTarget: `+${Math.round(totalDailyBonus * 1.2).toLocaleString()} / dia`,
                  focus: 'Finalização do ciclo, conversão de pontos em saldo líquido e auditoria de segurança.'
                }
              ]).map((plan, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-bold text-white">{plan.phase}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">{plan.days}</span>
                      <span className="text-xs font-bold text-emerald-400 ml-3">{plan.dailyTarget}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 pl-8 leading-relaxed">{plan.focus}</p>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Checklist Anti-Detecção de Execução:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {(aiStrategy?.safetyChecklist || [
                  'Rotação de endereços IP/Redes móveis distintas por dispositivo',
                  'Variação randômica de 3 a 5% nos valores nominais de transação',
                  'Descanso programado de 24 horas por conta após 5 dias operacionais',
                  'Auditoria contínua do extrato para evitar tentativas com saldo insuficiente'
                ]).map((item, i) => (
                  <div key={i} className="flex items-start space-x-2 p-2 rounded-lg bg-slate-800/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
