import Link from 'next/link'
import { ArrowLeft, Layers, Clock, Code2, BookOpen, Download, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is an Array?',
    content: `An **Array** is a collection of elements stored at contiguous (side by side) memory locations. Think of it like a row of boxes, where each box can hold one item, and all boxes are numbered starting from 0.

**Real-life example:** Imagine a bookshelf with numbered slots. Each slot (index) can hold one book (element). If you want to find the 3rd book, you go directly to slot number 2 (since we start counting from 0).

**Key Points:**
- All elements must be of the same type (all integers, all strings, etc.)
- Size is fixed once declared (in C++)
- Access any element instantly using its index
- Memory is allocated in one continuous block`,
    code: `#include <iostream>
using namespace std;

int main() {
    // Method 1: Declare and initialize
    int numbers[5] = {10, 20, 30, 40, 50};
    
    // Method 2: Declare first, assign later
    int marks[3];
    marks[0] = 85;
    marks[1] = 90;
    marks[2] = 78;
    
    // Accessing elements
    cout << "First element: " << numbers[0] << endl;  // Output: 10
    cout << "Third element: " << numbers[2] << endl;  // Output: 30
    
    // Array size
    int size = sizeof(numbers) / sizeof(numbers[0]);
    cout << "Array size: " << size << endl;  // Output: 5
    
    // Loop through array
    cout << "All elements: ";
    for (int i = 0; i < 5; i++) {
        cout << numbers[i] << " ";
    }
    // Output: 10 20 30 40 50
    
    return 0;
}`,
    complexity: 'Access: O(1) | Search: O(n) | Insert/Delete: O(n)'
  },
  {
    id: 2,
    title: 'Types of Arrays',
    content: `There are different types of arrays based on dimensions:

**1. One-Dimensional Array (1D)**
A simple list of elements in a single row.
Example: Storing marks of 5 students.

**2. Two-Dimensional Array (2D)**
A table with rows and columns (like a matrix).
Example: Storing marks of 5 students in 3 subjects.

**3. Multi-Dimensional Array**
Arrays with more than 2 dimensions.
Example: 3D arrays for storing data in a cube-like structure.

**Memory Layout:**
- 1D: [1][2][3][4][5]
- 2D: Like a grid/table
- 3D: Like a cube of data`,
    code: `#include <iostream>
using namespace std;

int main() {
    // 1D Array
    int arr1D[5] = {1, 2, 3, 4, 5};
    cout << "1D Array: ";
    for (int i = 0; i < 5; i++) {
        cout << arr1D[i] << " ";
    }
    cout << endl;
    
    // 2D Array (3 rows, 4 columns)
    int arr2D[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    cout << "2D Array (Matrix):" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << arr2D[i][j] << " ";
        }
        cout << endl;
    }
    
    // Accessing specific element
    cout << "Element at row 1, col 2: " << arr2D[1][2] << endl;  // Output: 7
    
    return 0;
}`,
    complexity: '1D Access: O(1) | 2D Access: O(1)'
  },
  {
    id: 3,
    title: 'Array Operations',
    content: `Common operations you can perform on arrays:

**1. Traversal**
Visiting each element one by one (using loops).

**2. Insertion**
Adding a new element. In a fixed array, you shift elements to make space.

**3. Deletion**
Removing an element and shifting remaining elements to fill the gap.

**4. Searching**
Finding if an element exists:
- Linear Search: Check each element one by one
- Binary Search: Works only on sorted arrays (faster)

**5. Sorting**
Arranging elements in order (ascending/descending).

**6. Updating**
Changing the value at a specific index.`,
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[10] = {5, 10, 15, 20, 25};
    int n = 5;  // Current number of elements
    
    // 1. TRAVERSAL - Print all elements
    cout << "Original array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    // 2. INSERTION - Insert 12 at index 2
    int insertPos = 2;
    int insertVal = 12;
    for (int i = n; i > insertPos; i--) {
        arr[i] = arr[i - 1];  // Shift elements right
    }
    arr[insertPos] = insertVal;
    n++;
    
    cout << "After inserting 12 at index 2: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    // 3. DELETION - Delete element at index 3
    int deletePos = 3;
    for (int i = deletePos; i < n - 1; i++) {
        arr[i] = arr[i + 1];  // Shift elements left
    }
    n--;
    
    cout << "After deleting element at index 3: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    // 4. SEARCHING - Linear Search for 20
    int target = 20;
    int foundIndex = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            foundIndex = i;
            break;
        }
    }
    cout << "Element 20 found at index: " << foundIndex << endl;
    
    // 5. UPDATING - Change value at index 1
    arr[1] = 100;
    cout << "After updating index 1 to 100: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    
    return 0;
}`,
    complexity: 'Traversal: O(n) | Insert/Delete: O(n) | Search: O(n) | Update: O(1)'
  },
  {
    id: 4,
    title: 'Common Array Problems',
    content: `Here are some classic array problems you'll encounter:

**1. Find Maximum/Minimum**
Scan through array to find largest/smallest element.

**2. Reverse an Array**
Swap first with last, second with second-last, and so on.

**3. Find Second Largest**
Track both largest and second largest while traversing.

**4. Check if Sorted**
Compare each element with the next one.

**5. Remove Duplicates**
Keep track of unique elements using a new array or in-place.

**6. Rotate Array**
Move elements left or right by k positions.

**7. Two Sum Problem**
Find two numbers that add up to a target (asked in every interview!).`,
    code: `#include <iostream>
#include <algorithm>  // for swap
using namespace std;

// Find Maximum Element
int findMax(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

// Reverse Array
void reverseArray(int arr[], int n) {
    int start = 0, end = n - 1;
    while (start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}

// Check if Sorted (Ascending)
bool isSorted(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = 8;
    
    // Find Maximum
    cout << "Maximum: " << findMax(arr, n) << endl;  // Output: 9
    
    // Check if Sorted
    cout << "Is Sorted: " << (isSorted(arr, n) ? "Yes" : "No") << endl;  // Output: No
    
    // Reverse Array
    reverseArray(arr, n);
    cout << "Reversed: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;  // Output: 6 2 9 5 1 4 1 3
    
    return 0;
}`,
    complexity: 'Find Max: O(n) | Reverse: O(n) | Check Sorted: O(n)'
  },
  {
    id: 5,
    title: 'Passing Arrays to Functions',
    content: `When you pass an array to a function, you're actually passing a **pointer** to the first element. This means:

**Key Points:**
1. Changes made inside the function affect the original array
2. You need to pass the size separately (arrays don't know their own size in functions)
3. You can use reference notation (int arr[]) or pointer notation (int* arr)

**Why pass by pointer?**
- Efficiency: Avoids copying the entire array
- Memory: Only the address is passed (8 bytes on 64-bit systems)

**Return Array from Function:**
In C++, you cannot directly return an array. Solutions:
1. Pass output array as parameter
2. Use dynamic memory (new/delete)
3. Use STL containers like vector (recommended)`,
    code: `#include <iostream>
using namespace std;

// Method 1: Array notation
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// Method 2: Pointer notation (same as above)
void doubleElements(int* arr, int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // This modifies original array!
    }
}

// Calculate sum
int arraySum(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum;
}

// Fill array with value
void fillArray(int arr[], int size, int value) {
    for (int i = 0; i < size; i++) {
        arr[i] = value;
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = 5;
    
    cout << "Original array: ";
    printArray(numbers, size);
    
    cout << "Sum: " << arraySum(numbers, size) << endl;
    
    doubleElements(numbers, size);
    cout << "After doubling: ";
    printArray(numbers, size);
    
    fillArray(numbers, size, 0);
    cout << "After filling with 0: ";
    printArray(numbers, size);
    
    return 0;
}`,
    complexity: 'Passing array: O(1) | Operations inside: Depends on function'
  }
]

export default function ArraysPage() {
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
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Layers className="w-6 h-6 text-blue-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Arrays
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Foundation of all data structures - learn how arrays work in C++.
            </p>
          </div>
          
          <a 
            href="/notes/arrays-notes.pdf" 
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg font-medium hover:bg-blue-500/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Notes
          </a>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-green-500" />
          <p className="text-lg font-bold">30</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Code2 className="w-5 h-5 mx-auto mb-2 text-purple-500" />
          <p className="text-lg font-bold">C++</p>
          <p className="text-xs text-muted-foreground">Language</p>
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
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold shrink-0">
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

            {/* Theory */}
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

            {/* Code */}
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
