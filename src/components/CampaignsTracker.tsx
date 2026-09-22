import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Coins, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Campaign, CampaignStatus, RiskLevel } from '../types';

interface CampaignsTrackerProps {
  campaigns: Campaign[];
  onAddCampaign: (campaign: Campaign) => void;
  onUpdateCampaignStatus: (id: string, status: CampaignStatus) => void;
  onUpdateCollectedAmount: (id: string, amount: number) => void;
  onOpenAIAnalyzer: () => void;
}

export const CampaignsTracker: React.FC<CampaignsTrackerProps> = ({
  campaigns,
  onAddCampaign,
  onUpdateCampaignStatus,
  onUpdateCollectedAmount,
  onOpenAIAnalyzer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);

  // New campaign form state
  const [newName, setNewName] = useState('');
  const [newPlatform, setNewPlatform] = useState('PayPay');
  const [newCategory, setNewCategory] = useState<'PayPay' | 'Cashback' | 'Recarga' | 'Indicação' | 'Cupom'>('PayPay');
  const [newBonusRate, setNewBonusRate] = useState('10% Cashback');
  const [newMaxCap, setNewMaxCap] = useState('50000');
  const [newMinSpend, setNewMinSpend] = useState('1000');
  const [newExpiry, setNewExpiry] = useState('2026-11-30');
  const [newRisk, setNewRisk] = useState<RiskLevel>('Baixo');
  const [newCadence, setNewCadence] = useState('Intervalo de 60 min entre transações');

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitNewCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCampaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: newName.trim(),
      platform: newPlatform,
      category: newCategory,
      bonusRate: newBonusRate,
      estimatedReturn: Number(newMaxCap) || 20000,
      maxCap: Number(newMaxCap) || 20000,
      minSpend: Number(newMinSpend) || 0,
      expiryDate: newExpiry,
      status: 'active',
      riskLevel: newRisk,
      cadenceNote: newCadence,
      collectedAmount: 0
    };

    onAddCampaign(newCampaign);
    setIsAddingModalOpen(false);
    setNewName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Rastreador de Campanhas & Bônus</h2>
          <p className="text-xs text-slate-400">Gerencie campanhas ativas, cadência operacional e saldo coletado</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAIAnalyzer}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auditar com IA</span>
          </button>
          <button
            onClick={() => setIsAddingModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center space-x-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Adicionar Campanha</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome ou carteira..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          {['all', 'PayPay', 'Cashback', 'Recarga', 'Indicação', 'Cupom'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map((camp) => {
          const progress = Math.min(100, Math.round(((camp.collectedAmount || 0) / (camp.maxCap || 1)) * 100));

          return (
            <div
              key={camp.id}
              className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 space-y-4 hover:border-slate-700/80 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {camp.category}
                      </span>
                      <span className="text-xs text-slate-400">{camp.platform}</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug">{camp.name}</h3>
                  </div>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center space-x-1 ${
                    camp.riskLevel === 'Baixo'
                      ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/40'
                      : camp.riskLevel === 'Médio'
                      ? 'bg-amber-950/50 text-amber-400 border-amber-800/40'
                      : 'bg-rose-950/50 text-rose-400 border-rose-800/40'
                  }`}>
                    <ShieldCheck className="w-3 h-3" />
                    <span>Risco: {camp.riskLevel}</span>
                  </span>
                </div>

                {/* Rates & Numbers */}
                <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Taxa / Retorno</span>
                    <span className="text-emerald-300 font-bold">{camp.bonusRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Teto Máximo</span>
                    <span className="text-white font-semibold">{camp.maxCap.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Vencimento</span>
                    <span className="text-slate-300 font-medium">{camp.expiryDate}</span>
                  </div>
                </div>

                {/* Progress Bar towards Max Cap */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="text-slate-400">Progresso de Resgate:</span>
                    <span className="font-bold text-emerald-400">
                      {(camp.collectedAmount || 0).toLocaleString()} / {camp.maxCap.toLocaleString()} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Cadence Note / Anti-Detection Protocol */}
                <div className="text-xs text-slate-400 bg-slate-800/30 p-2.5 rounded-lg border border-slate-800 flex items-start space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Protocolo:</strong> {camp.cadenceNote}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const add = 2500;
                      onUpdateCollectedAmount(camp.id, (camp.collectedAmount || 0) + add);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium cursor-pointer transition-colors"
                  >
                    +2.500 Bônus
                  </button>
                  <button
                    onClick={() => {
                      const add = 5000;
                      onUpdateCollectedAmount(camp.id, (camp.collectedAmount || 0) + add);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium cursor-pointer transition-colors"
                  >
                    +5.000 Bônus
                  </button>
                </div>

                <select
                  value={camp.status}
                  onChange={(e) => onUpdateCampaignStatus(camp.id, e.target.value as CampaignStatus)}
                  className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="active">Ativa</option>
                  <option value="in_progress">Em Progresso</option>
                  <option value="completed">Concluída</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Adding New Campaign */}
      {isAddingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Cadastrar Nova Campanha de Bônus</h3>
              <button
                onClick={() => setIsAddingModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewCampaign} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Título da Campanha / Promoção</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Super Cashback PayPay 20% Matsuri"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Plataforma</label>
                  <input
                    type="text"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                  >
                    <option value="PayPay">PayPay</option>
                    <option value="Cashback">Cashback</option>
                    <option value="Recarga">Recarga</option>
                    <option value="Indicação">Indicação</option>
                    <option value="Cupom">Cupom</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Taxa / Bônus Estimado</label>
                  <input
                    type="text"
                    value={newBonusRate}
                    onChange={(e) => setNewBonusRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Teto Máximo de Bônus</label>
                  <input
                    type="number"
                    value={newMaxCap}
                    onChange={(e) => setNewMaxCap(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Data Limite / Validade</label>
                  <input
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Nível de Risco</label>
                  <select
                    value={newRisk}
                    onChange={(e) => setNewRisk(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                  >
                    <option value="Baixo">Baixo (Recomendado)</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Nota de Cadência & Anti-Detecção</label>
                <input
                  type="text"
                  value={newCadence}
                  onChange={(e) => setNewCadence(e.target.value)}
                  placeholder="Ex: Espaçar 45 min entre transações e variar lojas"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddingModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                >
                  Salvar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
