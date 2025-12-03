'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, Clock, Code2, BookOpen, Gauge, Timer, HardDrive } from 'lucide-react'

// Lazy load visualizers - only loads when needed
const ComplexityGraphVisualizer = dynamic(
  () => import('@/components/dsa-theory/ComplexityVisualizer').then(mod => ({ default: mod.ComplexityGraphVisualizer })),
  { loading: () => <div className="h-80 animate-pulse bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Loading Visualizer...</div>, ssr: false }
)

const AsymptoticNotationsVisualizer = dynamic(
  () => import('@/components/dsa-theory/ComplexityVisualizer').then(mod => ({ default: mod.AsymptoticNotationsVisualizer })),
  { loading: () => <div className="h-64 animate-pulse bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Loading Visualizer...</div>, ssr: false }
)

const ComplexityExamplesVisualizer = dynamic(
  () => import('@/components/dsa-theory/ComplexityVisualizer').then(mod => ({ default: mod.ComplexityExamplesVisualizer })),
  { loading: () => <div className="h-64 animate-pulse bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Loading Visualizer...</div>, ssr: false }
)

const SpaceComplexityVisualizer = dynamic(
  () => import('@/components/dsa-theory/ComplexityVisualizer').then(mod => ({ default: mod.SpaceComplexityVisualizer })),
  { loading: () => <div className="h-64 animate-pulse bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Loading Visualizer...</div>, ssr: false }
)

const topics = [
  {
    id: 1,
    title: 'What is Time Complexity?',
    visualizer: 'graph' as const,
    content: `**Time Complexity** measures how the runtime of an algorithm grows as input size increases.

**Why it matters:**
- Helps compare algorithms objectively
- Predicts performance for large inputs
- Essential for interviews and competitive programming

**Key Points:**
- We measure **operations**, not actual time (time varies by machine)
- Focus on **worst-case** (Big O) usually
- Ignore constants and lower-order terms: O(2n + 100) = O(n)

**Example:**
- Array search: Check each element → O(n)
- Binary search: Halve each step → O(log n)
- Nested loops: n × n iterations → O(n²)`,
    code: `// How to count operations?

// O(1) - Constant: Same operations regardless of n
int first = arr[0];  // 1 operation

// O(n) - Linear: Operations grow with n
for (int i = 0; i < n; i++) {  // n operations
    cout << arr[i];
}

// O(n²) - Quadratic: Nested loops
for (int i = 0; i < n; i++) {      // n
    for (int j = 0; j < n; j++) {  // × n
        cout << i + j;              // = n² operations
    }
}

// O(log n) - Logarithmic: Halving
while (n > 1) {  // log₂(n) times
    n = n / 2;
}`,
    complexity: 'Time Complexity measures algorithm efficiency'
  },
  {
    id: 2,
    title: 'Asymptotic Notations',
    visualizer: 'asymptotic' as const,
    content: `**Asymptotic Notation** describes the limiting behavior of a function as input approaches infinity.

**Three Main Notations:**

**1. Big O (O) - Upper Bound**
- Worst-case scenario
- "At most this much time"
- Most commonly used
- f(n) = O(g(n)) means f(n) ≤ c·g(n) for large n

**2. Big Omega (Ω) - Lower Bound**
- Best-case scenario  
- "At least this much time"
- f(n) = Ω(g(n)) means f(n) ≥ c·g(n) for large n

**3. Big Theta (Θ) - Tight Bound**
- Exact growth rate
- "Exactly this much time"
- f(n) = Θ(g(n)) means c₁·g(n) ≤ f(n) ≤ c₂·g(n)

**Example - Linear Search:**
- Best case: Ω(1) - found at first position
- Worst case: O(n) - found at last or not found
- Average: Θ(n/2) = Θ(n)`,
    code: `// Linear Search Analysis

int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

/*
Best Case: Ω(1)
- Target is at arr[0]
- Only 1 comparison needed

Worst Case: O(n)  
- Target is at arr[n-1] or not present
- n comparisons needed

Average Case: Θ(n)
- On average, check half the array
- n/2 comparisons → still O(n)

We usually say: Linear Search is O(n)
(We report worst case with Big O)
*/`,
    complexity: 'O (Upper) | Ω (Lower) | Θ (Tight Bound)'
  },
  {
    id: 3,
    title: 'Common Time Complexities',
    visualizer: 'examples' as const,
    content: `**Time Complexity Hierarchy** (Best to Worst):

**O(1) - Constant** ⭐ Best
- Same time regardless of input
- Array access, hash table, push/pop

**O(log n) - Logarithmic** 
- Halves input each step
- Binary search, balanced BST operations

**O(n) - Linear**
- One pass through all elements
- Linear search, sum of array, single loop

**O(n log n) - Linearithmic**
- Best comparison-based sorting
- Merge sort, quick sort (average), heap sort

**O(n²) - Quadratic** 
- Nested loops over same data
- Bubble sort, check all pairs

**O(n³) - Cubic**
- Triple nested loops
- Matrix multiplication (naive)

**O(2ⁿ) - Exponential** ❌ Worst
- Doubles with each input increase
- Recursive fibonacci, all subsets

**O(n!) - Factorial** ❌ Very Worst
- All permutations
- Traveling salesman (brute force)`,
    code: `// Quick Reference

// O(1) - Constant
arr[5];  // Direct access
stack.push(x);

// O(log n) - Logarithmic
binarySearch(arr, target);
while (n > 1) n /= 2;

// O(n) - Linear
for (int x : arr) sum += x;
linearSearch(arr, target);

// O(n log n) - Linearithmic
sort(arr.begin(), arr.end());
mergeSort(arr);

// O(n²) - Quadratic
for (i = 0; i < n; i++)
    for (j = 0; j < n; j++)
        // ...

// O(2ⁿ) - Exponential
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

// Which to choose for n = 1,000,000?
// O(n²) = 1,000,000,000,000 ops ❌ Too slow!
// O(n log n) = 20,000,000 ops ✅ Fast!`,
    complexity: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)'
  },
  {
    id: 4,
    title: 'How to Calculate Time Complexity',
    visualizer: null,
    content: `**Step-by-Step Guide:**

**Rule 1: Drop Constants**
- O(2n) → O(n)
- O(100) → O(1)
- O(n/2) → O(n)

**Rule 2: Drop Lower Order Terms**
- O(n² + n) → O(n²)
- O(n³ + n² + n) → O(n³)
- O(n + log n) → O(n)

**Rule 3: Different Variables**
- If two inputs: O(a + b) or O(a × b)
- Don't simplify O(n + m) to O(n)!

**Rule 4: Loops**
- Single loop: O(n)
- Nested loop: O(n × m) or O(n²)
- Loop that halves: O(log n)

**Rule 5: Recursion**
- Count recursive calls × work per call
- Use recursion tree or Master Theorem

**Common Patterns:**
- Loop 1 to n: O(n)
- Loop 1 to n, step 2: O(n/2) = O(n)
- Loop 1 to n, multiply by 2: O(log n)
- Two nested loops: O(n²)`,
    code: `// Examples of Calculation

// Example 1: Simple loop
for (int i = 0; i < n; i++) {  // O(n)
    cout << i;                   // O(1)
}
// Total: O(n) × O(1) = O(n)

// Example 2: Nested loops
for (int i = 0; i < n; i++) {      // O(n)
    for (int j = 0; j < n; j++) {  // O(n)
        arr[i][j] = i + j;         // O(1)
    }
}
// Total: O(n) × O(n) × O(1) = O(n²)

// Example 3: Sequential loops (ADD)
for (int i = 0; i < n; i++) {...}  // O(n)
for (int j = 0; j < m; j++) {...}  // O(m)
// Total: O(n) + O(m) = O(n + m)

// Example 4: Logarithmic
for (int i = 1; i < n; i *= 2) {  // O(log n)
    cout << i;
}
// i = 1, 2, 4, 8... 2^k = n → k = log n

// Example 5: Half loop
for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {  // n-i times
        // ...
    }
}
// Total: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)`,
    complexity: 'Drop constants, keep highest order term'
  },
  {
    id: 5,
    title: 'Master Theorem',
    visualizer: null,
    content: `**Master Theorem** solves divide-and-conquer recurrences of the form:

**T(n) = aT(n/b) + O(n^k)**

Where:
- **a** = number of subproblems
- **b** = factor by which input is divided
- **n^k** = cost of dividing/merging

**Three Cases:**

**Case 1:** If k < log_b(a)
→ T(n) = **Θ(n^(log_b(a)))**
Work at leaves dominates

**Case 2:** If k = log_b(a)
→ T(n) = **Θ(n^k × log n)**
Work distributed evenly

**Case 3:** If k > log_b(a)
→ T(n) = **Θ(n^k)**
Work at root dominates

**Examples:**
- **Merge Sort**: T(n) = 2T(n/2) + n
  - a=2, b=2, k=1, log₂(2)=1
  - Case 2: k = log_b(a) → **Θ(n log n)**

- **Binary Search**: T(n) = T(n/2) + 1
  - a=1, b=2, k=0, log₂(1)=0
  - Case 2: k = log_b(a) → **Θ(log n)**`,
    code: `// Master Theorem Examples

// 1. Merge Sort: T(n) = 2T(n/2) + O(n)
void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);     // T(n/2)
        mergeSort(arr, m+1, r);   // T(n/2)
        merge(arr, l, m, r);      // O(n)
    }
}
// a=2, b=2, k=1 → log₂(2)=1=k → Case 2 → Θ(n log n)

// 2. Binary Search: T(n) = T(n/2) + O(1)
int binarySearch(vector<int>& arr, int t, int l, int r) {
    if (l > r) return -1;
    int m = (l + r) / 2;
    if (arr[m] == t) return m;
    if (arr[m] > t) return binarySearch(arr, t, l, m-1);
    return binarySearch(arr, t, m+1, r);
}
// a=1, b=2, k=0 → log₂(1)=0=k → Case 2 → Θ(log n)

// 3. Strassen's Matrix: T(n) = 7T(n/2) + O(n²)
// a=7, b=2, k=2 → log₂(7)≈2.81 > k → Case 1 → Θ(n^2.81)`,
    complexity: 'T(n) = aT(n/b) + O(n^k)'
  },
  {
    id: 6,
    title: 'Space Complexity',
    visualizer: 'space' as const,
    content: `**Space Complexity** measures the memory an algorithm uses relative to input size.

**Types of Space:**

**1. Auxiliary Space**
- Extra space used (excluding input)
- What we usually measure

**2. Total Space**
- Input space + Auxiliary space

**Common Space Complexities:**

**O(1) - Constant** ✅ Best
- Fixed number of variables
- In-place algorithms (swap, selection sort)

**O(log n) - Logarithmic**
- Recursive binary search (call stack)
- Divide and conquer stack depth

**O(n) - Linear**
- Creating a copy of array
- Recursion with n depth
- Hash map storage

**O(n²) - Quadratic**
- 2D matrix/grid
- Adjacency matrix for graphs

**Space vs Time Tradeoff:**
Often we trade space for time:
- Use hash map (O(n) space) to get O(1) lookup
- Memoization uses space to avoid recomputation`,
    code: `// Space Complexity Examples

// O(1) - Constant Space
void swap(int& a, int& b) {
    int temp = a;  // Just 1 extra variable
    a = b;
    b = temp;
}

// O(n) - Linear Space
vector<int> copy(vector<int>& arr) {
    vector<int> result(arr.size());  // n elements
    for (int i = 0; i < arr.size(); i++) {
        result[i] = arr[i];
    }
    return result;
}

// O(n) - Recursion Call Stack
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // n stack frames!
}

// O(1) vs O(n) - Same problem, different space
// Fibonacci O(n) space
int fibRecursive(int n) {  // O(n) stack space
    if (n <= 1) return n;
    return fibRecursive(n-1) + fibRecursive(n-2);
}

// Fibonacci O(1) space ✅ Better!
int fibIterative(int n) {
    int a = 0, b = 1;  // Only 2 variables
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
    complexity: 'Auxiliary Space: Extra memory used by algorithm'
  }
]

export default function ComplexityPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <Link 
          href="/dashboard/dsa-theory" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to DSA Theory
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <Gauge className="w-6 h-6 text-violet-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Time & Space Complexity
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Understand algorithm efficiency with Big O notation, asymptotic analysis & Master Theorem.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-violet-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Timer className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">50</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Code2 className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
          <p className="text-lg font-bold">C++</p>
          <p className="text-xs text-muted-foreground">Language</p>
        </div>
      </div>

      {/* Complexity Comparison Overview */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-violet-400" />
          Quick Complexity Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3">Complexity</th>
                <th className="text-left py-2 px-3">Name</th>
                <th className="text-left py-2 px-3">n=10</th>
                <th className="text-left py-2 px-3">n=100</th>
                <th className="text-left py-2 px-3">n=1000</th>
                <th className="text-left py-2 px-3">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 font-mono text-green-400">O(1)</td>
                <td className="py-2 px-3">Constant</td>
                <td className="py-2 px-3">1</td>
                <td className="py-2 px-3">1</td>
                <td className="py-2 px-3">1</td>
                <td className="py-2 px-3 text-muted-foreground">Array access</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 font-mono text-blue-400">O(log n)</td>
                <td className="py-2 px-3">Logarithmic</td>
                <td className="py-2 px-3">3</td>
                <td className="py-2 px-3">7</td>
                <td className="py-2 px-3">10</td>
                <td className="py-2 px-3 text-muted-foreground">Binary search</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 font-mono text-yellow-400">O(n)</td>
                <td className="py-2 px-3">Linear</td>
                <td className="py-2 px-3">10</td>
                <td className="py-2 px-3">100</td>
                <td className="py-2 px-3">1,000</td>
                <td className="py-2 px-3 text-muted-foreground">Single loop</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 font-mono text-orange-400">O(n log n)</td>
                <td className="py-2 px-3">Linearithmic</td>
                <td className="py-2 px-3">33</td>
                <td className="py-2 px-3">664</td>
                <td className="py-2 px-3">9,966</td>
                <td className="py-2 px-3 text-muted-foreground">Merge sort</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 font-mono text-red-400">O(n²)</td>
                <td className="py-2 px-3">Quadratic</td>
                <td className="py-2 px-3">100</td>
                <td className="py-2 px-3">10,000</td>
                <td className="py-2 px-3">1,000,000</td>
                <td className="py-2 px-3 text-muted-foreground">Nested loops</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-red-600">O(2ⁿ)</td>
                <td className="py-2 px-3">Exponential</td>
                <td className="py-2 px-3">1,024</td>
                <td className="py-2 px-3">10³⁰</td>
                <td className="py-2 px-3">∞</td>
                <td className="py-2 px-3 text-muted-foreground">Recursive fib</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div 
            key={topic.id}
            className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{topic.complexity}</span>
                </div>
              </div>
              {topic.visualizer && (
                <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-400 font-medium">
                  Interactive
                </span>
              )}
            </div>

            {/* Visualizers */}
            {topic.visualizer === 'graph' && (
              <div className="mb-4">
                <ComplexityGraphVisualizer />
              </div>
            )}
            {topic.visualizer === 'asymptotic' && (
              <div className="mb-4">
                <AsymptoticNotationsVisualizer />
              </div>
            )}
            {topic.visualizer === 'examples' && (
              <div className="mb-4">
                <ComplexityExamplesVisualizer />
              </div>
            )}
            {topic.visualizer === 'space' && (
              <div className="mb-4">
                <SpaceComplexityVisualizer />
              </div>
            )}

            <div className="mb-4">
              <div 
                className="text-sm text-muted-foreground prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: topic.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                    .replace(/\n\n/g, '</p><p class="mt-3">')
                    .replace(/\n/g, '<br/>')
                }}
              />
            </div>

            <div className="rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
                <span className="text-xs text-muted-foreground font-medium">C++ Code</span>
                <Code2 className="w-4 h-4 text-cyan-500" />
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{topic.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
