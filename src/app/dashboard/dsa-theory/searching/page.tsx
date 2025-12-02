import Link from 'next/link'
import { ArrowLeft, Search, Clock, Code2, BookOpen, Download, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is Searching?',
    content: `**Searching** is the process of finding a specific element in a collection of data.

**Why Searching Matters:**
- Finding data in databases
- Looking up contacts in phone
- Searching files on computer
- Finding words in documents

**Types of Searching:**
1. **Linear Search**: Check every element one by one
2. **Binary Search**: Divide and conquer (needs sorted data)
3. **Hashing**: Direct access using hash function
4. **Tree-based**: Using BST, B-Trees

**Key Considerations:**
- Is the data sorted?
- How often do we search?
- Memory constraints
- Need for modification`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};
    int target = 5;
    
    // Using STL find (Linear Search)
    auto it = find(arr.begin(), arr.end(), target);
    if (it != arr.end()) {
        cout << "Found at index: " << (it - arr.begin()) << endl;
    }
    
    // Using STL binary_search (needs sorted array)
    sort(arr.begin(), arr.end());
    bool found = binary_search(arr.begin(), arr.end(), target);
    cout << "Binary search found: " << (found ? "Yes" : "No") << endl;
    
    return 0;
}`,
    complexity: 'Linear: O(n) | Binary: O(log n)'
  },
  {
    id: 2,
    title: 'Linear Search',
    content: `**Linear Search** checks each element one by one from start to end.

**How it works:**
1. Start from first element
2. Compare with target
3. If match, return index
4. If not, move to next
5. If end reached, element not found

**Characteristics:**
- Simple and easy to implement
- Works on unsorted data
- No preprocessing required
- Slow for large datasets

**When to use:**
- Small arrays
- Unsorted data
- One-time search
- Linked lists (no random access)

**Variations:**
- Search from both ends (meet in middle)
- Sentinel search (place target at end, saves one comparison per iteration)`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Basic Linear Search
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}

// Sentinel Linear Search (slightly optimized)
int sentinelSearch(vector<int> arr, int target) {
    int n = arr.size();
    int last = arr[n - 1];  // Save last element
    arr[n - 1] = target;    // Place sentinel
    
    int i = 0;
    while (arr[i] != target) {
        i++;
    }
    
    arr[n - 1] = last;  // Restore last element
    
    if (i < n - 1 || arr[n - 1] == target) {
        return i;
    }
    return -1;
}

// Find all occurrences
vector<int> findAll(vector<int>& arr, int target) {
    vector<int> indices;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            indices.push_back(i);
        }
    }
    return indices;
}

// Search in 2D array
pair<int, int> search2D(vector<vector<int>>& matrix, int target) {
    for (int i = 0; i < matrix.size(); i++) {
        for (int j = 0; j < matrix[i].size(); j++) {
            if (matrix[i][j] == target) {
                return {i, j};
            }
        }
    }
    return {-1, -1};
}

int main() {
    vector<int> arr = {10, 20, 80, 30, 60, 50, 110, 100, 130, 170};
    int target = 110;
    
    int result = linearSearch(arr, target);
    if (result != -1) {
        cout << "Found at index: " << result << endl;  // 6
    } else {
        cout << "Not found" << endl;
    }
    
    // Find all occurrences
    vector<int> arr2 = {5, 2, 8, 2, 9, 2, 3};
    vector<int> indices = findAll(arr2, 2);
    cout << "Element 2 found at indices: ";
    for (int idx : indices) cout << idx << " ";  // 1 3 5
    cout << endl;
    
    return 0;
}`,
    complexity: 'Best: O(1) | Average: O(n) | Worst: O(n) | Space: O(1)'
  },
  {
    id: 3,
    title: 'Binary Search',
    content: `**Binary Search** works on sorted arrays by repeatedly dividing search space in half.

**How it works:**
1. Find middle element
2. If target equals middle, found!
3. If target < middle, search left half
4. If target > middle, search right half
5. Repeat until found or search space is empty

**Prerequisites:**
- Array must be **sorted**
- Random access (arrays, not linked lists)

**Characteristics:**
- Very fast: O(log n)
- Needs sorted data
- Divide and Conquer approach

**Key Insight:**
log₂(1,000,000) ≈ 20
Binary search finds element in 1 million items in just 20 comparisons!`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Iterative Binary Search
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Prevents overflow
        
        if (arr[mid] == target) {
            return mid;  // Found
        }
        if (arr[mid] < target) {
            left = mid + 1;   // Search right half
        } else {
            right = mid - 1;  // Search left half
        }
    }
    
    return -1;  // Not found
}

