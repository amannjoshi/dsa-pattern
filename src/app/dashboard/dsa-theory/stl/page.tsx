import Link from 'next/link'
import { ArrowLeft, FileCode2, Clock, Code2, BookOpen, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is STL?',
    content: `**STL (Standard Template Library)** is a powerful library in C++ that provides ready-to-use data structures and algorithms. You don't need to implement everything from scratch!

**4 Components of STL:**

1. **Containers**: Data structures to store data
   - Sequence: vector, list, deque, array
   - Associative: set, map, multiset, multimap
   - Unordered: unordered_set, unordered_map

2. **Algorithms**: Functions for operations like sort, search, etc.

3. **Iterators**: Objects to traverse containers

4. **Functors**: Objects that act like functions

**Why use STL?**
- Tested and optimized code
- Saves development time
- Standard across all C++ compilers
- Widely used in competitive programming`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Quick example of STL power
    vector<int> v = {5, 2, 8, 1, 9, 3};
    
    // Sort in one line!
    sort(v.begin(), v.end());
    
    cout << "Sorted: ";
    for (int x : v) {
        cout << x << " ";
    }
    cout << endl;  // 1 2 3 5 8 9
    
    // Find maximum
    cout << "Max: " << *max_element(v.begin(), v.end()) << endl;  // 9
    
    // Reverse
    reverse(v.begin(), v.end());
    cout << "Reversed: ";
    for (int x : v) cout << x << " ";
    cout << endl;  // 9 8 5 3 2 1
    
    return 0;
}`,
    complexity: 'Varies by container and operation'
  },
  {
    id: 2,
    title: 'Vector',
    content: `**Vector** is a dynamic array that can grow or shrink in size. It's the most commonly used STL container!

**Key Features:**
- Dynamic size (unlike arrays)
- Random access in O(1)
- Insertion at end in O(1) amortized
- Insertion at middle in O(n)
- Contiguous memory storage

**Common Functions:**
- push_back(x): Add element at end
- pop_back(): Remove last element
- size(): Number of elements
- empty(): Check if empty
- clear(): Remove all elements
- front() / back(): First/last element
- at(i) or [i]: Access element at index i

**When to use Vector?**
- When you need dynamic array
- When you frequently access by index
- When you mostly add/remove at the end`,
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Declaration
    vector<int> v1;                    // Empty vector
    vector<int> v2(5);                 // 5 elements, all 0
    vector<int> v3(5, 10);             // 5 elements, all 10
    vector<int> v4 = {1, 2, 3, 4, 5};  // Initialize with values
    
    // Adding elements
    v1.push_back(10);
    v1.push_back(20);
    v1.push_back(30);
    
    // Accessing elements
    cout << "First: " << v1.front() << endl;   // 10
    cout << "Last: " << v1.back() << endl;     // 30
    cout << "Index 1: " << v1[1] << endl;      // 20
    cout << "At 1: " << v1.at(1) << endl;      // 20 (with bounds check)
    
    // Size and capacity
    cout << "Size: " << v1.size() << endl;          // 3
    cout << "Capacity: " << v1.capacity() << endl;  // >= 3
    cout << "Empty: " << v1.empty() << endl;        // 0 (false)
    
    // Modifying
    v1[1] = 25;           // Change index 1
    v1.pop_back();        // Remove last
    
    // Iterating
    cout << "Using index: ";
    for (int i = 0; i < v1.size(); i++) {
        cout << v1[i] << " ";
    }
    cout << endl;
    
    cout << "Using range-based for: ";
    for (int x : v1) {
        cout << x << " ";
    }
    cout << endl;
    
    cout << "Using iterator: ";
    for (auto it = v1.begin(); it != v1.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
    
    // Insert and erase
    v1.insert(v1.begin() + 1, 15);  // Insert 15 at index 1
    v1.erase(v1.begin());           // Remove first element
    
    // Clear all
    v1.clear();
    cout << "After clear, size: " << v1.size() << endl;  // 0
    
    return 0;
}`,
    complexity: 'Access: O(1) | Insert/Delete at end: O(1) amortized | Insert/Delete middle: O(n)'
  },
  {
    id: 3,
    title: 'Pair',
    content: `**Pair** is a simple container that holds two values of possibly different types. It's extremely useful for returning two values from a function or storing related data together.

**Key Points:**
- Access first value: pair.first
- Access second value: pair.second
- Can be compared (compares first, then second)
- Commonly used with vectors: vector<pair<int, int>>

**Common Uses:**
- Storing coordinates (x, y)
- Storing key-value pairs
- Storing (value, index) for sorting
- Graph edges (node, weight)

**make_pair() Function:**
Creates a pair without explicitly specifying types.`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Creating pairs
    pair<int, int> p1;              // Default (0, 0)
    pair<int, int> p2(10, 20);      // (10, 20)
    pair<int, string> p3 = {1, "hello"};
    pair<int, int> p4 = make_pair(5, 10);
    
    // Accessing values
    cout << "p2.first: " << p2.first << endl;    // 10
    cout << "p2.second: " << p2.second << endl;  // 20
    
    // Modifying
    p2.first = 100;
    p2.second = 200;
    
    // Vector of pairs
    vector<pair<int, int>> points;
    points.push_back({1, 2});
    points.push_back(make_pair(3, 4));
    points.push_back({5, 0});
    
    cout << "Points: ";
    for (auto& p : points) {
        cout << "(" << p.first << "," << p.second << ") ";
    }
    cout << endl;
    
    // Sorting pairs (sorts by first, then by second)
    sort(points.begin(), points.end());
    cout << "Sorted: ";
    for (auto& p : points) {
        cout << "(" << p.first << "," << p.second << ") ";
    }
    cout << endl;
    
    // Comparing pairs
    pair<int, int> a = {1, 5};
    pair<int, int> b = {1, 3};
    cout << "a < b: " << (a < b) << endl;  // 0 (false, 5 > 3)
    cout << "a > b: " << (a > b) << endl;  // 1 (true)
    
    // Nested pairs
    pair<int, pair<int, int>> nested = {1, {2, 3}};
    cout << "Nested: " << nested.first << ", " 
         << nested.second.first << ", " 
         << nested.second.second << endl;  // 1, 2, 3
    
    return 0;
}`,
    complexity: 'All operations: O(1)'
  },
  {
    id: 4,
    title: 'Set and Unordered Set',
    content: `**Set** stores unique elements in sorted order. **Unordered Set** stores unique elements without any order (uses hashing).

