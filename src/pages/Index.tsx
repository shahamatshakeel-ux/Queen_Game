import { motion } from "framer-motion";
import { Crown, Gamepad2, Trophy, Zap, Target, Sparkles, Star, Shield, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-14 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-neon-pink/5 to-neon-blue/8" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-neon-pink to-neon-blue" />
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            style={{ left: `${15 + i * 18}%`, top: `${30 + i * 10}%` }}
          />
        ))}
        <div className="relative z-10">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Crown className="w-20 h-20 text-accent mx-auto mb-4 drop-shadow-[0_0_25px_hsl(var(--accent)/0.5)]" fill="currentColor" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-primary mb-3">
            Queen Game
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
            Master the art of the N-Queens puzzle. Place queens so none can attack each other.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/play" className="gradient-button px-8 py-3.5 inline-flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5" />
              Play Now
            </Link>
            {!user && (
              <Link to="/signup" className="neon-button px-8 py-3.5 inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Join Free
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "Quick Play", desc: "Choose difficulty & board size", to: "/play", icon: Gamepad2, color: "from-primary/20 to-neon-pink/10", iconColor: "text-primary" },
          { title: "Leaderboard", desc: "Compete with top players", to: "/leaderboard", icon: Trophy, color: "from-accent/20 to-neon-orange/10", iconColor: "text-accent" },
          { title: "Your Profile", desc: "Track your progress & stats", to: "/profile", icon: Target, color: "from-neon-blue/20 to-neon-green/10", iconColor: "text-neon-blue" },
        ].map(({ title, desc, to, icon: Icon, color, iconColor }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Link to={to} className="glass-card-hover p-6 block group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <Icon className={`w-10 h-10 ${iconColor} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-display text-lg font-bold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* How to play */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-6 md:p-8">
        <h2 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
          <Star className="w-5 h-5 text-accent" fill="currentColor" />
          How to Play
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Choose Difficulty", desc: "Easy (2 hints), Medium (1 hint), or Hard (1 hint)", icon: Shield },
            { step: "2", title: "Place Queens", desc: "Click cells to place queens — avoid rows, columns & diagonals", icon: Crown },
            { step: "3", title: "Use Hints Wisely", desc: "Limited hints per game — fewer hints = higher score!", icon: Lightbulb },
          ].map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-button flex items-center justify-center text-sm font-bold shrink-0">
                {step}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5 text-primary" /> {title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
