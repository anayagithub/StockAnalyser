import { ExternalLink, TrendingUp, TrendingDown, Minus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Sentiment = "positive" | "neutral" | "negative";

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  publishedAt: string;
  sentiment: Sentiment;
  relatedStocks: string[];
  impact: "high" | "medium" | "low";
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    headline: "Infosys announces strategic AI partnership with global tech leader",
    summary: "The partnership is expected to generate $500M in additional revenue over the next 3 years through joint AI solutions.",
    source: "Economic Times",
    publishedAt: "2 hours ago",
    sentiment: "positive",
    relatedStocks: ["INFY"],
    impact: "high",
  },
  {
    id: "2",
    headline: "IT sector Q3 results beat expectations across the board",
    summary: "Major IT companies reported double-digit revenue growth, surprising analysts who had predicted a slowdown.",
    source: "Moneycontrol",
    publishedAt: "4 hours ago",
    sentiment: "positive",
    relatedStocks: ["INFY", "TCS", "WIPRO", "HCLTECH"],
    impact: "high",
  },
  {
    id: "3",
    headline: "Global economic uncertainty creates headwinds for IT spending",
    summary: "Client budgets under pressure as enterprises prioritize cost optimization over digital transformation.",
    source: "Business Standard",
    publishedAt: "6 hours ago",
    sentiment: "negative",
    relatedStocks: ["INFY", "TCS", "WIPRO"],
    impact: "medium",
  },
  {
    id: "4",
    headline: "TCS maintains stable guidance for FY25",
    summary: "Management expresses confidence in deal pipeline despite macro headwinds, reaffirming full-year growth targets.",
    source: "LiveMint",
    publishedAt: "8 hours ago",
    sentiment: "neutral",
    relatedStocks: ["TCS"],
    impact: "medium",
  },
  {
    id: "5",
    headline: "Wipro faces management transition challenges",
    summary: "Leadership changes create uncertainty as new CEO outlines transformation strategy.",
    source: "Reuters",
    publishedAt: "12 hours ago",
    sentiment: "negative",
    relatedStocks: ["WIPRO"],
    impact: "high",
  },
  {
    id: "6",
    headline: "HCL Tech wins major BFSI deal worth $200M",
    summary: "Multi-year contract with leading US bank strengthens position in financial services vertical.",
    source: "Bloomberg",
    publishedAt: "1 day ago",
    sentiment: "positive",
    relatedStocks: ["HCLTECH"],
    impact: "high",
  },
];

const NewsSentimentPage = () => {
  const sentimentConfig = {
    positive: {
      color: "text-positive",
      bg: "bg-positive/10",
      border: "border-positive/30",
      icon: TrendingUp,
    },
    neutral: {
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/30",
      icon: Minus,
    },
    negative: {
      color: "text-negative",
      bg: "bg-negative/10",
      border: "border-negative/30",
      icon: TrendingDown,
    },
  };

  const impactConfig = {
    high: "text-negative",
    medium: "text-warning",
    low: "text-muted-foreground",
  };

  const sentimentCounts = mockNews.reduce(
    (acc, item) => {
      acc[item.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">News & Sentiment</h1>
          <p className="text-muted-foreground">
            Real-time market news with AI-powered sentiment analysis
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search news..." className="pl-9 w-60" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="glass-card p-4 col-span-1">
          <p className="text-sm text-muted-foreground mb-1">Overall Sentiment</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-positive">+0.40</span>
            <Badge className="signal-buy">Positive</Badge>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-positive">Positive</span>
            <span className="font-mono text-sm">{sentimentCounts.positive}</span>
          </div>
          <Progress value={(sentimentCounts.positive / mockNews.length) * 100} className="h-2 [&>div]:bg-positive" />
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-warning">Neutral</span>
            <span className="font-mono text-sm">{sentimentCounts.neutral}</span>
          </div>
          <Progress value={(sentimentCounts.neutral / mockNews.length) * 100} className="h-2 [&>div]:bg-warning" />
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-negative">Negative</span>
            <span className="font-mono text-sm">{sentimentCounts.negative}</span>
          </div>
          <Progress value={(sentimentCounts.negative / mockNews.length) * 100} className="h-2 [&>div]:bg-negative" />
        </div>
      </div>

      {/* News Feed */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="positive" className="text-positive">Positive</TabsTrigger>
          <TabsTrigger value="neutral" className="text-warning">Neutral</TabsTrigger>
          <TabsTrigger value="negative" className="text-negative">Negative</TabsTrigger>
        </TabsList>

        {["all", "positive", "neutral", "negative"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <ScrollArea className="h-[600px]">
              <div className="space-y-4 pr-4">
                {mockNews
                  .filter((item) => tab === "all" || item.sentiment === tab)
                  .map((item, index) => {
                    const config = sentimentConfig[item.sentiment];
                    const Icon = config.icon;
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "glass-card p-5 cursor-pointer transition-all hover:bg-secondary/50 animate-fade-in",
                          config.border
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className={cn("gap-1", config.color, config.bg)}
                              >
                                <Icon className="h-3 w-3" />
                                {item.sentiment}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={cn("text-[10px]", impactConfig[item.impact])}
                              >
                                {item.impact} impact
                              </Badge>
                              {item.relatedStocks.map((stock) => (
                                <Badge key={stock} variant="secondary" className="font-mono text-[10px]">
                                  {stock}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="font-semibold leading-tight hover:text-primary transition-colors">
                              {item.headline}
                            </h3>
                            <p className="text-sm text-muted-foreground">{item.summary}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{item.source}</span>
                              <span>•</span>
                              <span>{item.publishedAt}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default NewsSentimentPage;
