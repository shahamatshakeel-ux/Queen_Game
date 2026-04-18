import { motion } from "framer-motion";
import { History, Crown, Clock, Lightbulb, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const diffBadge: Record<string, string> = {
  easy: "bg-emerald-500/20 text-emerald-400",
  medium: "bg-amber-500/20 text-amber-400",
  hard: "bg-red-500/20 text-red-400",
};

const HistoryPage = () => {
  const { user } = useAuth();

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["game-history", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("game_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      return data ?? [];
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-primary">Game History</h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-12 text-center">
          <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-4">Log in to see your game history</p>
          <Link to="/login" className="gradient-button px-6 py-3 inline-flex items-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-primary flex items-center gap-2">
        <History className="w-7 h-7 text-neon-blue" /> Game History
      </h1>

      {isLoading ? (
        <div className="glass-card p-12 text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full mx-auto" />
        </div>
      ) : games.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-12 text-center">
          <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">No Games Yet</h2>
          <p className="text-muted-foreground">Play your first game to see your history here.</p>
        </motion.div>
      ) : (
        <div className="grid gap-3">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card-hover p-4 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${game.completed ? "bg-neon-green/20" : "bg-destructive/20"}`}>
                {game.completed ? <Crown className="w-5 h-5 text-neon-green" fill="currentColor" /> : <Crown className="w-5 h-5 text-destructive" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-bold">{game.board_size}×{game.board_size}</span>
                  <span className={`color-chip ${diffBadge[(game as any).difficulty] || diffBadge.medium}`}>
                    {(game as any).difficulty || "medium"}
                  </span>
                  <span className={`color-chip ${game.completed ? "bg-neon-green/20 text-neon-green" : "bg-destructive/20 text-destructive"}`}>
                    {game.completed ? "Solved" : "Incomplete"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{new Date(game.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center hidden sm:block">
                  <p className="font-mono font-bold text-accent">{game.score}</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold flex items-center gap-1"><Lightbulb className="w-3 h-3 text-accent" />{(game as any).hints_used ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Hints</p>
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-neon-blue flex items-center gap-1"><Clock className="w-3 h-3" />{formatTime(game.time_ms)}</p>
                  <p className="text-xs text-muted-foreground">Time</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
