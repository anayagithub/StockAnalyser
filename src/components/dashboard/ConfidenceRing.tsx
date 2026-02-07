import { cn } from "@/lib/utils";

interface ConfidenceRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  signal?: "buy" | "hold" | "sell";
}

export const ConfidenceRing = ({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  signal = "buy",
}: ConfidenceRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const signalColors = {
    buy: {
      stroke: "stroke-signal-buy",
      text: "text-signal-buy",
      glow: "drop-shadow-[0_0_12px_hsl(var(--signal-buy)/0.5)]",
    },
    hold: {
      stroke: "stroke-signal-hold",
      text: "text-signal-hold",
      glow: "drop-shadow-[0_0_12px_hsl(var(--signal-hold)/0.5)]",
    },
    sell: {
      stroke: "stroke-signal-sell",
      text: "text-signal-sell",
      glow: "drop-shadow-[0_0_12px_hsl(var(--signal-sell)/0.5)]",
    },
  };

  const colors = signalColors[signal];

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className={cn("transform -rotate-90", colors.glow)}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border"
        />
        {/* Animated progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn(colors.stroke, "transition-all duration-1000 ease-out")}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-mono text-2xl font-bold", colors.text)}>
          {value}%
        </span>
        <span className="text-xs text-muted-foreground">Confidence</span>
      </div>
    </div>
  );
};
