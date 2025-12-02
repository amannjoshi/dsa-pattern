"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronRight, Crown } from "lucide-react";

interface NQueensVisualizerProps {
  size?: number;
}

export default function NQueensVisualizer({ size = 4 }: NQueensVisualizerProps) {
  const [n, setN] = useState(size);
  const [board, setBoard] = useState<number[][]>([]);
  const [queens, setQueens] = useState<number[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [checking, setChecking] = useState<{row: number, col: number} | null>(null);
  const [attackedCells, setAttackedCells] = useState<Set<string>>(new Set());

  const initBoard = useCallback(() => {
    const newBoard = Array(n).fill(null).map(() => Array(n).fill(0));
    setBoard(newBoard);
    setQueens([]);
    setCurrentRow(0);
    setCurrentCol(0);
    setSolutions([]);
    setIsComplete(false);
    setIsPlaying(false);
    setChecking(null);
    setAttackedCells(new Set());
  }, [n]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  const isSafe = (row: number, col: number, currentQueens: number[]): boolean => {
    for (let i = 0; i < row; i++) {
      const qCol = currentQueens[i];
      // Same column
      if (qCol === col) return false;
      // Diagonal
      if (Math.abs(qCol - col) === Math.abs(i - row)) return false;
    }
    return true;
  };

  const getAttackedCells = (currentQueens: number[]): Set<string> => {
    const attacked = new Set<string>();
    currentQueens.forEach((col, row) => {
      // Mark entire row and column
      for (let i = 0; i < n; i++) {
        attacked.add(`${row}-${i}`);
        attacked.add(`${i}-${col}`);
      }
      // Mark diagonals
      for (let i = 1; i < n; i++) {
        if (row + i < n && col + i < n) attacked.add(`${row + i}-${col + i}`);
        if (row + i < n && col - i >= 0) attacked.add(`${row + i}-${col - i}`);
        if (row - i >= 0 && col + i < n) attacked.add(`${row - i}-${col + i}`);
        if (row - i >= 0 && col - i >= 0) attacked.add(`${row - i}-${col - i}`);
      }
    });
    return attacked;
  };

  const step = () => {
    if (isComplete) return false;

    // If we've placed all queens, we found a solution
    if (queens.length === n) {
      setSolutions(prev => [...prev, [...queens]]);
      // Backtrack
      if (queens.length > 0) {
        const lastCol = queens[queens.length - 1];
        const newQueens = queens.slice(0, -1);
        setQueens(newQueens);
        setCurrentRow(queens.length - 1);
        setCurrentCol(lastCol + 1);
        setAttackedCells(getAttackedCells(newQueens));
      }
      return true;
    }

    setChecking({ row: currentRow, col: currentCol });

    // Try to place queen at current position
    if (currentCol < n) {
      if (isSafe(currentRow, currentCol, queens)) {
        // Place queen
        const newQueens = [...queens, currentCol];
        setQueens(newQueens);
        setAttackedCells(getAttackedCells(newQueens));
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      } else {
        // Try next column
        setCurrentCol(currentCol + 1);
      }
    } else {
      // Backtrack
      if (queens.length === 0) {
        setIsComplete(true);
        return false;
      }
      const lastCol = queens[queens.length - 1];
      const newQueens = queens.slice(0, -1);
      setQueens(newQueens);
      setCurrentRow(queens.length - 1);
      setCurrentCol(lastCol + 1);
      setAttackedCells(getAttackedCells(newQueens));
    }

    return true;
  };

  useEffect(() => {
    if (!isPlaying || isComplete) return;
    
    const timer = setTimeout(() => {
      const canContinue = step();
      if (!canContinue) setIsPlaying(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isPlaying, currentRow, currentCol, queens, isComplete]);

  const showSolution = (solutionIndex: number) => {
    const solution = solutions[solutionIndex];
    setQueens(solution);
    setAttackedCells(getAttackedCells(solution));
    setCurrentRow(n);
    setCurrentCol(0);
  };

  return (
    <div className="bg-black/40 rounded-xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-gray-300">N-Queens Backtracking</h3>
          <select 
            value={n} 
            onChange={(e) => setN(parseInt(e.target.value))}
            className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-gray-300"
          >
            {[4, 5, 6, 8].map(val => (
              <option key={val} value={val} className="bg-gray-900">{val}×{val}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={initBoard}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isComplete}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={step}
            disabled={isComplete || isPlaying}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title="Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chess Board */}
      <div className="flex justify-center mb-4">
        <div 
          className="grid gap-0 border border-white/20 rounded overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
        >
          {Array(n).fill(null).map((_, row) => (
            Array(n).fill(null).map((_, col) => {
              const isQueen = queens[row] === col;
              const isChecking = checking?.row === row && checking?.col === col;
              const isAttacked = attackedCells.has(`${row}-${col}`) && !isQueen;
              const isLight = (row + col) % 2 === 0;
              
              return (
                <div
                  key={`${row}-${col}`}
                  className={`
                    w-8 h-8 flex items-center justify-center transition-all duration-200
                    ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                    ${isChecking ? 'ring-2 ring-yellow-400 ring-inset' : ''}
                    ${isAttacked && row >= queens.length ? 'bg-red-500/30' : ''}
                  `}
                >
                  {isQueen && (
                    <Crown className="w-5 h-5 text-purple-600 drop-shadow-lg" fill="currentColor" />
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Queens</div>
          <div className="text-lg font-bold text-purple-400">{queens.length}/{n}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Solutions</div>
          <div className="text-lg font-bold text-green-400">{solutions.length}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Status</div>
          <div className="text-xs font-medium mt-1 text-gray-300">
            {isComplete ? "Done" : `Row ${currentRow + 1}`}
          </div>
        </div>
      </div>

      {/* Solutions preview */}
      {solutions.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {solutions.slice(0, 6).map((sol, idx) => (
            <button
              key={idx}
              onClick={() => showSolution(idx)}
              className="px-2 py-1 text-[10px] bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
            >
              Sol {idx + 1}
            </button>
          ))}
          {solutions.length > 6 && (
            <span className="px-2 py-1 text-[10px] text-gray-500">+{solutions.length - 6} more</span>
          )}
        </div>
      )}

      {/* Algorithm hint */}
      {!isComplete && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          {queens.length < n 
            ? `Trying to place queen in row ${currentRow + 1}, column ${currentCol + 1}` 
            : "Found a solution! Backtracking to find more..."}
        </div>
      )}
      {isComplete && (
        <div className="mt-3 text-xs text-green-400 text-center font-medium">
          ✓ Found all {solutions.length} solution{solutions.length !== 1 ? 's' : ''} for {n}-Queens!
        </div>
      )}
    </div>
  );
}
