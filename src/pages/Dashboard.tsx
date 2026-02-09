// import { StockSummaryCard } from "@/components/dashboard/StockSummaryCard";
// import { PriceChart } from "@/components/dashboard/PriceChart";
// import { TechnicalIndicators } from "@/components/dashboard/TechnicalIndicators";
// import { NewsSentiment } from "@/components/dashboard/NewsSentiment";
// import { AgentReasoningPanel } from "@/components/dashboard/AgentReasoningPanel";

// const Dashboard = () => {
//   // Mock data for Infosys
//   const stockData = {
//     ticker: "INFY",
//     companyName: "Infosys Limited",
//     sector: "Information Technology",
//     currentPrice: 1847.5,
//     dailyChange: 23.45,
//     dailyChangePercent: 1.29,
//     recommendation: "buy" as const,
//     confidence: 78,
//     riskLevel: "medium" as const,
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Page Header */}
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">Stock Analysis Dashboard</h1>
//         <p className="text-muted-foreground">
//           AI-powered insights and recommendations for informed investment decisions
//         </p>
//       </div>

//       {/* Stock Summary Card */}
//       <StockSummaryCard {...stockData} />

//       {/* Charts and Indicators Row */}
//       <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
//         <PriceChart />
//         <TechnicalIndicators />
//       </div>

//       {/* News & Sentiment */}
//       <NewsSentiment />

//       {/* Agent Reasoning Panel */}
//       <AgentReasoningPanel />
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { stockService, MarketSnapshot } from "@/services/stockService";
import { StockSummaryCard } from "@/components/dashboard/StockSummaryCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { TechnicalIndicators } from "@/components/dashboard/TechnicalIndicators";
import { NewsSentiment } from "@/components/dashboard/NewsSentiment";
import { AgentReasoningPanel } from "@/components/dashboard/AgentReasoningPanel";

const Dashboard = () => {
  const [ticker] = useState("AAPL");
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [history, setHistory] = useState<MarketSnapshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      setLoading(true);
      const [latest, series] = await Promise.all([
        stockService.getLatestSnapshot(ticker),
        stockService.getHistory(ticker)
      ]);
      setSnapshot(latest);
      setHistory(series);
      setLoading(false);
    }
    loadAllData();
  }, [ticker]);

  if (loading || !snapshot) return (
    <div className="flex items-center justify-center h-screen bg-[#0a0c10] text-blue-500 font-mono">
      <div className="animate-pulse tracking-tighter uppercase font-bold">Initializing Market Intelligence...</div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-[#0a0c10] min-h-screen text-white">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">AgenticStock Analysis</h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest opacity-60">Real-time DB Connection: Active</p>
      </header>

      {/* Hero Section */}
      <StockSummaryCard snapshot={snapshot} />

      {/* Chart and Side Indicators */}
      <div className="grid lg:grid-cols-[1fr_350px] gap-6">
        <PriceChart data={history} ticker={ticker} />
        <TechnicalIndicators snapshot={snapshot} />
      </div>

      {/* AI Insights and News */}
      <div className="grid md:grid-cols-2 gap-6">
        <AgentReasoningPanel ticker={ticker} />
        <NewsSentiment ticker={ticker} />
      </div>
    </div>
  );
};

export default Dashboard;