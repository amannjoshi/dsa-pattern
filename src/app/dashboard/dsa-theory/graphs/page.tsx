'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, Share2, Clock, Code2, BookOpen, CheckCircle2 } from 'lucide-react'

// Lazy load visualizers - only loads when scrolled to
const TopologicalSortVisualizer = dynamic(
  () => import('@/components/dsa-theory/GraphVisualizer').then(mod => ({ default: mod.TopologicalSortVisualizer })),
  { loading: () => <div className="h-96 animate-pulse bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Loading Visualizer...</div>, ssr: false }
)

const BFSVisualizer = dynamic(
  () => import('@/components/dsa-theory/GraphVisualizer').then(mod => ({ default: mod.BFSVisualizer })),
  { loading: () => <div className="h-80 animate-pulse bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Loading Visualizer...</div>, ssr: false }
)

const DFSVisualizer = dynamic(
  () => import('@/components/dsa-theory/GraphVisualizer').then(mod => ({ default: mod.DFSVisualizer })),
  { loading: () => <div className="h-80 animate-pulse bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">Loading Visualizer...</div>, ssr: false }
)

const topics = [
  {
    id: 1,
    title: 'What is a Graph?',
    content: `A **Graph** is a non-linear data structure consisting of **vertices (nodes)** and **edges (connections)**.

**Key Terminology:**
- **Vertex (Node)**: A point in the graph
- **Edge**: Connection between two vertices
- **Adjacent**: Two vertices connected by an edge
- **Degree**: Number of edges connected to a vertex
- **Path**: Sequence of vertices connected by edges
- **Cycle**: Path that starts and ends at same vertex

**Types of Graphs:**
1. **Directed Graph (Digraph)**: Edges have direction (A → B)
2. **Undirected Graph**: Edges have no direction (A — B)
3. **Weighted Graph**: Edges have values (distances, costs)
4. **Unweighted Graph**: All edges are equal

**Real-life examples:**
- Social networks (Friends connections)
- Maps (Cities and roads)
- Internet (Websites and links)
- Flight routes (Airports and flights)`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Graph using Adjacency List (most common)
class Graph {
public:
    int V;  // Number of vertices
    vector<vector<int>> adj;  // Adjacency list
    
    Graph(int vertices) {
        V = vertices;
        adj.resize(V);
    }
    
    // Add edge (undirected)
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);  // Remove for directed graph
    }
    
    // Print graph
    void printGraph() {
        for (int i = 0; i < V; i++) {
            cout << "Vertex " << i << " -> ";
            for (int neighbor : adj[i]) {
                cout << neighbor << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    // Create a graph with 5 vertices
    Graph g(5);
    
    g.addEdge(0, 1);
    g.addEdge(0, 4);
    g.addEdge(1, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 3);
    g.addEdge(3, 4);
    
    g.printGraph();
    
    return 0;
}`,
    complexity: 'Adjacency List: Space O(V + E), Add Edge O(1)'
  },
  {
    id: 2,
    title: 'Graph Representations',
    content: `There are two main ways to represent a graph in code:

**1. Adjacency Matrix:**
- 2D array of size V × V
- matrix[i][j] = 1 if edge exists between i and j
- Good for: Dense graphs, quick edge lookup
- Space: O(V²)

**2. Adjacency List:**
- Array of lists
- Each vertex stores list of its neighbors
- Good for: Sparse graphs, memory efficient
- Space: O(V + E)

**When to use which?**
- Dense graph (many edges): Adjacency Matrix
- Sparse graph (few edges): Adjacency List
- Most real-world graphs are sparse, so **Adjacency List is preferred**

**Edge List:**
- Simple list of all edges as pairs
- Used for: Algorithms like Kruskal's MST`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Method 1: Adjacency Matrix
class GraphMatrix {
public:
    int V;
    vector<vector<int>> matrix;
    
    GraphMatrix(int v) {
        V = v;
        matrix.assign(V, vector<int>(V, 0));
    }
    
    void addEdge(int u, int v) {
        matrix[u][v] = 1;
        matrix[v][u] = 1;  // For undirected
    }
    
    bool hasEdge(int u, int v) {
        return matrix[u][v] == 1;
    }
    
    void print() {
        cout << "Adjacency Matrix:" << endl;
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                cout << matrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};

// Method 2: Adjacency List
class GraphList {
public:
    int V;
    vector<vector<int>> adj;
    
    GraphList(int v) {
        V = v;
        adj.resize(V);
    }
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    void print() {
        cout << "Adjacency List:" << endl;
        for (int i = 0; i < V; i++) {
            cout << i << " -> ";
            for (int x : adj[i]) cout << x << " ";
            cout << endl;
        }
    }
};

int main() {
    // Graph: 0-1, 0-2, 1-2, 2-3
    
    GraphMatrix gm(4);
    gm.addEdge(0, 1);
    gm.addEdge(0, 2);
    gm.addEdge(1, 2);
    gm.addEdge(2, 3);
    gm.print();
    
    cout << endl;
    
    GraphList gl(4);
    gl.addEdge(0, 1);
    gl.addEdge(0, 2);
    gl.addEdge(1, 2);
    gl.addEdge(2, 3);
    gl.print();
    
    return 0;
}`,
    complexity: 'Matrix: O(V²) space | List: O(V + E) space'
  },
  {
    id: 3,
    title: 'BFS - Breadth First Search',
    visualizer: 'bfs' as const,
    content: `**BFS** explores graph level by level, like ripples in water.

**How it works:**
1. Start from a source vertex
2. Visit all neighbors first (level 1)
3. Then visit neighbors of neighbors (level 2)
4. Continue until all reachable vertices visited

**Uses Queue** (FIFO) to track vertices to visit.

**Applications:**
- Finding shortest path (unweighted graph)
- Level order traversal
- Finding connected components
- Checking if graph is bipartite
- Social network: Finding people within 2 connections

**Key Points:**
- Time: O(V + E)
- Space: O(V) for queue and visited array
- Gives **shortest path** in unweighted graphs`,
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;
    
    Graph(int v) : V(v) {
        adj.resize(V);
    }
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // BFS from source vertex
    void BFS(int source) {
        vector<bool> visited(V, false);
        queue<int> q;
        
        visited[source] = true;
        q.push(source);
        
        cout << "BFS starting from " << source << ": ";
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            cout << curr << " ";
            
            // Visit all unvisited neighbors
            for (int neighbor : adj[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        cout << endl;
    }
    
    // BFS to find shortest path
    void shortestPath(int source, int dest) {
        vector<int> dist(V, -1);
        vector<int> parent(V, -1);
        queue<int> q;
        
        dist[source] = 0;
        q.push(source);
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            
            for (int neighbor : adj[curr]) {
                if (dist[neighbor] == -1) {
                    dist[neighbor] = dist[curr] + 1;
                    parent[neighbor] = curr;
                    q.push(neighbor);
                }
            }
        }
        
        if (dist[dest] == -1) {
            cout << "No path exists" << endl;
            return;
        }
        
        cout << "Shortest distance: " << dist[dest] << endl;
        
        // Print path
        vector<int> path;
        for (int v = dest; v != -1; v = parent[v]) {
            path.push_back(v);
        }
        
        cout << "Path: ";
        for (int i = path.size() - 1; i >= 0; i--) {
            cout << path[i];
            if (i > 0) cout << " -> ";
        }
        cout << endl;
    }
};

int main() {
    Graph g(6);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 3);
    g.addEdge(3, 4);
    g.addEdge(4, 5);
    
    g.BFS(0);  // 0 1 2 3 4 5
    g.shortestPath(0, 5);  // Distance: 4, Path: 0 -> 1 -> 3 -> 4 -> 5
    
    return 0;
}`,
    complexity: 'Time: O(V + E) | Space: O(V)'
  },
  {
    id: 4,
    title: 'DFS - Depth First Search',
    visualizer: 'dfs' as const,
    content: `**DFS** explores as deep as possible before backtracking.

**How it works:**
1. Start from a source vertex
2. Visit one neighbor, then go deeper
3. When stuck, backtrack and try other paths
4. Continue until all reachable vertices visited

**Uses Stack** (LIFO) - can be implemented with recursion or explicit stack.

**Applications:**
- Detecting cycles in graph
- Finding connected components
- Topological sorting
- Solving mazes
- Finding path between two vertices

**Key Points:**
- Time: O(V + E)
- Space: O(V) for recursion stack
- Does NOT give shortest path
- Goes as deep as possible first`,
    code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;
    
    Graph(int v) : V(v) {
        adj.resize(V);
    }
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // DFS using Recursion
    void DFSRecursive(int v, vector<bool>& visited) {
        visited[v] = true;
        cout << v << " ";
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                DFSRecursive(neighbor, visited);
            }
        }
    }
    
    void DFS(int source) {
        vector<bool> visited(V, false);
        cout << "DFS (Recursive) from " << source << ": ";
        DFSRecursive(source, visited);
        cout << endl;
    }
    
    // DFS using Stack (Iterative)
    void DFSIterative(int source) {
        vector<bool> visited(V, false);
        stack<int> s;
        
        s.push(source);
        cout << "DFS (Iterative) from " << source << ": ";
        
        while (!s.empty()) {
            int curr = s.top();
            s.pop();
            
            if (!visited[curr]) {
                visited[curr] = true;
                cout << curr << " ";
                
                // Push neighbors (in reverse for same order as recursive)
                for (int i = adj[curr].size() - 1; i >= 0; i--) {
                    if (!visited[adj[curr][i]]) {
                        s.push(adj[curr][i]);
                    }
                }
            }
        }
        cout << endl;
    }
    
    // Check if path exists using DFS
    bool hasPath(int source, int dest) {
        vector<bool> visited(V, false);
        return hasPathHelper(source, dest, visited);
    }
    
    bool hasPathHelper(int curr, int dest, vector<bool>& visited) {
        if (curr == dest) return true;
        
        visited[curr] = true;
        
        for (int neighbor : adj[curr]) {
            if (!visited[neighbor]) {
                if (hasPathHelper(neighbor, dest, visited)) {
                    return true;
                }
            }
        }
        return false;
    }
};

int main() {
    Graph g(6);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);
    g.addEdge(3, 5);
    
    g.DFS(0);
    g.DFSIterative(0);
    
    cout << "Path 0 to 5: " << (g.hasPath(0, 5) ? "Yes" : "No") << endl;  // Yes
    
    return 0;
}`,
    complexity: 'Time: O(V + E) | Space: O(V)'
  },
  {
    id: 5,
    title: 'Cycle Detection',
    content: `**Cycle** is a path that starts and ends at the same vertex.

**Why detect cycles?**
- Deadlock detection in systems
- Dependency resolution (circular dependencies)
- Valid tree check (tree = connected graph with no cycles)

**For Undirected Graph:**
- During DFS, if we visit an already visited vertex (that's not the parent), cycle exists

**For Directed Graph:**
- Track vertices in current path (recursion stack)
- If we visit a vertex that's in current path, cycle exists

**Applications:**
- Detecting circular dependencies
- Checking if graph is a valid tree
- Course prerequisites (no circular prereqs)`,
    code: `#include <iostream>
#include <vector>
using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;
    
    Graph(int v) : V(v) {
        adj.resize(V);
    }
    
    void addEdge(int u, int v, bool directed = false) {
        adj[u].push_back(v);
        if (!directed) adj[v].push_back(u);
    }
    
    // Cycle detection in UNDIRECTED graph
    bool hasCycleUndirected(int v, int parent, vector<bool>& visited) {
        visited[v] = true;
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                if (hasCycleUndirected(neighbor, v, visited)) {
                    return true;
                }
            }
            else if (neighbor != parent) {
                // Visited vertex that's not parent = cycle
                return true;
            }
        }
        return false;
    }
    
    bool detectCycleUndirected() {
        vector<bool> visited(V, false);
        
        // Check all components
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (hasCycleUndirected(i, -1, visited)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // Cycle detection in DIRECTED graph
    bool hasCycleDirected(int v, vector<bool>& visited, vector<bool>& inStack) {
        visited[v] = true;
        inStack[v] = true;  // In current recursion path
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                if (hasCycleDirected(neighbor, visited, inStack)) {
                    return true;
                }
            }
            else if (inStack[neighbor]) {
                // Already in current path = cycle
                return true;
            }
        }
        
        inStack[v] = false;  // Remove from current path
        return false;
    }
    
    bool detectCycleDirected() {
        vector<bool> visited(V, false);
        vector<bool> inStack(V, false);
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (hasCycleDirected(i, visited, inStack)) {
                    return true;
                }
            }
        }
        return false;
    }
};

