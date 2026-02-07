import { Brain, CheckCircle2, AlertTriangle, TrendingUp, Activity, BarChart3, Newspaper, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ReasoningFactor {
  id: string;
  name: string;
  icon: React.ReactNode;
  weight: number;
  score: number;
  impact: "positive" | "neutral" | "negative";
  description: string;
}

const AgentReasoning = () => {
  const factors: ReasoningFactor[] = [
    {
      id: "1",
      name: "Price Trend Analysis",
      icon: <TrendingUp className="h-5 w-5" />,
      weight: 25,
      score: 85,
      impact: "positive",
      description: "Stock trading above key moving averages with strong upward momentum",
    },
    {
      id: "2",
      name: "Momentum Indicators",
      icon: <Activity className="h-5 w-5" />,
      weight: 20,
      score: 72,
      impact: "positive",
      description: "RSI in healthy zone, MACD showing bullish crossover",
    },
    {
      id: "3",
      name: "Volume Analysis",
      icon: <BarChart3 className="h-5 w-5" />,
      weight: 20,
      score: 78,
      impact: "positive",
      description: "Above-average volume confirming price movement",
    },
    {
      id: "4",
      name: "News Sentiment",
      icon: <Newspaper className="h-5 w-5" />,
      weight: 20,
      score: 68,
      impact: "positive",
      description: "Positive news flow with AI partnership announcement",
    },
    {
      id: "5",
      name: "Risk Assessment",
      icon: <Shield className="h-5 w-5" />,
      weight: 15,
      score: 55,
      impact: "neutral",
      description: "Moderate sector-level risks partially offset by company strengths",
    },
  ];

  const impactConfig = {
    positive: { color: "text-positive", bg: "bg-positive/10", progressColor: "[&>div]:bg-positive" },
    neutral: { color: "text-warning", bg: "bg-warning/10", progressColor: "[&>div]:bg-warning" },
    negative: { color: "text-negative", bg: "bg-negative/10", progressColor: "[&>div]:bg-negative" },
  };

  const overallScore = factors.reduce((acc, f) => acc + (f.score * f.weight) / 100, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agent Reasoning</h1>
        <p className="text-muted-foreground">
          Deep dive into how the AI agent makes investment decisions
        </p>
      </div>

      {/* Overview Card */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 animate-pulse-glow">
            <Brain className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Multi-Signal Decision Engine</h2>
            <p className="text-muted-foreground">
              The agent analyzes multiple factors to generate recommendations
            </p>
          </div>
        </div>

        {/* Decision Flow */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6 pl-14">
            <div className="relative">
              <div className="absolute -left-11 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="font-semibold">Data Collection</h3>
              <p className="text-sm text-muted-foreground">
                Gather price data, technical indicators, news, and sentiment signals
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-11 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="font-semibold">Signal Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Process each signal through specialized analysis modules
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-11 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="font-semibold">Weight Assignment</h3>
              <p className="text-sm text-muted-foreground">
                Apply importance weights based on market conditions
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-11 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                4
              </div>
              <h3 className="font-semibold">Recommendation Generation</h3>
              <p className="text-sm text-muted-foreground">
                Synthesize signals into actionable BUY/HOLD/SELL recommendation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Factor Analysis */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6">Factor Analysis for Infosys (INFY)</h3>

        <div className="space-y-4">
          {factors.map((factor, index) => {
            const config = impactConfig[factor.impact];
            return (
              <div
                key={factor.id}
                className="rounded-lg border border-border p-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-lg p-2", config.bg, config.color)}>
                      {factor.icon}
                    </div>
                    <div>
                      <p className="font-medium">{factor.name}</p>
                      <p className="text-xs text-muted-foreground">{factor.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-semibold">{factor.score}%</p>
                    <Badge variant="outline" className="text-xs">
                      Weight: {factor.weight}%
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={factor.score}
                  className={cn("h-2 bg-secondary", config.progressColor)}
                />
              </div>
            );
          })}
        </div>

        {/* Overall Score */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weighted Overall Score</p>
              <p className="text-3xl font-bold text-primary font-mono">{overallScore.toFixed(1)}%</p>
            </div>
            <Badge className="signal-buy text-lg px-4 py-2">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              BUY SIGNAL
            </Badge>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Score above 70% with majority positive signals triggers a BUY recommendation.
            The agent has high confidence in this decision based on converging technical and
            sentiment indicators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentReasoning;
