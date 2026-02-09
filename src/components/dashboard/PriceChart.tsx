// import { useState } from "react";
// import {
//   Area,
//   AreaChart,
//   Bar,
//   BarChart,
//   Line,
//   LineChart,
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// // Mock data generator
// const generatePriceData = () => {
//   const data = [];
//   let price = 1800;
//   for (let i = 0; i < 90; i++) {
//     const change = (Math.random() - 0.48) * 50;
//     price = Math.max(1600, Math.min(2000, price + change));
//     const open = price + (Math.random() - 0.5) * 20;
//     const high = Math.max(price, open) + Math.random() * 15;
//     const low = Math.min(price, open) - Math.random() * 15;
//     const close = price;
//     const volume = Math.floor(Math.random() * 10000000) + 5000000;
//     const ma20 = price + (Math.random() - 0.5) * 30;
//     const ma50 = price + (Math.random() - 0.5) * 50;
//     const rsi = Math.min(100, Math.max(0, 50 + (Math.random() - 0.5) * 60));
    
//     data.push({
//       date: new Date(Date.now() - (90 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       }),
//       open,
//       high,
//       low,
//       close,
//       volume,
//       ma20,
//       ma50,
//       rsi,
//     });
//   }
//   return data;
// };

// const priceData = generatePriceData();

// interface PriceChartProps {
//   className?: string;
// }

// export const PriceChart = ({ className }: PriceChartProps) => {
//   const [showMA20, setShowMA20] = useState(true);
//   const [showMA50, setShowMA50] = useState(true);
//   const [showVolume, setShowVolume] = useState(true);
//   const [showRSI, setShowRSI] = useState(true);

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="glass-card p-3 text-xs">
//           <p className="mb-2 font-medium text-foreground">{label}</p>
//           <div className="grid grid-cols-2 gap-x-4 gap-y-1">
//             <span className="text-muted-foreground">Open:</span>
//             <span className="font-mono text-foreground">₹{data.open?.toFixed(2)}</span>
//             <span className="text-muted-foreground">High:</span>
//             <span className="font-mono text-positive">₹{data.high?.toFixed(2)}</span>
//             <span className="text-muted-foreground">Low:</span>
//             <span className="font-mono text-negative">₹{data.low?.toFixed(2)}</span>
//             <span className="text-muted-foreground">Close:</span>
//             <span className="font-mono text-foreground">₹{data.close?.toFixed(2)}</span>
//             {showMA20 && (
//               <>
//                 <span className="text-muted-foreground">MA20:</span>
//                 <span className="font-mono text-chart-secondary">₹{data.ma20?.toFixed(2)}</span>
//               </>
//             )}
//             {showMA50 && (
//               <>
//                 <span className="text-muted-foreground">MA50:</span>
//                 <span className="font-mono text-chart-tertiary">₹{data.ma50?.toFixed(2)}</span>
//               </>
//             )}
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className={cn("glass-card p-6 space-y-4", className)}>
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <div>
//           <h3 className="text-lg font-semibold">Price & Technical Analysis</h3>
//           <p className="text-sm text-muted-foreground">Interactive candlestick chart with indicators</p>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant={showMA20 ? "default" : "outline"}
//             size="sm"
//             onClick={() => setShowMA20(!showMA20)}
//             className="h-7 text-xs"
//           >
//             MA 20
//           </Button>
//           <Button
//             variant={showMA50 ? "default" : "outline"}
//             size="sm"
//             onClick={() => setShowMA50(!showMA50)}
//             className="h-7 text-xs"
//           >
//             MA 50
//           </Button>
//           <Button
//             variant={showVolume ? "default" : "outline"}
//             size="sm"
//             onClick={() => setShowVolume(!showVolume)}
//             className="h-7 text-xs"
//           >
//             Volume
//           </Button>
//           <Button
//             variant={showRSI ? "default" : "outline"}
//             size="sm"
//             onClick={() => setShowRSI(!showRSI)}
//             className="h-7 text-xs"
//           >
//             RSI
//           </Button>
//         </div>
//       </div>

//       {/* Main Price Chart */}
//       <div className="h-[300px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <ComposedChart data={priceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
//             <XAxis
//               dataKey="date"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
//               interval="preserveStartEnd"
//             />
//             <YAxis
//               domain={["auto", "auto"]}
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
//               tickFormatter={(value) => `₹${value}`}
//             />
//             <Tooltip content={<CustomTooltip />} />
            
