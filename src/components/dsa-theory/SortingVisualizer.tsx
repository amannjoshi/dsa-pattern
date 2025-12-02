'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

interface ArrayBar {
  value: number
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'left' | 'right'
}

// Bubble Sort Visualizer
export function BubbleSortVisualizer() {
  const [array, setArray] = useState<ArrayBar[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ArrayBar[][]>([])
  const [speed, setSpeed] = useState(500)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateArray = () => {
    const newArray: ArrayBar[] = [64, 34, 25, 12, 22, 11, 90].map(v => ({ value: v, state: 'default' }))
    setArray(newArray)
    generateSteps(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (arr: ArrayBar[]) => {
    const allSteps: ArrayBar[][] = []
    const tempArr = arr.map(a => ({ ...a }))
    const n = tempArr.length

    allSteps.push(tempArr.map(a => ({ ...a })))

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing
        tempArr.forEach((a, idx) => a.state = idx >= n - i ? 'sorted' : 'default')
        tempArr[j].state = 'comparing'
        tempArr[j + 1].state = 'comparing'
        allSteps.push(tempArr.map(a => ({ ...a })))

        if (tempArr[j].value > tempArr[j + 1].value) {
          // Swapping
          tempArr[j].state = 'swapping'
          tempArr[j + 1].state = 'swapping'
          allSteps.push(tempArr.map(a => ({ ...a })))

          const temp = tempArr[j].value
          tempArr[j].value = tempArr[j + 1].value
          tempArr[j + 1].value = temp
          allSteps.push(tempArr.map(a => ({ ...a })))
        }
      }
      tempArr[n - i - 1].state = 'sorted'
      allSteps.push(tempArr.map(a => ({ ...a })))
    }

    tempArr.forEach(a => a.state = 'sorted')
    allSteps.push(tempArr.map(a => ({ ...a })))

    setSteps(allSteps)
  }

  useEffect(() => {
    generateArray()
  }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setArray(steps[currentStep + 1])
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [isPlaying, currentStep, steps, speed])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setArray(steps[currentStep + 1])
    }
  }
  const reset = () => generateArray()

  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-yellow-500'
      case 'swapping': return 'bg-red-500'
      case 'sorted': return 'bg-green-500'
      default: return 'bg-teal-500'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-teal-400">Bubble Sort Visualization</h4>
        <div className="flex items-center gap-2">
          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
          >
            <option value={800}>Slow</option>
            <option value={500}>Medium</option>
            <option value={200}>Fast</option>
          </select>
        </div>
      </div>

      {/* Array Bars */}
      <div className="flex items-end justify-center gap-2 h-40 mb-4">
        {array.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-10 rounded-t transition-all duration-300 ${getBarColor(bar.state)}`}
              style={{ height: `${bar.value * 1.5}px` }}
            />
            <span className="text-xs mt-1 font-mono">{bar.value}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-teal-500" />
          <span>Unsorted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Sorted</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={stepForward}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Step {currentStep + 1} of {steps.length} | Bubbles largest to end each pass
      </p>
    </div>
  )
}

// Selection Sort Visualizer
export function SelectionSortVisualizer() {
  const [array, setArray] = useState<ArrayBar[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ArrayBar[][]>([])
  const [speed, setSpeed] = useState(500)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateArray = () => {
    const newArray: ArrayBar[] = [64, 25, 12, 22, 11].map(v => ({ value: v, state: 'default' }))
    setArray(newArray)
    generateSteps(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (arr: ArrayBar[]) => {
    const allSteps: ArrayBar[][] = []
    const tempArr = arr.map(a => ({ ...a }))
    const n = tempArr.length

    allSteps.push(tempArr.map(a => ({ ...a })))

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      tempArr.forEach((a, idx) => a.state = idx < i ? 'sorted' : 'default')
      tempArr[i].state = 'pivot'
      allSteps.push(tempArr.map(a => ({ ...a })))

      for (let j = i + 1; j < n; j++) {
        tempArr.forEach((a, idx) => {
          if (idx < i) a.state = 'sorted'
          else if (idx === minIdx) a.state = 'pivot'
          else a.state = 'default'
        })
        tempArr[j].state = 'comparing'
        allSteps.push(tempArr.map(a => ({ ...a })))

        if (tempArr[j].value < tempArr[minIdx].value) {
          tempArr[minIdx].state = 'default'
          minIdx = j
          tempArr[minIdx].state = 'pivot'
          allSteps.push(tempArr.map(a => ({ ...a })))
        }
      }

      if (minIdx !== i) {
        tempArr[i].state = 'swapping'
        tempArr[minIdx].state = 'swapping'
        allSteps.push(tempArr.map(a => ({ ...a })))

        const temp = tempArr[i].value
        tempArr[i].value = tempArr[minIdx].value
        tempArr[minIdx].value = temp
        allSteps.push(tempArr.map(a => ({ ...a })))
      }

      tempArr[i].state = 'sorted'
      allSteps.push(tempArr.map(a => ({ ...a })))
    }

    tempArr.forEach(a => a.state = 'sorted')
    allSteps.push(tempArr.map(a => ({ ...a })))

    setSteps(allSteps)
  }

  useEffect(() => { generateArray() }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setArray(steps[currentStep + 1])
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-yellow-500'
      case 'swapping': return 'bg-red-500'
      case 'sorted': return 'bg-green-500'
      case 'pivot': return 'bg-purple-500'
      default: return 'bg-orange-500'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-orange-400">Selection Sort Visualization</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={800}>Slow</option>
          <option value={500}>Medium</option>
          <option value={200}>Fast</option>
        </select>
      </div>

      <div className="flex items-end justify-center gap-2 h-32 mb-4">
        {array.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-12 rounded-t transition-all duration-300 ${getBarColor(bar.state)}`}
              style={{ height: `${bar.value * 1.5}px` }}
            />
            <span className="text-xs mt-1 font-mono">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span>Min</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Sorted</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={() => generateArray()} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); setArray(steps[currentStep + 1]) }}}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Find minimum, swap to front | Step {currentStep + 1}/{steps.length}
      </p>
    </div>
  )
}

