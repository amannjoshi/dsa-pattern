"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

interface RainWaterVisualizerProps {
  heights?: number[];
}

export default function RainWaterVisualizer({ 
  heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] 
}: RainWaterVisualizerProps) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(heights.length - 1);
  const [leftMax, setLeftMax] = useState(0);
  const [rightMax, setRightMax] = useState(0);
  const [water, setWater] = useState<number[]>(new Array(heights.length).fill(0));
  const [totalWater, setTotalWater] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const maxHeight = Math.max(...heights, 3);

  const reset = () => {
    setLeft(0);
    setRight(heights.length - 1);
    setLeftMax(0);
    setRightMax(0);
    setWater(new Array(heights.length).fill(0));
    setTotalWater(0);
    setIsComplete(false);
    setIsPlaying(false);
  };

  const step = () => {
    if (left >= right) {
      setIsComplete(true);
      return false;
    }

    const newLeftMax = Math.max(leftMax, heights[left]);
    const newRightMax = Math.max(rightMax, heights[right]);
    setLeftMax(newLeftMax);
    setRightMax(newRightMax);

    const newWater = [...water];
    
    if (newLeftMax < newRightMax) {
      const trapped = newLeftMax - heights[left];
      if (trapped > 0) {
        newWater[left] = trapped;
        setTotalWater(prev => prev + trapped);
      }
      setLeft(left + 1);
    } else {
      const trapped = newRightMax - heights[right];
      if (trapped > 0) {
        newWater[right] = trapped;
        setTotalWater(prev => prev + trapped);
      }
      setRight(right - 1);
    }
    
    setWater(newWater);
    return left + 1 < right;
  };

  useEffect(() => {
    if (!isPlaying || isComplete) return;
    
    const timer = setTimeout(() => {
      const canContinue = step();
      if (!canContinue) setIsPlaying(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isPlaying, left, right, isComplete]);

  return (
    <div className="bg-black/40 rounded-xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">Two Pointer Approach</h3>
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

      {/* Elevation Map Visualization */}
      <div className="relative h-44 flex items-end justify-center gap-0.5 mb-4 bg-black/20 rounded-lg p-3">
        {heights.map((h, i) => {
          const isLeft = i === left;
          const isRight = i === right;
          const barHeight = (h / maxHeight) * 100;
          const waterHeight = (water[i] / maxHeight) * 100;
          
          return (
            <div key={i} className="relative flex flex-col items-center" style={{ width: '24px' }}>
              {/* Water on top of bar */}
              {water[i] > 0 && (
                <div
                  className="absolute w-full bg-blue-500/60 transition-all duration-300"
                  style={{ 
                    height: `${waterHeight}%`,
                    bottom: `${barHeight}%`
                  }}
                />
              )}
              
              {/* Elevation bar */}
              <div
                className={`w-5 rounded-t transition-all duration-300 ${
                  isLeft
                    ? "bg-green-500 shadow-lg shadow-green-500/30"
                    : isRight
                    ? "bg-red-500 shadow-lg shadow-red-500/30"
                    : "bg-gray-600"
                }`}
                style={{ height: `${barHeight}%` }}
              />
              
              {/* Height label */}
              <span className="text-[9px] mt-1 text-gray-500">{h}</span>
              
              {/* Pointer labels */}
              {isLeft && !isComplete && (
                <span className="absolute -top-5 text-[10px] text-green-400 font-bold">L</span>
              )}
              {isRight && !isComplete && (
                <span className="absolute -top-5 text-[10px] text-red-400 font-bold">R</span>
              )}
            </div>
          );
        })}
        
        {/* Left max line */}
        {leftMax > 0 && !isComplete && (
          <div 
            className="absolute left-3 border-t-2 border-dashed border-green-400/50"
            style={{ 
              bottom: `${(leftMax / maxHeight) * 100}%`,
              width: `${((left + 1) / heights.length) * 100}%`
            }}
          />
        )}
        
        {/* Right max line */}
        {rightMax > 0 && !isComplete && (
          <div 
            className="absolute right-3 border-t-2 border-dashed border-red-400/50"
            style={{ 
              bottom: `${(rightMax / maxHeight) * 100}%`,
              width: `${((heights.length - right) / heights.length) * 100}%`
            }}
          />
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Left Max</div>
          <div className="text-lg font-bold text-green-400">{leftMax}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Total Water</div>
          <div className="text-lg font-bold text-blue-400">{totalWater}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 uppercase">Right Max</div>
          <div className="text-lg font-bold text-red-400">{rightMax}</div>
        </div>
      </div>

      {/* Algorithm hint */}
      {!isComplete && left < right && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          {leftMax < rightMax 
            ? `Left max (${leftMax}) < Right max (${rightMax}) → Move left pointer` 
            : `Left max (${leftMax}) ≥ Right max (${rightMax}) → Move right pointer`}
        </div>
      )}
      {isComplete && (
        <div className="mt-3 text-xs text-green-400 text-center font-medium">
          ✓ Complete! Total trapped water: {totalWater} units
        </div>
      )}
    </div>
  );
}
