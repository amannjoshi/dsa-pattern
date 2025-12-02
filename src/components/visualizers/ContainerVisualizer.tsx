"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

interface ContainerVisualizerProps {
  heights?: number[];
}

export default function ContainerVisualizer({ 
  heights = [1, 8, 6, 2, 5, 4, 8, 3, 7] 
}: ContainerVisualizerProps) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(heights.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [maxArea, setMaxArea] = useState(0);
  const [currentArea, setCurrentArea] = useState(0);
  const [history, setHistory] = useState<{ l: number; r: number; area: number }[]>([]);

  const maxHeight = Math.max(...heights);

  const calculateArea = (l: number, r: number) => {
    return Math.min(heights[l], heights[r]) * (r - l);
  };

  const reset = () => {
    setLeft(0);
    setRight(heights.length - 1);
    setMaxArea(0);
    setCurrentArea(calculateArea(0, heights.length - 1));
    setHistory([]);
    setIsPlaying(false);
  };

  const step = () => {
    if (left >= right) return false;
    
    const area = calculateArea(left, right);
    setCurrentArea(area);
    setMaxArea(prev => Math.max(prev, area));
    setHistory(prev => [...prev, { l: left, r: right, area }]);

    if (heights[left] < heights[right]) {
      setLeft(left + 1);
    } else {
      setRight(right - 1);
    }
    return left + 1 < right;
  };

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setTimeout(() => {
      const canContinue = step();
      if (!canContinue) setIsPlaying(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [isPlaying, left, right]);

  useEffect(() => {
    setCurrentArea(calculateArea(left, right));
  }, [left, right, heights]);

  const waterHeight = Math.min(heights[left], heights[right]);

  return (
    <div className="bg-black/40 rounded-xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">Two Pointer Visualization</h3>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={left >= right}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={step}
            disabled={left >= right || isPlaying}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title="Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Container Visualization */}
      <div className="relative h-40 flex items-end justify-center gap-1 mb-4 bg-black/20 rounded-lg p-3">
        {heights.map((h, i) => {
          const isLeft = i === left;
          const isRight = i === right;
          const isInRange = i >= left && i <= right;
          const barHeight = (h / maxHeight) * 100;
          
          return (
            <div key={i} className="relative flex flex-col items-center" style={{ width: '28px' }}>
              {/* Water fill between pointers */}
              {isInRange && i > left && i < right && (
                <div
                  className="absolute bottom-0 w-full bg-blue-500/30 transition-all duration-300"
                  style={{ height: `${(waterHeight / maxHeight) * 100}%` }}
                />
              )}
              
              {/* Bar */}
              <div
                className={`w-5 rounded-t transition-all duration-300 ${
                  isLeft
                    ? "bg-green-500 shadow-lg shadow-green-500/30"
                    : isRight
                    ? "bg-red-500 shadow-lg shadow-red-500/30"
                    : isInRange
                    ? "bg-gray-500"
                    : "bg-gray-700"
                }`}
                style={{ height: `${barHeight}%` }}
              />
              
              {/* Index label */}
              <span className={`text-[10px] mt-1 ${isLeft || isRight ? "text-white font-bold" : "text-gray-500"}`}>
                {h}
              </span>
              
              {/* Pointer labels */}
              {isLeft && (
                <span className="absolute -top-5 text-[10px] text-green-400 font-bold">L</span>
              )}
              {isRight && (
                <span className="absolute -top-5 text-[10px] text-red-400 font-bold">R</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Current</div>
          <div className="text-lg font-bold text-blue-400">{currentArea}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Max Area</div>
          <div className="text-lg font-bold text-green-400">{maxArea}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Formula</div>
          <div className="text-[10px] text-gray-300 mt-1">
            min({heights[left]},{heights[right]}) × {right - left}
          </div>
        </div>
      </div>

      {/* Algorithm hint */}
      {left < right && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          {heights[left] < heights[right] 
            ? "Left pointer moves → (smaller height)" 
            : heights[left] > heights[right]
            ? "Right pointer moves ← (smaller height)"
            : "Either pointer can move (equal heights)"}
        </div>
      )}
      {left >= right && (
        <div className="mt-3 text-xs text-green-400 text-center font-medium">
          ✓ Algorithm complete! Max area: {maxArea}
        </div>
      )}
    </div>
  );
}
