import Link from 'next/link'
import { ArrowLeft, Repeat, Clock, Code2, BookOpen, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is Recursion?',
    content: `**Recursion** is when a function calls itself to solve a smaller version of the same problem.

**Key Components:**
1. **Base Case**: Condition to stop recursion
2. **Recursive Case**: Function calls itself with smaller input

**Think of it like:**
- Russian nesting dolls (each contains smaller one)
- Looking at two mirrors facing each other
- A folder containing another folder

**Why Recursion?**
- Natural for problems that have repetitive structure
- Cleaner code for complex problems
- Essential for trees, graphs, divide & conquer

**Drawbacks:**
- Uses call stack (can cause stack overflow)
- May be slower than iterative solutions
- Can be confusing to debug

**Golden Rule:**
Always ensure the problem gets SMALLER and eventually hits the BASE CASE!`,
    code: `#include <iostream>
using namespace std;

// Simple recursion: Countdown
void countdown(int n) {
    // Base case
    if (n <= 0) {
        cout << "Blast off!" << endl;
        return;
    }
    
    // Recursive case
    cout << n << endl;
    countdown(n - 1);  // Smaller problem
}

// Factorial: n! = n * (n-1)!
int factorial(int n) {
    // Base case
    if (n <= 1) return 1;
    
    // Recursive case
    return n * factorial(n - 1);
}

// Sum of digits
int sumOfDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumOfDigits(n / 10);
}

// Print numbers 1 to n (tail recursion)
void printNumbers(int n, int current = 1) {
    if (current > n) return;
    cout << current << " ";
    printNumbers(n, current + 1);
}

int main() {
    countdown(3);
    cout << endl;
    
    cout << "5! = " << factorial(5) << endl;  // 120
    
    cout << "Sum of digits of 1234: " << sumOfDigits(1234) << endl;  // 10
    
    cout << "1 to 5: ";
    printNumbers(5);
    cout << endl;
    
    return 0;
}`,
    complexity: 'Depends on problem - analyze recursion tree'
  },
  {
    id: 2,
    title: 'Recursion on Arrays & Strings',
    content: `**Recursion on arrays** typically works by:
1. Process first/last element
2. Recursively process rest of array

**Common Patterns:**
- Pass index as parameter (avoid creating new arrays)
- Process from 0 to n-1 OR from n-1 to 0
- Two pointers (start and end)

**String Problems:**
- Reverse a string
- Check palindrome
- Generate substrings/subsequences

**Tips:**
- Use indices to avoid copying arrays
- Be careful with empty/single element cases
- Draw the recursion tree for complex problems`,
    code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Sum of array
int arraySum(vector<int>& arr, int index = 0) {
    if (index == arr.size()) return 0;
    return arr[index] + arraySum(arr, index + 1);
}

// Check if array is sorted
bool isSorted(vector<int>& arr, int index = 0) {
    if (index >= arr.size() - 1) return true;
    if (arr[index] > arr[index + 1]) return false;
    return isSorted(arr, index + 1);
}

// Linear search using recursion
int linearSearch(vector<int>& arr, int target, int index = 0) {
    if (index == arr.size()) return -1;
    if (arr[index] == target) return index;
    return linearSearch(arr, target, index + 1);
}

// Reverse a string
string reverseString(string s) {
    if (s.length() <= 1) return s;
    return reverseString(s.substr(1)) + s[0];
}

// Check palindrome
bool isPalindrome(string s, int left, int right) {
    if (left >= right) return true;
    if (s[left] != s[right]) return false;
    return isPalindrome(s, left + 1, right - 1);
}

bool isPalindrome(string s) {
    return isPalindrome(s, 0, s.length() - 1);
}

// Find first occurrence
int firstOccurrence(string s, char c, int index = 0) {
    if (index == s.length()) return -1;
    if (s[index] == c) return index;
    return firstOccurrence(s, c, index + 1);
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    cout << "Sum: " << arraySum(arr) << endl;  // 15
    cout << "Sorted: " << (isSorted(arr) ? "Yes" : "No") << endl;  // Yes
    cout << "Index of 3: " << linearSearch(arr, 3) << endl;  // 2
    
    cout << "Reverse 'hello': " << reverseString("hello") << endl;  // olleh
    cout << "Is 'radar' palindrome: " << (isPalindrome("radar") ? "Yes" : "No") << endl;  // Yes
    
    return 0;
}`,
    complexity: 'Most array/string operations: O(n) time, O(n) stack space'
  },
  {
    id: 3,
    title: 'Backtracking Basics',
    content: `**Backtracking** is a recursive technique for finding solutions by trying all possibilities and "going back" when a path doesn't work.

**How it works:**
1. Make a choice
2. Explore that path recursively
3. If it doesn't work, UNDO the choice (backtrack)
4. Try next choice

**Template:**
\`\`\`
function backtrack(current_state):
    if is_solution(current_state):
        add to results
        return
    
    for each choice in choices:
        if is_valid(choice):
            make_choice()
            backtrack(new_state)
            undo_choice()  // BACKTRACK
\`\`\`

**Classic Problems:**
- N-Queens
- Sudoku Solver
- Permutations
- Subsets
- Rat in a Maze
- Word Search`,
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Generate all subsets (Power Set)
void generateSubsets(vector<int>& nums, int index, vector<int>& current, 
                     vector<vector<int>>& result) {
    // Base case: processed all elements
    if (index == nums.size()) {
        result.push_back(current);
        return;
    }
    
    // Choice 1: Don't include current element
    generateSubsets(nums, index + 1, current, result);
    
    // Choice 2: Include current element
    current.push_back(nums[index]);
    generateSubsets(nums, index + 1, current, result);
    current.pop_back();  // BACKTRACK!
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    generateSubsets(nums, 0, current, result);
    return result;
}

// Generate all permutations
void generatePermutations(vector<int>& nums, vector<int>& current,
                          vector<bool>& used, vector<vector<int>>& result) {
    if (current.size() == nums.size()) {
        result.push_back(current);
        return;
    }
    
    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;
        
        // Make choice
        used[i] = true;
        current.push_back(nums[i]);
        
        generatePermutations(nums, current, used, result);
        
        // Backtrack
        current.pop_back();
        used[i] = false;
    }
}

