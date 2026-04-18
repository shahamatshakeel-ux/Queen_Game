import { motion } from "framer-motion";
import { User, Trophy, Gamepad2, Clock, Target, Crown, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      return data;
    },
    enabled: !!user,
  });

  const { data: stats } = useQuery({
    queryKey: ["user-stats", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from("game_history").select("*").eq("user_id", user.id);
      if (!data || data.length === 0) return { totalGames: 0, bestScore: 0, bestTime: 0, winRate: 0 };
      const wins = data.filter((g) => g.completed);
      return {
        totalGames: data.length,
        bestScore: Math.max(...data.map((g) => g.score)),
        bestTime: wins.length > 0 ? Math.min(...wins.map((g) => g.time_ms)) : 0,
        winRate: Math.round((wins.length / data.length) * 100),
      };
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-primary">Profile</h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-12 text-center">
          <Crown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-4">Log in to track your progress and stats</p>
          <Link to="/login" className="gradient-button px-6 py-3 inline-flex items-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  const formatTime = (ms: number) => {
    if (!ms) return "—";
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const statItems = [
    { label: "Total Games", value: String(stats?.totalGames ?? 0), icon: Gamepad2, color: "text-primary" },
    { label: "Best Score", value: String(stats?.bestScore ?? "—"), icon: Trophy, color: "text-accent" },
    { label: "Best Time", value: formatTime(stats?.bestTime ?? 0), icon: Clock, color: "text-neon-blue" },
    { label: "Win Rate", value: `${stats?.winRate ?? 0}%`, icon: Target, color: "text-neon-green" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-primary">Profile</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 text-center md:col-span-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-neon-pink mx-auto mb-4 flex items-center justify-center">
              <Crown className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <h2 className="font-display text-xl font-bold">{profile?.display_name || "Player"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 md:col-span-2">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-6">
            {statItems.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-card flex items-center justify-center border border-border`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="font-mono text-lg font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
