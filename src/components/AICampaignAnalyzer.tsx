import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  FileText, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { AIAnalysisResult, Campaign } from '../types';

interface AICampaignAnalyzerProps {
  onImportCampaign: (campaign: Campaign) => void;
}

const PRESET_CAMPAIGNS = [
  {
    title: 'PayPay Matsuri Cashback (20%)',
    text: 'Campanha oficial PayPay: Ganhe até 20% de volta em compras com QR Code em lojas credenciadas de 01 a 31 de Outubro. Limite máximo de bônus de 1.000 por transação e 5.000 por período de campanha. Transação mínima de 500. Bônus creditado em até 30 dias.'
  },
  {
    title: 'Bônus de Recarga em Carteira (10%)',
    text: 'Recarregue sua carteira digital via transferência bancária ou ATM parceiro e receba 10% adicional de bônus imediato. Válido para recargas a partir de 10.000 até o teto de 50.000 de bônus. Válido uma vez a cada 7 dias por usuário verificado.'
  },
  {
    title: 'Super Indicação de Carteira 2026',
    text: 'Indique novos amigos para ativar a conta PayPay. Cada amigo que instalar pelo seu código e fizer um pagamento mínimo de 1.000 gera 1.500 de bônus para você e 500 para ele. Máximo de 100 amigos indicados no ciclo promocional.'
  }
];

export const AICampaignAnalyzer: React.FC<AICampaignAnalyzerProps> = ({ onImportCampaign }) => {
  const [campaignText, setCampaignText] = useState(PRESET_CAMPAIGNS[0].text);
  const [platform, setPlatform] = useState('PayPay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [imported, setImported] = useState(false);

  const handleAnalyze = async () => {
    if (!campaignText.trim()) return;

    setLoading(true);
    setError(null);
    setImported(false);

    try {
      const res = await fetch('/api/analyze-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignText, platform })
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setError(data.error || 'Não foi possível analisar a campanha.');
      }
    } catch (err: any) {
      setError('Erro de conexão ao contatar o motor de IA.');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    if (!analysisResult) return;

    // Extract numeric cap or default
    const capNumbers = analysisResult.maxRewardCap.match(/\d[\d.,]*/g);
    const estimatedCap = capNumbers ? Number(capNumbers[0].replace(/[.,]/g, '')) : 30000;

    const newCamp: Campaign = {
      id: `ai-${Date.now()}`,
      name: `Campanha IA • ${platform}`,
      platform: platform,
      category: 'PayPay',
      bonusRate: analysisResult.rewardRate,
      estimatedReturn: estimatedCap,
      maxCap: estimatedCap,
      minSpend: 1000,
      expiryDate: '2026-11-30',
      status: 'active',
      riskLevel: analysisResult.detectionRiskLevel,
      cadenceNote: analysisResult.recommendedCadence,
      collectedAmount: 0,
      notes: analysisResult.summary
    };

    onImportCampaign(newCamp);
    setImported(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Assistente de Auditoria de IA</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Gemini & Heurística
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Analise termos, calcule o teto de retorno e detecte armadilhas de bloqueio e anomalias
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Exemplos de Campanhas Prontas:
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESET_CAMPAIGNS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCampaignText(preset.text);
                setAnalysisResult(null);
                setImported(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs border border-slate-700/60 transition-colors cursor-pointer"
            >
              {preset.title}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-400">
            Cole as Regras / Termos da Promoção ou Missão de Bônus:
          </label>
          <textarea
            rows={4}
            value={campaignText}
            onChange={(e) => setCampaignText(e.target.value)}
            placeholder="Cole aqui o texto da promoção, valores de cashback, limites e regras..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Carteira Alvo:</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="PayPay">PayPay</option>
              <option value="Carteira Digital Genérica">Carteira Digital Genérica</option>
              <option value="FinTech Cashback">FinTech Cashback</option>
              <option value="QR Code Rewards">QR Code Rewards</option>
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !campaignText.trim()}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Processando Análise...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Auditar com IA</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-xs text-rose-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Analysis Result Display */}
      {analysisResult && (
        <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 space-y-6 animate-in fade-in duration-300">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Relatório de Auditoria de Campanha</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Diagnóstico gerado pela inteligência artificial</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Score de Oportunidade</span>
                <span className="text-xl font-bold text-emerald-400">{analysisResult.score}/100</span>
              </div>
              <button
                onClick={handleImport}
                disabled={imported}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                  imported
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 cursor-default'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>{imported ? 'Importada no Rastreador!' : 'Importar para o Rastreador'}</span>
              </button>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
              Resumo Estratégico:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">{analysisResult.summary}</p>
          </div>

          {/* Metrics & Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">Retorno Estimado</span>
              <span className="text-base font-bold text-emerald-400">{analysisResult.rewardRate}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">Teto Máximo de Bônus</span>
              <span className="text-base font-bold text-white">{analysisResult.maxRewardCap}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">Requisito de Ativação</span>
              <span className="text-base font-bold text-teal-300">{analysisResult.minRequirement}</span>
            </div>
          </div>

          {/* Risk & Cadence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Risk Box */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Análise de Risco de Detecção</span>
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  analysisResult.detectionRiskLevel === 'Baixo'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  Nível: {analysisResult.detectionRiskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{analysisResult.riskExplanation}</p>
            </div>

            {/* Cadence Box */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Cadência & Intervalo Recomendado</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{analysisResult.recommendedCadence}</p>
            </div>
          </div>

          {/* Tactics List */}
          {analysisResult.tactics && analysisResult.tactics.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Táticas de Otimização Sugeridas pela IA:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {analysisResult.tactics.map((tactic, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">{i + 1}.</span>
                    <span>{tactic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