vector<vector<int>> permutations(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    vector<bool> used(nums.size(), false);
    generatePermutations(nums, current, used, result);
    return result;
}

int main() {
    // Subsets
    vector<int> nums1 = {1, 2, 3};
    auto allSubsets = subsets(nums1);
    cout << "Subsets of [1,2,3]:" << endl;
    for (auto& subset : allSubsets) {
        cout << "[ ";
        for (int x : subset) cout << x << " ";
        cout << "]" << endl;
    }
    
    cout << endl;
    
    // Permutations
    vector<int> nums2 = {1, 2, 3};
    auto allPerms = permutations(nums2);
    cout << "Permutations of [1,2,3]:" << endl;
    for (auto& perm : allPerms) {
        cout << "[ ";
        for (int x : perm) cout << x << " ";
        cout << "]" << endl;
    }
    
    return 0;
}`,
    complexity: 'Subsets: O(2^n) | Permutations: O(n!)'
  },
  {
    id: 4,
    title: 'N-Queens Problem',
    content: `**N-Queens** is a classic backtracking problem: Place N queens on an N×N chessboard so no two queens attack each other.

**Queens attack in:**
- Same row
- Same column  
- Same diagonal

**Approach:**
1. Place queens row by row
2. For each row, try placing queen in each column
3. Check if position is safe
4. If safe, place queen and move to next row
5. If not safe or no valid position, backtrack

**Optimizations:**
- Use sets/arrays to track which columns and diagonals are occupied
- For diagonals: row - col is same for one diagonal, row + col for other