//             {/* Price area */}
//             <Area
//               type="monotone"
//               dataKey="close"
//               stroke="hsl(var(--primary))"
//               strokeWidth={2}
//               fill="url(#priceGradient)"
//             />
            
//             {/* Moving averages */}
//             {showMA20 && (
//               <Line
//                 type="monotone"
//                 dataKey="ma20"
//                 stroke="hsl(var(--chart-secondary))"
//                 strokeWidth={1.5}
//                 dot={false}
//                 strokeDasharray="4 2"
//               />
//             )}
//             {showMA50 && (
//               <Line
//                 type="monotone"
//                 dataKey="ma50"
//                 stroke="hsl(var(--chart-tertiary))"
//                 strokeWidth={1.5}
//                 dot={false}
//                 strokeDasharray="4 2"
//               />
//             )}
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Volume Chart */}
//       {showVolume && (
//         <div className="h-[80px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={priceData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
//               <XAxis dataKey="date" hide />
//               <YAxis hide />
//               <Tooltip
//                 content={({ active, payload }) => {
//                   if (active && payload && payload.length) {
//                     return (
//                       <div className="glass-card p-2 text-xs">
//                         <span className="text-muted-foreground">Volume: </span>
//                         <span className="font-mono">{(payload[0].value as number / 1000000).toFixed(2)}M</span>
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <Bar
//                 dataKey="volume"
//                 fill="hsl(var(--chart-volume))"
//                 radius={[2, 2, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* RSI Chart */}
//       {showRSI && (
//         <div className="h-[80px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={priceData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
//               <XAxis dataKey="date" hide />
//               <YAxis domain={[0, 100]} hide />
//               <ReferenceLine y={70} stroke="hsl(var(--negative))" strokeDasharray="3 3" strokeOpacity={0.5} />
//               <ReferenceLine y={30} stroke="hsl(var(--positive))" strokeDasharray="3 3" strokeOpacity={0.5} />
//               <Tooltip
//                 content={({ active, payload }) => {
//                   if (active && payload && payload.length) {
//                     const rsi = payload[0].value as number;
//                     const rsiStatus = rsi > 70 ? "Overbought" : rsi < 30 ? "Oversold" : "Neutral";
//                     return (
//                       <div className="glass-card p-2 text-xs">
//                         <span className="text-muted-foreground">RSI: </span>
//                         <span className="font-mono">{rsi.toFixed(1)}</span>
//                         <Badge
//                           variant="outline"
//                           className={cn(
//                             "ml-2 text-[10px]",
//                             rsi > 70 ? "text-negative" : rsi < 30 ? "text-positive" : "text-muted-foreground"
//                           )}
//                         >
//                           {rsiStatus}
//                         </Badge>
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="rsi"
//                 stroke="hsl(var(--warning))"
//                 strokeWidth={1.5}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
//         <div className="flex items-center gap-1.5">
//           <div className="h-2 w-4 rounded-full bg-primary" />
//           <span>Price</span>
//         </div>
//         {showMA20 && (
//           <div className="flex items-center gap-1.5">
//             <div className="h-0.5 w-4 bg-chart-secondary" style={{ borderStyle: "dashed" }} />
//             <span>MA 20</span>
//           </div>
//         )}
//         {showMA50 && (
//           <div className="flex items-center gap-1.5">
//             <div className="h-0.5 w-4 bg-chart-tertiary" style={{ borderStyle: "dashed" }} />
//             <span>MA 50</span>
//           </div>
//         )}
//         {showRSI && (
//           <div className="flex items-center gap-1.5">
//             <div className="h-2 w-4 rounded-full bg-warning" />
//             <span>RSI (14)</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



import { Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MarketSnapshot } from "@/services/stockService";

interface PriceChartProps {
  data: MarketSnapshot[];
  ticker: string;
}

export const PriceChart = ({ data, ticker }: PriceChartProps) => {
  const chartData = data.map(d => ({
    ...d,
    time: new Date(d.Date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }));

  return (
    <div className="bg-white/5 border border-white/10 p-6 h-[500px] rounded-2xl">
      <h3 className="font-semibold text-lg mb-6 text-white">{ticker} Performance Chart</h3>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
          <XAxis dataKey="time" fontSize={10} tick={{fill: '#888'}} axisLine={false} tickLine={false} />
          <YAxis domain={['auto', 'auto']} fontSize={10} tick={{fill: '#888'}} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
          <Area type="monotone" dataKey="Close" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="MA_20" stroke="#f59e0b" dot={false} strokeWidth={1} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="MA_50" stroke="#ef4444" dot={false} strokeWidth={1.5} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};