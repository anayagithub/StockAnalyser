import { useState } from "react";
import {
  Star,
  StarOff,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Bell,
  Brain,
  ArrowUpDown,
  Filter,
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
import { ConfidenceRing } from "@/components/dashboard/ConfidenceRing";

type Signal = "buy" | "hold" | "sell";

interface WatchlistStock {
  id: string;
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  recommendation: Signal;
  confidence: number;
  lastUpdated: string;
  alerts: string[];
}

const mockWatchlist: WatchlistStock[] = [
  {
    id: "1",
    ticker: "INFY",
    name: "Infosys",
    price: 1847.5,
    change: 23.45,
    changePercent: 1.29,
    recommendation: "buy",
    confidence: 78,
    lastUpdated: "5 min ago",
    alerts: ["Signal strengthened"],
  },
  {
    id: "2",
    ticker: "TCS",
    name: "Tata Consultancy Services",
    price: 3892.15,
    change: -12.3,
    changePercent: -0.31,
    recommendation: "hold",
    confidence: 62,
    lastUpdated: "10 min ago",
    alerts: [],
  },
  {
    id: "3",
    ticker: "WIPRO",
    name: "Wipro Limited",
    price: 412.8,
    change: -8.65,
    changePercent: -2.05,
    recommendation: "sell",
    confidence: 71,
    lastUpdated: "2 min ago",
    alerts: ["Sentiment changed", "Risk increased"],
  },
  {
    id: "4",
    ticker: "HCLTECH",
    name: "HCL Technologies",
    price: 1523.4,
    change: 18.9,
    changePercent: 1.26,
    recommendation: "buy",
    confidence: 74,
    lastUpdated: "8 min ago",
    alerts: [],
  },
  {
    id: "5",
    ticker: "TECHM",
    name: "Tech Mahindra",
    price: 1287.65,
    change: 5.2,
    changePercent: 0.41,
    recommendation: "hold",
    confidence: 58,
    lastUpdated: "15 min ago",
    alerts: ["Signal weakened"],
  },
];

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(mockWatchlist);

  const signalConfig = {
    buy: {
      label: "BUY",
      className: "signal-buy",
      icon: TrendingUp,
    },
    hold: {
      label: "HOLD",
      className: "signal-hold",
      icon: Minus,
    },
    sell: {
      label: "SELL",
      className: "signal-sell",
      icon: TrendingDown,
    },
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((stock) => stock.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Watchlist</h1>
          <p className="text-muted-foreground">
            Track your favorite stocks with real-time AI recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {/* Portfolio AI Insight */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 animate-pulse-glow">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Agent Portfolio Insight</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-positive" />
                <span>
                  <strong className="text-positive">Increase exposure</strong> to Infosys and HCL Tech — strong technical signals
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-negative" />
                <span>
                  <strong className="text-negative">Reduce exposure</strong> to Wipro — deteriorating sentiment and weak momentum
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-warning" />
                <span>
                  <strong className="text-warning">Maintain position</strong> in TCS and Tech Mahindra — await clearer signals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-center">Recommendation</TableHead>
              <TableHead className="text-center">Confidence</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead className="text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlist.map((stock, index) => {
              const signal = signalConfig[stock.recommendation];
              const SignalIcon = signal.icon;
              const isPositive = stock.change >= 0;

              return (
                <TableRow
                  key={stock.id}
                  className="hover:bg-secondary/30 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFromWatchlist(stock.id)}
                    >
                      <Star className="h-4 w-4 fill-warning text-warning" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {stock.ticker}
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
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {stock.alerts.map((alert, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className={cn(
                            "text-[10px] gap-1",
                            alert.includes("Risk") || alert.includes("weakened")
                              ? "text-negative border-negative/30"
                              : alert.includes("strengthened")
                              ? "text-positive border-positive/30"
                              : "text-warning border-warning/30"
                          )}
                        >
                          <Bell className="h-2.5 w-2.5" />
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {stock.lastUpdated}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Watchlist;
