import { TrendingUp, TrendingDown, Minus, Activity, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Indicator {
  name: string;
  value: string;
  signal: "bullish" | "neutral" | "bearish";
  icon: React.ReactNode;
  description: string;
}

interface TechnicalIndicatorsProps {
  className?: string;
}

export const TechnicalIndicators = ({ className }: TechnicalIndicatorsProps) => {
  const indicators: Indicator[] = [
    {
      name: "Trend Direction",
      value: "Upward",
      signal: "bullish",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Strong uptrend across all timeframes",
    },
    {
      name: "RSI (14)",
      value: "58.4",
      signal: "neutral",
      icon: <Activity className="h-4 w-4" />,
      description: "Neither overbought nor oversold",
    },
    {
      name: "Volatility",
      value: "Medium",
      signal: "neutral",
      icon: <Zap className="h-4 w-4" />,
      description: "30-day historical volatility at 18%",
    },
    {
      name: "Volume Trend",
      value: "Increasing",
      signal: "bullish",
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Volume 23% above 20-day average",
    },
    {
      name: "Momentum",
      value: "Strong",
      signal: "bullish",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "MACD histogram expanding positive",
    },
  ];

  const signalConfig = {
    bullish: {
      color: "text-positive",
      bg: "bg-positive/10",
      border: "border-positive/20",
      label: "Supportive",
    },
    neutral: {
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/20",
      label: "Neutral",
    },
    bearish: {
      color: "text-negative",
      bg: "bg-negative/10",
      border: "border-negative/20",
      label: "Caution",
    },
  };

  return (
    <div className={cn("glass-card p-6", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Technical Indicators</h3>
        <p className="text-sm text-muted-foreground">Signal summary with color coding</p>
      </div>

      <div className="space-y-3">
        {indicators.map((indicator, index) => {
          const config = signalConfig[indicator.signal];
          return (
            <div
              key={indicator.name}
              className={cn(
                "flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-secondary/50",
                config.border
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={cn("rounded-lg p-2", config.bg, config.color)}>
                  {indicator.icon}
                </div>
                <div>
                  <p className="font-medium">{indicator.name}</p>
                  <p className="text-xs text-muted-foreground">{indicator.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn("font-mono font-semibold", config.color)}>
                  {indicator.value}
                </p>
                <p className={cn("text-xs", config.color)}>{config.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Signal Summary */}
      <div className="mt-6 rounded-lg bg-positive/10 border border-positive/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-positive" />
            <span className="font-semibold text-positive">Overall Technical Signal</span>
          </div>
          <span className="font-mono text-lg font-bold text-positive">BULLISH</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          4 out of 5 indicators show supportive signals for upward movement
        </p>
      </div>
    </div>
  );
};
