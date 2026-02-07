import { StockSummaryCard } from "@/components/dashboard/StockSummaryCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { TechnicalIndicators } from "@/components/dashboard/TechnicalIndicators";
import { NewsSentiment } from "@/components/dashboard/NewsSentiment";
import { AgentReasoningPanel } from "@/components/dashboard/AgentReasoningPanel";

const Dashboard = () => {
  // Mock data for Infosys
  const stockData = {
    ticker: "INFY",
    companyName: "Infosys Limited",
    sector: "Information Technology",
    currentPrice: 1847.5,
    dailyChange: 23.45,
    dailyChangePercent: 1.29,
    recommendation: "buy" as const,
    confidence: 78,
    riskLevel: "medium" as const,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stock Analysis Dashboard</h1>
        <p className="text-muted-foreground">
          AI-powered insights and recommendations for informed investment decisions
        </p>
      </div>

      {/* Stock Summary Card */}
      <StockSummaryCard {...stockData} />

      {/* Charts and Indicators Row */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <PriceChart />
        <TechnicalIndicators />
      </div>

      {/* News & Sentiment */}
      <NewsSentiment />

      {/* Agent Reasoning Panel */}
      <AgentReasoningPanel />
    </div>
  );
};

export default Dashboard;
