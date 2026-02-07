import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StockSummaryCard } from "@/components/dashboard/StockSummaryCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { TechnicalIndicators } from "@/components/dashboard/TechnicalIndicators";
import { NewsSentiment } from "@/components/dashboard/NewsSentiment";
import { AgentReasoningPanel } from "@/components/dashboard/AgentReasoningPanel";

type Signal = "buy" | "hold" | "sell";
type RiskLevel = "low" | "medium" | "high";

interface Stock {
  ticker: string;
  companyName: string;
  sector: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  recommendation: Signal;
  confidence: number;
  riskLevel: RiskLevel;
}

const popularStocks: Stock[] = [
  {
    ticker: "INFY",
    companyName: "Infosys Limited",
    sector: "Information Technology",
    currentPrice: 1847.5,
    dailyChange: 23.45,
    dailyChangePercent: 1.29,
    recommendation: "buy",
    confidence: 78,
    riskLevel: "medium",
  },
  {
    ticker: "TCS",
    companyName: "Tata Consultancy Services",
    sector: "Information Technology",
    currentPrice: 3892.15,
    dailyChange: -12.3,
    dailyChangePercent: -0.31,
    recommendation: "hold",
    confidence: 62,
    riskLevel: "low",
  },
  {
    ticker: "RELIANCE",
    companyName: "Reliance Industries",
    sector: "Energy",
    currentPrice: 2456.8,
    dailyChange: 45.2,
    dailyChangePercent: 1.88,
    recommendation: "buy",
    confidence: 82,
    riskLevel: "low",
  },
  {
    ticker: "HDFC",
    companyName: "HDFC Bank",
    sector: "Banking",
    currentPrice: 1678.35,
    dailyChange: -8.9,
    dailyChangePercent: -0.53,
    recommendation: "hold",
    confidence: 65,
    riskLevel: "medium",
  },
];

const StockAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock>(popularStocks[0]);

  const signalConfig = {
    buy: { className: "signal-buy" },
    hold: { className: "signal-hold" },
    sell: { className: "signal-sell" },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Analysis</h1>
          <p className="text-muted-foreground">
            Deep dive analysis with AI-powered insights
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by ticker or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Quick Select */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground py-2">Popular:</span>
        {popularStocks.map((stock) => {
          const isSelected = selectedStock.ticker === stock.ticker;
          const isPositive = stock.dailyChange >= 0;
          return (
            <Button
              key={stock.ticker}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStock(stock)}
              className="gap-2"
            >
              <span className="font-mono">{stock.ticker}</span>
              <span
                className={cn(
                  "text-xs font-mono",
                  isPositive ? "text-positive" : "text-negative",
                  isSelected && "text-primary-foreground"
                )}
              >
                {isPositive ? "+" : ""}
                {stock.dailyChangePercent.toFixed(2)}%
              </span>
            </Button>
          );
        })}
      </div>

      {/* Stock Summary Card */}
      <StockSummaryCard {...selectedStock} />

      {/* Charts and Indicators */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <PriceChart />
        <TechnicalIndicators />
      </div>

      {/* News & Sentiment */}
      <NewsSentiment />

      {/* Agent Reasoning */}
      <AgentReasoningPanel />
    </div>
  );
};

export default StockAnalysis;
