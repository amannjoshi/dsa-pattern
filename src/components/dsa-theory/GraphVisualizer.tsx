'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

interface DressingItem {
  id: string
  name: string
  emoji: string
  x: number
  y: number
  state: 'default' | 'visiting' | 'visited' | 'in-stack' | 'processed'
  order?: number
}

interface Edge {
  from: string
  to: string
  state: 'default' | 'active' | 'processed'
}

// Topological Sort Visualizer with Dressing Example
export function TopologicalSortVisualizer() {
  const [items, setItems] = useState<DressingItem[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<{ items: DressingItem[], edges: Edge[], message: string }[]>([])
  const [speed, setSpeed] = useState(800)
  const [sortedOrder, setSortedOrder] = useState<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const initializeGraph = () => {
    // Dressing items with their positions for visualization
    const dressingItems: DressingItem[] = [
      { id: 'underwear', name: 'Underwear', emoji: '🩲', x: 50, y: 50, state: 'default' },
      { id: 'pants', name: 'Pants', emoji: '👖', x: 50, y: 150, state: 'default' },
      { id: 'shirt', name: 'Shirt', emoji: '👔', x: 200, y: 50, state: 'default' },
      { id: 'belt', name: 'Belt', emoji: '🎗️', x: 125, y: 150, state: 'default' },
      { id: 'tie', name: 'Tie', emoji: '👔', x: 200, y: 150, state: 'default' },
      { id: 'jacket', name: 'Jacket', emoji: '🧥', x: 150, y: 250, state: 'default' },
      { id: 'socks', name: 'Socks', emoji: '🧦', x: 300, y: 50, state: 'default' },
      { id: 'shoes', name: 'Shoes', emoji: '👞', x: 300, y: 150, state: 'default' },
      { id: 'watch', name: 'Watch', emoji: '⌚', x: 350, y: 250, state: 'default' },
    ]

    // Dependencies: from must be worn before to
    const dependencies: Edge[] = [
      { from: 'underwear', to: 'pants', state: 'default' },
      { from: 'pants', to: 'belt', state: 'default' },
      { from: 'pants', to: 'shoes', state: 'default' },
      { from: 'shirt', to: 'belt', state: 'default' },
      { from: 'shirt', to: 'tie', state: 'default' },
      { from: 'belt', to: 'jacket', state: 'default' },
      { from: 'tie', to: 'jacket', state: 'default' },
      { from: 'socks', to: 'shoes', state: 'default' },
    ]

    setItems(dressingItems)
    setEdges(dependencies)
    generateSteps(dressingItems, dependencies)
    setCurrentStep(0)
    setIsPlaying(false)
    setSortedOrder([])
  }

  const generateSteps = (dressingItems: DressingItem[], dependencies: Edge[]) => {
    const allSteps: { items: DressingItem[], edges: Edge[], message: string }[] = []
    const tempItems = dressingItems.map(item => ({ ...item }))
    const tempEdges = dependencies.map(edge => ({ ...edge }))

    // Build adjacency list
    const adj: Map<string, string[]> = new Map()
    const inDegree: Map<string, number> = new Map()

    tempItems.forEach(item => {
      adj.set(item.id, [])
      inDegree.set(item.id, 0)
    })

    dependencies.forEach(edge => {
      adj.get(edge.from)!.push(edge.to)
      inDegree.set(edge.to, (inDegree.get(edge.to) || 0) + 1)
    })

    // Initial state
    allSteps.push({
      items: tempItems.map(i => ({ ...i })),
      edges: tempEdges.map(e => ({ ...e })),
      message: '🎯 Starting Topological Sort using Kahn\'s Algorithm (BFS)'
    })

    // Find all items with no dependencies (in-degree = 0)
    const queue: string[] = []
    tempItems.forEach(item => {
      if (inDegree.get(item.id) === 0) {
        queue.push(item.id)
        const idx = tempItems.findIndex(i => i.id === item.id)
        tempItems[idx].state = 'in-stack'
      }
    })

    allSteps.push({
      items: tempItems.map(i => ({ ...i })),
      edges: tempEdges.map(e => ({ ...e })),
      message: `📥 Initial queue: Items with no dependencies - ${queue.map(id => tempItems.find(i => i.id === id)?.emoji).join(' ')}`
    })

    const result: string[] = []
    let orderNum = 1

    while (queue.length > 0) {
      const current = queue.shift()!
      const currentIdx = tempItems.findIndex(i => i.id === current)
      
      // Mark as visiting
      tempItems[currentIdx].state = 'visiting'
      allSteps.push({
        items: tempItems.map(i => ({ ...i })),
        edges: tempEdges.map(e => ({ ...e })),
        message: `👀 Processing: ${tempItems[currentIdx].emoji} ${tempItems[currentIdx].name}`
      })

      // Mark as processed with order number
      tempItems[currentIdx].state = 'processed'
      tempItems[currentIdx].order = orderNum++
      result.push(current)

      // Process all neighbors
      const neighbors = adj.get(current) || []
      for (const neighbor of neighbors) {
        // Highlight the edge
        const edgeIdx = tempEdges.findIndex(e => e.from === current && e.to === neighbor)
        if (edgeIdx !== -1) {
          tempEdges[edgeIdx].state = 'active'
        }

        const neighborIdx = tempItems.findIndex(i => i.id === neighbor)
        tempItems[neighborIdx].state = 'visiting'

        allSteps.push({
          items: tempItems.map(i => ({ ...i })),
          edges: tempEdges.map(e => ({ ...e })),
          message: `➡️ Checking dependency: ${tempItems[currentIdx].emoji} → ${tempItems[neighborIdx].emoji}`
        })

        // Decrease in-degree
        inDegree.set(neighbor, (inDegree.get(neighbor) || 1) - 1)

        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor)
          tempItems[neighborIdx].state = 'in-stack'
          allSteps.push({
            items: tempItems.map(i => ({ ...i })),
            edges: tempEdges.map(e => ({ ...e })),
            message: `✅ ${tempItems[neighborIdx].emoji} ${tempItems[neighborIdx].name} has no more dependencies! Added to queue.`
          })
        } else {
          tempItems[neighborIdx].state = 'default'
          allSteps.push({
            items: tempItems.map(i => ({ ...i })),
            edges: tempEdges.map(e => ({ ...e })),
            message: `⏳ ${tempItems[neighborIdx].emoji} still has ${inDegree.get(neighbor)} dependencies remaining`
          })
        }

        if (edgeIdx !== -1) {
          tempEdges[edgeIdx].state = 'processed'
        }
      }
    }

    // Final state
    allSteps.push({
      items: tempItems.map(i => ({ ...i })),
      edges: tempEdges.map(e => ({ ...e })),
      message: `🎉 Done! Order: ${result.map((id, idx) => `${idx + 1}.${tempItems.find(i => i.id === id)?.emoji}`).join(' → ')}`
    })

    setSteps(allSteps)
  }

  useEffect(() => {
    initializeGraph()
  }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setItems(steps[currentStep + 1].items)
        setEdges(steps[currentStep + 1].edges)
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getItemStyle = (state: string) => {
    switch (state) {
      case 'visiting': return 'bg-yellow-500/30 border-yellow-500 ring-2 ring-yellow-400 scale-110'
      case 'visited': return 'bg-blue-500/30 border-blue-500'
      case 'in-stack': return 'bg-purple-500/30 border-purple-500 animate-pulse'
      case 'processed': return 'bg-green-500/30 border-green-500'
      default: return 'bg-secondary/50 border-border/40'
    }
  }

  const getEdgeColor = (state: string) => {
    switch (state) {
      case 'active': return '#fbbf24' // yellow
      case 'processed': return '#22c55e' // green
      default: return '#6b7280' // gray
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-violet-400">Topological Sort - Getting Dressed! 👔</h4>
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
      <div className="relative bg-secondary/30 rounded-lg p-4 mb-4" style={{ height: '320px' }}>
        {/* SVG for edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          {edges.map((edge, idx) => {
            const fromItem = items.find(i => i.id === edge.from)
            const toItem = items.find(i => i.id === edge.to)
            if (!fromItem || !toItem) return null

            const x1 = fromItem.x + 35
            const y1 = fromItem.y + 35
            const x2 = toItem.x + 35
            const y2 = toItem.y + 35

            // Calculate arrow head
            const angle = Math.atan2(y2 - y1, x2 - x1)
            const arrowLength = 10
            const arrowX = x2 - 25 * Math.cos(angle)
            const arrowY = y2 - 25 * Math.sin(angle)

            return (
              <g key={idx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={arrowX}
                  y2={arrowY}
                  stroke={getEdgeColor(edge.state)}
                  strokeWidth={edge.state === 'active' ? 3 : 2}
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-300"
                />
                <polygon
                  points={`${arrowX},${arrowY} ${arrowX - arrowLength * Math.cos(angle - 0.4)},${arrowY - arrowLength * Math.sin(angle - 0.4)} ${arrowX - arrowLength * Math.cos(angle + 0.4)},${arrowY - arrowLength * Math.sin(angle + 0.4)}`}
                  fill={getEdgeColor(edge.state)}
                  className="transition-all duration-300"
                />
              </g>
            )
          })}
        </svg>

        {/* Nodes */}
        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute flex flex-col items-center justify-center w-16 h-16 rounded-xl border-2 transition-all duration-300 ${getItemStyle(item.state)}`}
            style={{ left: item.x, top: item.y }}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-[10px] text-center leading-tight">{item.name}</span>
            {item.order && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">
                {item.order}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="bg-secondary/30 rounded-lg p-3 mb-4 min-h-[48px]">
        <p className="text-sm text-center">{steps[currentStep]?.message || 'Press Play to start!'}</p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-secondary/50 border border-border" />
          <span>Not Visited</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-purple-500/50 border border-purple-500" />
          <span>In Queue</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500/50 border border-yellow-500" />
          <span>Processing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500/50 border border-green-500" />
          <span>Done</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={initializeGraph}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
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
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(prev => prev + 1)
              setItems(steps[currentStep + 1].items)
              setEdges(steps[currentStep + 1].edges)
            }
          }}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Step {currentStep + 1} of {steps.length} | Dependencies must be satisfied before wearing!
      </p>

      {/* Explanation */}
      <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Real-world analogy:</strong> You can&apos;t wear pants before underwear, 
          or shoes before socks! Topological sort finds a valid order that respects all dependencies.
        </p>
      </div>
    </div>
  )
}

// BFS Visualizer
export function BFSVisualizer() {
  const [nodes, setNodes] = useState<{ id: number, x: number, y: number, state: 'default' | 'visiting' | 'visited' | 'queued' }[]>([])
  const [edges] = useState<{ from: number, to: number }[]>([
    { from: 0, to: 1 }, { from: 0, to: 2 },
    { from: 1, to: 3 }, { from: 1, to: 4 },
    { from: 2, to: 5 }, { from: 2, to: 6 },
  ])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<{ nodes: typeof nodes, queue: number[], message: string }[]>([])
  const [speed, setSpeed] = useState(600)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const initializeGraph = () => {
    const positions = [
      { x: 150, y: 20 },  // 0 (root)
      { x: 80, y: 80 },   // 1
      { x: 220, y: 80 },  // 2
      { x: 40, y: 160 },  // 3
      { x: 120, y: 160 }, // 4
      { x: 180, y: 160 }, // 5
      { x: 260, y: 160 }, // 6
    ]
    
    const initialNodes = positions.map((pos, idx) => ({
      id: idx,
      x: pos.x,
      y: pos.y,
      state: 'default' as const
    }))
    
    setNodes(initialNodes)
    generateSteps(initialNodes)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (initialNodes: typeof nodes) => {
    const allSteps: typeof steps = []
    const tempNodes = initialNodes.map(n => ({ ...n }))
    const visited = new Set<number>()
    const queue: number[] = [0]

    allSteps.push({
      nodes: tempNodes.map(n => ({ ...n })),
      queue: [...queue],
      message: '🚀 Starting BFS from node 0'
    })

    tempNodes[0].state = 'queued'
    allSteps.push({
      nodes: tempNodes.map(n => ({ ...n })),
      queue: [...queue],
      message: '📥 Added node 0 to queue'
    })

    while (queue.length > 0) {
      const current = queue.shift()!
      tempNodes[current].state = 'visiting'
      
      allSteps.push({
        nodes: tempNodes.map(n => ({ ...n })),
        queue: [...queue],
        message: `👀 Visiting node ${current}`
      })

      visited.add(current)
      tempNodes[current].state = 'visited'

      // Find neighbors
      const neighbors = edges
        .filter(e => e.from === current)
        .map(e => e.to)
        .filter(n => !visited.has(n) && !queue.includes(n))

      for (const neighbor of neighbors) {
        queue.push(neighbor)
        tempNodes[neighbor].state = 'queued'
        allSteps.push({
          nodes: tempNodes.map(n => ({ ...n })),
          queue: [...queue],
          message: `📥 Added neighbor ${neighbor} to queue`
        })
      }
    }

    allSteps.push({
      nodes: tempNodes.map(n => ({ ...n })),
      queue: [],
      message: '✅ BFS Complete! All nodes visited level by level.'
    })

    setSteps(allSteps)
  }

  useEffect(() => { initializeGraph() }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setNodes(steps[currentStep + 1].nodes)
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getNodeColor = (state: string) => {
    switch (state) {
      case 'visiting': return 'bg-yellow-500 border-yellow-400 scale-125'
      case 'visited': return 'bg-green-500 border-green-400'
      case 'queued': return 'bg-blue-500 border-blue-400 animate-pulse'
      default: return 'bg-secondary border-border'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-blue-400">BFS - Breadth First Search</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={1000}>Slow</option>
          <option value={600}>Medium</option>
          <option value={300}>Fast</option>
        </select>
      </div>

      {/* Graph */}
      <div className="relative bg-secondary/30 rounded-lg" style={{ height: '200px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {edges.map((edge, idx) => {
            const from = nodes.find(n => n.id === edge.from)
            const to = nodes.find(n => n.id === edge.to)
            if (!from || !to) return null
            return (
              <line
                key={idx}
                x1={from.x + 16}
                y1={from.y + 16}
                x2={to.x + 16}
                y2={to.y + 16}
                stroke="#6b7280"
                strokeWidth="2"
              />
            )
          })}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${getNodeColor(node.state)}`}
            style={{ left: node.x, top: node.y }}
          >
            {node.id}
          </div>
        ))}
      </div>

      {/* Queue visualization */}
      <div className="mt-3 p-2 bg-secondary/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-1">Queue:</p>
        <div className="flex gap-1">
          {steps[currentStep]?.queue.length > 0 ? (
            steps[currentStep].queue.map((n, idx) => (
              <div key={idx} className="w-6 h-6 rounded bg-blue-500/30 border border-blue-500 flex items-center justify-center text-xs font-mono">
                {n}
              </div>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">Empty</span>
          )}
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-center my-3">{steps[currentStep]?.message || 'Press Play!'}</p>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={initializeGraph} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); setNodes(steps[currentStep + 1].nodes) }}}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Step {currentStep + 1}/{steps.length} | Level-order traversal
      </p>
    </div>
  )
}

