import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

type Sentiment = "positive" | "neutral" | "negative";

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  publishedAt: string;
  sentiment: Sentiment;
}

interface NewsSentimentProps {
  className?: string;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    headline: "Infosys announces major AI partnership with global tech leader",
    source: "Economic Times",
    publishedAt: "2 hours ago",
    sentiment: "positive",
  },
  {
    id: "2",
    headline: "Q3 results exceed analyst expectations with 12% revenue growth",
    source: "Moneycontrol",
    publishedAt: "4 hours ago",
    sentiment: "positive",
  },
  {
    id: "3",
    headline: "IT sector faces headwinds from global economic uncertainty",
    source: "Business Standard",
    publishedAt: "6 hours ago",
    sentiment: "negative",
  },
  {
    id: "4",
    headline: "Company maintains stable guidance for FY25",
    source: "LiveMint",
    publishedAt: "8 hours ago",
    sentiment: "neutral",
  },
  {
    id: "5",
    headline: "New client wins in BFSI sector worth $200M",
    source: "Reuters",
    publishedAt: "12 hours ago",
    sentiment: "positive",
  },
];

export const NewsSentiment = ({ className }: NewsSentimentProps) => {
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

  // Calculate overall sentiment
  const sentimentCounts = mockNews.reduce(
    (acc, item) => {
      acc[item.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );
  
  const totalNews = mockNews.length;
  const sentimentScore = (
    (sentimentCounts.positive - sentimentCounts.negative) / totalNews
  ).toFixed(2);
  
  const overallSentiment: Sentiment =
    parseFloat(sentimentScore) > 0.2
      ? "positive"
      : parseFloat(sentimentScore) < -0.2
      ? "negative"
      : "neutral";

  return (
    <div className={cn("glass-card p-6", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">News & Sentiment Analysis</h3>
        <p className="text-sm text-muted-foreground">Real-time market sentiment tracking</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* News Feed */}
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {mockNews.map((item, index) => {
              const config = sentimentConfig[item.sentiment];
              const Icon = config.icon;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "group cursor-pointer rounded-lg border p-4 transition-all hover:bg-secondary/50",
                    config.border
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium leading-tight group-hover:text-primary transition-colors">
                        {item.headline}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.publishedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn("gap-1", config.color, config.bg, config.border)}
                      >
                        <Icon className="h-3 w-3" />
                        {item.sentiment}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Sentiment Summary */}
        <div className="space-y-4">
          {/* Overall Score */}
          <div
            className={cn(
              "rounded-lg border p-4 text-center",
              sentimentConfig[overallSentiment].border,
              sentimentConfig[overallSentiment].bg
            )}
          >
            <p className="text-sm text-muted-foreground mb-1">Overall Sentiment Score</p>
            <p
              className={cn(
                "font-mono text-4xl font-bold",
                sentimentConfig[overallSentiment].color
              )}
            >
              {sentimentScore > "0" ? "+" : ""}
              {sentimentScore}
            </p>
            <Badge
              variant="outline"
              className={cn(
                "mt-2 capitalize",
                sentimentConfig[overallSentiment].color,
                sentimentConfig[overallSentiment].bg
              )}
            >
              {overallSentiment}
            </Badge>
          </div>

          {/* Sentiment Breakdown */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Sentiment Breakdown</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-positive">Positive</span>
                <span className="font-mono">{sentimentCounts.positive}</span>
              </div>
              <Progress
                value={(sentimentCounts.positive / totalNews) * 100}
                className="h-2 bg-secondary [&>div]:bg-positive"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-warning">Neutral</span>
                <span className="font-mono">{sentimentCounts.neutral}</span>
              </div>
              <Progress
                value={(sentimentCounts.neutral / totalNews) * 100}
                className="h-2 bg-secondary [&>div]:bg-warning"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-negative">Negative</span>
                <span className="font-mono">{sentimentCounts.negative}</span>
              </div>
              <Progress
                value={(sentimentCounts.negative / totalNews) * 100}
                className="h-2 bg-secondary [&>div]:bg-negative"
              />
            </div>
          </div>

          {/* Impact Summary */}
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Sentiment Impact:</strong> Positive news
              flow supports the bullish recommendation. Recent AI partnership announcement
              is particularly significant for long-term growth prospects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