int main() {
    // Undirected graph with cycle
    Graph g1(4);
    g1.addEdge(0, 1);
    g1.addEdge(1, 2);
    g1.addEdge(2, 0);  // Creates cycle
    g1.addEdge(2, 3);
    cout << "Undirected cycle: " << (g1.detectCycleUndirected() ? "Yes" : "No") << endl;  // Yes
    
    // Directed graph with cycle
    Graph g2(4);
    g2.addEdge(0, 1, true);
    g2.addEdge(1, 2, true);
    g2.addEdge(2, 0, true);  // Creates cycle
    g2.addEdge(2, 3, true);
    cout << "Directed cycle: " << (g2.detectCycleDirected() ? "Yes" : "No") << endl;  // Yes
    
    return 0;
}`,
    complexity: 'Time: O(V + E) | Space: O(V)'
  },
  {
    id: 6,
    title: 'Topological Sort',
    visualizer: 'topological' as const,
    content: `**Topological Sort** is a linear ordering of vertices such that for every directed edge u → v, vertex u comes before v.

**Only works for DAG** (Directed Acyclic Graph - no cycles).

**Real-life examples:**
- Course prerequisites (take CS101 before CS201)
- Build dependencies (compile A before B)
- Task scheduling (do task 1 before task 2)

**Two Methods:**
1. **DFS based** (Kahn's algorithm variation)
   - Do DFS, add to stack after visiting all neighbors
   - Pop from stack to get order

2. **BFS based (Kahn's Algorithm)**
   - Start with vertices having 0 in-degree
   - Remove vertex, reduce in-degree of neighbors
   - Add vertices with 0 in-degree to queue`,
    code: `#include <iostream>
#include <vector>
#include <stack>
#include <queue>
using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;
    
    Graph(int v) : V(v) {
        adj.resize(V);
    }
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);  // Directed edge
    }
    
    // Method 1: DFS based Topological Sort
    void topoDFS(int v, vector<bool>& visited, stack<int>& st) {
        visited[v] = true;
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                topoDFS(neighbor, visited, st);
            }
        }
        
        st.push(v);  // Add after all neighbors processed
    }
    
    void topologicalSortDFS() {
        vector<bool> visited(V, false);
        stack<int> st;
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                topoDFS(i, visited, st);
            }
        }
        
        cout << "Topological Order (DFS): ";
        while (!st.empty()) {
            cout << st.top() << " ";
            st.pop();
        }
        cout << endl;
    }
    
    // Method 2: BFS based (Kahn's Algorithm)
    void topologicalSortBFS() {
        vector<int> inDegree(V, 0);
        
        // Calculate in-degree for each vertex
        for (int i = 0; i < V; i++) {
            for (int neighbor : adj[i]) {
                inDegree[neighbor]++;
            }
        }
        
        queue<int> q;
        
        // Add vertices with 0 in-degree
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }
        
        vector<int> result;
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            result.push_back(curr);
            
            for (int neighbor : adj[curr]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        
        if (result.size() != V) {
            cout << "Cycle detected! Topological sort not possible." << endl;
            return;
        }
        
        cout << "Topological Order (BFS): ";
        for (int v : result) {
            cout << v << " ";
        }
        cout << endl;
    }
};

