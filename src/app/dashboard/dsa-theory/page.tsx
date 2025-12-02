import Link from 'next/link'
import { 
  BookOpen, 
  Layers, 
  GitBranch, 
  Binary, 
  Network, 
  FileCode2,
  Download,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

const dsaTopics = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Learn about contiguous memory storage and array operations',
    icon: Layers,
    color: 'blue',
    topics: 5,
    href: '/dashboard/dsa-theory/arrays'
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    description: 'Understand nodes, pointers, and dynamic data structures',
    icon: GitBranch,
    color: 'green',
    topics: 6,
    href: '/dashboard/dsa-theory/linked-list'
  },
  {
    id: 'stack-queue',
    title: 'Stack & Queue',
    description: 'LIFO and FIFO data structures with real-world applications',
    icon: Layers,
    color: 'purple',
    topics: 4,
    href: '/dashboard/dsa-theory/stack-queue'
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Hierarchical data structures - Binary Trees, BST, Traversals',
    icon: Network,
    color: 'orange',
    topics: 4,
    href: '/dashboard/dsa-theory/trees'
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Networks, BFS, DFS, Cycle Detection, Topological Sort',
    icon: Network,
    color: 'pink',
    topics: 6,
    href: '/dashboard/dsa-theory/graphs'
  },
  {
    id: 'stl',
    title: 'C++ STL',
    description: 'Standard Template Library - vectors, maps, sets, and more',
    icon: FileCode2,
    color: 'cyan',
    topics: 7,
    href: '/dashboard/dsa-theory/stl'
  },
]

const algorithms = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Bubble, Selection, Insertion, Merge, Quick, Counting Sort',
    icon: Binary,
    color: 'teal',
    topics: 8,
    href: '/dashboard/dsa-theory/sorting'
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    description: 'Linear Search, Binary Search, Bounds, 2D Matrix Search',
    icon: Binary,
    color: 'cyan',
    topics: 6,
    href: '/dashboard/dsa-theory/searching'
  },
  {
    id: 'recursion',
    title: 'Recursion & Backtracking',
    description: 'N-Queens, Sudoku Solver, Permutations, Combinations',
    icon: GitBranch,
    color: 'indigo',
    topics: 6,
    href: '/dashboard/dsa-theory/recursion'
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Knapsack, LCS, LIS, Grid DP, Coin Change and more',
    icon: Layers,
    color: 'rose',
    topics: 7,
    href: '/dashboard/dsa-theory/dynamic-programming'
  },
]

const colorClasses: Record<string, { bg: string, text: string, border: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  green: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-500', border: 'border-pink-500/30' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/30' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-500', border: 'border-teal-500/30' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/30' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/30' },
}

export default function DSATheoryPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              DSA Theory
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Master Data Structures & Algorithms with simple explanations and C++ code examples.
          </p>
        </div>
        
        {/* Download Notes Button */}
        <a 
          href="/notes/DSA.pdf" 
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Complete Notes
        </a>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
          <p className="text-2xl font-bold text-blue-500">6</p>
          <p className="text-sm text-muted-foreground">Data Structures</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
          <p className="text-2xl font-bold text-green-500">4</p>
          <p className="text-sm text-muted-foreground">Algorithm Types</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
          <p className="text-2xl font-bold text-purple-500">50+</p>
          <p className="text-sm text-muted-foreground">Topics Covered</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
          <p className="text-2xl font-bold text-orange-500">C++</p>
          <p className="text-sm text-muted-foreground">Code Examples</p>
        </div>
      </div>

      {/* Data Structures Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          Data Structures
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dsaTopics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
              className={`group p-5 rounded-xl border ${colorClasses[topic.color].border} ${colorClasses[topic.color].bg} hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${colorClasses[topic.color].bg}`}>
                  <topic.icon className={`w-5 h-5 ${colorClasses[topic.color].text}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{topic.topics} topics</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Algorithms Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Binary className="w-5 h-5 text-red-500" />
          Algorithms
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {algorithms.map((algo) => (
            <Link
              key={algo.id}
              href={algo.href}
              className={`group p-5 rounded-xl border ${colorClasses[algo.color].border} ${colorClasses[algo.color].bg} hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${colorClasses[algo.color].bg}`}>
                  <algo.icon className={`w-5 h-5 ${colorClasses[algo.color].text}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-semibold mb-1">{algo.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{algo.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{algo.topics} topics</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Learn DSA */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Why Learn DSA?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Crack Tech Interviews</p>
              <p className="text-sm text-muted-foreground">MAANG companies focus heavily on DSA</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Write Efficient Code</p>
              <p className="text-sm text-muted-foreground">Optimize time and space complexity</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Problem Solving Skills</p>
              <p className="text-sm text-muted-foreground">Think logically and break down problems</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Competitive Programming</p>
              <p className="text-sm text-muted-foreground">Excel in coding competitions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
