import { useState, useCallback, useMemo } from "react";

export type Difficulty = "easy" | "medium" | "hard";

export interface GameState {
  board: boolean[][];
  size: number;
  moves: number;
  startTime: number | null;
  endTime: number | null;
  conflicts: [number, number][];
  isComplete: boolean;
  history: boolean[][][];
  historyIndex: number;
  difficulty: Difficulty;
  hintsUsed: number;
  maxHints: number;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { sizes: number[]; defaultSize: number; hints: number }> = {
  easy: { sizes: [4, 5, 6], defaultSize: 5, hints: 2 },
  medium: { sizes: [6, 7, 8], defaultSize: 8, hints: 1 },
  hard: { sizes: [8, 10, 12], defaultSize: 10, hints: 1 },
};

const createEmptyBoard = (size: number): boolean[][] =>
  Array.from({ length: size }, () => Array(size).fill(false));

const findConflicts = (board: boolean[][]): [number, number][] => {
  const size = board.length;
  const conflicts: [number, number][] = [];
  const queens: [number, number][] = [];

  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (board[r][c]) queens.push([r, c]);

  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      const [r1, c1] = queens[i];
      const [r2, c2] = queens[j];
      if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
        if (!conflicts.some(([r, c]) => r === r1 && c === c1)) conflicts.push([r1, c1]);
        if (!conflicts.some(([r, c]) => r === r2 && c === c2)) conflicts.push([r2, c2]);
      }
    }
  }
  return conflicts;
};

const countQueens = (board: boolean[][]): number =>
  board.flat().filter(Boolean).length;

export const useQueenGame = (initialDifficulty: Difficulty = "medium") => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const config = DIFFICULTY_CONFIG[initialDifficulty];
    const board = createEmptyBoard(config.defaultSize);
    return {
      board,
      size: config.defaultSize,
      moves: 0,
      startTime: null,
      endTime: null,
      conflicts: [],
      isComplete: false,
      history: [board.map((r) => [...r])],
      historyIndex: 0,
      difficulty: initialDifficulty,
      hintsUsed: 0,
      maxHints: config.hints,
    };
  });

  const toggleQueen = useCallback((row: number, col: number) => {
    setGameState((prev) => {
      if (prev.isComplete) return prev;
      const newBoard = prev.board.map((r) => [...r]);
      newBoard[row][col] = !newBoard[row][col];
      const conflicts = findConflicts(newBoard);
      const queens = countQueens(newBoard);
      const isComplete = queens === prev.size && conflicts.length === 0;
      const newHistory = [
        ...prev.history.slice(0, prev.historyIndex + 1),
        newBoard.map((r) => [...r]),
      ];
      return {
        ...prev,
        board: newBoard,
        moves: prev.moves + 1,
        startTime: prev.startTime ?? Date.now(),
        endTime: isComplete ? Date.now() : null,
        conflicts,
        isComplete,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setGameState((prev) => {
      if (prev.historyIndex <= 0) return prev;
      const newIndex = prev.historyIndex - 1;
      const board = prev.history[newIndex].map((r) => [...r]);
      return { ...prev, board, historyIndex: newIndex, conflicts: findConflicts(board), isComplete: false, endTime: null };
    });
  }, []);

  const redo = useCallback(() => {
    setGameState((prev) => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      const newIndex = prev.historyIndex + 1;
      const board = prev.history[newIndex].map((r) => [...r]);
      const conflicts = findConflicts(board);
      const queens = countQueens(board);
      return { ...prev, board, historyIndex: newIndex, conflicts, isComplete: queens === prev.size && conflicts.length === 0 };
    });
  }, []);

  const resetGame = useCallback((newDifficulty?: Difficulty, size?: number) => {
    const diff = newDifficulty ?? gameState.difficulty;
    const config = DIFFICULTY_CONFIG[diff];
    const s = size ?? config.defaultSize;
    const board = createEmptyBoard(s);
    setGameState({
      board,
      size: s,
      moves: 0,
      startTime: null,
      endTime: null,
      conflicts: [],
      isComplete: false,
      history: [board.map((r) => [...r])],
      historyIndex: 0,
      difficulty: diff,
      hintsUsed: 0,
      maxHints: config.hints,
    });
  }, [gameState.difficulty]);

  const useHint = useCallback(() => {
    setGameState((prev) => {
      if (prev.isComplete || prev.hintsUsed >= prev.maxHints) return prev;

      // Find the next empty row that needs a queen
      const queens = countQueens(prev.board);
      const targetRow = queens;
      if (targetRow >= prev.size) return prev;

      // Find a valid column using backtracking from current state
      for (let col = 0; col < prev.size; col++) {
        const testBoard = prev.board.map((r) => [...r]);
        testBoard[targetRow][col] = true;
        const testConflicts = findConflicts(testBoard);
        const hasNewConflict = testConflicts.some(([r, c]) => r === targetRow && c === col);
        if (!hasNewConflict) {
          const conflicts = findConflicts(testBoard);
          const complete = countQueens(testBoard) === prev.size && conflicts.length === 0;
          const newHistory = [...prev.history.slice(0, prev.historyIndex + 1), testBoard.map((r) => [...r])];
          return {
            ...prev,
            board: testBoard,
            moves: prev.moves + 1,
            startTime: prev.startTime ?? Date.now(),
            endTime: complete ? Date.now() : null,
            conflicts,
            isComplete: complete,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            hintsUsed: prev.hintsUsed + 1,
          };
        }
      }
      return prev;
    });
  }, []);

  const queensPlaced = useMemo(() => countQueens(gameState.board), [gameState.board]);

  const elapsedTime = useMemo(() => {
    if (!gameState.startTime) return 0;
    if (gameState.endTime) return gameState.endTime - gameState.startTime;
    return Date.now() - gameState.startTime;
  }, [gameState.startTime, gameState.endTime]);

  const canUndo = gameState.historyIndex > 0;
  const canRedo = gameState.historyIndex < gameState.history.length - 1;
  const hintsRemaining = gameState.maxHints - gameState.hintsUsed;
  const availableSizes = DIFFICULTY_CONFIG[gameState.difficulty].sizes;

  return {
    gameState,
    toggleQueen,
    undo,
    redo,
    resetGame,
    useHint,
    queensPlaced,
    elapsedTime,
    canUndo,
    canRedo,
    hintsRemaining,
    availableSizes,
  };
};
