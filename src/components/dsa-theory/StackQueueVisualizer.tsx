'use client'

import { useState } from 'react'
import { Plus, Minus, RotateCcw } from 'lucide-react'

// Stack Visualizer
export function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([10, 20, 30])
  const [animating, setAnimating] = useState<'push' | 'pop' | null>(null)
  const [nextValue, setNextValue] = useState(40)

  const push = () => {
    if (stack.length >= 6) return
    setAnimating('push')
    setTimeout(() => {
      setStack([...stack, nextValue])
      setNextValue(nextValue + 10)
      setAnimating(null)
    }, 400)
  }

  const pop = () => {
    if (stack.length === 0) return
    setAnimating('pop')
    setTimeout(() => {
      setStack(stack.slice(0, -1))
      setAnimating(null)
    }, 400)
  }

  const reset = () => {
    setStack([10, 20, 30])
    setNextValue(40)
    setAnimating(null)
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-purple-400">Stack Visualization</h4>
        <button 
          onClick={reset}
          className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {/* Stack Container */}
      <div className="flex items-end justify-center gap-6 mb-4">
        {/* Stack Visual */}
        <div className="relative">
          {/* Stack Base */}
          <div className="w-24 border-l-2 border-r-2 border-b-2 border-purple-500/50 min-h-[160px] flex flex-col-reverse items-center pb-1 relative">
            {stack.length === 0 && (
              <p className="text-xs text-muted-foreground absolute top-1/2 -translate-y-1/2">Empty</p>
            )}
            {stack.map((val, idx) => (
              <div
                key={idx}
                className={`w-20 h-8 flex items-center justify-center rounded text-sm font-mono font-bold
                  ${idx === stack.length - 1 ? 'bg-purple-500 text-white' : 'bg-purple-500/30 text-purple-300'}
                  ${animating === 'pop' && idx === stack.length - 1 ? 'animate-slide-up-out' : ''}
                  ${animating === 'push' && idx === stack.length - 1 ? 'animate-slide-down-in' : ''}
                  transition-all duration-300
                `}
              >
                {val}
              </div>
            ))}
          </div>
          
          {/* Labels */}
          <div className="absolute -right-12 top-0 flex flex-col-reverse h-full justify-start pb-2">
            {stack.length > 0 && (
              <div className="flex items-center gap-1 h-8">
                <span className="text-[10px] text-purple-400 font-medium">← TOP</span>
              </div>
            )}
          </div>
        </div>

        {/* Arrow and Next Value for Push */}
        {animating === 'push' && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-10 h-8 flex items-center justify-center rounded bg-green-500 text-white text-sm font-mono font-bold">
              {nextValue - 10}
            </div>
            <span className="text-xs text-green-400 mt-1">↓ Push</span>
          </div>
        )}

        {animating === 'pop' && stack.length > 0 && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-10 h-8 flex items-center justify-center rounded bg-red-500 text-white text-sm font-mono font-bold">
              {stack[stack.length - 1]}
            </div>
            <span className="text-xs text-red-400 mt-1">↑ Pop</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={push}
          disabled={animating !== null || stack.length >= 6}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Push ({nextValue})
        </button>
        <button
          onClick={pop}
          disabled={animating !== null || stack.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
          Pop
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        LIFO: Last In, First Out
      </p>

      <style jsx>{`
        @keyframes slide-up-out {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-20px); opacity: 0; }
        }
        @keyframes slide-down-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up-out { animation: slide-up-out 0.4s ease-out forwards; }
        .animate-slide-down-in { animation: slide-down-in 0.4s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  )
}

// Queue Visualizer
export function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([10, 20, 30])
  const [animating, setAnimating] = useState<'enqueue' | 'dequeue' | null>(null)
  const [nextValue, setNextValue] = useState(40)

  const enqueue = () => {
    if (queue.length >= 6) return
    setAnimating('enqueue')
    setTimeout(() => {
      setQueue([...queue, nextValue])
      setNextValue(nextValue + 10)
      setAnimating(null)
    }, 400)
  }

  const dequeue = () => {
    if (queue.length === 0) return
    setAnimating('dequeue')
    setTimeout(() => {
      setQueue(queue.slice(1))
      setAnimating(null)
    }, 400)
  }

  const reset = () => {
    setQueue([10, 20, 30])
    setNextValue(40)
    setAnimating(null)
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-blue-400">Queue Visualization</h4>
        <button 
          onClick={reset}
          className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {/* Queue Container */}
      <div className="flex items-center justify-center gap-2 mb-4 min-h-[80px]">
        {/* Dequeue indicator */}
        {animating === 'dequeue' && queue.length > 0 && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-12 h-12 flex items-center justify-center rounded bg-red-500 text-white text-sm font-mono font-bold">
              {queue[0]}
            </div>
            <span className="text-xs text-red-400 mt-1">← Dequeue</span>
          </div>
        )}

        {/* Front Label */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-blue-400 font-medium mb-1">FRONT</span>
          <span className="text-blue-400">↓</span>
        </div>

        {/* Queue Elements */}
        <div className="flex items-center border-t-2 border-b-2 border-blue-500/50 px-1 py-2 min-w-[200px] justify-center gap-1">
          {queue.length === 0 && (
            <p className="text-xs text-muted-foreground">Empty</p>
          )}
          {queue.map((val, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 flex items-center justify-center rounded text-sm font-mono font-bold
                ${idx === 0 ? 'bg-blue-500 text-white' : 'bg-blue-500/30 text-blue-300'}
                ${animating === 'dequeue' && idx === 0 ? 'animate-slide-left-out' : ''}
                ${animating === 'enqueue' && idx === queue.length - 1 ? 'animate-slide-right-in' : ''}
                transition-all duration-300
              `}
            >
              {val}
            </div>
          ))}
        </div>

        {/* Rear Label */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-cyan-400 font-medium mb-1">REAR</span>
          <span className="text-cyan-400">↓</span>
        </div>

        {/* Enqueue indicator */}
        {animating === 'enqueue' && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-12 h-12 flex items-center justify-center rounded bg-green-500 text-white text-sm font-mono font-bold">
              {nextValue - 10}
            </div>
            <span className="text-xs text-green-400 mt-1">Enqueue →</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={enqueue}
          disabled={animating !== null || queue.length >= 6}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Enqueue ({nextValue})
        </button>
        <button
          onClick={dequeue}
          disabled={animating !== null || queue.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
          Dequeue
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        FIFO: First In, First Out
      </p>

      <style jsx>{`
        @keyframes slide-left-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-20px); opacity: 0; }
        }
        @keyframes slide-right-in {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-left-out { animation: slide-left-out 0.4s ease-out forwards; }
        .animate-slide-right-in { animation: slide-right-in 0.4s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  )
}

// Circular Queue Visualizer
export function CircularQueueVisualizer() {
  const [queue, setQueue] = useState<(number | null)[]>([10, 20, 30, null, null, null])
  const [front, setFront] = useState(0)
  const [rear, setRear] = useState(2)
  const [animating, setAnimating] = useState<'enqueue' | 'dequeue' | null>(null)
  const [nextValue, setNextValue] = useState(40)
  const [isEmpty, setIsEmpty] = useState(false)

  const capacity = 6
  const radius = 70
  const centerX = 90
  const centerY = 90

  const getPosition = (index: number) => {
    const angle = (index * 360 / capacity - 90) * (Math.PI / 180)
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  }

  const enqueue = () => {
    const nextRear = (rear + 1) % capacity
    if (!isEmpty && nextRear === front) return // Full
    
    setAnimating('enqueue')
    setTimeout(() => {
      const newQueue = [...queue]
      if (isEmpty) {
        newQueue[0] = nextValue
        setFront(0)
        setRear(0)
        setIsEmpty(false)
      } else {
        newQueue[nextRear] = nextValue
        setRear(nextRear)
      }
      setQueue(newQueue)
      setNextValue(nextValue + 10)
      setAnimating(null)
    }, 400)
  }

  const dequeue = () => {
    if (isEmpty) return
    
    setAnimating('dequeue')
    setTimeout(() => {
      const newQueue = [...queue]
      newQueue[front] = null
      
      if (front === rear) {
        // Last element
        setIsEmpty(true)
      } else {
        setFront((front + 1) % capacity)
      }
      setQueue(newQueue)
      setAnimating(null)
    }, 400)
  }

  const reset = () => {
    setQueue([10, 20, 30, null, null, null])
    setFront(0)
    setRear(2)
    setNextValue(40)
    setIsEmpty(false)
    setAnimating(null)
  }

  const getCount = () => {
    if (isEmpty) return 0
    return rear >= front ? rear - front + 1 : capacity - front + rear + 1
  }

  const isFull = () => {
    return !isEmpty && (rear + 1) % capacity === front
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-orange-400">Circular Queue Visualization</h4>
        <button 
          onClick={reset}
          className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {/* Circular Queue Visual */}
      <div className="flex justify-center mb-4">
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Connection lines forming circle */}
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={radius} 
            fill="none" 
            stroke="rgba(251, 146, 60, 0.2)" 
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          
          {/* Queue slots */}
          {queue.map((val, idx) => {
            const pos = getPosition(idx)
            const isFrontIdx = !isEmpty && idx === front
            const isRearIdx = !isEmpty && idx === rear
            const hasValue = val !== null
            
            return (
              <g key={idx}>
                {/* Slot circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="22"
                  fill={hasValue 
                    ? isFrontIdx 
                      ? 'rgb(249, 115, 22)' 
                      : 'rgba(249, 115, 22, 0.3)'
                    : 'rgba(0,0,0,0.3)'
                  }
                  stroke={isFrontIdx ? 'rgb(34, 197, 94)' : isRearIdx ? 'rgb(59, 130, 246)' : 'rgba(249, 115, 22, 0.3)'}
                  strokeWidth={isFrontIdx || isRearIdx ? 3 : 1}
                  className={`transition-all duration-300 ${
                    animating === 'enqueue' && isRearIdx ? 'animate-pulse' : ''
                  } ${
                    animating === 'dequeue' && isFrontIdx ? 'animate-pulse' : ''
                  }`}
                />
                
                {/* Value */}
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={hasValue ? 'white' : 'rgba(255,255,255,0.3)'}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {hasValue ? val : idx}
                </text>
                
                {/* Front/Rear labels */}
                {isFrontIdx && (
                  <text
                    x={pos.x}
                    y={pos.y + 35}
                    textAnchor="middle"
                    fill="rgb(34, 197, 94)"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    FRONT
                  </text>
                )}
                {isRearIdx && !isFrontIdx && (
                  <text
                    x={pos.x}
                    y={pos.y + 35}
                    textAnchor="middle"
                    fill="rgb(59, 130, 246)"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    REAR
                  </text>
                )}
                {isFrontIdx && isRearIdx && (
                  <text
                    x={pos.x}
                    y={pos.y + 45}
                    textAnchor="middle"
                    fill="rgb(59, 130, 246)"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    REAR
                  </text>
                )}
              </g>
            )
          })}
          
          {/* Center info */}
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="10"
          >
            Size: {getCount()}/{capacity}
          </text>
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            fill={isFull() ? 'rgb(239, 68, 68)' : isEmpty ? 'rgb(156, 163, 175)' : 'rgb(34, 197, 94)'}
            fontSize="9"
            fontWeight="bold"
          >
            {isFull() ? 'FULL' : isEmpty ? 'EMPTY' : 'ACTIVE'}
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={enqueue}
          disabled={animating !== null || isFull()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Enqueue ({nextValue})
        </button>
        <button
          onClick={dequeue}
          disabled={animating !== null || isEmpty}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
          Dequeue
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Circular: Rear wraps around to front when reaching end
      </p>
    </div>
  )
}
