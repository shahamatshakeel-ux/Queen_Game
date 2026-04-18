import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";

interface GameBoardProps {
  board: boolean[][];
  conflicts: [number, number][];
  onCellClick: (row: number, col: number) => void;
  disabled?: boolean;
}

const GameBoard = ({ board, conflicts, onCellClick, disabled }: GameBoardProps) => {
  const size = board.length;

  const isConflict = (row: number, col: number) =>
    conflicts.some(([r, c]) => r === row && c === col);

  const getCellColor = (row: number, col: number) => {
    const colors = [
      "from-violet-500/10 to-purple-600/10",
      "from-blue-500/10 to-cyan-500/10",
      "from-pink-500/10 to-rose-500/10",
      "from-amber-500/10 to-yellow-500/10",
      "from-emerald-500/10 to-teal-500/10",
      "from-indigo-500/10 to-blue-500/10",
    ];
    return colors[(row + col) % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/15 via-neon-pink/8 to-neon-blue/15 blur-3xl pointer-events-none animate-pulse-neon" />
      
      <div className="relative glass-card p-4 md:p-6 inline-block" style={{ 
        borderColor: "hsl(var(--primary) / 0.3)", 
        boxShadow: "0 0 30px hsl(var(--primary) / 0.15), 0 0 60px hsl(var(--neon-pink) / 0.08), inset 0 1px 0 hsl(var(--foreground) / 0.1)" 
      }}>
        {/* Column labels */}
        <div className="grid gap-0 mb-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: `min(${size * 52}px, 82vw)` }}>
          {Array.from({ length: size }, (_, i) => (
            <div key={i} className="text-center text-[10px] font-mono font-bold text-primary/60">
              {String.fromCharCode(65 + i)}
            </div>
          ))}
        </div>
        <div className="flex">
          <div
            className="grid gap-0 rounded-2xl overflow-hidden ring-1 ring-primary/20"
            style={{
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              width: `min(${size * 52}px, 82vw)`,
              height: `min(${size * 52}px, 82vw)`,
              boxShadow: "0 0 40px hsl(var(--primary) / 0.06), inset 0 0 60px hsl(var(--background) / 0.3)",
            }}
          >
            {board.map((row, r) =>
              row.map((hasQueen, c) => {
                const conflict = isConflict(r, c);
                const dark = (r + c) % 2 === 1;
                return (
                  <motion.button
                    key={`${r}-${c}`}
                    onClick={() => !disabled && onCellClick(r, c)}
                    whileHover={!disabled ? { scale: 1.08, zIndex: 10 } : {}}
                    whileTap={!disabled ? { scale: 0.95 } : {}}
                    className={`queen-cell ${dark ? "dark-square" : ""} ${hasQueen ? "has-queen" : ""} ${conflict ? "conflict" : ""} relative group`}
                    disabled={disabled}
                    style={{ aspectRatio: "1" }}
                  >
                    {/* Colorful cell gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCellColor(r, c)} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                    
                    <AnimatePresence>
                      {hasQueen && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180, y: -20 }}
                          animate={{ scale: 1, rotate: 0, y: 0 }}
                          exit={{ scale: 0, rotate: 180, y: 20 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="relative z-10"
                        >
                          <Crown
                            className={`w-5 h-5 md:w-7 md:h-7 ${
                              conflict
                                ? "text-destructive drop-shadow-[0_0_16px_hsl(var(--destructive)/0.9)]"
                                : "text-accent drop-shadow-[0_0_16px_hsl(var(--accent)/0.8)]"
                            }`}
                            fill="currentColor"
                          />
                          {/* Queen glow ring */}
                          {!conflict && (
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{ boxShadow: "0 0 20px hsl(var(--accent) / 0.4)" }}
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })
            )}
          </div>
          {/* Row labels */}
          <div className="flex flex-col ml-2" style={{ height: `min(${size * 52}px, 82vw)` }}>
            {Array.from({ length: size }, (_, i) => (
              <div key={i} className="flex-1 flex items-center text-[10px] font-mono font-bold text-primary/60">{i + 1}</div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameBoard;