// DFS Visualizer
export function DFSVisualizer() {
  const [nodes, setNodes] = useState<{ id: number, x: number, y: number, state: 'default' | 'visiting' | 'visited' | 'stacked' }[]>([])
  const [edges] = useState<{ from: number, to: number }[]>([
    { from: 0, to: 1 }, { from: 0, to: 2 },
    { from: 1, to: 3 }, { from: 1, to: 4 },
    { from: 2, to: 5 }, { from: 2, to: 6 },
  ])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<{ nodes: typeof nodes, stack: number[], message: string }[]>([])
  const [speed, setSpeed] = useState(600)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const initializeGraph = () => {
    const positions = [
      { x: 150, y: 20 },
      { x: 80, y: 80 },
      { x: 220, y: 80 },
      { x: 40, y: 160 },
      { x: 120, y: 160 },
      { x: 180, y: 160 },
      { x: 260, y: 160 },
    ]
    
    const initialNodes = positions.map((pos, idx) => ({
      id: idx,
      x: pos.x,
      y: pos.y,
      state: 'default' as const
    }))
    
    setNodes(initialNodes)
    generateSteps(initialNodes)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (initialNodes: typeof nodes) => {
    const allSteps: typeof steps = []
    const tempNodes = initialNodes.map(n => ({ ...n }))
    const visited = new Set<number>()
    const stack: number[] = []

    allSteps.push({
      nodes: tempNodes.map(n => ({ ...n })),
      stack: [...stack],
      message: '🚀 Starting DFS from node 0'
    })

    const dfs = (node: number) => {
      if (visited.has(node)) return

      stack.push(node)
      tempNodes[node].state = 'stacked'
      allSteps.push({
        nodes: tempNodes.map(n => ({ ...n })),
        stack: [...stack],
        message: `📥 Push node ${node} to stack`
      })

      tempNodes[node].state = 'visiting'
      allSteps.push({
        nodes: tempNodes.map(n => ({ ...n })),
        stack: [...stack],
        message: `👀 Visiting node ${node}`
      })

      visited.add(node)

      const neighbors = edges
        .filter(e => e.from === node)
        .map(e => e.to)

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor)
        }
      }

      tempNodes[node].state = 'visited'
      stack.pop()
      allSteps.push({
        nodes: tempNodes.map(n => ({ ...n })),
        stack: [...stack],
        message: `✅ Done with node ${node}, backtracking`
      })
    }

    dfs(0)

    allSteps.push({
      nodes: tempNodes.map(n => ({ ...n })),
      stack: [],
      message: '🎉 DFS Complete! Explored as deep as possible first.'
    })

    setSteps(allSteps)
  }

  useEffect(() => { initializeGraph() }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setNodes(steps[currentStep + 1].nodes)
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getNodeColor = (state: string) => {
    switch (state) {
      case 'visiting': return 'bg-yellow-500 border-yellow-400 scale-125'
      case 'visited': return 'bg-green-500 border-green-400'
      case 'stacked': return 'bg-purple-500 border-purple-400 animate-pulse'
      default: return 'bg-secondary border-border'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-purple-400">DFS - Depth First Search</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={1000}>Slow</option>
          <option value={600}>Medium</option>
          <option value={300}>Fast</option>
        </select>
      </div>

      {/* Graph */}
      <div className="relative bg-secondary/30 rounded-lg" style={{ height: '200px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {edges.map((edge, idx) => {
            const from = nodes.find(n => n.id === edge.from)
            const to = nodes.find(n => n.id === edge.to)
            if (!from || !to) return null
            return (
              <line
                key={idx}
                x1={from.x + 16}
                y1={from.y + 16}
                x2={to.x + 16}
                y2={to.y + 16}
                stroke="#6b7280"
                strokeWidth="2"
              />
            )
          })}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${getNodeColor(node.state)}`}
            style={{ left: node.x, top: node.y }}
          >
            {node.id}
          </div>
        ))}
      </div>

      {/* Stack visualization */}
      <div className="mt-3 p-2 bg-secondary/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-1">Stack (LIFO):</p>
        <div className="flex gap-1">
          {steps[currentStep]?.stack.length > 0 ? (
            steps[currentStep].stack.map((n, idx) => (
              <div key={idx} className="w-6 h-6 rounded bg-purple-500/30 border border-purple-500 flex items-center justify-center text-xs font-mono">
                {n}
              </div>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">Empty</span>
          )}
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-center my-3">{steps[currentStep]?.message || 'Press Play!'}</p>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={initializeGraph} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); setNodes(steps[currentStep + 1].nodes) }}}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Step {currentStep + 1}/{steps.length} | Go deep, then backtrack
      </p>
    </div>
  )
}
