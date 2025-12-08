import { useState, useCallback } from "react";

export interface GeneratedFormats {
  "1:1"?: string;
  "4:5"?: string;
  "9:16"?: string;
  "16:9"?: string;
}

export interface HistoryEntry {
  id: string;
  thumbnail: string;
  formats: string[];
  generatedFormats: GeneratedFormats;
  generatedAt: Date;
}

export function useLocalHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addEntry = useCallback((thumbnail: string, formats: string[], generatedFormats: GeneratedFormats) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      thumbnail,
      formats,
      generatedFormats,
      generatedAt: new Date(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, 10)); // Keep last 10
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addEntry, clearHistory };
}
