// import { TrendingUp, TrendingDown, Minus, AlertTriangle, Shield, Building2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
// import { ConfidenceRing } from "./ConfidenceRing";

// export type Signal = "buy" | "hold" | "sell";
// export type RiskLevel = "low" | "medium" | "high";

// interface StockSummaryCardProps {
//   ticker: string;
//   companyName: string;
//   sector: string;
//   currentPrice: number;
//   dailyChange: number;
//   dailyChangePercent: number;
//   recommendation: Signal;
//   confidence: number;
//   riskLevel: RiskLevel;
// }

// export const StockSummaryCard = ({
//   ticker,
//   companyName,
//   sector,
//   currentPrice,
//   dailyChange,
//   dailyChangePercent,
//   recommendation,
//   confidence,
//   riskLevel,
// }: StockSummaryCardProps) => {
//   const isPositive = dailyChange >= 0;

//   const signalConfig = {
//     buy: {
//       label: "BUY",
//       className: "signal-buy",
//       icon: TrendingUp,
//       glowClass: "glow-buy",
//     },
//     hold: {
//       label: "HOLD",
//       className: "signal-hold",
//       icon: Minus,
//       glowClass: "glow-hold",
//     },
//     sell: {
//       label: "SELL",
//       className: "signal-sell",
//       icon: TrendingDown,
//       glowClass: "glow-sell",
//     },
//   };

//   const riskConfig = {
//     low: { label: "Low Risk", icon: Shield, className: "text-positive" },
//     medium: { label: "Medium Risk", icon: AlertTriangle, className: "text-warning" },
//     high: { label: "High Risk", icon: AlertTriangle, className: "text-negative" },
//   };

//   const signal = signalConfig[recommendation];
//   const risk = riskConfig[riskLevel];
//   const SignalIcon = signal.icon;
//   const RiskIcon = risk.icon;

//   return (
//     <div className="glass-card p-6 animate-fade-in">
//       <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//         {/* Left: Stock Info */}
//         <div className="flex-1 space-y-4">
//           {/* Header */}
//           <div className="flex items-start gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
//               <Building2 className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl font-bold tracking-tight">{companyName}</h1>
//                 <Badge variant="outline" className="font-mono text-xs">
//                   {ticker}
//                 </Badge>
//               </div>
//               <Badge variant="secondary" className="mt-1 text-xs">
//                 {sector}
//               </Badge>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="space-y-1">
//             <div className="flex items-baseline gap-3">
//               <span className="font-mono text-4xl font-bold tracking-tight">
//                 ₹{currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//               </span>
//               <div
//                 className={cn(
//                   "flex items-center gap-1 rounded-md px-2 py-1 font-mono text-sm font-medium",
//                   isPositive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
//                 )}
//               >
//                 {isPositive ? (
//                   <TrendingUp className="h-3.5 w-3.5" />
//                 ) : (
//                   <TrendingDown className="h-3.5 w-3.5" />
//                 )}
//                 <span>
//                   {isPositive ? "+" : ""}
//                   {dailyChange.toFixed(2)} ({dailyChangePercent.toFixed(2)}%)
//                 </span>
//               </div>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               Last updated: Today, 3:30 PM IST
//             </p>
//           </div>

//           {/* Risk Level */}
//           <div className="flex items-center gap-2">
//             <RiskIcon className={cn("h-4 w-4", risk.className)} />
//             <span className={cn("text-sm font-medium", risk.className)}>
//               {risk.label}
//             </span>
//           </div>
//         </div>

//         {/* Center: Recommendation Badge */}
//         <div className="flex items-center justify-center lg:px-8">
//           <div
//             className={cn(
//               "relative flex flex-col items-center gap-2 rounded-2xl px-8 py-6",
//               signal.className,
//               signal.glowClass
//             )}
//           >
//             <SignalIcon className="h-8 w-8" />
//             <span className="text-3xl font-bold tracking-wider">{signal.label}</span>
//             <span className="text-xs opacity-80">AI Recommendation</span>
//           </div>
//         </div>

//         {/* Right: Confidence Ring */}
//         <div className="flex items-center justify-center lg:justify-end">
//           <ConfidenceRing value={confidence} signal={recommendation} size={140} />
//         </div>
//       </div>
//     </div>
//   );
// };





import { MarketSnapshot } from "@/services/stockService";
import { Badge } from "@/components/ui/badge";

export const StockSummaryCard = ({ snapshot }: { snapshot: MarketSnapshot }) => {
  return (
    <div className="bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center rounded-2xl gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-4xl font-bold font-mono text-white tracking-tighter">₹{snapshot.Close.toLocaleString()}</h2>
          <Badge className="bg-blue-500/20 text-blue-400 border-none px-3 uppercase text-[10px]">{snapshot.Ticker}</Badge>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-40">Snapshot from: {new Date(snapshot.Date).toLocaleDateString()}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground uppercase font-black">High</span>
          <span className="font-mono text-sm">₹{snapshot.High}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground uppercase font-black">Low</span>
          <span className="font-mono text-sm">₹{snapshot.Low}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground uppercase font-black">MA 50</span>
          <span className="font-mono text-sm">₹{snapshot.MA_50.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground uppercase font-black text-blue-400">RSI</span>
          <span className="font-mono text-sm text-blue-400">{snapshot.RSI_14.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};