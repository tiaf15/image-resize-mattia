import { useState, useCallback, useEffect } from "react";

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

interface StoredEntry {
  id: string;
  thumbnail: string;
  formats: string[];
  generatedFormats: GeneratedFormats;
  generatedAt: string; // ISO string for storage
}

const STORAGE_KEY = "adsimagepack_history";
const MAX_ENTRIES = 10;

export function useLocalHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredEntry[] = JSON.parse(stored);
        const entries: HistoryEntry[] = parsed.map((entry) => ({
          ...entry,
          generatedAt: new Date(entry.generatedAt),
        }));
        setHistory(entries);
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      const toStore: StoredEntry[] = history.map((entry) => ({
        ...entry,
        generatedAt: entry.generatedAt.toISOString(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.error("Failed to save history to localStorage:", error);
    }
  }, [history, isLoaded]);

  const addEntry = useCallback((thumbnail: string, formats: string[], generatedFormats: GeneratedFormats) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      thumbnail,
      formats,
      generatedFormats,
      generatedAt: new Date(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear history from localStorage:", error);
    }
  }, []);

  return { history, addEntry, clearHistory, isLoaded };
}