// Recursive Binary Search
int binarySearchRecursive(vector<int>& arr, int target, int left, int right) {
    if (left > right) return -1;
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
    return binarySearchRecursive(arr, target, left, mid - 1);
}

int main() {
    vector<int> arr = {2, 3, 4, 10, 40, 50, 60, 70};
    int target = 10;
    
    int result = binarySearch(arr, target);
    cout << "Found at index: " << result << endl;  // 3
    
    result = binarySearchRecursive(arr, 60, 0, arr.size() - 1);
    cout << "Found at index: " << result << endl;  // 6
    
    return 0;
}`,
    complexity: 'Best: O(1) | Average: O(log n) | Worst: O(log n) | Space: O(1)'
  },
  {
    id: 4,
    title: 'Lower Bound & Upper Bound',
    content: `**Lower Bound** and **Upper Bound** are variations of binary search used to find insert positions.

**Lower Bound:**
- First position where element >= target
- If target exists, points to first occurrence
- If target doesn't exist, points to where it would be inserted

**Upper Bound:**
- First position where element > target
- Points to position just after the target (or where it would be)

**Use Cases:**
- Finding range of equal elements
- Counting occurrences
- Finding insert position
- Range queries

**STL Functions:**
- std::lower_bound()
- std::upper_bound()
- std::equal_range() (returns both)`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Lower bound: First position where arr[i] >= target
int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

// Upper bound: First position where arr[i] > target
int upperBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

// Count occurrences using bounds
int countOccurrences(vector<int>& arr, int target) {
    int lb = lowerBound(arr, target);
    int ub = upperBound(arr, target);
    return ub - lb;
}

// First and last occurrence
pair<int, int> findFirstLast(vector<int>& arr, int target) {
    int lb = lowerBound(arr, target);
    int ub = upperBound(arr, target);
    
    if (lb == arr.size() || arr[lb] != target) {
        return {-1, -1};  // Not found
    }
    return {lb, ub - 1};
}

int main() {
    vector<int> arr = {1, 2, 2, 2, 3, 4, 5};
    int target = 2;
    
    // Using our functions
    cout << "Lower bound of 2: " << lowerBound(arr, target) << endl;  // 1
    cout << "Upper bound of 2: " << upperBound(arr, target) << endl;  // 4
    cout << "Count of 2: " << countOccurrences(arr, target) << endl;  // 3
    
    auto [first, last] = findFirstLast(arr, target);
    cout << "First occurrence: " << first << ", Last: " << last << endl;  // 1, 3
    
    // Using STL
    auto lb = lower_bound(arr.begin(), arr.end(), target);
    auto ub = upper_bound(arr.begin(), arr.end(), target);
    cout << "STL Lower bound index: " << (lb - arr.begin()) << endl;
    cout << "STL Upper bound index: " << (ub - arr.begin()) << endl;
    
    return 0;
}`,
    complexity: 'Time: O(log n) | Space: O(1)'
  },
  {
    id: 5,
    title: 'Binary Search Variations',
    content: `**Binary Search on Answer Space**
Instead of searching in array, search for the answer in a range of possible values.

**Common Patterns:**
1. **Find minimum that satisfies condition**
   - Search space: [low, high]
   - Condition: isValid(mid)
   - If valid, search lower; else search higher

2. **Find maximum that satisfies condition**
   - Similar but reversed

**Classic Problems:**
- Square root of a number
- Finding peak element
- Search in rotated sorted array
- Minimum in rotated sorted array
- Koko eating bananas
- Capacity to ship packages

**Key Insight:**
If you can check if an answer is valid in O(n) or O(1), you can binary search on all possible answers!`,
    code: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

// Square root using binary search
int mySqrt(int x) {
    if (x < 2) return x;
    
    long left = 1, right = x / 2;
    
    while (left <= right) {
        long mid = left + (right - left) / 2;
        long square = mid * mid;
        
        if (square == x) return mid;
        if (square < x) left = mid + 1;
        else right = mid - 1;
    }
    
    return right;  // Floor of sqrt
}

// Find peak element (element greater than neighbors)
int findPeak(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] < arr[mid + 1]) {
            left = mid + 1;  // Peak is on right
        } else {
            right = mid;     // Peak is on left (including mid)
        }
    }
    
    return left;
}