int main() {
    // Course prerequisites example:
    // 5 -> 0, 5 -> 2, 4 -> 0, 4 -> 1, 2 -> 3, 3 -> 1
    Graph g(6);
    g.addEdge(5, 0);
    g.addEdge(5, 2);
    g.addEdge(4, 0);
    g.addEdge(4, 1);
    g.addEdge(2, 3);
    g.addEdge(3, 1);
    
    g.topologicalSortDFS();  // 5 4 2 3 1 0 (one possible order)
    g.topologicalSortBFS();  // 4 5 2 0 3 1 (one possible order)
    
    return 0;
}`,
    complexity: 'Time: O(V + E) | Space: O(V)'
  }
]

export default function GraphsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
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
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <Share2 className="w-6 h-6 text-pink-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Graphs</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Non-linear data structure - BFS, DFS, Cycle Detection, Topological Sort.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-pink-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">60</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Code2 className="w-5 h-5 mx-auto mb-2 text-purple-500" />
          <p className="text-lg font-bold">C++</p>
          <p className="text-xs text-muted-foreground">Language</p>
        </div>
      </div>

      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div key={topic.id} className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 font-bold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{topic.complexity}</span>
                </div>
              </div>
              {'visualizer' in topic && topic.visualizer && (
                <span className="text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-400 font-medium">
                  Interactive
                </span>
              )}
            </div>

            {/* Topological Sort Visualizer */}
            {'visualizer' in topic && topic.visualizer === 'topological' && (
              <div className="mb-4">
                <TopologicalSortVisualizer />
              </div>
            )}

            {/* BFS Visualizer */}
            {'visualizer' in topic && topic.visualizer === 'bfs' && (
              <div className="mb-4">
                <BFSVisualizer />
              </div>
            )}

            {/* DFS Visualizer */}
            {'visualizer' in topic && topic.visualizer === 'dfs' && (
              <div className="mb-4">
                <DFSVisualizer />
              </div>
            )}

            <div className="mb-4">
              <div className="text-sm text-muted-foreground prose prose-sm prose-invert max-w-none"
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
