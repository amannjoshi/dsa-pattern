import Link from 'next/link'
import { ArrowLeft, ArrowUpDown, Clock, Code2, BookOpen, Download, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is Sorting?',
    content: `**Sorting** means arranging elements in a specific order (ascending or descending).

**Why Sorting is Important:**
- Makes searching faster (Binary Search)
- Helps in organizing data
- Many algorithms require sorted input
- Makes data analysis easier

**Types of Sorting:**
1. **Comparison-based**: Compare elements (Bubble, Selection, Merge, Quick)
2. **Non-comparison**: Don't compare (Counting Sort, Radix Sort)

**Stability in Sorting:**
- **Stable**: Maintains relative order of equal elements
- **Unstable**: May change relative order

**Key Metrics:**
- Time Complexity (best, average, worst)
- Space Complexity
- Stability
- In-place vs Not in-place`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    // Using STL sort (Introsort - hybrid of Quick, Heap, Insertion)
    sort(arr.begin(), arr.end());  // Ascending
    
    cout << "Ascending: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    sort(arr.begin(), arr.end(), greater<int>());  // Descending
    
    cout << "Descending: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
    complexity: 'STL sort: O(n log n) average and worst case'
  },
  {
    id: 2,
    title: 'Bubble Sort',
    content: `**Bubble Sort** repeatedly swaps adjacent elements if they're in wrong order. Largest element "bubbles up" to the end in each pass.

**How it works:**
1. Compare adjacent elements
2. Swap if left > right
3. Repeat for all pairs
4. After each pass, largest is at correct position
5. Repeat n-1 times

**Characteristics:**
- Simple to understand and implement
- Very slow for large arrays
- Stable sorting
- In-place (no extra space)

**When to use:**
- Small arrays
- Nearly sorted arrays (with optimization)
- Learning purposes

**Optimization:** If no swaps in a pass, array is already sorted - stop early.`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Basic Bubble Sort
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// Optimized Bubble Sort (early termination)
void bubbleSortOptimized(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swaps, array is sorted
        if (!swapped) break;
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    bubbleSortOptimized(arr);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
    complexity: 'Best: O(n) | Average: O(n²) | Worst: O(n²) | Space: O(1)'
  },
  {
    id: 3,
    title: 'Selection Sort',
    content: `**Selection Sort** finds the minimum element and places it at the beginning. Then finds second minimum, and so on.

**How it works:**
1. Find minimum in unsorted portion
2. Swap it with first element of unsorted portion
3. Move boundary of sorted portion one step right
4. Repeat until sorted

**Characteristics:**
- Simple to understand
- Always O(n²) - no early termination
- Unstable (can be made stable with modifications)
- In-place
- Minimum number of swaps: O(n)

**When to use:**
- When memory is limited (minimal swaps)
- Small arrays
- When write/swap is expensive (only n-1 swaps)`,
    code: `#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        // Find minimum in unsorted portion
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}

// Selection sort for finding k smallest elements
void findKSmallest(vector<int> arr, int k) {
    int n = arr.size();
    
    for (int i = 0; i < k; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
    
    cout << k << " smallest elements: ";
    for (int i = 0; i < k; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    
    selectionSort(arr);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    vector<int> arr2 = {64, 25, 12, 22, 11, 90, 3};
    findKSmallest(arr2, 3);  // 3 11 12
    
    return 0;
}`,
    complexity: 'Best: O(n²) | Average: O(n²) | Worst: O(n²) | Space: O(1)'
  },
  {
    id: 4,
    title: 'Insertion Sort',
    content: `**Insertion Sort** builds sorted array one element at a time by inserting each element at its correct position.

**How it works:**
1. Start from second element
2. Compare with elements on left
3. Shift larger elements right
4. Insert current element at correct position
5. Repeat for all elements

**Like sorting playing cards in your hand!**

**Characteristics:**
- Simple and intuitive
- Efficient for small data
- Efficient for nearly sorted data: O(n)
- Stable sorting
- In-place
- Online algorithm (can sort as data arrives)

**When to use:**
- Small arrays (n < 50)
- Nearly sorted arrays
- As part of hybrid algorithms (Timsort, Introsort)`,
    code: `#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Shift elements greater than key to right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
    }
}

// Binary Insertion Sort (fewer comparisons)
int binarySearch(vector<int>& arr, int item, int low, int high) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == item) return mid + 1;
        if (arr[mid] < item) low = mid + 1;
        else high = mid - 1;
    }
    return low;
}

void binaryInsertionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int pos = binarySearch(arr, key, 0, i - 1);
        
        // Shift elements to make room
        for (int j = i - 1; j >= pos; j--) {
            arr[j + 1] = arr[j];
        }
        arr[pos] = key;
    }
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6};
    
    insertionSort(arr);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
    complexity: 'Best: O(n) | Average: O(n²) | Worst: O(n²) | Space: O(1)'
  },
  {
    id: 5,
    title: 'Merge Sort',
    content: `**Merge Sort** uses Divide and Conquer approach. Divides array into halves, sorts them recursively, then merges.

**How it works:**
1. **Divide**: Split array into two halves
2. **Conquer**: Recursively sort both halves
3. **Combine**: Merge two sorted halves

**Characteristics:**
- Always O(n log n) - consistent performance
- Stable sorting
- NOT in-place: O(n) extra space
- Good for linked lists
- Good for external sorting (large files)

**When to use:**
- When guaranteed O(n log n) is needed
- Linked lists (no random access penalty)
- External sorting
- When stability matters`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Merge two sorted subarrays
void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temp arrays
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Merge back
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge sorted halves
        merge(arr, left, mid, right);
    }
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
    complexity: 'Best: O(n log n) | Average: O(n log n) | Worst: O(n log n) | Space: O(n)'
  },
  {
    id: 6,
    title: 'Quick Sort',
    content: `**Quick Sort** is the most widely used sorting algorithm. Uses Divide and Conquer with a pivot element.

**How it works:**
1. Choose a **pivot** element
2. **Partition**: Rearrange so elements < pivot are left, > pivot are right
3. Recursively sort left and right partitions

**Pivot Selection:**
- First element (simple but can be bad)
- Last element (simple)
- Random (avoids worst case)
- Median of three (good practice)

**Characteristics:**
- Average O(n log n), Worst O(n²)
- NOT stable
- In-place (O(log n) stack space)
- Cache-friendly (good locality)
- Fastest in practice for most cases

**STL sort() is based on Introsort** (Quick + Heap + Insertion)`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Partition function (Lomuto scheme)
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];  // Choose last element as pivot
    int i = low - 1;  // Index of smaller element
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);   // Sort left
        quickSort(arr, pi + 1, high);  // Sort right
    }
}

// Randomized partition (better average case)
int randomizedPartition(vector<int>& arr, int low, int high) {
    int random = low + rand() % (high - low + 1);
    swap(arr[random], arr[high]);
    return partition(arr, low, high);
}

// Quick Select - Find kth smallest element in O(n) average
int quickSelect(vector<int>& arr, int low, int high, int k) {
    if (low == high) return arr[low];
    
    int pi = partition(arr, low, high);
    
    if (k == pi) return arr[pi];
    if (k < pi) return quickSelect(arr, low, pi - 1, k);
    return quickSelect(arr, pi + 1, high, k);
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    int n = arr.size();
    
    quickSort(arr, 0, n - 1);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    // Find 3rd smallest
    vector<int> arr2 = {10, 7, 8, 9, 1, 5};
    cout << "3rd smallest: " << quickSelect(arr2, 0, 5, 2) << endl;  // 7
    
    return 0;
}`,
    complexity: 'Best: O(n log n) | Average: O(n log n) | Worst: O(n²) | Space: O(log n)'
  },
  {
    id: 7,
    title: 'Counting Sort',
    content: `**Counting Sort** is a non-comparison based sorting algorithm. Counts occurrences of each element.

**How it works:**
1. Find range of input (max - min)
2. Create count array of size range
3. Count occurrences of each element
4. Calculate cumulative count (for position)
5. Build output array

**Characteristics:**
- O(n + k) where k is range
- Stable sorting
- NOT in-place: O(n + k) space
- Only works for integers in a known range

**When to use:**
- When range (k) is not much larger than n
- When elements are non-negative integers
- When stability is required

**Not suitable when:**
- Range is very large
- Elements are floating point`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    
    // Find min and max
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    // Create count array
    vector<int> count(range, 0);
    vector<int> output(arr.size());
    
    // Store count of each element
    for (int x : arr) {
        count[x - minVal]++;
    }
    
    // Calculate cumulative count
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (reverse for stability)
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    // Copy back to original
    arr = output;
}

// Simple version (just using counts)
void countingSortSimple(vector<int>& arr) {
    if (arr.empty()) return;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> count(maxVal + 1, 0);
    
    for (int x : arr) count[x]++;
    
    int idx = 0;
    for (int i = 0; i <= maxVal; i++) {
        while (count[i]-- > 0) {
            arr[idx++] = i;
        }
    }
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    
    countingSort(arr);
    
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
    complexity: 'Time: O(n + k) | Space: O(n + k) where k = range'
  },
  {
    id: 8,
    title: 'Sorting Summary & Comparison',
    content: `**Quick Comparison of Sorting Algorithms:**

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |

**Which to use?**
- **Small data (n < 50)**: Insertion Sort
- **Nearly sorted**: Insertion Sort
- **General purpose**: Quick Sort or use STL sort()
- **Guaranteed O(n log n)**: Merge Sort
- **Limited memory**: Heap Sort
- **Small range integers**: Counting Sort
- **Linked lists**: Merge Sort

**In practice**: Just use std::sort() - it's optimized Introsort!`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;

// Compare sorting performance
void compareSort() {
    const int N = 10000;
    vector<int> arr(N);
    
    // Generate random array
    for (int i = 0; i < N; i++) {
        arr[i] = rand() % 10000;
    }
    
    vector<int> arr1 = arr;
    vector<int> arr2 = arr;
    
    // STL sort
    auto start = chrono::high_resolution_clock::now();
    sort(arr1.begin(), arr1.end());
    auto end = chrono::high_resolution_clock::now();
    auto duration1 = chrono::duration_cast<chrono::microseconds>(end - start);
    
    // STL stable_sort
    start = chrono::high_resolution_clock::now();
    stable_sort(arr2.begin(), arr2.end());
    end = chrono::high_resolution_clock::now();
    auto duration2 = chrono::duration_cast<chrono::microseconds>(end - start);
    
    cout << "STL sort: " << duration1.count() << " microseconds" << endl;
    cout << "STL stable_sort: " << duration2.count() << " microseconds" << endl;
}

// Useful STL sorting functions
void stlSorting() {
    vector<int> arr = {5, 2, 8, 1, 9, 3};
    
    // sort - O(n log n) average, unstable
    sort(arr.begin(), arr.end());
    
    // stable_sort - O(n log n), stable, O(n) extra space
    stable_sort(arr.begin(), arr.end());
    
    // partial_sort - Sort first k elements
    partial_sort(arr.begin(), arr.begin() + 3, arr.end());  // First 3 sorted
    
    // nth_element - Find nth element in sorted order (Quick Select)
    nth_element(arr.begin(), arr.begin() + 2, arr.end());  // arr[2] is median
    
    // is_sorted - Check if sorted
    bool sorted = is_sorted(arr.begin(), arr.end());
    
    // Custom comparator
    sort(arr.begin(), arr.end(), [](int a, int b) {
        return a > b;  // Descending
    });
    
    cout << "Descending: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
}

int main() {
    stlSorting();
    compareSort();
    return 0;
}`,
    complexity: 'STL sort: O(n log n) average and worst | stable_sort: O(n log n)'
  }
]

export default function SortingPage() {
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
              <div className="p-2 bg-teal-500/10 rounded-lg">
                <ArrowUpDown className="w-6 h-6 text-teal-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Sorting Algorithms</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Bubble, Selection, Insertion, Merge, Quick, Counting Sort & more.
            </p>
          </div>
          
          <a href="/notes/dsa-complete-notes.pdf" download
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-500 rounded-lg font-medium hover:bg-teal-500/20 transition-colors">
            <Download className="w-4 h-4" />
            Download Notes
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-teal-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">45</p>
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
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 font-bold shrink-0">
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