**Set:**
- Implemented as balanced BST (Red-Black Tree)
- Elements are always sorted
- Insert, delete, find: O(log n)
- No duplicates allowed

**Unordered Set:**
- Implemented as hash table
- No particular order
- Insert, delete, find: O(1) average
- No duplicates allowed

**When to use which?**
- Use Set when you need sorted order
- Use Unordered Set when you only need to check existence (faster)

**Common Functions:**
- insert(x): Add element
- erase(x): Remove element
- find(x): Find element (returns iterator)
- count(x): Returns 1 if exists, 0 otherwise
- size(), empty(), clear()`,
    code: `#include <iostream>
#include <set>
#include <unordered_set>
using namespace std;

int main() {
    // SET - Sorted, unique elements
    set<int> s;
    
    // Insert
    s.insert(30);
    s.insert(10);
    s.insert(20);
    s.insert(10);  // Duplicate - ignored!
    
    cout << "Set (sorted): ";
    for (int x : s) {
        cout << x << " ";  // 10 20 30
    }
    cout << endl;
    
    // Find
    if (s.find(20) != s.end()) {
        cout << "20 found!" << endl;
    }
    
    // Count (0 or 1)
    cout << "Count of 10: " << s.count(10) << endl;  // 1
    cout << "Count of 50: " << s.count(50) << endl;  // 0
    
    // Erase
    s.erase(20);
    cout << "After erasing 20: ";
    for (int x : s) cout << x << " ";
    cout << endl;  // 10 30
    
    // Lower and upper bound
    s.insert(15);
    s.insert(25);
    auto it = s.lower_bound(15);  // First element >= 15
    cout << "Lower bound of 15: " << *it << endl;  // 15
    it = s.upper_bound(15);       // First element > 15
    cout << "Upper bound of 15: " << *it << endl;  // 25
    
    cout << "\\n--- UNORDERED SET ---\\n";
    
    // UNORDERED SET - No order, faster
    unordered_set<int> us;
    us.insert(30);
    us.insert(10);
    us.insert(20);
    
    cout << "Unordered Set: ";
    for (int x : us) {
        cout << x << " ";  // Order not guaranteed
    }
    cout << endl;
    
    // Find - O(1) average
    if (us.count(10)) {
        cout << "10 exists!" << endl;
    }
    
    return 0;
}`,
    complexity: 'Set - Insert/Delete/Find: O(log n) | Unordered Set - O(1) average'
  },
  {
    id: 5,
    title: 'Map and Unordered Map',
    content: `**Map** stores key-value pairs in sorted order by key. **Unordered Map** stores key-value pairs without order (uses hashing).

**Map:**
- Implemented as balanced BST
- Keys are always sorted
- Insert, delete, find: O(log n)
- No duplicate keys

