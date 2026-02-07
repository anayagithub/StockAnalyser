import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import StockAnalysis from "@/pages/StockAnalysis";
import CompareStocks from "@/pages/CompareStocks";
import Watchlist from "@/pages/Watchlist";
import AgentReasoning from "@/pages/AgentReasoning";
import NewsSentimentPage from "@/pages/NewsSentimentPage";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<StockAnalysis />} />
            <Route path="/compare" element={<CompareStocks />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/reasoning" element={<AgentReasoning />} />
            <Route path="/news" element={<NewsSentimentPage />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
