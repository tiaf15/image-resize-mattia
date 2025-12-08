import { HistoryEntry } from "@/hooks/useLocalHistory";
import { Clock, Trash2, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentGenerationsProps {
  history: HistoryEntry[];
  onClear: () => void;
  onSelect: (entry: HistoryEntry) => void;
}

export default function RecentGenerations({ history, onClear, onSelect }: RecentGenerationsProps) {
  if (history.length === 0) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Recent Generations</h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Session only
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="group relative bg-muted/50 rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all text-left cursor-pointer"
          >
            <div className="aspect-square relative">
              <img
                src={entry.thumbnail}
                alt="Generated pack"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-2">
              <div className="flex flex-wrap gap-1 mb-1">
                {entry.formats.map((format) => (
                  <span
                    key={format}
                    className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded"
                  >
                    {format}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{formatTime(entry.generatedAt)}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        🔒 This history is stored locally in your browser session and will be cleared when you close the tab. Click any item to view again.
      </p>
    </div>
  );
}
