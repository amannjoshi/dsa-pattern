import Link from 'next/link'
import { ArrowLeft, Code2, CheckCircle2, BookmarkPlus, Play, Timer } from 'lucide-react'

const dsaQuestions = [
  {
    id: 1,
    topic: 'Arrays',
    question: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    frequency: 98,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `Use a hash map to store each number and its index while iterating.

For each number, check if (target - num) exists in the map.

\`\`\`python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\``
  },
  {
    id: 2,
    topic: 'Strings',
    question: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Bloomberg', 'Meta'],
    frequency: 95,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `Use a stack to track opening brackets.

For closing brackets, check if the top of stack matches.

\`\`\`python
def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0
\`\`\``
  },
  {
    id: 3,
    topic: 'Linked List',
    question: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google'],
    frequency: 92,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `Use three pointers: prev, curr, next.

Iterate through and reverse each pointer.

\`\`\`python
def reverseList(head):
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    
    return prev
\`\`\``
  },
  {
    id: 4,
    topic: 'Trees',
    question: 'Maximum Depth of Binary Tree',
    description: 'Given the root of a binary tree, return its maximum depth.',
    difficulty: 'Easy',
    companies: ['Amazon', 'Microsoft', 'LinkedIn', 'Apple'],
    frequency: 90,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    solution: `Use recursion: depth = 1 + max(left depth, right depth)

Base case: null node returns 0.

\`\`\`python
def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
\`\`\``
  },
  {
    id: 5,
    topic: 'Dynamic Programming',
    question: 'Climbing Stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb?',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Apple', 'Adobe'],
    frequency: 88,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `This is essentially the Fibonacci sequence!

dp[i] = dp[i-1] + dp[i-2]

\`\`\`python
def climbStairs(n):
    if n <= 2:
        return n
    prev, curr = 1, 2
    for i in range(3, n + 1):
        prev, curr = curr, prev + curr
    return curr
\`\`\``
  },
  {
    id: 6,
    topic: 'Binary Search',
    question: 'Search in Rotated Sorted Array',
    description: 'Given a rotated sorted array and a target, return the index of target or -1.',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    frequency: 85,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    solution: `Modified binary search: find which half is sorted.

Check if target lies in sorted half, then search accordingly.

\`\`\`python
def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        
        if nums[left] <= nums[mid]:  # Left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
\`\`\``
  },
  {
    id: 7,
    topic: 'Graphs',
    question: 'Number of Islands',
    description: 'Given a 2D grid map of 1s (land) and 0s (water), count the number of islands.',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Bloomberg'],
    frequency: 88,
    timeComplexity: 'O(m×n)',
    spaceComplexity: 'O(m×n)',
    solution: `Use DFS/BFS to explore and mark visited land.

Each time you find unvisited land, increment island count.

\`\`\`python
def numIslands(grid):
    if not grid:
        return 0
    
    count = 0
    rows, cols = len(grid), len(grid[0])
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # Mark visited
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count
\`\`\``
  },
  {
    id: 8,
    topic: 'Sliding Window',
    question: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Bloomberg', 'Apple'],
    frequency: 90,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m,n))',
    solution: `Use sliding window with hash set.

Expand right, shrink left when duplicate found.

\`\`\`python
def lengthOfLongestSubstring(s):
    seen = set()
    left = max_len = 0
    
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        max_len = max(max_len, right - left + 1)
    
    return max_len
\`\`\``
  },
  {
    id: 9,
    topic: 'Dynamic Programming',
    question: 'Longest Common Subsequence',
    description: 'Given two strings, return the length of their longest common subsequence.',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft'],
    frequency: 82,
    timeComplexity: 'O(m×n)',
    spaceComplexity: 'O(m×n)',
    solution: `Classic 2D DP problem.

If chars match: dp[i][j] = 1 + dp[i-1][j-1]
Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])

\`\`\`python
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]
\`\`\``
  },
  {
    id: 10,
    topic: 'Heap',
    question: 'Merge K Sorted Lists',
    description: 'You are given an array of k linked-lists, each sorted in ascending order. Merge all into one sorted linked-list.',
    difficulty: 'Hard',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    frequency: 85,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    solution: `Use min-heap to always get smallest element.

Push first node of each list, pop smallest, push its next.

\`\`\`python
import heapq

def mergeKLists(lists):
    heap = []
    dummy = ListNode(0)
    curr = dummy
    
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next
\`\`\``
  }
]

const topicColors: Record<string, string> = {
  'Arrays': 'bg-blue-500/10 text-blue-500',
  'Strings': 'bg-green-500/10 text-green-500',
  'Linked List': 'bg-purple-500/10 text-purple-500',
  'Trees': 'bg-orange-500/10 text-orange-500',
  'Dynamic Programming': 'bg-red-500/10 text-red-500',
  'Binary Search': 'bg-yellow-500/10 text-yellow-500',
  'Graphs': 'bg-pink-500/10 text-pink-500',
  'Sliding Window': 'bg-cyan-500/10 text-cyan-500',
  'Heap': 'bg-indigo-500/10 text-indigo-500',
}

export default function DSAInterviewPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <Link 
          href="/dashboard/interview" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interview Questions
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Code2 className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            DSA Interview Questions
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Most frequently asked Data Structures & Algorithms questions in MAANG interviews.
        </p>
      </div>

      {/* Topics Quick Filter */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(topicColors).map((topic) => (
          <button
            key={topic}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${topicColors[topic]} hover:opacity-80`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {dsaQuestions.map((q, index) => (
          <div
            key={q.id}
            className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{q.question}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{q.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${topicColors[q.topic]}`}>
                      {q.topic}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                      q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {q.timeComplexity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Asked {q.frequency}% of interviews
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Play className="w-5 h-5 text-green-500" />
                </button>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <BookmarkPlus className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Companies */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {q.companies.map((company) => (
                <span 
                  key={company}
                  className="text-xs px-2 py-1 rounded-full bg-background/50 border border-border/40"
                >
                  {company}
                </span>
              ))}
            </div>

            {/* Solution */}
            <div className="p-4 rounded-lg bg-background/50 border border-border/40">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">Solution Approach</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  Time: {q.timeComplexity} | Space: {q.spaceComplexity}
                </span>
              </div>
              <div 
                className="text-sm text-muted-foreground whitespace-pre-wrap prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: q.solution
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs my-2"><code>$2</code></pre>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                    .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1 rounded text-blue-400">$1</code>')
                    .replace(/\n/g, '<br/>')
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
