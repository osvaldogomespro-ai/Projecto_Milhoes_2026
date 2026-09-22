import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { CampaignsTracker } from './components/CampaignsTracker';
import { AICampaignAnalyzer } from './components/AICampaignAnalyzer';
import { MilhoesSimulator } from './components/MilhoesSimulator';
import { INITIAL_CAMPAIGNS } from './data/initialCampaigns';
import { Campaign, CampaignStatus } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [targetGoal] = useState(1000000);
  
  // Local state for campaigns with fallback to initial campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem('projecto_milhoes_campaigns');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return INITIAL_CAMPAIGNS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('projecto_milhoes_campaigns', JSON.stringify(campaigns));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  }, [campaigns]);

  const totalCollected = campaigns.reduce((acc, c) => acc + (c.collectedAmount || 0), 0);

  const handleAddCampaign = (newCamp: Campaign) => {
    setCampaigns(prev => [newCamp, ...prev]);
  };

  const handleUpdateCampaignStatus = (id: string, status: CampaignStatus) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, status } : c))
    );
  };

  const handleUpdateCollectedAmount = (id: string, amount: number) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, collectedAmount: Math.min(c.maxCap, Math.max(0, amount)) } : c))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        totalCollected={totalCollected}
        targetGoal={targetGoal}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'overview' && (
          <DashboardOverview
            campaigns={campaigns}
            targetGoal={targetGoal}
            totalCollected={totalCollected}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'campaigns' && (
          <CampaignsTracker
            campaigns={campaigns}
            onAddCampaign={handleAddCampaign}
            onUpdateCampaignStatus={handleUpdateCampaignStatus}
            onUpdateCollectedAmount={handleUpdateCollectedAmount}
            onOpenAIAnalyzer={() => setCurrentTab('ai-analyzer')}
          />
        )}

        {currentTab === 'ai-analyzer' && (
          <AICampaignAnalyzer
            onImportCampaign={(newCamp) => {
              handleAddCampaign(newCamp);
              setCurrentTab('campaigns');
            }}
          />
        )}

        {currentTab === 'simulator' && (
          <MilhoesSimulator
            currentBalance={totalCollected}
            targetGoal={targetGoal}
          />
        )}
      </main>

      {/* Discreet Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Projecto Milhões 2026 • Estratégia de Bônus & Carteiras Digitais</span>
          <span className="text-slate-600">Conformidade e Proteção Anti-Detecção com Gemini AI</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
