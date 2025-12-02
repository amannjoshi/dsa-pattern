'use client'

import { useState } from 'react'

// Complexity Graph Visualizer - Shows growth rates
export function ComplexityGraphVisualizer() {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null)
  
  const width = 400
  const height = 300
  const padding = 40
  const graphWidth = width - padding * 2
  const graphHeight = height - padding * 2

  // Calculate y position (inverted for SVG)
  const getY = (value: number, maxValue: number) => {
    return padding + graphHeight - (value / maxValue) * graphHeight
  }

  // Generate points for each complexity
  const maxN = 20
  const maxValue = 150

  const complexities = [
    {
      name: 'O(1)',
      color: '#22c55e',
      description: 'Constant - Best!',
      example: 'Array access, hash lookup',
      points: Array.from({ length: maxN }, (_, i) => ({ x: i + 1, y: 1 }))
    },
    {
      name: 'O(log n)',
      color: '#3b82f6',
      description: 'Logarithmic - Excellent',
      example: 'Binary search',
      points: Array.from({ length: maxN }, (_, i) => ({ x: i + 1, y: Math.log2(i + 1) * 3 }))
    },
    {
      name: 'O(n)',
      color: '#eab308',
      description: 'Linear - Good',
      example: 'Single loop, linear search',
      points: Array.from({ length: maxN }, (_, i) => ({ x: i + 1, y: (i + 1) * 3 }))
    },
    {
      name: 'O(n log n)',
      color: '#f97316',
      description: 'Linearithmic - Decent',
      example: 'Merge sort, quick sort',
      points: Array.from({ length: maxN }, (_, i) => ({ x: i + 1, y: (i + 1) * Math.log2(i + 1) * 1.5 }))
    },
    {
      name: 'O(n²)',
      color: '#ef4444',
      description: 'Quadratic - Slow',
      example: 'Nested loops, bubble sort',
      points: Array.from({ length: maxN }, (_, i) => ({ x: i + 1, y: Math.pow(i + 1, 2) * 0.4 }))
    },
    {
      name: 'O(2ⁿ)',
      color: '#dc2626',
      description: 'Exponential - Very Slow!',
      example: 'Recursive fibonacci, subsets',
      points: Array.from({ length: 10 }, (_, i) => ({ x: i + 1, y: Math.pow(2, i) * 0.15 }))
    },
  ]

  const generatePath = (points: { x: number, y: number }[]) => {
    return points
      .map((p, i) => {
        const x = padding + (p.x / maxN) * graphWidth
        const y = getY(Math.min(p.y, maxValue), maxValue)
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
      <h4 className="text-sm font-semibold text-violet-400 mb-4">Time Complexity Growth Comparison</h4>
      
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Graph */}
        <div className="flex-1">
          <svg width={width} height={height} className="w-full max-w-[400px] mx-auto">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <g key={ratio}>
                <line
                  x1={padding}
                  y1={padding + graphHeight * ratio}
                  x2={width - padding}
                  y2={padding + graphHeight * ratio}
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="4"
                />
                <line
                  x1={padding + graphWidth * ratio}
                  y1={padding}
                  x2={padding + graphWidth * ratio}
                  y2={height - padding}
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="4"
                />
              </g>
            ))}

            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

            {/* Axis labels */}
            <text x={width / 2} y={height - 8} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">Input Size (n)</text>
            <text x={12} y={height / 2} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" transform={`rotate(-90, 12, ${height / 2})`}>Time</text>

            {/* Complexity lines */}
            {complexities.map((c) => (
              <path
                key={c.name}
                d={generatePath(c.points)}
                fill="none"
                stroke={c.color}
                strokeWidth={hoveredLine === c.name ? 4 : 2}
                opacity={hoveredLine && hoveredLine !== c.name ? 0.3 : 1}
                className="transition-all duration-200"
                onMouseEnter={() => setHoveredLine(c.name)}
                onMouseLeave={() => setHoveredLine(null)}
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="lg:w-48 space-y-2">
          {complexities.map((c) => (
            <div
              key={c.name}
              className={`p-2 rounded-lg cursor-pointer transition-all ${
                hoveredLine === c.name ? 'bg-white/10 scale-105' : 'bg-white/5'
              }`}
              onMouseEnter={() => setHoveredLine(c.name)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="font-mono text-sm font-bold">{c.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Hover over lines or legend to highlight. Lower is better!
      </p>
    </div>
  )
}

// Asymptotic Notations Visualizer
export function AsymptoticNotationsVisualizer() {
  const [activeNotation, setActiveNotation] = useState<'O' | 'Ω' | 'Θ'>('O')

  const width = 350
  const height = 200
  const padding = 30

  const notations = {
    'O': {
      name: 'Big O (Upper Bound)',
      color: '#ef4444',
      description: 'Worst-case scenario. Function will never exceed this growth rate.',
      formula: 'f(n) ≤ c·g(n) for n ≥ n₀',
      example: 'If algorithm is O(n²), it will take at most n² steps.',
    },
    'Ω': {
      name: 'Big Omega (Lower Bound)',
      color: '#22c55e',
      description: 'Best-case scenario. Function will always be at least this growth rate.',
      formula: 'f(n) ≥ c·g(n) for n ≥ n₀',
      example: 'If algorithm is Ω(n), it needs at least n steps.',
    },
    'Θ': {
      name: 'Big Theta (Tight Bound)',
      color: '#3b82f6',
      description: 'Exact bound. Function grows exactly at this rate.',
      formula: 'c₁·g(n) ≤ f(n) ≤ c₂·g(n)',
      example: 'If algorithm is Θ(n), it always takes ~n steps.',
    },
  }

  const current = notations[activeNotation]

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
      <h4 className="text-sm font-semibold text-blue-400 mb-4">Asymptotic Notations</h4>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(['O', 'Ω', 'Θ'] as const).map((notation) => (
          <button
            key={notation}
            onClick={() => setActiveNotation(notation)}
            className={`px-4 py-2 rounded-lg font-mono text-lg font-bold transition-all ${
              activeNotation === notation
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {notation}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="flex flex-col md:flex-row gap-4">
        <svg width={width} height={height} className="w-full max-w-[350px]">
          {/* Axes */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

          {/* Function f(n) - the actual function */}
          <path
            d={`M ${padding} ${height - padding} Q ${width / 2} ${padding + 20} ${width - padding} ${padding + 40}`}
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
          />
          <text x={width - padding + 5} y={padding + 45} fill="#a855f7" fontSize="12">f(n)</text>

          {/* Bound line(s) */}
          {activeNotation === 'O' && (
            <>
              <path
                d={`M ${padding} ${height - padding} Q ${width / 2} ${padding - 10} ${width - padding} ${padding}`}
                fill="none"
                stroke={current.color}
                strokeWidth="2"
                strokeDasharray="6"
              />
              <text x={width - padding + 5} y={padding + 5} fill={current.color} fontSize="12">c·g(n)</text>
              {/* Shaded area above */}
              <path
                d={`M ${padding} ${padding} L ${padding} ${height - padding} Q ${width / 2} ${padding - 10} ${width - padding} ${padding} L ${width - padding} ${padding} Z`}
                fill={current.color}
                opacity="0.1"
              />
            </>
          )}

          {activeNotation === 'Ω' && (
            <>
              <path
                d={`M ${padding} ${height - padding} Q ${width / 2} ${height - padding - 30} ${width - padding} ${padding + 80}`}
                fill="none"
                stroke={current.color}
                strokeWidth="2"
                strokeDasharray="6"
              />
              <text x={width - padding + 5} y={padding + 85} fill={current.color} fontSize="12">c·g(n)</text>
            </>
          )}

          {activeNotation === 'Θ' && (
            <>
              {/* Upper bound */}
              <path
                d={`M ${padding} ${height - padding} Q ${width / 2} ${padding - 10} ${width - padding} ${padding}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="6"
              />
              {/* Lower bound */}
              <path
                d={`M ${padding} ${height - padding} Q ${width / 2} ${height - padding - 30} ${width - padding} ${padding + 80}`}
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6"
              />
              <text x={width - padding + 5} y={padding + 5} fill="#ef4444" fontSize="10">c₂·g(n)</text>
              <text x={width - padding + 5} y={padding + 85} fill="#22c55e" fontSize="10">c₁·g(n)</text>
            </>
          )}

          {/* Labels */}
          <text x={width / 2} y={height - 5} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">n</text>
        </svg>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <h5 className="font-semibold" style={{ color: current.color }}>{current.name}</h5>
          <p className="text-sm text-muted-foreground">{current.description}</p>
          <div className="p-2 bg-black/30 rounded font-mono text-sm">{current.formula}</div>
          <p className="text-xs text-muted-foreground">
            <strong>Example:</strong> {current.example}
          </p>
        </div>
      </div>
    </div>
  )
}

// Common Complexities with Examples
export function ComplexityExamplesVisualizer() {
  const complexities = [
    {
      notation: 'O(1)',
      name: 'Constant',
      color: '#22c55e',
      examples: ['Array access: arr[i]', 'Hash table lookup', 'Push/Pop from stack'],
      code: `// O(1) - Same time regardless of input size
int getFirst(vector<int>& arr) {
    return arr[0];  // Always 1 operation
}`
    },
    {
      notation: 'O(log n)',
      name: 'Logarithmic',
      color: '#3b82f6',
      examples: ['Binary search', 'Finding in BST', 'Divide & conquer splits'],
      code: `// O(log n) - Halves input each step
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
    },
    {
      notation: 'O(n)',
      name: 'Linear',
      color: '#eab308',
      examples: ['Linear search', 'Single for loop', 'Find max/min'],
      code: `// O(n) - One pass through all elements
int findMax(vector<int>& arr) {
    int maxVal = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}`
    },
    {
      notation: 'O(n log n)',
      name: 'Linearithmic',
      color: '#f97316',
      examples: ['Merge sort', 'Quick sort (avg)', 'Heap sort'],
      code: `// O(n log n) - Divide and merge
void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);     // log n splits
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);      // n merges
    }
}`
    },
    {
      notation: 'O(n²)',
      name: 'Quadratic',
      color: '#ef4444',
      examples: ['Bubble sort', 'Nested loops', 'Check all pairs'],
      code: `// O(n²) - Nested loops
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {        // n times
        for (int j = 0; j < n-i-1; j++) { // n times
            if (arr[j] > arr[j+1])
                swap(arr[j], arr[j+1]);
        }
    }
}`
    },
    {
      notation: 'O(2ⁿ)',
      name: 'Exponential',
      color: '#dc2626',
      examples: ['Recursive fibonacci', 'All subsets', 'Backtracking (worst)'],
      code: `// O(2ⁿ) - Doubles with each increase
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);  // 2 calls each
}
// fib(5) = 15 calls, fib(10) = 177 calls!`
    },
  ]

  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = complexities[selectedIdx]

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
      <h4 className="text-sm font-semibold text-amber-400 mb-4">Common Time Complexities</h4>

      {/* Complexity Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {complexities.map((c, idx) => (
          <button
            key={c.notation}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3 py-1.5 rounded-full font-mono text-sm font-bold transition-all ${
              selectedIdx === idx
                ? 'scale-105'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{ 
              backgroundColor: selectedIdx === idx ? c.color : 'rgba(255,255,255,0.1)',
              color: selectedIdx === idx ? 'white' : c.color
            }}
          >
            {c.notation}
          </button>
        ))}
      </div>

      {/* Selected complexity details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <h5 className="font-semibold text-lg" style={{ color: selected.color }}>
              {selected.notation} - {selected.name}
            </h5>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-2">Examples:</p>
            <ul className="space-y-1">
              {selected.examples.map((ex, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span style={{ color: selected.color }}>•</span> {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
          <div className="px-3 py-1.5 bg-zinc-800/50 border-b border-zinc-800">
            <span className="text-xs text-muted-foreground">C++ Example</span>
          </div>
          <pre className="p-3 text-xs overflow-x-auto">
            <code className="text-gray-300">{selected.code}</code>
          </pre>
        </div>
      </div>

      {/* Ranking */}
      <div className="mt-4 p-3 bg-black/20 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Efficiency Ranking (Best → Worst):</p>
        <div className="flex flex-wrap items-center gap-2">
          {complexities.map((c, idx) => (
            <span key={c.notation} className="flex items-center gap-1">
              <span className="font-mono text-sm" style={{ color: c.color }}>{c.notation}</span>
              {idx < complexities.length - 1 && <span className="text-muted-foreground">&lt;</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Master Theorem Visualizer
export function MasterTheoremVisualizer() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(2)
  const [k, setK] = useState(0)

  const logba = Math.log(a) / Math.log(b)
  
  let result: string
  let caseNum: number
  let explanation: string

  if (k < logba) {
    caseNum = 1
    result = `Θ(n^${logba.toFixed(2)})`
    explanation = `Since k (${k}) < log_b(a) (${logba.toFixed(2)}), work at leaves dominates.`
  } else if (Math.abs(k - logba) < 0.01) {
    caseNum = 2
    result = `Θ(n^${k} log n)`
    explanation = `Since k (${k}) = log_b(a) (${logba.toFixed(2)}), work is evenly distributed.`
  } else {
    caseNum = 3
    result = `Θ(n^${k})`
    explanation = `Since k (${k}) > log_b(a) (${logba.toFixed(2)}), work at root dominates.`
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
      <h4 className="text-sm font-semibold text-pink-400 mb-4">Master Theorem Calculator</h4>

      <div className="mb-4 p-3 bg-black/30 rounded-lg">
        <p className="text-sm mb-2">For recurrence relation:</p>
        <p className="font-mono text-lg text-center">T(n) = aT(n/b) + O(n^k)</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">a (subproblems)</label>
          <input
            type="range"
            min="1"
            max="8"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center font-mono text-lg">{a}</p>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">b (division factor)</label>
          <input
            type="range"
            min="2"
            max="8"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center font-mono text-lg">{b}</p>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">k (merge cost exponent)</label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.5"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center font-mono text-lg">{k}</p>
        </div>
      </div>

      <div className="p-4 bg-black/30 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">log_b(a):</span>
          <span className="font-mono">{logba.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Case:</span>
          <span className="font-bold text-pink-400">Case {caseNum}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Result:</span>
          <span className="font-mono text-lg text-green-400">{result}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{explanation}</p>
      </div>

      <div className="mt-4 text-xs text-muted-foreground space-y-1">
        <p><strong>Examples:</strong></p>
        <p>• Merge Sort: T(n) = 2T(n/2) + O(n) → a=2, b=2, k=1 → Case 2 → Θ(n log n)</p>
        <p>• Binary Search: T(n) = T(n/2) + O(1) → a=1, b=2, k=0 → Case 2 → Θ(log n)</p>
      </div>
    </div>
  )
}

// Space Complexity Visualizer
export function SpaceComplexityVisualizer() {
  const [showRecursion, setShowRecursion] = useState(false)

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
      <h4 className="text-sm font-semibold text-emerald-400 mb-4">Space Complexity Visualization</h4>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowRecursion(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !showRecursion ? 'bg-emerald-500/30 text-emerald-400' : 'bg-white/5'
          }`}
        >
          Iterative (O(1))
        </button>
        <button
          onClick={() => setShowRecursion(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showRecursion ? 'bg-emerald-500/30 text-emerald-400' : 'bg-white/5'
          }`}
        >
          Recursive (O(n))
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Memory visualization */}
        <div className="p-4 bg-black/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-3">Memory Stack</p>
          <div className="space-y-1">
            {showRecursion ? (
              <>
                {[5, 4, 3, 2, 1].map((n, i) => (
                  <div
                    key={n}
                    className="h-8 flex items-center justify-center rounded text-sm font-mono"
                    style={{
                      backgroundColor: `rgba(16, 185, 129, ${0.2 + i * 0.15})`,
                      animation: `slideIn 0.3s ease-out ${i * 0.1}s both`
                    }}
                  >
                    fib({n})
                  </div>
                ))}
                <p className="text-xs text-center text-red-400 mt-2">
                  O(n) stack frames! Each call uses memory.
                </p>
              </>
            ) : (
              <>
                <div className="h-8 flex items-center justify-center rounded text-sm font-mono bg-emerald-500/30">
                  i, sum, temp
                </div>
                <p className="text-xs text-center text-green-400 mt-2">
                  O(1) - Only fixed variables, regardless of n!
                </p>
              </>
            )}
          </div>
        </div>

        {/* Code comparison */}
        <div className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
          <div className="px-3 py-1.5 bg-zinc-800/50 border-b border-zinc-800">
            <span className="text-xs text-muted-foreground">
              {showRecursion ? 'Recursive - O(n) space' : 'Iterative - O(1) space'}
            </span>
          </div>
          <pre className="p-3 text-xs overflow-x-auto">
            <code className="text-gray-300">
              {showRecursion
                ? `// O(n) space due to call stack
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
// Each call adds to stack!`
                : `// O(1) space - constant
int fib(int n) {
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`
              }
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-4 p-3 bg-black/20 rounded-lg text-xs">
        <p className="font-semibold mb-1">Space Complexity Types:</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• <span className="text-green-400">O(1)</span>: Fixed variables (best)</li>
          <li>• <span className="text-yellow-400">O(log n)</span>: Recursive binary search</li>
          <li>• <span className="text-orange-400">O(n)</span>: Arrays, recursion depth</li>
          <li>• <span className="text-red-400">O(n²)</span>: 2D arrays, adjacency matrix</li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