// Insertion Sort Visualizer
export function InsertionSortVisualizer() {
  const [array, setArray] = useState<ArrayBar[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ArrayBar[][]>([])
  const [speed, setSpeed] = useState(500)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateArray = () => {
    const newArray: ArrayBar[] = [12, 11, 13, 5, 6].map(v => ({ value: v, state: 'default' }))
    setArray(newArray)
    generateSteps(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (arr: ArrayBar[]) => {
    const allSteps: ArrayBar[][] = []
    const tempArr = arr.map(a => ({ ...a }))
    const n = tempArr.length

    tempArr[0].state = 'sorted'
    allSteps.push(tempArr.map(a => ({ ...a })))

    for (let i = 1; i < n; i++) {
      const key = tempArr[i].value
      tempArr[i].state = 'pivot'
      allSteps.push(tempArr.map(a => ({ ...a })))

      let j = i - 1
      while (j >= 0 && tempArr[j].value > key) {
        tempArr[j].state = 'comparing'
        allSteps.push(tempArr.map(a => ({ ...a })))

        tempArr[j + 1].value = tempArr[j].value
        tempArr[j + 1].state = 'swapping'
        tempArr[j].state = 'sorted'
        allSteps.push(tempArr.map(a => ({ ...a })))
        j--
      }

      tempArr[j + 1].value = key
      for (let k = 0; k <= i; k++) tempArr[k].state = 'sorted'
      allSteps.push(tempArr.map(a => ({ ...a })))
    }

    tempArr.forEach(a => a.state = 'sorted')
    allSteps.push(tempArr.map(a => ({ ...a })))

    setSteps(allSteps)
  }

  useEffect(() => { generateArray() }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setArray(steps[currentStep + 1])
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-yellow-500'
      case 'swapping': return 'bg-red-500'
      case 'sorted': return 'bg-green-500'
      case 'pivot': return 'bg-blue-500'
      default: return 'bg-pink-500'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-pink-400">Insertion Sort Visualization</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={800}>Slow</option>
          <option value={500}>Medium</option>
          <option value={200}>Fast</option>
        </select>
      </div>

      <div className="flex items-end justify-center gap-2 h-28 mb-4">
        {array.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-12 rounded-t transition-all duration-300 ${getBarColor(bar.state)}`}
              style={{ height: `${bar.value * 6}px` }}
            />
            <span className="text-xs mt-1 font-mono">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span>Key</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Sorted</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={() => generateArray()} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); setArray(steps[currentStep + 1]) }}}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Like sorting cards in hand | Step {currentStep + 1}/{steps.length}
      </p>
    </div>
  )
}

// Quick Sort Visualizer
export function QuickSortVisualizer() {
  const [array, setArray] = useState<ArrayBar[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ArrayBar[][]>([])
  const [speed, setSpeed] = useState(500)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateArray = () => {
    const newArray: ArrayBar[] = [10, 7, 8, 9, 1, 5].map(v => ({ value: v, state: 'default' }))
    setArray(newArray)
    generateSteps(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (arr: ArrayBar[]) => {
    const allSteps: ArrayBar[][] = []
    const tempArr = arr.map(a => ({ ...a }))

    const quickSort = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high)
        quickSort(low, pi - 1)
        quickSort(pi + 1, high)
      }
    }

    const partition = (low: number, high: number): number => {
      const pivot = tempArr[high].value
      tempArr.forEach((a, idx) => {
        if (a.state !== 'sorted') a.state = 'default'
      })
      tempArr[high].state = 'pivot'
      allSteps.push(tempArr.map(a => ({ ...a })))

      let i = low - 1

      for (let j = low; j < high; j++) {
        tempArr[j].state = 'comparing'
        allSteps.push(tempArr.map(a => ({ ...a })))

        if (tempArr[j].value < pivot) {
          i++
          if (i !== j) {
            tempArr[i].state = 'swapping'
            tempArr[j].state = 'swapping'
            allSteps.push(tempArr.map(a => ({ ...a })))

            const temp = tempArr[i].value
            tempArr[i].value = tempArr[j].value
            tempArr[j].value = temp
            allSteps.push(tempArr.map(a => ({ ...a })))
          }
        }
        tempArr[j].state = 'left'
      }

      tempArr[i + 1].state = 'swapping'
      tempArr[high].state = 'swapping'
      allSteps.push(tempArr.map(a => ({ ...a })))

      const temp = tempArr[i + 1].value
      tempArr[i + 1].value = tempArr[high].value
      tempArr[high].value = temp
      
      tempArr[i + 1].state = 'sorted'
      allSteps.push(tempArr.map(a => ({ ...a })))

      return i + 1
    }

    allSteps.push(tempArr.map(a => ({ ...a })))
    quickSort(0, tempArr.length - 1)
    
    tempArr.forEach(a => a.state = 'sorted')
    allSteps.push(tempArr.map(a => ({ ...a })))

    setSteps(allSteps)
  }

  useEffect(() => { generateArray() }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setArray(steps[currentStep + 1])
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-yellow-500'
      case 'swapping': return 'bg-red-500'
      case 'sorted': return 'bg-green-500'
      case 'pivot': return 'bg-purple-500'
      case 'left': return 'bg-blue-400'
      default: return 'bg-cyan-500'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-cyan-400">Quick Sort Visualization</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={800}>Slow</option>
          <option value={500}>Medium</option>
          <option value={200}>Fast</option>
        </select>
      </div>

      <div className="flex items-end justify-center gap-2 h-28 mb-4">
        {array.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-12 rounded-t transition-all duration-300 ${getBarColor(bar.state)}`}
              style={{ height: `${bar.value * 8}px` }}
            />
            <span className="text-xs mt-1 font-mono">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span>Pivot</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Sorted</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={() => generateArray()} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); setArray(steps[currentStep + 1]) }}}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Partition around pivot | Step {currentStep + 1}/{steps.length}
      </p>
    </div>
  )
}

