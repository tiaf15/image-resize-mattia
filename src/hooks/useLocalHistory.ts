import { useState, useCallback } from "react";

export interface HistoryEntry {
  id: string;
  thumbnail: string;
  formats: string[];
  generatedAt: Date;
}

export function useLocalHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addEntry = useCallback((thumbnail: string, formats: string[]) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      thumbnail,
      formats,
      generatedAt: new Date(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, 10)); // Keep last 10
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addEntry, clearHistory };
}
