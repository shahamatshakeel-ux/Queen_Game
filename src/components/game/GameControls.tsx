import { motion } from "framer-motion";
import { Undo2, Redo2, RotateCcw, Lightbulb, Crown, Sparkles, Timer, Zap, Target } from "lucide-react";
import type { Difficulty } from "@/hooks/useQueenGame";

interface GameControlsProps {
  size: number;
  moves: number;
  queensPlaced: number;
  conflicts: number;
  isComplete: boolean;
  elapsedTime: number;
  canUndo: boolean;
  canRedo: boolean;
  hintsRemaining: number;
  hintsUsed: number;
  difficulty: Difficulty;
  availableSizes: number[];
  onUndo: () => void;
  onRedo: () => void;
  onReset: (difficulty?: Difficulty, size?: number) => void;
  onHint: () => void;
}

const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
};

const DIFFICULTIES: { key: Difficulty; label: string; emoji: string; color: string }[] = [
  { key: "easy", label: "Easy", emoji: "🌱", color: "from-emerald-500 to-green-500" },
  { key: "medium", label: "Medium", emoji: "⚡", color: "from-amber-500 to-orange-500" },
  { key: "hard", label: "Hard", emoji: "🔥", color: "from-red-500 to-pink-500" },
];

const GameControls = ({
  size, moves, queensPlaced, conflicts, isComplete, elapsedTime,
  canUndo, canRedo, hintsRemaining, hintsUsed, difficulty, availableSizes,
  onUndo, onRedo, onReset, onHint,
}: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      {/* Stats */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-4 space-y-3">
        <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent" /> Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <StatItem label="Queens" value={`${queensPlaced}/${size}`} icon={<Crown className="w-3.5 h-3.5 text-primary" />} />
          <StatItem label="Moves" value={String(moves)} icon={<Target className="w-3.5 h-3.5 text-neon-blue" />} />
          <StatItem label="Time" value={formatTime(elapsedTime)} icon={<Timer className="w-3.5 h-3.5 text-neon-pink" />} />
          <StatItem label="Conflicts" value={String(conflicts)} icon={<Zap className={`w-3.5 h-3.5 ${conflicts > 0 ? "text-destructive" : "text-neon-green"}`} />} />
        </div>
      </motion.div>

      {/* Complete banner */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-card p-5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-neon-pink/20 to-accent/20 animate-gradient-shift" />
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Crown className="w-12 h-12 text-accent mx-auto mb-2 drop-shadow-[0_0_20px_hsl(var(--accent)/0.6)]" fill="currentColor" />
            </motion.div>
            <p className="font-display text-primary text-2xl neon-text">🎉 Solved!</p>
            <p className="text-sm text-muted-foreground mt-1">{moves} moves · {formatTime(elapsedTime)} · {hintsUsed} hints</p>
          </div>
        </motion.div>
      )}

      {/* Difficulty */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="glass-card p-4">
        <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">Difficulty</h3>
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.key}
              onClick={() => onReset(d.key)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-display font-bold transition-all ${
                d.key === difficulty
                  ? `bg-gradient-to-r ${d.color} text-white shadow-lg`
                  : "bg-secondary/80 text-secondary-foreground hover:bg-secondary border border-border"
              }`}
            >
              <span className="block text-base">{d.emoji}</span>
              {d.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Board Size */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
        <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">Board Size</h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((s) => (
            <button
              key={s}
              onClick={() => onReset(undefined, s)}
              className={`px-3 py-1.5 rounded-xl text-sm font-mono font-bold transition-all ${
                s === size
                  ? "gradient-button"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              {s}×{s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4 space-y-2">
        <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton icon={Undo2} label="Undo" onClick={onUndo} disabled={!canUndo} />
          <ActionButton icon={Redo2} label="Redo" onClick={onRedo} disabled={!canRedo} />
          <ActionButton icon={RotateCcw} label="Reset" onClick={() => onReset()} />
          <ActionButton
            icon={Lightbulb}
            label={`Hint (${hintsRemaining})`}
            onClick={onHint}
            disabled={hintsRemaining <= 0 || isComplete}
            highlight={hintsRemaining > 0}
          />
        </div>
      </motion.div>
    </div>
  );
};

const StatItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="text-center p-2.5 rounded-xl bg-secondary/50 border border-border/50">
    <div className="flex items-center justify-center gap-1 mb-1">{icon}<p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p></div>
    <p className="font-mono text-xl font-bold text-foreground">{value}</p>
  </div>
);

const ActionButton = ({ icon: Icon, label, onClick, disabled, highlight }: {
  icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void; disabled?: boolean; highlight?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
      highlight && !disabled
        ? "bg-accent/15 text-accent border-accent/30 hover:bg-accent/25"
        : "bg-secondary/80 text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 border-border"
    } disabled:opacity-30 disabled:cursor-not-allowed`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export default GameControls;
