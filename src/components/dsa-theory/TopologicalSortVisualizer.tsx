'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

interface ClothingItem {
  id: string
  name: string
  emoji: string
  x: number
  y: number
  state: 'pending' | 'processing' | 'done'
  order: number | null
}

interface Edge {
  from: string
  to: string
  state: 'pending' | 'active' | 'done'
}

// Topological Sort Visualizer with Dressing Example
export function TopologicalSortVisualizer() {
  const [items, setItems] = useState<ClothingItem[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [result, setResult] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<{ items: ClothingItem[], edges: Edge[], result: string[], message: string }[]>([])
  const [speed, setSpeed] = useState(800)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Dressing dependencies:
  // Underwear → Pants → Belt
  // Underwear → Pants → Shoes
  // Shirt → Belt
  // Shirt → Tie
  // Socks → Shoes

  const initialItems: ClothingItem[] = [
    { id: 'underwear', name: 'Underwear', emoji: '🩲', x: 50, y: 30, state: 'pending', order: null },
    { id: 'socks', name: 'Socks', emoji: '🧦', x: 250, y: 30, state: 'pending', order: null },
    { id: 'shirt', name: 'Shirt', emoji: '👔', x: 150, y: 30, state: 'pending', order: null },
    { id: 'pants', name: 'Pants', emoji: '👖', x: 50, y: 100, state: 'pending', order: null },
    { id: 'tie', name: 'Tie', emoji: '🎀', x: 200, y: 100, state: 'pending', order: null },
    { id: 'belt', name: 'Belt', emoji: '🥋', x: 100, y: 170, state: 'pending', order: null },
    { id: 'shoes', name: 'Shoes', emoji: '👟', x: 200, y: 170, state: 'pending', order: null },
  ]

  const initialEdges: Edge[] = [
    { from: 'underwear', to: 'pants', state: 'pending' },
    { from: 'pants', to: 'belt', state: 'pending' },
    { from: 'pants', to: 'shoes', state: 'pending' },
    { from: 'shirt', to: 'belt', state: 'pending' },
    { from: 'shirt', to: 'tie', state: 'pending' },
    { from: 'socks', to: 'shoes', state: 'pending' },
  ]

  const generateSteps = () => {
    const allSteps: { items: ClothingItem[], edges: Edge[], result: string[], message: string }[] = []
    const tempItems = initialItems.map(i => ({ ...i }))
    const tempEdges = initialEdges.map(e => ({ ...e }))
    const tempResult: string[] = []

    // Build adjacency list and in-degree
    const adj: Record<string, string[]> = {}
    const inDegree: Record<string, number> = {}
    
    tempItems.forEach(item => {
      adj[item.id] = []
      inDegree[item.id] = 0
    })
    
    tempEdges.forEach(edge => {
      adj[edge.from].push(edge.to)
      inDegree[edge.to]++
    })

    // Initial state
    allSteps.push({
      items: tempItems.map(i => ({ ...i })),
      edges: tempEdges.map(e => ({ ...e })),
      result: [...tempResult],
      message: 'Starting Topological Sort (Kahn\'s Algorithm)'
    })

    // Find all items with in-degree 0
    const queue: string[] = []
    tempItems.forEach(item => {
      if (inDegree[item.id] === 0) {
        queue.push(item.id)
        const idx = tempItems.findIndex(i => i.id === item.id)
        tempItems[idx].state = 'processing'
      }
    })

    allSteps.push({
      items: tempItems.map(i => ({ ...i })),
      edges: tempEdges.map(e => ({ ...e })),
      result: [...tempResult],
      message: `Found items with no dependencies: ${queue.map(id => tempItems.find(i => i.id === id)?.name).join(', ')}`
    })

    let orderNum = 1
    
    while (queue.length > 0) {
      const curr = queue.shift()!
      const currIdx = tempItems.findIndex(i => i.id === curr)
      
      tempItems[currIdx].state = 'done'
      tempItems[currIdx].order = orderNum++
      tempResult.push(curr)

      allSteps.push({
        items: tempItems.map(i => ({ ...i })),
        edges: tempEdges.map(e => ({ ...e })),
        result: [...tempResult],
        message: `Wearing ${tempItems[currIdx].name} ${tempItems[currIdx].emoji}`
      })

      // Process neighbors
      for (const neighbor of adj[curr]) {
        // Mark edge as active
        const edgeIdx = tempEdges.findIndex(e => e.from === curr && e.to === neighbor)
        if (edgeIdx !== -1) {
          tempEdges[edgeIdx].state = 'active'
        }
        
        inDegree[neighbor]--
        
        allSteps.push({
          items: tempItems.map(i => ({ ...i })),
          edges: tempEdges.map(e => ({ ...e })),
          result: [...tempResult],
          message: `After ${tempItems[currIdx].name}, ${tempItems.find(i => i.id === neighbor)?.name} has ${inDegree[neighbor]} remaining dependencies`
        })

        // Mark edge as done
        if (edgeIdx !== -1) {
          tempEdges[edgeIdx].state = 'done'
        }

        if (inDegree[neighbor] === 0) {
          queue.push(neighbor)
          const neighborIdx = tempItems.findIndex(i => i.id === neighbor)
          tempItems[neighborIdx].state = 'processing'
          
          allSteps.push({
            items: tempItems.map(i => ({ ...i })),
            edges: tempEdges.map(e => ({ ...e })),
            result: [...tempResult],
            message: `${tempItems.find(i => i.id === neighbor)?.name} is now ready to wear!`
          })
        }
      }
    }

    allSteps.push({
      items: tempItems.map(i => ({ ...i })),
      edges: tempEdges.map(e => ({ ...e })),
      result: [...tempResult],
      message: '✅ All dressed! Topological order complete.'
    })

    setSteps(allSteps)
  }

  const reset = () => {
    setItems(initialItems.map(i => ({ ...i })))
    setEdges(initialEdges.map(e => ({ ...e })))
    setResult([])
    setCurrentStep(0)
    setIsPlaying(false)
    generateSteps()
  }

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        const nextStep = currentStep + 1
        setCurrentStep(nextStep)
        setItems(steps[nextStep].items)
        setEdges(steps[nextStep].edges)
        setResult(steps[nextStep].result)
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      setItems(steps[nextStep].items)
      setEdges(steps[nextStep].edges)
      setResult(steps[nextStep].result)
    }
  }

  const getItemColor = (state: string) => {
    switch (state) {
      case 'processing': return 'bg-yellow-500/30 border-yellow-500'
      case 'done': return 'bg-green-500/30 border-green-500'
      default: return 'bg-secondary/30 border-border/40'
    }
  }

  const getEdgeColor = (state: string) => {
    switch (state) {
      case 'active': return 'stroke-yellow-500'
      case 'done': return 'stroke-green-500'
      default: return 'stroke-gray-500'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-violet-400">Topological Sort - Getting Dressed Example</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={1200}>Slow</option>
          <option value={800}>Medium</option>
          <option value={400}>Fast</option>
        </select>
      </div>

      {/* Graph Visualization */}
      <div className="relative h-56 mb-4 bg-black/20 rounded-lg overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {/* Draw edges */}
          {edges.map((edge, idx) => {
            const fromItem = items.find(i => i.id === edge.from)
            const toItem = items.find(i => i.id === edge.to)
            if (!fromItem || !toItem) return null
            
            return (
              <g key={idx}>
                <defs>
                  <marker
                    id={`arrow-${idx}-${edge.state}`}
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path 
                      d="M0,0 L0,6 L9,3 z" 
                      fill={edge.state === 'active' ? '#eab308' : edge.state === 'done' ? '#22c55e' : '#6b7280'} 
                    />
                  </marker>
                </defs>
                <line
                  x1={fromItem.x + 25}
                  y1={fromItem.y + 20}
                  x2={toItem.x + 25}
                  y2={toItem.y}
                  className={`${getEdgeColor(edge.state)} transition-all duration-300`}
                  strokeWidth={edge.state === 'active' ? 3 : 2}
                  markerEnd={`url(#arrow-${idx}-${edge.state})`}
                />
              </g>
            )
          })}
        </svg>

        {/* Draw items */}
        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute flex flex-col items-center p-2 rounded-lg border-2 transition-all duration-300 ${getItemColor(item.state)}`}
            style={{ left: item.x, top: item.y, width: 60 }}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-[10px] font-medium mt-1">{item.name}</span>
            {item.order !== null && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">
                {item.order}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="mb-4 p-3 rounded-lg bg-black/20">
        <p className="text-xs text-muted-foreground mb-2">Wearing Order:</p>
        <div className="flex items-center gap-2 flex-wrap min-h-[32px]">
          {result.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">Not started yet...</span>
          ) : (
            result.map((id, idx) => {
              const item = items.find(i => i.id === id)
              return (
                <div key={id} className="flex items-center gap-1">
                  <span className="text-lg">{item?.emoji}</span>
                  {idx < result.length - 1 && <span className="text-muted-foreground">→</span>}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mb-4 p-2 rounded bg-violet-500/10 text-center">
        <p className="text-sm text-violet-300">
          {steps[currentStep]?.message || 'Click Play to start'}
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-secondary/30 border border-border/40" />
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500" />
          <span>Ready</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500" />
          <span>Done</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={reset} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={stepForward}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Dependencies: Underwear→Pants→Belt/Shoes, Shirt→Belt/Tie, Socks→Shoes
      </p>
    </div>
  )
}