**Unordered Map:**
- Implemented as hash table
- No particular order
- Insert, delete, find: O(1) average
- No duplicate keys

**Common Functions:**
- map[key] = value: Insert or update
- map[key]: Access value (creates if not exists!)
- map.at(key): Access value (throws error if not exists)
- insert({key, value}): Insert pair
- erase(key): Remove key
- find(key): Find key
- count(key): Check if key exists

**Use Cases:**
- Dictionary/Phonebook
- Counting frequency
- Caching/Memoization`,
    code: `#include <iostream>
#include <map>
#include <unordered_map>
using namespace std;

int main() {
    // MAP - Sorted by keys
    map<string, int> ages;
    
    // Insert
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages.insert({"Charlie", 22});
    ages["Alice"] = 26;  // Update existing
    
    cout << "Map (sorted by key):" << endl;
    for (auto& p : ages) {
        cout << p.first << ": " << p.second << endl;
    }
    // Alice: 26
    // Bob: 30
    // Charlie: 22
    
    // Access
    cout << "Alice's age: " << ages["Alice"] << endl;  // 26
    
    // Check existence before accessing
    if (ages.find("David") != ages.end()) {
        cout << "David found" << endl;
    } else {
        cout << "David not found" << endl;
    }
    
    // Count (0 or 1)
    cout << "Bob exists: " << ages.count("Bob") << endl;  // 1
    
    // Erase
    ages.erase("Bob");
    
    cout << "\\n--- UNORDERED MAP ---\\n";
    
    // Frequency counting example
    unordered_map<char, int> freq;
    string s = "hello world";
    
    for (char c : s) {
        freq[c]++;  // Increment count
    }
    
    cout << "Character frequency:" << endl;
    for (auto& p : freq) {
        cout << "'" << p.first << "': " << p.second << endl;
    }
    
    // Two Sum using map
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    unordered_map<int, int> seen;  // value -> index
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            cout << "Two Sum indices: " << seen[complement] << ", " << i << endl;
            break;
        }
        seen[nums[i]] = i;
    }
    
    return 0;
}`,
    complexity: 'Map - O(log n) | Unordered Map - O(1) average'
  },
  {
    id: 6,
    title: 'Stack and Queue (STL)',
    content: `STL provides ready-to-use **stack** and **queue** containers. They are container adapters built on top of other containers.

**Stack (LIFO):**
- push(x): Add to top
- pop(): Remove from top
- top(): View top element
- empty(): Check if empty
- size(): Number of elements

**Queue (FIFO):**
- push(x): Add to rear
- pop(): Remove from front
- front(): View front element
- back(): View rear element
- empty(), size()

**Priority Queue (Heap):**
- By default, max-heap (largest element at top)
- push(x): Add element
- pop(): Remove top (largest)
- top(): View top (largest)

**For min-heap:** Use greater<int> as comparator`,
    code: `#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    // STACK
    cout << "--- STACK ---" << endl;
    stack<int> st;
    
    st.push(10);
    st.push(20);
    st.push(30);
    
    cout << "Top: " << st.top() << endl;  // 30
    st.pop();
    cout << "After pop, top: " << st.top() << endl;  // 20
    
    // QUEUE
    cout << "\\n--- QUEUE ---" << endl;
    queue<int> q;
    
    q.push(10);
    q.push(20);
    q.push(30);
    
    cout << "Front: " << q.front() << endl;  // 10
    cout << "Back: " << q.back() << endl;    // 30
    q.pop();
    cout << "After pop, front: " << q.front() << endl;  // 20
    
    // PRIORITY QUEUE (Max Heap)
    cout << "\\n--- MAX HEAP ---" << endl;
    priority_queue<int> maxHeap;
    
    maxHeap.push(30);
    maxHeap.push(10);
    maxHeap.push(50);
    maxHeap.push(20);
    
    cout << "Max heap elements: ";
    while (!maxHeap.empty()) {
        cout << maxHeap.top() << " ";  // 50 30 20 10
        maxHeap.pop();
    }
    cout << endl;
    
    // MIN HEAP
    cout << "\\n--- MIN HEAP ---" << endl;
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    minHeap.push(30);
    minHeap.push(10);
    minHeap.push(50);
    minHeap.push(20);
    
    cout << "Min heap elements: ";
    while (!minHeap.empty()) {
        cout << minHeap.top() << " ";  // 10 20 30 50
        minHeap.pop();
    }
    cout << endl;
    
    return 0;
}`,
    complexity: 'Stack/Queue - All O(1) | Priority Queue - Push/Pop O(log n), Top O(1)'
  },
  {
    id: 7,
    title: 'Common STL Algorithms',
    content: `STL provides powerful algorithms that work with containers. Include <algorithm> header.