**This is a perfect example of systematic exploration with backtracking!`,
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class NQueens {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> solutions;
        vector<string> board(n, string(n, '.'));
        
        vector<bool> cols(n, false);        // Column occupied
        vector<bool> diag1(2 * n, false);   // row - col + n
        vector<bool> diag2(2 * n, false);   // row + col
        
        backtrack(0, n, board, cols, diag1, diag2, solutions);
        return solutions;
    }
    
private:
    void backtrack(int row, int n, vector<string>& board,
                   vector<bool>& cols, vector<bool>& diag1, vector<bool>& diag2,
                   vector<vector<string>>& solutions) {
        // Base case: all queens placed
        if (row == n) {
            solutions.push_back(board);
            return;
        }
        
        // Try placing queen in each column
        for (int col = 0; col < n; col++) {
            int d1 = row - col + n;  // Diagonal index 1
            int d2 = row + col;       // Diagonal index 2
            
            // Check if position is safe
            if (cols[col] || diag1[d1] || diag2[d2]) {
                continue;  // Not safe
            }
            
            // Place queen
            board[row][col] = 'Q';
            cols[col] = diag1[d1] = diag2[d2] = true;
            
            // Move to next row
            backtrack(row + 1, n, board, cols, diag1, diag2, solutions);
            
            // Remove queen (backtrack)
            board[row][col] = '.';
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    }
};

void printBoard(vector<string>& board) {
    for (string& row : board) {
        cout << row << endl;
    }
    cout << endl;
}

int main() {
    NQueens solver;
    
    // Solve for 4 queens
    auto solutions = solver.solveNQueens(4);
    
    cout << "4-Queens Solutions: " << solutions.size() << endl << endl;
    
    for (auto& solution : solutions) {
        printBoard(solution);
    }
    
    // Count solutions for different N
    for (int n = 1; n <= 8; n++) {
        auto sols = solver.solveNQueens(n);
        cout << n << "-Queens has " << sols.size() << " solutions" << endl;
    }
    
    return 0;
}`,
    complexity: 'Time: O(N!) | Space: O(N²) for board'
  },
  {
    id: 5,
    title: 'Sudoku Solver',
    content: `**Sudoku Solver** uses backtracking to fill a 9×9 grid with digits 1-9.

**Rules:**
- Each row must have 1-9 (no repeats)
- Each column must have 1-9 (no repeats)
- Each 3×3 box must have 1-9 (no repeats)

**Approach:**
1. Find an empty cell
2. Try placing digits 1-9
3. Check if placement is valid
4. If valid, place digit and solve rest recursively
5. If stuck, backtrack (remove digit and try next)

**Validity Check:**
- Check row for duplicates
- Check column for duplicates
- Check 3×3 box for duplicates

**This is a constraint satisfaction problem** solved beautifully with backtracking!`,
    code: `#include <iostream>
#include <vector>
using namespace std;

class SudokuSolver {
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
    
private:
    bool solve(vector<vector<char>>& board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    // Try digits 1-9
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, row, col, c)) {
                            board[row][col] = c;  // Place digit
                            
                            if (solve(board)) {
                                return true;  // Solved!
                            }
                            
                            board[row][col] = '.';  // Backtrack
                        }
                    }
                    return false;  // No valid digit found
                }
            }
        }
        return true;  // All cells filled
    }
    
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        // Check row
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == c) return false;
        }
        
        // Check column
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == c) return false;
        }
        
        // Check 3x3 box
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] == c) return false;
            }
        }
        
        return true;
    }
};

void printBoard(vector<vector<char>>& board) {
    for (int i = 0; i < 9; i++) {
        if (i % 3 == 0 && i != 0) {
            cout << "------+-------+------" << endl;
        }
        for (int j = 0; j < 9; j++) {
            if (j % 3 == 0 && j != 0) cout << "| ";
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    vector<vector<char>> board = {
        {'5','3','.','.','7','.','.','.','.'},
        {'6','.','.','1','9','5','.','.','.'},
        {'.','9','8','.','.','.','.','6','.'},
        {'8','.','.','.','6','.','.','.','3'},
        {'4','.','.','8','.','3','.','.','1'},
        {'7','.','.','.','2','.','.','.','6'},
        {'.','6','.','.','.','.','2','8','.'},
        {'.','.','.','4','1','9','.','.','5'},
        {'.','.','.','.','8','.','.','7','9'}
    };
    
    cout << "Before:" << endl;
    printBoard(board);
    
    SudokuSolver solver;
    solver.solveSudoku(board);
    
    cout << "\\nAfter:" << endl;
    printBoard(board);
    
    return 0;
}`,
    complexity: 'Time: O(9^(empty cells)) worst case | Space: O(1) (modifies in place)'
  },
  {
    id: 6,
    title: 'Combination Sum & Partitions',
    content: `**Combination Sum** problems ask to find all combinations that sum to a target.

**Variations:**
1. **Elements can be used multiple times**
2. **Each element used at most once**
3. **Elements have duplicates in input**

**Key Patterns:**
- Sort input (helps with deduplication)
- Track running sum
- Use start index to avoid duplicates
- Skip if current element > remaining target

**Partition Problems:**
- Partition array into K equal sum subsets
- Partition into two equal sum subsets
- Similar backtracking approach with different constraints`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Combination Sum I: Elements can be used multiple times
void combinationSum1(vector<int>& candidates, int target, int start,
                     vector<int>& current, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    
    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > target) break;  // Pruning (array is sorted)
        
        current.push_back(candidates[i]);
        combinationSum1(candidates, target - candidates[i], i, current, result);  // Can reuse
        current.pop_back();
    }
}

