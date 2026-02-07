import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Award,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ConfidenceRing } from "@/components/dashboard/ConfidenceRing";

type Signal = "buy" | "hold" | "sell";
type RiskLevel = "low" | "medium" | "high";

interface CompareStock {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  recommendation: Signal;
  confidence: number;
  riskLevel: RiskLevel;
  pe: number;
  marketCap: string;
  reasoning: string;
  strengths: string[];
  risks: string[];
}

const mockStocks: CompareStock[] = [
  {
    id: "1",
    ticker: "INFY",
    name: "Infosys",
    sector: "IT Services",
    price: 1847.5,
    change: 23.45,
    changePercent: 1.29,
    recommendation: "buy",
    confidence: 78,
    riskLevel: "medium",
    pe: 24.5,
    marketCap: "₹7.67L Cr",
    reasoning:
      "Strong technical momentum with positive news flow. AI partnership announcement is a key catalyst.",
    strengths: ["Strong brand", "AI investments", "Stable client base"],
    risks: ["Currency volatility", "Global slowdown"],
  },
  {
    id: "2",
    ticker: "TCS",
    name: "TCS",
    sector: "IT Services",
    price: 3892.15,
    change: -12.3,
    changePercent: -0.31,
    recommendation: "hold",
    confidence: 62,
    riskLevel: "low",
    pe: 28.2,
    marketCap: "₹14.08L Cr",
    reasoning:
      "Market leader with stable fundamentals but limited near-term catalysts. Await better entry.",
    strengths: ["Market leader", "Diversified revenue", "Strong management"],
    risks: ["Premium valuation", "Slower growth"],
  },
  {
    id: "3",
    ticker: "WIPRO",
    name: "Wipro",
    sector: "IT Services",
    price: 412.8,
    change: -8.65,
    changePercent: -2.05,
    recommendation: "sell",
    confidence: 71,
    riskLevel: "high",
    pe: 18.7,
    marketCap: "₹2.16L Cr",
    reasoning:
      "Deteriorating sentiment and technical breakdown. Management changes creating uncertainty.",
    strengths: ["Attractive valuation", "Consulting growth"],
    risks: ["Leadership transition", "Margin pressure", "Client losses"],
  },
  {
    id: "4",
    ticker: "HCLTECH",
    name: "HCL Tech",
    sector: "IT Services",
    price: 1523.4,
    change: 18.9,
    changePercent: 1.26,
    recommendation: "buy",
    confidence: 74,
    riskLevel: "low",
    pe: 22.1,
    marketCap: "₹4.13L Cr",
    reasoning:
      "Solid execution with strong deal wins. Products segment showing promising growth.",
    strengths: ["Products business", "Strong deal pipeline", "R&D focus"],
    risks: ["Integration challenges", "Key client dependency"],
  },
];

const CompareStocks = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(
    mockStocks.slice(0, 4).map((s) => s.id)
  );
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const displayedStocks = mockStocks.filter((s) => selectedStocks.includes(s.id));

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const signalConfig = {
    buy: { label: "BUY", className: "signal-buy", icon: TrendingUp },
    hold: { label: "HOLD", className: "signal-hold", icon: Minus },
    sell: { label: "SELL", className: "signal-sell", icon: TrendingDown },
  };

  const riskConfig = {
    low: { label: "Low", className: "text-positive" },
    medium: { label: "Medium", className: "text-warning" },
    high: { label: "High", className: "text-negative" },
  };

  // Find best and worst
  const buyStocks = displayedStocks.filter((s) => s.recommendation === "buy");
  const bestOpportunity = buyStocks.reduce(
    (best, stock) => (stock.confidence > (best?.confidence || 0) ? stock : best),
    null as CompareStock | null
  );
  const highestRisk = displayedStocks.find((s) => s.riskLevel === "high");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compare Stocks</h1>
          <p className="text-muted-foreground">
            Side-by-side comparison with AI-powered insights
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      {/* Highlights */}
      <div className="grid gap-4 md:grid-cols-2">
        {bestOpportunity && (
          <div className="glass-card p-4 border-positive/30 bg-positive/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-positive/20">
                <Award className="h-5 w-5 text-positive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Opportunity</p>
                <p className="font-semibold text-positive">
                  {bestOpportunity.name} ({bestOpportunity.ticker})
                </p>
              </div>
              <Badge className="ml-auto signal-buy">
                {bestOpportunity.confidence}% Confidence
              </Badge>
            </div>
          </div>
        )}
        {highestRisk && (
          <div className="glass-card p-4 border-negative/30 bg-negative/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-negative/20">
                <AlertTriangle className="h-5 w-5 text-negative" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Highest Risk</p>
                <p className="font-semibold text-negative">
                  {highestRisk.name} ({highestRisk.ticker})
                </p>
              </div>
              <Badge className="ml-auto signal-sell">{highestRisk.riskLevel} risk</Badge>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-center">Recommendation</TableHead>
              <TableHead className="text-center">Confidence</TableHead>
              <TableHead className="text-center">Risk</TableHead>
              <TableHead className="text-right">P/E</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedStocks.map((stock, index) => {
              const signal = signalConfig[stock.recommendation];
              const risk = riskConfig[stock.riskLevel];
              const SignalIcon = signal.icon;
              const isPositive = stock.change >= 0;
              const isExpanded = expandedRows.includes(stock.id);

              return (
                <Collapsible key={stock.id} asChild open={isExpanded}>
                  <>
                    <TableRow
                      className={cn(
                        "cursor-pointer transition-colors",
                        isExpanded ? "bg-secondary/50" : "hover:bg-secondary/30"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleExpand(stock.id)}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{stock.name}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-mono">{stock.ticker}</span> • {stock.sector}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 font-mono text-sm",
                            isPositive ? "text-positive" : "text-negative"
                          )}
                        >
                          {isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {isPositive ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("gap-1", signal.className)}>
                          <SignalIcon className="h-3 w-3" />
                          {signal.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <ConfidenceRing
                            value={stock.confidence}
                            signal={stock.recommendation}
                            size={50}
                            strokeWidth={4}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={cn("text-sm font-medium", risk.className)}>
                          {risk.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {stock.pe.toFixed(1)}x
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {stock.marketCap}
                      </TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                        <TableCell colSpan={9} className="p-0">
                          <div className="p-6 space-y-4 animate-fade-in">
                            <p className="text-sm">{stock.reasoning}</p>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-positive">Strengths</p>
                                <ul className="space-y-1">
                                  {stock.strengths.map((s, i) => (
                                    <li
                                      key={i}
                                      className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                      <div className="h-1.5 w-1.5 rounded-full bg-positive" />
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-negative">Risks</p>
                                <ul className="space-y-1">
                                  {stock.risks.map((r, i) => (
                                    <li
                                      key={i}
                                      className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                      <div className="h-1.5 w-1.5 rounded-full bg-negative" />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompareStocks;
