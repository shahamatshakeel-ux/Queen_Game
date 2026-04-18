import { motion } from "framer-motion";
import { Trophy, Crown, Lightbulb, Timer, Gamepad2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const formatTime = (ms: number | null) => {
  if (!ms) return "—";
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const LeaderboardPage = () => {
  const { data: players = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data } = await supabase.from("leaderboard").select("*").order("best_score", { ascending: false }).limit(20);
      return data ?? [];
    },
  });

  const podiumConfig = [
    { idx: 1, label: "2nd", color: "from-slate-400/30 to-slate-500/10 border-slate-400/40", iconColor: "text-slate-300", height: "h-24" },
    { idx: 0, label: "1st", color: "from-accent/30 to-amber-500/10 border-accent/50", iconColor: "text-accent", height: "h-32" },
    { idx: 2, label: "3rd", color: "from-amber-700/20 to-orange-500/10 border-amber-600/30", iconColor: "text-amber-600", height: "h-20" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-primary flex items-center gap-2">
        <Trophy className="w-7 h-7 text-accent" /> Leaderboard
      </h1>

      {isLoading ? (
        <div className="glass-card p-12 text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full mx-auto" />
        </div>
      ) : players.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">No Players Yet</h2>
          <p className="text-muted-foreground">Be the first to complete a game!</p>
        </motion.div>
      ) : (
        <>
          {/* Podium */}
          {players.length >= 3 && (
            <div className="flex items-end justify-center gap-3 max-w-lg mx-auto pt-4">
              {podiumConfig.map(({ idx, color, iconColor, height }) => {
                const p = players[idx];
                if (!p) return null;
                const isFirst = idx === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className={`glass-card p-4 text-center relative overflow-hidden flex-1 ${height} flex flex-col justify-end ${isFirst ? "neon-border" : ""}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${color}`} />
                    <div className="relative z-10">
                      <Crown className={`w-6 h-6 mx-auto mb-1 ${iconColor}`} fill="currentColor" />
                      <p className="font-bold text-sm truncate">{p.display_name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{(p.best_score as number)?.toLocaleString()}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider text-muted-foreground">Rank</th>
                    <th className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider text-muted-foreground">Player</th>
                    <th className="px-4 py-3 text-right text-xs font-display uppercase tracking-wider text-muted-foreground">Score</th>
                    <th className="px-4 py-3 text-right text-xs font-display uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                      <Timer className="w-3 h-3 inline mr-1" />Time
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-display uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                      <Lightbulb className="w-3 h-3 inline mr-1" />Hints
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-display uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                      <Gamepad2 className="w-3 h-3 inline mr-1" />Games
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.03 }}
                      className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-primary">#{i + 1}</td>
                      <td className="px-4 py-3 font-bold">{p.display_name}</td>
                      <td className="px-4 py-3 text-right font-mono text-accent">{((p.best_score as number) ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground hidden sm:table-cell">{formatTime(p.best_time_ms)}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground hidden sm:table-cell">{(p as any).fewest_hints ?? "—"}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground hidden md:table-cell">{p.total_games}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