// Heap Sort Visualizer
export function HeapSortVisualizer() {
  const [array, setArray] = useState<ArrayBar[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ArrayBar[][]>([])
  const [speed, setSpeed] = useState(500)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateArray = () => {
    const newArray: ArrayBar[] = [4, 10, 3, 5, 1].map(v => ({ value: v, state: 'default' }))
    setArray(newArray)
    generateSteps(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (arr: ArrayBar[]) => {
    const allSteps: ArrayBar[][] = []
    const tempArr = arr.map(a => ({ ...a }))
    const n = tempArr.length

    allSteps.push(tempArr.map(a => ({ ...a })))

    // Heapify function
    const heapify = (size: number, i: number) => {
      let largest = i
      const left = 2 * i + 1
      const right = 2 * i + 2

      tempArr.forEach((a, idx) => {
        if (idx >= size) a.state = 'sorted'
        else a.state = 'default'
      })
      tempArr[i].state = 'pivot'
      allSteps.push(tempArr.map(a => ({ ...a })))

      if (left < size) {
        tempArr[left].state = 'comparing'
        if (tempArr[left].value > tempArr[largest].value) {
          largest = left
        }
      }
      if (right < size) {
        tempArr[right].state = 'comparing'
        if (tempArr[right].value > tempArr[largest].value) {
          largest = right
        }
      }
      allSteps.push(tempArr.map(a => ({ ...a })))

      if (largest !== i) {
        tempArr[i].state = 'swapping'
        tempArr[largest].state = 'swapping'
        allSteps.push(tempArr.map(a => ({ ...a })))

        const temp = tempArr[i].value
        tempArr[i].value = tempArr[largest].value
        tempArr[largest].value = temp
        allSteps.push(tempArr.map(a => ({ ...a })))

        heapify(size, largest)
      }
    }

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i)
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      tempArr[0].state = 'swapping'
      tempArr[i].state = 'swapping'
      allSteps.push(tempArr.map(a => ({ ...a })))

      const temp = tempArr[0].value
      tempArr[0].value = tempArr[i].value
      tempArr[i].value = temp
      
      tempArr[i].state = 'sorted'
      allSteps.push(tempArr.map(a => ({ ...a })))

      heapify(i, 0)
    }

    tempArr.forEach(a => a.state = 'sorted')
    allSteps.push(tempArr.map(a => ({ ...a })))

    setSteps(allSteps)
  }

  useEffect(() => { generateArray() }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setArray(steps[currentStep + 1])
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-yellow-500'
      case 'swapping': return 'bg-red-500'
      case 'sorted': return 'bg-green-500'
      case 'pivot': return 'bg-purple-500'
      default: return 'bg-amber-500'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-amber-400">Heap Sort Visualization</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={800}>Slow</option>
          <option value={500}>Medium</option>
          <option value={200}>Fast</option>
        </select>
      </div>

      <div className="flex items-end justify-center gap-2 h-28 mb-4">
        {array.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-12 rounded-t transition-all duration-300 ${getBarColor(bar.state)}`}
              style={{ height: `${bar.value * 8}px` }}
            />
            <span className="text-xs mt-1 font-mono">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span>Root</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Sorted</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={() => generateArray()} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); setArray(steps[currentStep + 1]) }}}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Build Max Heap → Extract Max | Step {currentStep + 1}/{steps.length}
      </p>
    </div>
  )
}

// Merge Sort Visualizer
export function MergeSortVisualizer() {
  const [array, setArray] = useState<ArrayBar[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<ArrayBar[][]>([])
  const [speed, setSpeed] = useState(500)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateArray = () => {
    const newArray: ArrayBar[] = [38, 27, 43, 3, 9, 82, 10].map(v => ({ value: v, state: 'default' }))
    setArray(newArray)
    generateSteps(newArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSteps = (arr: ArrayBar[]) => {
    const allSteps: ArrayBar[][] = []
    const tempArr = arr.map(a => ({ ...a }))

    const merge = (left: number, mid: number, right: number) => {
      const n1 = mid - left + 1
      const n2 = right - mid
      const L = tempArr.slice(left, mid + 1).map(a => a.value)
      const R = tempArr.slice(mid + 1, right + 1).map(a => a.value)

      // Mark subarrays
      for (let i = left; i <= mid; i++) tempArr[i].state = 'left'
      for (let i = mid + 1; i <= right; i++) tempArr[i].state = 'right'
      allSteps.push(tempArr.map(a => ({ ...a })))

      let i = 0, j = 0, k = left

      while (i < n1 && j < n2) {
        tempArr[k].state = 'comparing'
        allSteps.push(tempArr.map(a => ({ ...a })))

        if (L[i] <= R[j]) {
          tempArr[k].value = L[i]
          i++
        } else {
          tempArr[k].value = R[j]
          j++
        }
        tempArr[k].state = 'swapping'
        allSteps.push(tempArr.map(a => ({ ...a })))
        tempArr[k].state = 'sorted'
        k++
      }

      while (i < n1) {
        tempArr[k].value = L[i]
        tempArr[k].state = 'sorted'
        allSteps.push(tempArr.map(a => ({ ...a })))
        i++
        k++
      }

      while (j < n2) {
        tempArr[k].value = R[j]
        tempArr[k].state = 'sorted'
        allSteps.push(tempArr.map(a => ({ ...a })))
        j++
        k++
      }
    }

    const mergeSort = (left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2)
        mergeSort(left, mid)
        mergeSort(mid + 1, right)
        merge(left, mid, right)
      }
    }

    allSteps.push(tempArr.map(a => ({ ...a })))
    mergeSort(0, tempArr.length - 1)
    
    tempArr.forEach(a => a.state = 'sorted')
    allSteps.push(tempArr.map(a => ({ ...a })))

    setSteps(allSteps)
  }

  useEffect(() => { generateArray() }, [])

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setArray(steps[currentStep + 1])
      }, speed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [isPlaying, currentStep, steps, speed])

  const getBarColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-yellow-500'
      case 'swapping': return 'bg-red-500'
      case 'sorted': return 'bg-green-500'
      case 'left': return 'bg-blue-500'
      case 'right': return 'bg-purple-500'
      default: return 'bg-indigo-500'
    }
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-indigo-400">Merge Sort Visualization</h4>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1 rounded bg-secondary/50 border border-border/40"
        >
          <option value={800}>Slow</option>
          <option value={500}>Medium</option>
          <option value={200}>Fast</option>
        </select>
      </div>

      <div className="flex items-end justify-center gap-2 h-36 mb-4">
        {array.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-10 rounded-t transition-all duration-300 ${getBarColor(bar.state)}`}
              style={{ height: `${bar.value * 1.4}px` }}
            />
            <span className="text-xs mt-1 font-mono">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span>Left</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span>Right</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Merging</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Merged</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={() => generateArray()} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-sm font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); setArray(steps[currentStep + 1]) }}}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Divide → Sort → Merge | Step {currentStep + 1}/{steps.length}
      </p>
    </div>
  )
}