// Combination Sum II: Each element used at most once
void combinationSum2(vector<int>& candidates, int target, int start,
                     vector<int>& current, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    
    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > target) break;
        
        // Skip duplicates
        if (i > start && candidates[i] == candidates[i - 1]) continue;
        
        current.push_back(candidates[i]);
        combinationSum2(candidates, target - candidates[i], i + 1, current, result);  // Can't reuse
        current.pop_back();
    }
}

// Partition into K equal sum subsets
bool canPartitionKSubsets(vector<int>& nums, int k) {
    int sum = 0;
    for (int n : nums) sum += n;
    if (sum % k != 0) return false;
    
    int target = sum / k;
    sort(nums.rbegin(), nums.rend());  // Sort descending for pruning
    vector<bool> used(nums.size(), false);
    
    return backtrack(nums, used, 0, k, 0, target);
}

bool backtrack(vector<int>& nums, vector<bool>& used, int start,
               int k, int currentSum, int target) {
    if (k == 0) return true;  // All subsets filled
    if (currentSum == target) {
        return backtrack(nums, used, 0, k - 1, 0, target);  // Start next subset
    }
    
    for (int i = start; i < nums.size(); i++) {
        if (used[i] || currentSum + nums[i] > target) continue;
        
        used[i] = true;
        if (backtrack(nums, used, i + 1, k, currentSum + nums[i], target)) {
            return true;
        }
        used[i] = false;
    }
    
    return false;
}

int main() {
    // Combination Sum I
    vector<int> candidates1 = {2, 3, 6, 7};
    sort(candidates1.begin(), candidates1.end());
    vector<vector<int>> result1;
    vector<int> current1;
    combinationSum1(candidates1, 7, 0, current1, result1);
    
    cout << "Combinations summing to 7 (can reuse):" << endl;
    for (auto& comb : result1) {
        cout << "[ ";
        for (int x : comb) cout << x << " ";
        cout << "]" << endl;
    }
    
    cout << endl;
    
    // Combination Sum II
    vector<int> candidates2 = {10, 1, 2, 7, 6, 1, 5};
    sort(candidates2.begin(), candidates2.end());
    vector<vector<int>> result2;
    vector<int> current2;
    combinationSum2(candidates2, 8, 0, current2, result2);
    
    cout << "Combinations summing to 8 (no reuse):" << endl;
    for (auto& comb : result2) {
        cout << "[ ";
        for (int x : comb) cout << x << " ";
        cout << "]" << endl;
    }
    
    return 0;
}`,
    complexity: 'Combination Sum: O(2^n) | K Partition: O(k * 2^n)'
  }
]

export default function RecursionPage() {
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
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Repeat className="w-6 h-6 text-indigo-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Recursion & Backtracking</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Recursion basics, Backtracking, N-Queens, Sudoku Solver & more.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-indigo-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">55</p>
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
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold shrink-0">
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
