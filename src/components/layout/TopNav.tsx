import { useState } from "react";
import { Search, Sun, Moon, ChevronDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const timeHorizons = ["1M", "6M", "1Y", "5Y"] as const;

interface TopNavProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const TopNav = ({ isDarkMode, onToggleTheme }: TopNavProps) => {
  const [selectedHorizon, setSelectedHorizon] = useState<typeof timeHorizons[number]>("1Y");
  const [searchQuery, setSearchQuery] = useState("");
  const isMarketOpen = true; // Mock - would be calculated from time

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-primary">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
            </div>
            <span className="hidden text-xl font-semibold tracking-tight sm:inline-block">
              <span className="text-gradient-primary">Agentic</span>
              <span className="text-foreground">Stock</span>
              <span className="ml-1 text-sm font-medium text-primary">AI</span>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mx-4 hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stocks (e.g., AAPL, Tesla...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border-border bg-secondary/50 pl-10 pr-4 text-sm transition-all placeholder:text-muted-foreground focus:bg-secondary focus:ring-2 focus:ring-primary/20"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Time Horizon Selector */}
          <div className="hidden items-center gap-1 rounded-lg border border-border bg-secondary/30 p-1 lg:flex">
            {timeHorizons.map((horizon) => (
              <button
                key={horizon}
                onClick={() => setSelectedHorizon(horizon)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedHorizon === horizon
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {horizon}
              </button>
            ))}
          </div>

          {/* Mobile Time Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm" className="h-9 gap-1 px-3">
                <Clock className="h-3.5 w-3.5" />
                {selectedHorizon}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeHorizons.map((horizon) => (
                <DropdownMenuItem
                  key={horizon}
                  onClick={() => setSelectedHorizon(horizon)}
                  className={selectedHorizon === horizon ? "bg-primary/10" : ""}
                >
                  {horizon}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Market Status */}
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2 sm:flex">
            <span
              className={`h-2 w-2 rounded-full ${
                isMarketOpen
                  ? "animate-pulse-glow bg-positive"
                  : "bg-muted-foreground"
              }`}
            />
            <span className="text-xs font-medium text-muted-foreground">
              {isMarketOpen ? "Market Open" : "Market Closed"}
            </span>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="h-9 w-9 rounded-lg"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-muted-foreground transition-all hover:text-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground transition-all hover:text-foreground" />
            )}
          </Button>

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border-2 border-border">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
