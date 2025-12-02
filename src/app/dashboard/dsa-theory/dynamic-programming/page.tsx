import Link from 'next/link'
import { ArrowLeft, Table2, Clock, Code2, BookOpen, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is Dynamic Programming?',
    content: `**Dynamic Programming (DP)** is an optimization technique that solves complex problems by breaking them into smaller overlapping subproblems.

**Key Concepts:**
1. **Overlapping Subproblems**: Same subproblem is solved multiple times
2. **Optimal Substructure**: Optimal solution can be built from optimal solutions of subproblems

**Two Approaches:**
1. **Top-Down (Memoization)**: Start from main problem, cache results
2. **Bottom-Up (Tabulation)**: Start from smallest subproblems, build up

**When to use DP:**
- Problem asks for optimal (min/max) value
- Problem asks for count of ways
- Problem has overlapping subproblems
- Recursion leads to repeated calculations

**DP vs Greedy:**
- Greedy: Makes locally optimal choice at each step
- DP: Considers all possibilities and picks best

**Common DP patterns:**
- Linear DP (1D array)
- Grid DP (2D array)
- Interval DP
- Knapsack variations`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Example: Fibonacci - Shows DP benefit

// 1. Plain Recursion - O(2^n) - Very slow!
int fibRecursive(int n) {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 2. Top-Down with Memoization - O(n)
vector<int> memo(100, -1);
int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];  // Already computed
    
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}