// Search in rotated sorted array
int searchRotated(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        
        // Check which half is sorted
        if (arr[left] <= arr[mid]) {  // Left half is sorted
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {  // Right half is sorted
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Find minimum in rotated sorted array
int findMinRotated(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] > arr[right]) {
            left = mid + 1;  // Min is in right half
        } else {
            right = mid;     // Min is in left half (including mid)
        }
    }
    
    return arr[left];
}

int main() {
    cout << "sqrt(16) = " << mySqrt(16) << endl;  // 4
    cout << "sqrt(8) = " << mySqrt(8) << endl;    // 2
    
    vector<int> arr1 = {1, 2, 3, 4, 5, 3, 1};
    cout << "Peak at index: " << findPeak(arr1) << endl;  // 4
    
    vector<int> arr2 = {4, 5, 6, 7, 0, 1, 2};
    cout << "Found 0 at: " << searchRotated(arr2, 0) << endl;  // 4
    cout << "Minimum: " << findMinRotated(arr2) << endl;       // 0
    
    return 0;
}`,
    complexity: 'All variations: O(log n) time | O(1) space'
  },
  {
    id: 6,
    title: 'Search in 2D Matrix',
    content: `**Searching in 2D matrices** has different approaches based on matrix properties.

**Type 1: Row-wise and Column-wise Sorted**
Each row and column is sorted independently.
Approach: Start from top-right or bottom-left corner.

**Type 2: Fully Sorted Matrix**
Last element of each row < first element of next row.
Approach: Treat as 1D sorted array, use binary search.

**Staircase Search:**
- Start from top-right corner
- If target < current: move left
- If target > current: move right
- Very elegant O(m + n) solution!`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Type 1: Row-wise and column-wise sorted
// Staircase search - O(m + n)
bool searchMatrix1(vector<vector<int>>& matrix, int target) {
    if (matrix.empty()) return false;
    
    int m = matrix.size();
    int n = matrix[0].size();
    
    // Start from top-right corner
    int row = 0, col = n - 1;
    
    while (row < m && col >= 0) {
        if (matrix[row][col] == target) {
            cout << "Found at (" << row << ", " << col << ")" << endl;
            return true;
        }
        if (matrix[row][col] > target) {
            col--;  // Move left
        } else {
            row++;  // Move down
        }
    }
    
    return false;
}

// Type 2: Fully sorted matrix (treat as 1D array)
// Binary search - O(log(m*n))
bool searchMatrix2(vector<vector<int>>& matrix, int target) {
    if (matrix.empty()) return false;
    
    int m = matrix.size();
    int n = matrix[0].size();
    
    int left = 0, right = m * n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        // Convert 1D index to 2D
        int row = mid / n;
        int col = mid % n;
        
        if (matrix[row][col] == target) {
            cout << "Found at (" << row << ", " << col << ")" << endl;
            return true;
        }
        if (matrix[row][col] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}

// Find row with maximum 1s (matrix of 0s and 1s, rows sorted)
int rowWithMax1s(vector<vector<int>>& matrix) {
    int m = matrix.size();
    int n = matrix[0].size();
    
    int maxRow = -1;
    int col = n - 1;
    
    for (int row = 0; row < m; row++) {
        while (col >= 0 && matrix[row][col] == 1) {
            maxRow = row;
            col--;
        }
    }
    
    return maxRow;
}

int main() {
    // Type 1: Row-wise and column-wise sorted
    vector<vector<int>> matrix1 = {
        {10, 20, 30, 40},
        {15, 25, 35, 45},
        {27, 29, 37, 48},
        {32, 33, 39, 50}
    };
    cout << "Matrix 1 - ";
    searchMatrix1(matrix1, 29);  // Found at (2, 1)
    
    // Type 2: Fully sorted
    vector<vector<int>> matrix2 = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    cout << "Matrix 2 - ";
    searchMatrix2(matrix2, 3);  // Found at (0, 1)
    
    return 0;
}`,
    complexity: 'Staircase: O(m + n) | Binary (flat): O(log(m*n))'
  }
]

export default function SearchingPage() {
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
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Search className="w-6 h-6 text-cyan-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Searching Algorithms</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Linear Search, Binary Search, Bounds, Rotated Array Search & more.
            </p>
          </div>
          
          <a href="/notes/dsa-complete-notes.pdf" download
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-500 rounded-lg font-medium hover:bg-cyan-500/20 transition-colors">
            <Download className="w-4 h-4" />
            Download Notes
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">35</p>
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
