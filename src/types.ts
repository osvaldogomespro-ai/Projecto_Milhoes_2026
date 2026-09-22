export type CampaignStatus = 'active' | 'in_progress' | 'completed' | 'analyzing';

export type RiskLevel = 'Baixo' | 'Médio' | 'Alto';

export interface Campaign {
  id: string;
  name: string;
  platform: string;
  category: 'PayPay' | 'Cashback' | 'Recarga' | 'Indicação' | 'Cupom';
  bonusRate: string;
  estimatedReturn: number;
  maxCap: number;
  minSpend: number;
  expiryDate: string;
  status: CampaignStatus;
  riskLevel: RiskLevel;
  cadenceNote: string;
  notes?: string;
  collectedAmount?: number;
}

export interface AIAnalysisResult {
  summary: string;
  rewardRate: string;
  maxRewardCap: string;
  minRequirement: string;
  detectionRiskLevel: 'Baixo' | 'Médio' | 'Alto';
  riskExplanation: string;
  recommendedCadence: string;
  tactics: string[];
  score: number;
}

export interface AIStrategyResult {
  milestonePlan: Array<{
    phase: string;
    days: string;
    dailyTarget: string;
    focus: string;
  }>;
  safetyChecklist: string[];
  estimatedDaysToTarget: number;
  dailyRunRate: string;
}

export interface MilestoneProgress {
  targetAmount: number;
  currentAccumulated: number;
  dailyCadenceLimit: number;
  safetyIndex: number;
}
