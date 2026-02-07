import { useState } from "react";
import {
  Brain,
  TrendingUp,
  Activity,
  BarChart3,
  Newspaper,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ReasoningStep {
  id: string;
  category: string;
  icon: React.ReactNode;
  title: string;
  analysis: string;
  signal: "supports" | "caution" | "neutral";
  details?: string;
}

interface AgentReasoningPanelProps {
  className?: string;
}

export const AgentReasoningPanel = ({ className }: AgentReasoningPanelProps) => {
  const [simpleMode, setSimpleMode] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  const reasoningSteps: ReasoningStep[] = [
    {
      id: "price",
      category: "Price Analysis",
      icon: <TrendingUp className="h-4 w-4" />,
      title: "Upward price trend detected",
      analysis:
        "The stock has been trading above both its 20-day and 50-day moving averages for the past 15 trading sessions. This indicates strong bullish momentum and suggests buyers are in control.",
      signal: "supports",
      details:
        "Price closed at ₹1,847.50, which is 3.2% above the 20-day MA (₹1,790.25) and 5.8% above the 50-day MA (₹1,746.80). The golden cross pattern formed 22 days ago remains intact.",
    },
    {
      id: "rsi",
      category: "Momentum",
      icon: <Activity className="h-4 w-4" />,
      title: "RSI indicates healthy momentum",
      analysis:
        "RSI(14) at 58.4 shows the stock is neither overbought nor oversold, leaving room for further upside. The momentum is sustainable without immediate reversal risk.",
      signal: "supports",
      details:
        "RSI has been trending between 50-65 for the past month, indicating consistent buying pressure without excessive speculation. No bearish divergence detected.",
    },
    {
      id: "volume",
      category: "Volume",
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Volume confirms price movement",
      analysis:
        "Trading volume is 23% above the 20-day average, confirming institutional participation in the uptrend. Higher volume on up days vs down days supports bullish conviction.",
      signal: "supports",
      details:
        "Average daily volume: 12.4M shares. Today's volume: 15.3M shares. On-Balance Volume (OBV) is at a 3-month high, suggesting accumulation phase.",
    },
    {
      id: "sentiment",
      category: "News Sentiment",
      icon: <Newspaper className="h-4 w-4" />,
      title: "Positive news flow supports thesis",
      analysis:
        "Recent AI partnership announcement and strong Q3 results have generated positive sentiment. 60% of recent news articles carry positive sentiment scores.",
      signal: "supports",
      details:
        "Key catalysts: (1) AI partnership with major tech company, (2) Beat on Q3 revenue by 4%, (3) Maintained FY25 guidance despite sector headwinds.",
    },
    {
      id: "risk",
      category: "Risk Assessment",
      icon: <AlertTriangle className="h-4 w-4" />,
      title: "Moderate sector-level risks noted",
      analysis:
        "Global IT spending slowdown and currency fluctuations present headwinds. However, company-specific fundamentals remain strong enough to offset these concerns.",
      signal: "caution",
      details:
        "Risk factors: (1) USD/INR volatility, (2) Client budget cuts in certain verticals, (3) Increased competition from smaller players. Mitigating factors: Strong client relationships, diversified revenue base.",
    },
  ];

  const toggleStep = (stepId: string) => {
    setExpandedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const signalConfig = {
    supports: {
      icon: CheckCircle2,
      color: "text-positive",
      bg: "bg-positive/10",
      border: "border-positive/30",
      label: "Supports Buy",
    },
    caution: {
      icon: AlertTriangle,
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/30",
      label: "Caution",
    },
    neutral: {
      icon: Shield,
      color: "text-muted-foreground",
      bg: "bg-secondary",
      border: "border-border",
      label: "Neutral",
    },
  };

  const simpleExplanation = `
Based on my analysis, I recommend BUYING Infosys stock. Here's why in simple terms:

📈 The stock price is going UP consistently - like a ball rolling uphill with momentum.

💪 The buying strength (RSI) is healthy - not too hot, not too cold.

📊 More people are trading it than usual - showing real interest from big investors.

📰 Recent news is positive - the company just landed a big AI deal and beat expectations.

⚠️ Some risks exist - but they're manageable and typical for the IT sector.

Overall, this looks like a good opportunity for growth-oriented investors with a 1-year+ horizon.
  `;

  return (
    <div className={cn("glass-card p-6", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 animate-pulse-glow">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Agent Reasoning</h3>
            <p className="text-sm text-muted-foreground">
              Step-by-step AI analysis explaining the recommendation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="simple-mode"
            checked={simpleMode}
            onCheckedChange={setSimpleMode}
          />
          <Label htmlFor="simple-mode" className="text-sm cursor-pointer">
            <Lightbulb className="h-4 w-4 inline mr-1" />
            Explain like I'm a beginner
          </Label>
        </div>
      </div>

      {simpleMode ? (
        /* Simple Mode */
        <div className="rounded-lg bg-secondary/50 p-6 animate-fade-in">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
            {simpleExplanation}
          </pre>
        </div>
      ) : (
        /* Detailed Reasoning Steps */
        <div className="space-y-3">
          {reasoningSteps.map((step, index) => {
            const config = signalConfig[step.signal];
            const SignalIcon = config.icon;
            const isExpanded = expandedSteps.includes(step.id);

            return (
              <Collapsible
                key={step.id}
                open={isExpanded}
                onOpenChange={() => toggleStep(step.id)}
              >
                <div
                  className={cn(
                    "rounded-lg border transition-all",
                    config.border,
                    isExpanded && config.bg
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            config.bg,
                            config.color
                          )}
                        >
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">
                              {step.category}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn("gap-1 text-[10px]", config.color)}
                            >
                              <SignalIcon className="h-2.5 w-2.5" />
                              {config.label}
                            </Badge>
                          </div>
                          <p className="font-medium mt-0.5">{step.title}</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-3">
                      <p className="text-sm text-muted-foreground pl-11">
                        {step.analysis}
                      </p>
                      {step.details && (
                        <div className="ml-11 rounded bg-background/50 p-3 text-xs text-muted-foreground border border-border/50">
                          <strong className="text-foreground">Technical Details:</strong>{" "}
                          {step.details}
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      )}

      {/* Final Recommendation */}
      <div className="mt-6 rounded-xl bg-gradient-to-br from-positive/20 to-positive/5 border border-positive/30 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-positive/20">
            <CheckCircle2 className="h-6 w-6 text-positive" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-positive">Final Recommendation: BUY</h4>
            <p className="mt-2 text-sm text-foreground leading-relaxed">
              Based on the comprehensive analysis of price trends, technical indicators, volume
              patterns, and news sentiment, the AI agent recommends <strong>BUYING</strong> Infosys
              stock with a <strong>confidence score of 78%</strong>. The stock shows strong
              technical momentum supported by positive fundamental catalysts. Key risks have been
              identified and factored into the recommendation. This position is suitable for
              investors with a medium to long-term investment horizon (6-12 months).
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-positive border-positive/30 bg-positive/10">
                Target: ₹2,100 (+14%)
              </Badge>
              <Badge variant="outline" className="text-negative border-negative/30 bg-negative/10">
                Stop Loss: ₹1,720 (-7%)
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Risk/Reward: 1:2
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