// 3. Bottom-Up Tabulation - O(n) time, O(n) space
int fibTabulation(int n) {
    if (n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// 4. Space Optimized - O(n) time, O(1) space
int fibOptimized(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0, prev1 = 1;
    
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

int main() {
    int n = 10;
    
    cout << "Fibonacci(" << n << "):" << endl;
    cout << "Recursive: " << fibRecursive(n) << endl;
    cout << "Memoization: " << fibMemo(n) << endl;
    cout << "Tabulation: " << fibTabulation(n) << endl;
    cout << "Optimized: " << fibOptimized(n) << endl;
    
    return 0;
}`,
    complexity: 'Recursive: O(2^n) → DP: O(n)'
  },
  {
    id: 2,
    title: 'Climbing Stairs & House Robber',
    content: `**Climbing Stairs:**
You can climb 1 or 2 steps at a time. How many ways to reach top?

This is just Fibonacci in disguise!
- To reach step n, you either come from step n-1 or n-2
- ways(n) = ways(n-1) + ways(n-2)

**House Robber:**
Rob houses but can't rob adjacent houses. Maximize money.

At each house:
- Option 1: Rob this house + max from 2 houses back
- Option 2: Skip this house + take max from previous
- dp[i] = max(dp[i-1], dp[i-2] + nums[i])

**These are classic 1D DP problems!**`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// Climbing Stairs
int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev2 = 1, prev1 = 2;
    
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

// Climbing Stairs with k steps at a time
int climbStairsK(int n, int k) {
    vector<int> dp(n + 1, 0);
    dp[0] = 1;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= k && j <= i; j++) {
            dp[i] += dp[i - j];
        }
    }
    
    return dp[n];
}

// House Robber - Can't rob adjacent houses
int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    int prev2 = nums[0];
    int prev1 = max(nums[0], nums[1]);
    
    for (int i = 2; i < n; i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

// House Robber II - Houses in circle
int robCircle(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    // Rob houses 0 to n-2 OR houses 1 to n-1
    auto robRange = [](vector<int>& nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; i++) {
            int curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    };
    
    return max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
}

int main() {
    // Climbing stairs
    cout << "Stairs(5) with 1-2 steps: " << climbStairs(5) << endl;  // 8
    cout << "Stairs(5) with 1-3 steps: " << climbStairsK(5, 3) << endl;  // 13
    
    // House Robber
    vector<int> houses = {2, 7, 9, 3, 1};
    cout << "Max robbery (linear): " << rob(houses) << endl;  // 12 (2+9+1)
    
    vector<int> circleHouses = {2, 3, 2};
    cout << "Max robbery (circle): " << robCircle(circleHouses) << endl;  // 3
    
    return 0;
}`,
    complexity: 'Time: O(n) | Space: O(1) with optimization'
  },
  {
    id: 3,
    title: '0/1 Knapsack Problem',
    content: `**Problem:**
Given items with weights and values, maximize value that fits in a bag with capacity W.

**0/1 means:** Each item can be either taken or not taken (no fractions).

**Approach:**
For each item, we have 2 choices:
1. Include it (if it fits): value + dp[remaining capacity]
2. Exclude it: dp[current capacity from previous items]

**State:**
dp[i][w] = max value using first i items with capacity w

**Recurrence:**
- If item fits: dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])
- If doesn't fit: dp[i][w] = dp[i-1][w]

**Variations:**
- Unbounded Knapsack (items can be used multiple times)
- Subset Sum (just check if sum is possible)
- Equal Partition (divide into 2 equal halves)`,
    code: `#include <iostream>
#include <vector>
using namespace std;

// 0/1 Knapsack - 2D DP
int knapsack2D(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            // Don't take item i
            dp[i][w] = dp[i - 1][w];
            
            // Take item i (if it fits)
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i][w], 
                               values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            }
        }
    }
    
    return dp[n][W];
}

// 0/1 Knapsack - Space Optimized 1D
int knapsack1D(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<int> dp(W + 1, 0);
    
    for (int i = 0; i < n; i++) {
        // Process from right to left to avoid using updated values
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }
    
    return dp[W];
}

// Subset Sum - Can we make sum S from given numbers?
bool subsetSum(vector<int>& nums, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true;  // Sum 0 is always possible
    
    for (int num : nums) {
        for (int s = target; s >= num; s--) {
            dp[s] = dp[s] || dp[s - num];
        }
    }
    
    return dp[target];
}

// Equal Partition - Divide into 2 equal sum subsets
bool canPartition(vector<int>& nums) {
    int sum = 0;
    for (int n : nums) sum += n;
    
    if (sum % 2 != 0) return false;
    
    return subsetSum(nums, sum / 2);
}

int main() {
    vector<int> weights = {1, 2, 3, 4};
    vector<int> values = {1, 4, 5, 7};
    int W = 5;
    
    cout << "Max value (2D): " << knapsack2D(weights, values, W) << endl;  // 9
    cout << "Max value (1D): " << knapsack1D(weights, values, W) << endl;  // 9
    
    vector<int> nums = {1, 5, 11, 5};
    cout << "Subset sum 11: " << (subsetSum(nums, 11) ? "Yes" : "No") << endl;  // Yes
    cout << "Can partition: " << (canPartition(nums) ? "Yes" : "No") << endl;   // Yes (1+5+5 = 11)
    
    return 0;
}`,
    complexity: '0/1 Knapsack: O(n*W) time, O(W) space optimized'
  },
  {
    id: 4,
    title: 'Longest Common Subsequence (LCS)',
    content: `**Problem:**
Find the length of the longest subsequence common to two strings.

**Subsequence:** Characters in same order but not necessarily contiguous.
Example: "ACE" is subsequence of "ABCDE"

**Approach:**
Compare characters:
- If equal: 1 + LCS(remaining of both)
- If not equal: max(LCS(skip first char of s1), LCS(skip first char of s2))

**State:**
dp[i][j] = LCS length of first i chars of s1 and first j chars of s2

**Recurrence:**
- If s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
- Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])

**Applications:**
- Git diff (finding common lines)
- DNA sequence comparison
- Plagiarism detection`,
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// LCS Length - 2D DP
int lcsLength(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// LCS with actual string
string lcsString(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    // Fill DP table
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to find LCS string
    string lcs;
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (s1[i - 1] == s2[j - 1]) {
            lcs = s1[i - 1] + lcs;
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs;
}

// Longest Common Substring (contiguous)
int longestCommonSubstring(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    int maxLen = 0;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                maxLen = max(maxLen, dp[i][j]);
            }
            // No else - reset to 0 (substring must be contiguous)
        }
    }
    
    return maxLen;
}

int main() {
    string s1 = "ABCDGH";
    string s2 = "AEDFHR";
    
    cout << "LCS Length: " << lcsLength(s1, s2) << endl;  // 3
    cout << "LCS String: " << lcsString(s1, s2) << endl;  // "ADH"
    
    string s3 = "ABAB";
    string s4 = "BABA";
    cout << "Longest Common Substring: " << longestCommonSubstring(s3, s4) << endl;  // 3 ("ABA" or "BAB")
    
    return 0;
}`,
    complexity: 'Time: O(m*n) | Space: O(m*n), can be O(n) with optimization'
  },
  {
    id: 5,
    title: 'Longest Increasing Subsequence (LIS)',
    content: `**Problem:**
Find the length of longest subsequence where each element is greater than previous.

**Example:**
[10, 9, 2, 5, 3, 7, 101, 18]
LIS = [2, 3, 7, 101] or [2, 5, 7, 101], length = 4

**Approach 1: O(n²) DP**
- dp[i] = length of LIS ending at index i
- For each i, check all j < i where arr[j] < arr[i]
- dp[i] = max(dp[j] + 1) for all valid j

**Approach 2: O(n log n) Binary Search**
- Maintain a sorted array of smallest ending elements
- For each element, binary search and update
- Uses patience sorting concept

**Variations:**
- Longest Decreasing Subsequence
- Number of LIS
- Print all LIS`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// LIS O(n²) solution
int lisDP(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    
    vector<int> dp(n, 1);  // Each element is LIS of length 1
    int maxLen = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    
    return maxLen;
}

// LIS O(n log n) solution using Binary Search
int lisBinarySearch(vector<int>& nums) {
    vector<int> tail;  // tail[i] = smallest ending element of LIS of length i+1
    
    for (int num : nums) {
        auto it = lower_bound(tail.begin(), tail.end(), num);
        
        if (it == tail.end()) {
            tail.push_back(num);  // Extend LIS
        } else {
            *it = num;  // Replace with smaller value
        }
    }
    
    return tail.size();
}

// Print one LIS
vector<int> printLIS(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return {};
    
    vector<int> dp(n, 1);
    vector<int> parent(n, -1);
    int maxLen = 1, maxIdx = 0;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIdx = i;
        }
    }
    
    // Reconstruct LIS
    vector<int> lis;
    for (int i = maxIdx; i != -1; i = parent[i]) {
        lis.push_back(nums[i]);
    }
    reverse(lis.begin(), lis.end());
    
    return lis;
}

// Count number of LIS
int countLIS(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    
    vector<int> dp(n, 1);     // Length of LIS ending at i
    vector<int> count(n, 1);  // Number of LIS of that length
    int maxLen = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    count[i] = count[j];
                } else if (dp[j] + 1 == dp[i]) {
                    count[i] += count[j];
                }
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    
    int total = 0;
    for (int i = 0; i < n; i++) {
        if (dp[i] == maxLen) {
            total += count[i];
        }
    }
    
    return total;
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    
    cout << "LIS Length (O(n²)): " << lisDP(nums) << endl;  // 4
    cout << "LIS Length (O(n log n)): " << lisBinarySearch(nums) << endl;  // 4
    
    vector<int> lis = printLIS(nums);
    cout << "One LIS: ";
    for (int x : lis) cout << x << " ";  // 2 3 7 101 or 2 5 7 101
    cout << endl;
    
    vector<int> nums2 = {1, 3, 5, 4, 7};
    cout << "Number of LIS: " << countLIS(nums2) << endl;  // 2 ([1,3,5,7] and [1,3,4,7])
    
    return 0;
}`,
    complexity: 'DP: O(n²) | Binary Search: O(n log n)'
  },
  {
    id: 6,
    title: 'Grid DP - Unique Paths & Min Cost',
    content: `**Grid DP** problems involve moving through a 2D grid (usually from top-left to bottom-right).

**Common Problems:**
1. **Unique Paths**: Count ways to reach destination
2. **Minimum Path Sum**: Find path with minimum cost
3. **Maximum Path Sum**: Find path with maximum value
4. **Paths with Obstacles**: Some cells are blocked

**Movement Options:**
- Right and Down only (most common)
- Right, Down, and Diagonal
- All 4/8 directions (more complex, usually BFS)

**State:**
dp[i][j] = answer for reaching cell (i, j)

**Recurrence (Right/Down only):**
- dp[i][j] = dp[i-1][j] + dp[i][j-1] (for counting)
- dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]) (for min cost)`,
    code: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Unique Paths (no obstacles)
int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);  // First row all 1s
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];  // From top + from left
        }
    }
    
    return dp[n - 1];
}

