import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "2mb" }));

// Lazy initialization for Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn("Failed to initialize GoogleGenAI client:", e);
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Projecto Milhões 2026 API" });
});

// AI Campaign Analyzer
app.post("/api/analyze-campaign", async (req, res) => {
  try {
    const { campaignText, platform } = req.body;

    if (!campaignText || typeof campaignText !== "string") {
      return res.status(400).json({ error: "Texto da campanha é obrigatório" });
    }

    const client = getGeminiClient();
    if (client) {
      const prompt = `Você é um analista sênior de campanhas financeiras, fidelidade e cashback (focado em carteiras digitais como PayPay, e-wallets e pagamentos).
Analise os detalhes/termos desta campanha promocional fornecida pelo usuário:
Plataforma sugerida: ${platform || "Carteira Digital / PayPay"}
Texto da campanha:
"${campaignText}"

Retorne uma resposta estritamente no formato JSON (sem blocos de código adicionais fora do JSON):
{
  "summary": "Resumo executivo de 2 frases sobre a viabilidade e retorno",
  "rewardRate": "Taxa ou valor estimado do bônus (ex: 10% ou 500 JPY/Kz)",
  "maxRewardCap": "Limite de bônus por usuário/transação",
  "minRequirement": "Gasto mínimo ou ação necessária",
  "detectionRiskLevel": "Baixo" | "Médio" | "Alto",
  "riskExplanation": "Explicação detalhada dos gatilhos de segurança e limites de rotação para não ser sinalizado",
  "recommendedCadence": "Frequência segura de operações (ex: no máximo 2 transações/dia espaçadas por 3 horas)",
  "tactics": ["dica tática 1", "dica tática 2", "dica tática 3"],
  "score": 85
}`;

      try {
        const response = await client.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({ success: true, analysis: parsed, source: "gemini-ai" });
        }
      } catch (err: any) {
        console.warn("Gemini API call failed, falling back to heuristic analyzer:", err?.message || err);
      }
    }

    // Heuristic analysis fallback (ensures 100% reliability offline or before API key setup)
    const lower = campaignText.toLowerCase();
    const hasCap = lower.includes("máximo") || lower.includes("limite") || lower.includes("cap") || lower.includes("teto");
    const hasCashback = lower.includes("cashback") || lower.includes("%") || lower.includes("bônus") || lower.includes("recompensa");

    const fallbackAnalysis = {
      summary: "Campanha estruturada com alto potencial de retorno em cashback e bonificações de transação.",
      rewardRate: hasCashback ? "5% a 20% em bônus garantido" : "Recompensa fixa por missão",
      maxRewardCap: hasCap ? "Consulte o teto estipulado nos termos da plataforma" : "Até 10.000 por ciclo promocional",
      minRequirement: "Transação elegível em estabelecimentos credenciados ou QR code",
      detectionRiskLevel: campaignText.length > 100 ? "Baixo" : "Médio",
      riskExplanation: "Evite transações repetitivas em valores idênticos consecutivos e respeite o intervalo mínimo de 90 minutos entre operações no mesmo terminal.",
      recommendedCadence: "Distribua em 3 a 5 transações fracionadas em horários comerciais normais (09:00 às 20:00).",
      tactics: [
        "Varie os horários e valores centavos para manter o padrão comportamental humano.",
        "Mantenha saldo regular ativo na carteira para elevar o índice de reputação da conta.",
        "Monitore o teto acumulado semanal para não estourar o limite de pontuação."
      ],
      score: 88
    };

    return res.json({ success: true, analysis: fallbackAnalysis, source: "heuristic-engine" });
  } catch (error: any) {
    console.error("Error in /api/analyze-campaign:", error);
    res.status(500).json({ error: "Falha ao processar análise da campanha" });
  }
});

// Strategy Generation Endpoint
app.post("/api/generate-strategy", async (req, res) => {
  try {
    const { targetGoal, currentBalance, activeAccounts, dailyVolume } = req.body;

    const client = getGeminiClient();
    if (client) {
      const prompt = `Como estrategista financeiro de otimização de campanhas de bônus, crie um plano seguro e metódico para o Projecto Milhões 2026 com os seguintes parâmetros:
Meta Financeira: ${targetGoal}
Saldo Atual / Acumulado: ${currentBalance}
Contas / Dispositivos operacionais: ${activeAccounts}
Volume Diário estimado: ${dailyVolume}

Retorne estritamente um objeto JSON:
{
  "milestonePlan": [
    {"phase": "Fase 1: Fundação & Validação", "days": "Dias 1-10", "dailyTarget": "Valor diário seguro", "focus": "Ação principal"},
    {"phase": "Fase 2: Escala Controlada", "days": "Dias 11-25", "dailyTarget": "Valor diário seguro", "focus": "Ação principal"},
    {"phase": "Fase 3: Consolidação dos Milhões", "days": "Dias 26-45", "dailyTarget": "Valor diário seguro", "focus": "Ação principal"}
  ],
  "safetyChecklist": [
    "Regra de espaçamento de IP/Rede",
    "Padrão de variação de montantes",
    "Descanso de conta obrigatório",
    "Auditoria periódica de extrato"
  ],
  "estimatedDaysToTarget": 35,
  "dailyRunRate": "Cálculo recomendado por dia"
}`;

      try {
        const response = await client.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({ success: true, strategy: parsed, source: "gemini-ai" });
        }
      } catch (err: any) {
        console.warn("Gemini API call failed, using fallback strategy:", err?.message || err);
      }
    }

    // Fallback strategy
    const target = Number(targetGoal) || 1000000;
    const current = Number(currentBalance) || 150000;
    const remaining = Math.max(0, target - current);
    const accounts = Number(activeAccounts) || 2;
    const dailyEst = Math.round(remaining / 30);

    const fallbackStrategy = {
      milestonePlan: [
        {
          phase: "Fase 1: Aquecimento & Verificação de Limites",
          days: "Dias 1-7",
          dailyTarget: `${Math.round(dailyEst * 0.5).toLocaleString()} por dia`,
          focus: "Validar taxa de conversão das promoções do PayPay e manter histórico limpo."
        },
        {
          phase: "Fase 2: Rotação Eficiente Multi-Campanha",
          days: "Dias 8-21",
          dailyTarget: `${Math.round(dailyEst * 1.1).toLocaleString()} por dia`,
          focus: "Aproveitar picos de campanhas sazonais e cashback cumulativo com QR Code."
        },
        {
          phase: "Fase 3: Meta Final & Resgate Seguro",
          days: "Dias 22-30",
          dailyTarget: `${Math.round(dailyEst * 1.3).toLocaleString()} por dia`,
          focus: "Consolidação de lucros, conversão em ativos estáveis e auditoria final."
        }
      ],
      safetyChecklist: [
        "Rotação gradual de conexões evitando repetitividade excessiva em um mesmo minuto.",
        "Variação natural dos valores de compra e recarga (nunca números redondos repetidos).",
        "Pausa de 24 horas a cada 5 dias operacionais para simular comportamento orgânico.",
        "Verificação imediata da liberação de cashback antes de novas transações na mesma loja."
      ],
      estimatedDaysToTarget: Math.ceil(remaining / (Math.max(1, dailyEst * accounts))),
      dailyRunRate: `${dailyEst.toLocaleString()} por dia (${accounts} carteiras ativas)`
    };

    return res.json({ success: true, strategy: fallbackStrategy, source: "heuristic-engine" });
  } catch (error: any) {
    console.error("Error in /api/generate-strategy:", error);
    res.status(500).json({ error: "Falha ao gerar plano de estratégia" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
