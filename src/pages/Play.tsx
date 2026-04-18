import { useQueenGame, Difficulty } from "@/hooks/useQueenGame";
import GameBoard from "@/components/game/GameBoard";
import GameControls from "@/components/game/GameControls";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import Confetti from "@/components/game/Confetti";
import { useQueryClient } from "@tanstack/react-query";

const PlayPage = () => {
  const {
    gameState, toggleQueen, undo, redo, resetGame, useHint,
    queensPlaced, elapsedTime, canUndo, canRedo, hintsRemaining, availableSizes,
  } = useQueenGame("medium");

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const savedRef = useRef(false);
  const [liveTime, setLiveTime] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Live timer
  useEffect(() => {
    if (!gameState.startTime || gameState.isComplete) {
      if (gameState.isComplete && gameState.endTime && gameState.startTime) {
        setLiveTime(gameState.endTime - gameState.startTime);
      }
      return;
    }
    const interval = setInterval(() => setLiveTime(Date.now() - gameState.startTime!), 100);
    return () => clearInterval(interval);
  }, [gameState.startTime, gameState.isComplete, gameState.endTime]);

  // Save game on completion
  useEffect(() => {
    if (gameState.isComplete && user && !savedRef.current) {
      savedRef.current = true;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      const rawTime = gameState.endTime && gameState.startTime ? gameState.endTime - gameState.startTime : 0;
      // Guard: server requires time_ms >= 100. If somehow lower, clamp to a sane minimum.
      const timeMs = Math.max(100, rawTime);

      supabase.functions.invoke("submit-game-result", {
        body: {
          board_size: gameState.size,
          moves: gameState.moves,
          time_ms: timeMs,
          completed: true,
          difficulty: gameState.difficulty,
          hints_used: gameState.hintsUsed,
        },
      }).then(({ data, error }) => {
        if (error) {
          console.error("Failed to save game:", error);
          toast({ title: "Could not save game", description: error.message, variant: "destructive" });
          savedRef.current = false; // allow retry
          return;
        }
        toast({ title: "🎉 Game saved!", description: `Score: ${data?.score ?? ""}` });
        // Refresh leaderboard, history, and profile stats so UI updates immediately
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
        queryClient.invalidateQueries({ queryKey: ["game-history", user.id] });
        queryClient.invalidateQueries({ queryKey: ["user-stats", user.id] });
      });
    }
  }, [gameState.isComplete, user, gameState]);

  useEffect(() => {
    if (!gameState.isComplete) savedRef.current = false;
  }, [gameState.isComplete]);

  return (
    <div className="flex flex-col items-center w-full">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-2 tracking-wider">
        N-Queens Challenge
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Place {gameState.size} queens so none can attack each other
      </p>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 w-full">
        <GameBoard
          board={gameState.board}
          conflicts={gameState.conflicts}
          onCellClick={toggleQueen}
          disabled={gameState.isComplete}
        />
        <GameControls
          size={gameState.size}
          moves={gameState.moves}
          queensPlaced={queensPlaced}
          conflicts={gameState.conflicts.length}
          isComplete={gameState.isComplete}
          elapsedTime={liveTime}
          canUndo={canUndo}
          canRedo={canRedo}
          hintsRemaining={hintsRemaining}
          hintsUsed={gameState.hintsUsed}
          difficulty={gameState.difficulty}
          availableSizes={availableSizes}
          onUndo={undo}
          onRedo={redo}
          onReset={resetGame}
          onHint={useHint}
        />
      </div>
    </div>
  );
};

export default PlayPage;