// Unique Paths with Obstacles
int uniquePathsWithObstacles(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    if (grid[0][0] == 1) return 0;  // Start is blocked
    
    vector<vector<long long>> dp(m, vector<long long>(n, 0));
    dp[0][0] = 1;
    
    // First row
    for (int j = 1; j < n; j++) {
        dp[0][j] = (grid[0][j] == 0) ? dp[0][j - 1] : 0;
    }
    
    // First column
    for (int i = 1; i < m; i++) {
        dp[i][0] = (grid[i][0] == 0) ? dp[i - 1][0] : 0;
    }
    
    // Rest of grid
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (grid[i][j] == 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    
    return dp[m - 1][n - 1];
}

// Minimum Path Sum
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<vector<int>> dp(m, vector<int>(n));
    
    dp[0][0] = grid[0][0];
    
    // First row
    for (int j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    // First column
    for (int i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // Fill rest
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    return dp[m - 1][n - 1];
}

// Maximum Falling Path Sum (can move to 3 cells in next row)
int maxFallingPathSum(vector<vector<int>>& grid) {
    int n = grid.size();
    vector<int> dp = grid[0];
    
    for (int i = 1; i < n; i++) {
        vector<int> newDp(n);
        for (int j = 0; j < n; j++) {
            int maxPrev = dp[j];  // From directly above
            if (j > 0) maxPrev = max(maxPrev, dp[j - 1]);  // From above-left
            if (j < n - 1) maxPrev = max(maxPrev, dp[j + 1]);  // From above-right
            
            newDp[j] = grid[i][j] + maxPrev;
        }
        dp = newDp;
    }
    
    return *max_element(dp.begin(), dp.end());
}

int main() {
    // Unique Paths
    cout << "Unique paths (3x7): " << uniquePaths(3, 7) << endl;  // 28
    
    // With Obstacles
    vector<vector<int>> obstacles = {{0, 0, 0}, {0, 1, 0}, {0, 0, 0}};
    cout << "Unique paths with obstacles: " << uniquePathsWithObstacles(obstacles) << endl;  // 2
    
    // Min Path Sum
    vector<vector<int>> grid = {{1, 3, 1}, {1, 5, 1}, {4, 2, 1}};
    cout << "Min path sum: " << minPathSum(grid) << endl;  // 7 (1->3->1->1->1)
    
    // Max Falling Path
    vector<vector<int>> falling = {{2, 1, 3}, {6, 5, 4}, {7, 8, 9}};
    cout << "Max falling path: " << maxFallingPathSum(falling) << endl;  // 13
    
    return 0;
}`,
    complexity: 'Time: O(m*n) | Space: O(n) with optimization'
  },
  {
    id: 7,
    title: 'Coin Change Problem',
    content: `**Problem:**
Given coins of different denominations and a target amount, find:
1. Minimum number of coins needed (Coin Change 1)
2. Number of ways to make the amount (Coin Change 2)

**This is Unbounded Knapsack** - each coin can be used multiple times!

**Coin Change 1 (Min Coins):**
- dp[amount] = minimum coins to make this amount
- For each coin, dp[i] = min(dp[i], 1 + dp[i - coin])

**Coin Change 2 (Count Ways):**
- dp[amount] = number of ways to make this amount
- Order doesn't matter: process coins one by one
- For each coin, dp[i] += dp[i - coin]

**Key Difference:**
- Min coins: Compare and take minimum
- Count ways: Add up all possibilities`,
    code: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Coin Change 1: Minimum number of coins
int minCoins(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;  // 0 coins needed for amount 0
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], 1 + dp[i - coin]);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

// Coin Change 2: Count number of ways
int countWays(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, 0);
    dp[0] = 1;  // One way to make 0: use no coins
    
    // Process each coin type
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

// Print one combination (for min coins)
void printMinCoins(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    vector<int> lastCoin(amount + 1, -1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                if (dp[i - coin] + 1 < dp[i]) {
                    dp[i] = dp[i - coin] + 1;
                    lastCoin[i] = coin;
                }
            }
        }
    }
    
    if (dp[amount] == INT_MAX) {
        cout << "Not possible" << endl;
        return;
    }
    
    cout << "Coins used: ";
    int curr = amount;
    while (curr > 0) {
        cout << lastCoin[curr] << " ";
        curr -= lastCoin[curr];
    }
    cout << endl;
}

// Perfect Squares: Min squares summing to n (special case)
int numSquares(int n) {
    vector<int> dp(n + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j * j <= i; j++) {
            dp[i] = min(dp[i], 1 + dp[i - j * j]);
        }
    }
    
    return dp[n];
}

int main() {
    vector<int> coins = {1, 2, 5};
    int amount = 11;
    
    cout << "Min coins for " << amount << ": " << minCoins(coins, amount) << endl;  // 3
    printMinCoins(coins, amount);  // 5 5 1
    
    cout << "Ways to make " << amount << ": " << countWays(coins, amount) << endl;  // 11
    
    cout << "Min perfect squares for 12: " << numSquares(12) << endl;  // 3 (4+4+4)
    
    return 0;
}`,
    complexity: 'Time: O(amount * coins) | Space: O(amount)'
  }
]

export default function DPPage() {
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
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <Table2 className="w-6 h-6 text-rose-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dynamic Programming</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Memoization, Tabulation, Knapsack, LCS, LIS, Grid DP, Coin Change & more.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-rose-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">70</p>
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
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold shrink-0">
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