**Sorting:**
- sort(begin, end): Ascending order
- sort(begin, end, greater<int>()): Descending
- sort with custom comparator

**Searching:**
- binary_search(begin, end, value): Returns true/false
- lower_bound: First element >= value
- upper_bound: First element > value

**Min/Max:**
- min_element, max_element
- min(a, b), max(a, b)

**Other Useful:**
- reverse(begin, end)
- count(begin, end, value)
- find(begin, end, value)
- accumulate(begin, end, initial): Sum
- fill(begin, end, value)
- unique(begin, end): Remove consecutive duplicates`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>  // for accumulate
using namespace std;

bool customCompare(int a, int b) {
    return a > b;  // Descending
}

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3, 7};
    
    // SORTING
    sort(v.begin(), v.end());
    cout << "Ascending: ";
    for (int x : v) cout << x << " ";
    cout << endl;  // 1 2 3 5 7 8 9
    
    sort(v.begin(), v.end(), greater<int>());
    cout << "Descending: ";
    for (int x : v) cout << x << " ";
    cout << endl;  // 9 8 7 5 3 2 1
    
    // Sort by custom rule (by absolute value)
    vector<int> v2 = {-5, 3, -2, 8, -1};
    sort(v2.begin(), v2.end(), [](int a, int b) {
        return abs(a) < abs(b);
    });
    cout << "By absolute: ";
    for (int x : v2) cout << x << " ";
    cout << endl;  // -1 -2 3 -5 8
    
    // BINARY SEARCH (array must be sorted!)
    sort(v.begin(), v.end());
    cout << "5 exists: " << binary_search(v.begin(), v.end(), 5) << endl;  // 1
    cout << "10 exists: " << binary_search(v.begin(), v.end(), 10) << endl;  // 0
    
    // Lower/Upper bound
    auto it = lower_bound(v.begin(), v.end(), 5);  // First >= 5
    cout << "Lower bound of 5: " << *it << endl;
    it = upper_bound(v.begin(), v.end(), 5);  // First > 5
    cout << "Upper bound of 5: " << *it << endl;
    
    // MIN/MAX
    cout << "Min: " << *min_element(v.begin(), v.end()) << endl;
    cout << "Max: " << *max_element(v.begin(), v.end()) << endl;
    
    // REVERSE
    reverse(v.begin(), v.end());
    cout << "Reversed: ";
    for (int x : v) cout << x << " ";
    cout << endl;
    
    // COUNT
    vector<int> v3 = {1, 2, 2, 3, 2, 4};
    cout << "Count of 2: " << count(v3.begin(), v3.end(), 2) << endl;  // 3
    
    // SUM
    int sum = accumulate(v3.begin(), v3.end(), 0);
    cout << "Sum: " << sum << endl;  // 14
    
    // FIND
    auto found = find(v3.begin(), v3.end(), 3);
    if (found != v3.end()) {
        cout << "3 found at index: " << (found - v3.begin()) << endl;
    }
    
    // FILL
    fill(v3.begin(), v3.end(), 0);
    cout << "After fill: ";
    for (int x : v3) cout << x << " ";
    cout << endl;  // 0 0 0 0 0 0
    
    return 0;
}`,
    complexity: 'Sort: O(n log n) | Binary Search: O(log n) | Others: O(n)'
  }
]

export default function STLPage() {
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
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <FileCode2 className="w-6 h-6 text-cyan-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                C++ STL
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Standard Template Library - your secret weapon for competitive programming!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
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

      {/* STL Quick Reference Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
        <h3 className="font-semibold mb-3">🚀 STL Quick Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="p-2 bg-background/50 rounded-lg">
            <p className="font-medium text-cyan-500">vector</p>
            <p className="text-xs text-muted-foreground">Dynamic array</p>
          </div>
          <div className="p-2 bg-background/50 rounded-lg">
            <p className="font-medium text-green-500">set/map</p>
            <p className="text-xs text-muted-foreground">Sorted unique</p>
          </div>
          <div className="p-2 bg-background/50 rounded-lg">
            <p className="font-medium text-purple-500">stack/queue</p>
            <p className="text-xs text-muted-foreground">LIFO/FIFO</p>
          </div>
          <div className="p-2 bg-background/50 rounded-lg">
            <p className="font-medium text-orange-500">priority_queue</p>
            <p className="text-xs text-muted-foreground">Heap</p>
          </div>
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
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{topic.complexity}</span>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-muted-foreground/30" />
            </div>

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
