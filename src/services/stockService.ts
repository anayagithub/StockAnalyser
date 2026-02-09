import { supabase } from "@/lib/supabase";

export interface MarketSnapshot {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  MA_20: number;
  MA_50: number;
  RSI_14: number;
  Ticker: string;
}

export const stockService = {
  async getLatestSnapshot(ticker: string): Promise<MarketSnapshot | null> {
    const { data, error } = await supabase
      .from("market_intelligence")
      .select("*")
      .eq("Ticker", ticker)
      .order("Date", { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as MarketSnapshot;
  },

  async getHistory(ticker: string, limit = 100): Promise<MarketSnapshot[]> {
    const { data, error } = await supabase
      .from("market_intelligence")
      .select("*")
      .eq("Ticker", ticker)
      .order("Date", { ascending: true })
      .limit(limit);

    return (data as MarketSnapshot[]) || [];
  }
};


