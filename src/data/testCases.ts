// Comprehensive Test Cases for DSA Problems
// Each problem has unique test cases with input/output and function templates

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface FunctionTemplate {
  python: string;
  java: string;
  cpp: string;
  javascript: string;
}

export interface ProblemTestData {
  slug: string;
  title: string;
  functionName: string;
  testCases: TestCase[];
  templates: FunctionTemplate;
}

export const problemTestCases: Record<string, ProblemTestData> = {
  // ============================================
  // PROBLEM 1: Two Sum
  // ============================================
  "two-sum": {
    slug: "two-sum",
    title: "Two Sum",
    functionName: "twoSum",
    testCases: [
      {
        input: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }),
        expectedOutput: JSON.stringify([0, 1]),
        description: "Basic case - first two elements"
      },
      {
        input: JSON.stringify({ nums: [3, 2, 4], target: 6 }),
        expectedOutput: JSON.stringify([1, 2]),
        description: "Target in middle"
      },
      {
        input: JSON.stringify({ nums: [3, 3], target: 6 }),
        expectedOutput: JSON.stringify([0, 1]),
        description: "Duplicate elements"
      },
      {
        input: JSON.stringify({ nums: [1, 5, 8, 3, 9, 2], target: 11 }),
        expectedOutput: JSON.stringify([2, 3]),
        description: "Larger array"
      },
      {
        input: JSON.stringify({ nums: [-1, -2, -3, -4, -5], target: -8 }),
        expectedOutput: JSON.stringify([2, 4]),
        description: "Negative numbers"
      }
    ],
    templates: {
      python: `# Two Sum
# Given an array of integers nums and an integer target,
# return indices of the two numbers such that they add up to target.
# Time Complexity: O(n) with hash map
# Space Complexity: O(n)

from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.twoSum(input_data["nums"], input_data["target"])
    print(json.dumps(result))
`,
      java: `// Two Sum
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
// Time Complexity: O(n) with hash map
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) {
            nums[i] = numsArr.get(i).getAsInt();
        }
        int target = input.get("target").getAsInt();
        
        Solution sol = new Solution();
        int[] result = sol.twoSum(nums, target);
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Two Sum
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
// Time Complexity: O(n) with hash map
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t numsStart = input.find("[");
    size_t numsEnd = input.find("]");
    size_t targetPos = input.find("target");
    
    string numsStr = input.substr(numsStart, numsEnd - numsStart + 1);
    int target = stoi(input.substr(input.find(":", targetPos) + 1));
    
    vector<int> nums = parseArray(numsStr);
    Solution sol;
    vector<int> result = sol.twoSum(nums, target);
    
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    return 0;
}
`,
      javascript: `// Two Sum
// Given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.
// Time Complexity: O(n) with hash map
// Space Complexity: O(n)

function twoSum(nums, target) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = twoSum(input.nums, input.target);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 2: Valid Parentheses
  // ============================================
  "valid-parentheses": {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    functionName: "isValid",
    testCases: [
      {
        input: JSON.stringify({ s: "()" }),
        expectedOutput: JSON.stringify(true),
        description: "Simple valid parentheses"
      },
      {
        input: JSON.stringify({ s: "()[]{}" }),
        expectedOutput: JSON.stringify(true),
        description: "Multiple types of brackets"
      },
      {
        input: JSON.stringify({ s: "(]" }),
        expectedOutput: JSON.stringify(false),
        description: "Mismatched brackets"
      },
      {
        input: JSON.stringify({ s: "([)]" }),
        expectedOutput: JSON.stringify(false),
        description: "Interleaved brackets"
      },
      {
        input: JSON.stringify({ s: "{[]}" }),
        expectedOutput: JSON.stringify(true),
        description: "Nested brackets"
      },
      {
        input: JSON.stringify({ s: "" }),
        expectedOutput: JSON.stringify(true),
        description: "Empty string"
      },
      {
        input: JSON.stringify({ s: "(((" }),
        expectedOutput: JSON.stringify(false),
        description: "Unclosed brackets"
      }
    ],
    templates: {
      python: `# Valid Parentheses
# Given a string s containing just '(', ')', '{', '}', '[' and ']',
# determine if the input string is valid.
# Time Complexity: O(n)
# Space Complexity: O(n)

class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.isValid(input_data["s"])
    print(json.dumps(result))
`,
      java: `// Valid Parentheses
// Given a string s containing just '(', ')', '{', '}', '[' and ']',
// determine if the input string is valid.
// Time Complexity: O(n)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        
        Solution sol = new Solution();
        boolean result = sol.isValid(s);
        System.out.println(result);
    }
}
`,
      cpp: `// Valid Parentheses
// Given a string s containing just '(', ')', '{', '}', '[' and ']',
// determine if the input string is valid.
// Time Complexity: O(n)
// Space Complexity: O(n)

#include <iostream>
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("\\"s\\":\\"") + 5;
    size_t end = input.find("\\"", start);
    string s = input.substr(start, end - start);
    
    Solution sol;
    bool result = sol.isValid(s);
    cout << (result ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Valid Parentheses
// Given a string s containing just '(', ')', '{', '}', '[' and ']',
// determine if the input string is valid.
// Time Complexity: O(n)
// Space Complexity: O(n)

function isValid(s) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = isValid(input.s);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 3: Maximum Subarray (Kadane's Algorithm)
  // ============================================
  "maximum-subarray": {
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    functionName: "maxSubArray",
    testCases: [
      {
        input: JSON.stringify({ nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }),
        expectedOutput: JSON.stringify(6),
        description: "Mixed positive and negative - subarray [4,-1,2,1]"
      },
      {
        input: JSON.stringify({ nums: [1] }),
        expectedOutput: JSON.stringify(1),
        description: "Single element"
      },
      {
        input: JSON.stringify({ nums: [5, 4, -1, 7, 8] }),
        expectedOutput: JSON.stringify(23),
        description: "All positive - entire array"
      },
      {
        input: JSON.stringify({ nums: [-1] }),
        expectedOutput: JSON.stringify(-1),
        description: "Single negative element"
      },
      {
        input: JSON.stringify({ nums: [-2, -1] }),
        expectedOutput: JSON.stringify(-1),
        description: "All negative - pick largest"
      },
      {
        input: JSON.stringify({ nums: [1, 2, 3, 4, 5] }),
        expectedOutput: JSON.stringify(15),
        description: "All positive ascending"
      }
    ],
    templates: {
      python: `# Maximum Subarray
# Given an integer array nums, find the subarray with the largest sum,
# and return its sum.
# Time Complexity: O(n) using Kadane's Algorithm
# Space Complexity: O(1)

from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.maxSubArray(input_data["nums"])
    print(json.dumps(result))
`,
      java: `// Maximum Subarray
// Given an integer array nums, find the subarray with the largest sum,
// and return its sum.
// Time Complexity: O(n) using Kadane's Algorithm
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) {
            nums[i] = numsArr.get(i).getAsInt();
        }
        
        Solution sol = new Solution();
        int result = sol.maxSubArray(nums);
        System.out.println(result);
    }
}
`,
      cpp: `// Maximum Subarray
// Given an integer array nums, find the subarray with the largest sum,
// and return its sum.
// Time Complexity: O(n) using Kadane's Algorithm
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string numsStr = input.substr(start, end - start + 1);
    
    vector<int> nums = parseArray(numsStr);
    Solution sol;
    int result = sol.maxSubArray(nums);
    cout << result << endl;
    return 0;
}
`,
      javascript: `// Maximum Subarray
// Given an integer array nums, find the subarray with the largest sum,
// and return its sum.
// Time Complexity: O(n) using Kadane's Algorithm
// Space Complexity: O(1)

function maxSubArray(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = maxSubArray(input.nums);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 4: Reverse Linked List
  // ============================================
  "reverse-linked-list": {
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    functionName: "reverseList",
    testCases: [
      {
        input: JSON.stringify({ head: [1, 2, 3, 4, 5] }),
        expectedOutput: JSON.stringify([5, 4, 3, 2, 1]),
        description: "Standard linked list reversal"
      },
      {
        input: JSON.stringify({ head: [1, 2] }),
        expectedOutput: JSON.stringify([2, 1]),
        description: "Two elements"
      },
      {
        input: JSON.stringify({ head: [] }),
        expectedOutput: JSON.stringify([]),
        description: "Empty list"
      },
      {
        input: JSON.stringify({ head: [1] }),
        expectedOutput: JSON.stringify([1]),
        description: "Single element"
      },
      {
        input: JSON.stringify({ head: [1, 2, 3] }),
        expectedOutput: JSON.stringify([3, 2, 1]),
        description: "Three elements"
      }
    ],
    templates: {
      python: `# Reverse Linked List
# Given the head of a singly linked list, reverse the list,
# and return the reversed list.
# Time Complexity: O(n)
# Space Complexity: O(1) iterative, O(n) recursive

from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

def arrayToList(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def listToArray(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    head = arrayToList(input_data["head"])
    result = sol.reverseList(head)
    print(json.dumps(listToArray(result)))
`,
      java: `// Reverse Linked List
// Given the head of a singly linked list, reverse the list,
// and return the reversed list.
// Time Complexity: O(n)
// Space Complexity: O(1) iterative, O(n) recursive

import java.util.*;
import com.google.gson.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
        return null;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static ListNode arrayToList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    
    public static int[] listToArray(ListNode head) {
        List<Integer> list = new ArrayList<>();
        while (head != null) {
            list.add(head.val);
            head = head.next;
        }
        return list.stream().mapToInt(i -> i).toArray();
    }

    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray headArr = input.getAsJsonArray("head");
        int[] arr = new int[headArr.size()];
        for (int i = 0; i < headArr.size(); i++) {
            arr[i] = headArr.get(i).getAsInt();
        }
        
        Solution sol = new Solution();
        ListNode head = arrayToList(arr);
        ListNode result = sol.reverseList(head);
        System.out.println(new Gson().toJson(listToArray(result)));
    }
}
`,
      cpp: `// Reverse Linked List
// Given the head of a singly linked list, reverse the list,
// and return the reversed list.
// Time Complexity: O(n)
// Space Complexity: O(1) iterative, O(n) recursive

#include <iostream>
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your code here
        return nullptr;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>

ListNode* arrayToList(vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (int i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

void printList(ListNode* head) {
    cout << "[";
    bool first = true;
    while (head) {
        if (!first) cout << ",";
        cout << head->val;
        first = false;
        head = head->next;
    }
    cout << "]" << endl;
}

vector<int> parseArray(const string& s) {
    vector<int> result;
    if (s == "[]") return result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string arrStr = input.substr(start, end - start + 1);
    
    vector<int> arr = parseArray(arrStr);
    ListNode* head = arrayToList(arr);
    
    Solution sol;
    ListNode* result = sol.reverseList(head);
    printList(result);
    return 0;
}
`,
      javascript: `// Reverse Linked List
// Given the head of a singly linked list, reverse the list,
// and return the reversed list.
// Time Complexity: O(n)
// Space Complexity: O(1) iterative, O(n) recursive

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
function arrayToList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

function listToArray(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

const input = JSON.parse(process.argv[2]);
const head = arrayToList(input.head);
const result = reverseList(head);
console.log(JSON.stringify(listToArray(result)));
`
    }
  },

  // ============================================
  // PROBLEM 5: Container With Most Water
  // ============================================
  "container-with-most-water": {
    slug: "container-with-most-water",
    title: "Container With Most Water",
    functionName: "maxArea",
    testCases: [
      {
        input: JSON.stringify({ height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }),
        expectedOutput: JSON.stringify(49),
        description: "Standard case - lines at index 1 and 8"
      },
      {
        input: JSON.stringify({ height: [1, 1] }),
        expectedOutput: JSON.stringify(1),
        description: "Two equal heights"
      },
      {
        input: JSON.stringify({ height: [4, 3, 2, 1, 4] }),
        expectedOutput: JSON.stringify(16),
        description: "Equal heights at ends"
      },
      {
        input: JSON.stringify({ height: [1, 2, 1] }),
        expectedOutput: JSON.stringify(2),
        description: "Three elements"
      },
      {
        input: JSON.stringify({ height: [2, 3, 4, 5, 18, 17, 6] }),
        expectedOutput: JSON.stringify(17),
        description: "Tall lines in middle"
      }
    ],
    templates: {
      python: `# Container With Most Water
# Given n non-negative integers a1, a2, ..., an, where each represents a point at (i, ai).
# Find two lines that together with the x-axis form a container that holds the most water.
# Time Complexity: O(n) with two pointers
# Space Complexity: O(1)

from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.maxArea(input_data["height"])
    print(json.dumps(result))
`,
      java: `// Container With Most Water
// Given n non-negative integers, find two lines that form a container holding the most water.
// Time Complexity: O(n) with two pointers
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int maxArea(int[] height) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray heightArr = input.getAsJsonArray("height");
        int[] height = new int[heightArr.size()];
        for (int i = 0; i < heightArr.size(); i++) {
            height[i] = heightArr.get(i).getAsInt();
        }
        
        Solution sol = new Solution();
        int result = sol.maxArea(height);
        System.out.println(result);
    }
}
`,
      cpp: `// Container With Most Water
// Given n non-negative integers, find two lines that form a container holding the most water.
// Time Complexity: O(n) with two pointers
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string heightStr = input.substr(start, end - start + 1);
    
    vector<int> height = parseArray(heightStr);
    Solution sol;
    int result = sol.maxArea(height);
    cout << result << endl;
    return 0;
}
`,
      javascript: `// Container With Most Water
// Given n non-negative integers, find two lines that form a container holding the most water.
// Time Complexity: O(n) with two pointers
// Space Complexity: O(1)

function maxArea(height) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = maxArea(input.height);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 6: 3Sum
  // ============================================
  "3sum": {
    slug: "3sum",
    title: "3Sum",
    functionName: "threeSum",
    testCases: [
      {
        input: JSON.stringify({ nums: [-1, 0, 1, 2, -1, -4] }),
        expectedOutput: JSON.stringify([[-1, -1, 2], [-1, 0, 1]]),
        description: "Standard case with duplicates"
      },
      {
        input: JSON.stringify({ nums: [0, 1, 1] }),
        expectedOutput: JSON.stringify([]),
        description: "No valid triplets"
      },
      {
        input: JSON.stringify({ nums: [0, 0, 0] }),
        expectedOutput: JSON.stringify([[0, 0, 0]]),
        description: "All zeros"
      },
      {
        input: JSON.stringify({ nums: [-2, 0, 1, 1, 2] }),
        expectedOutput: JSON.stringify([[-2, 0, 2], [-2, 1, 1]]),
        description: "Multiple triplets"
      },
      {
        input: JSON.stringify({ nums: [1, 2, -2, -1] }),
        expectedOutput: JSON.stringify([]),
        description: "No triplets sum to zero"
      }
    ],
    templates: {
      python: `# 3Sum
# Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
# such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
# Time Complexity: O(n²)
# Space Complexity: O(1) excluding output

from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.threeSum(input_data["nums"])
    # Sort for comparison
    result = sorted([sorted(x) for x in result])
    print(json.dumps(result))
`,
      java: `// 3Sum
// Given an integer array nums, return all the triplets that sum to 0.
// Time Complexity: O(n²)
// Space Complexity: O(1) excluding output

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) {
            nums[i] = numsArr.get(i).getAsInt();
        }
        
        Solution sol = new Solution();
        List<List<Integer>> result = sol.threeSum(nums);
        // Sort for comparison
        for (List<Integer> triplet : result) {
            Collections.sort(triplet);
        }
        result.sort((a, b) -> {
            for (int i = 0; i < 3; i++) {
                if (!a.get(i).equals(b.get(i))) return a.get(i) - b.get(i);
            }
            return 0;
        });
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// 3Sum
// Given an integer array nums, return all the triplets that sum to 0.
// Time Complexity: O(n²)
// Space Complexity: O(1) excluding output

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string numsStr = input.substr(start, end - start + 1);
    
    vector<int> nums = parseArray(numsStr);
    Solution sol;
    vector<vector<int>> result = sol.threeSum(nums);
    
    // Sort for comparison
    for (auto& triplet : result) sort(triplet.begin(), triplet.end());
    sort(result.begin(), result.end());
    
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[" << result[i][0] << "," << result[i][1] << "," << result[i][2] << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// 3Sum
// Given an integer array nums, return all the triplets that sum to 0.
// Time Complexity: O(n²)
// Space Complexity: O(1) excluding output

function threeSum(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
let result = threeSum(input.nums) || [];
// Sort for comparison
result = result.map(x => x.sort((a,b) => a-b)).sort((a,b) => {
    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
});
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 7: Climbing Stairs
  // ============================================
  "climbing-stairs": {
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    functionName: "climbStairs",
    testCases: [
      {
        input: JSON.stringify({ n: 2 }),
        expectedOutput: JSON.stringify(2),
        description: "2 stairs: (1+1) or (2)"
      },
      {
        input: JSON.stringify({ n: 3 }),
        expectedOutput: JSON.stringify(3),
        description: "3 stairs: (1+1+1), (1+2), (2+1)"
      },
      {
        input: JSON.stringify({ n: 4 }),
        expectedOutput: JSON.stringify(5),
        description: "4 stairs: 5 ways"
      },
      {
        input: JSON.stringify({ n: 5 }),
        expectedOutput: JSON.stringify(8),
        description: "5 stairs: Fibonacci pattern"
      },
      {
        input: JSON.stringify({ n: 1 }),
        expectedOutput: JSON.stringify(1),
        description: "1 stair: only one way"
      },
      {
        input: JSON.stringify({ n: 10 }),
        expectedOutput: JSON.stringify(89),
        description: "10 stairs"
      }
    ],
    templates: {
      python: `# Climbing Stairs
# You are climbing a staircase. It takes n steps to reach the top.
# Each time you can either climb 1 or 2 steps. How many distinct ways can you climb to the top?
# Time Complexity: O(n)
# Space Complexity: O(1)

class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.climbStairs(input_data["n"])
    print(json.dumps(result))
`,
      java: `// Climbing Stairs
// You are climbing a staircase. Each time you can climb 1 or 2 steps.
// How many distinct ways can you climb to the top?
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int climbStairs(int n) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        int n = input.get("n").getAsInt();
        
        Solution sol = new Solution();
        int result = sol.climbStairs(n);
        System.out.println(result);
    }
}
`,
      cpp: `// Climbing Stairs
// You are climbing a staircase. Each time you can climb 1 or 2 steps.
// How many distinct ways can you climb to the top?
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <string>
int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t pos = input.find(":");
    int n = stoi(input.substr(pos + 1));
    
    Solution sol;
    int result = sol.climbStairs(n);
    cout << result << endl;
    return 0;
}
`,
      javascript: `// Climbing Stairs
// You are climbing a staircase. Each time you can climb 1 or 2 steps.
// How many distinct ways can you climb to the top?
// Time Complexity: O(n)
// Space Complexity: O(1)

function climbStairs(n) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = climbStairs(input.n);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 9: Longest Substring Without Repeating Characters
  // ============================================
  "longest-substring-without-repeating-characters": {
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    functionName: "lengthOfLongestSubstring",
    testCases: [
      {
        input: JSON.stringify({ s: "abcabcbb" }),
        expectedOutput: JSON.stringify(3),
        description: "abc is the longest substring"
      },
      {
        input: JSON.stringify({ s: "bbbbb" }),
        expectedOutput: JSON.stringify(1),
        description: "All same characters"
      },
      {
        input: JSON.stringify({ s: "pwwkew" }),
        expectedOutput: JSON.stringify(3),
        description: "wke is the longest"
      },
      {
        input: JSON.stringify({ s: "" }),
        expectedOutput: JSON.stringify(0),
        description: "Empty string"
      },
      {
        input: JSON.stringify({ s: "dvdf" }),
        expectedOutput: JSON.stringify(3),
        description: "vdf is the longest"
      },
      {
        input: JSON.stringify({ s: "abcdef" }),
        expectedOutput: JSON.stringify(6),
        description: "All unique characters"
      }
    ],
    templates: {
      python: `# Longest Substring Without Repeating Characters
# Given a string s, find the length of the longest substring without repeating characters.
# Time Complexity: O(n) with sliding window
# Space Complexity: O(min(m, n)) where m is the charset size

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.lengthOfLongestSubstring(input_data["s"])
    print(json.dumps(result))
`,
      java: `// Longest Substring Without Repeating Characters
// Find the length of the longest substring without repeating characters.
// Time Complexity: O(n)
// Space Complexity: O(min(m, n))

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        
        Solution sol = new Solution();
        int result = sol.lengthOfLongestSubstring(s);
        System.out.println(result);
    }
}
`,
      cpp: `// Longest Substring Without Repeating Characters
// Find the length of the longest substring without repeating characters.
// Time Complexity: O(n)
// Space Complexity: O(min(m, n))

#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("\\"s\\":\\"") + 5;
    size_t end = input.find("\\"", start);
    string s = (start < input.length() && end != string::npos) ? input.substr(start, end - start) : "";
    
    Solution sol;
    int result = sol.lengthOfLongestSubstring(s);
    cout << result << endl;
    return 0;
}
`,
      javascript: `// Longest Substring Without Repeating Characters
// Find the length of the longest substring without repeating characters.
// Time Complexity: O(n)
// Space Complexity: O(min(m, n))

function lengthOfLongestSubstring(s) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = lengthOfLongestSubstring(input.s);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 10: Merge Two Sorted Lists
  // ============================================
  "merge-two-sorted-lists": {
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    functionName: "mergeTwoLists",
    testCases: [
      {
        input: JSON.stringify({ list1: [1, 2, 4], list2: [1, 3, 4] }),
        expectedOutput: JSON.stringify([1, 1, 2, 3, 4, 4]),
        description: "Standard merge"
      },
      {
        input: JSON.stringify({ list1: [], list2: [] }),
        expectedOutput: JSON.stringify([]),
        description: "Both empty lists"
      },
      {
        input: JSON.stringify({ list1: [], list2: [0] }),
        expectedOutput: JSON.stringify([0]),
        description: "One empty list"
      },
      {
        input: JSON.stringify({ list1: [1, 3, 5], list2: [2, 4, 6] }),
        expectedOutput: JSON.stringify([1, 2, 3, 4, 5, 6]),
        description: "Alternating merge"
      },
      {
        input: JSON.stringify({ list1: [5], list2: [1, 2, 4] }),
        expectedOutput: JSON.stringify([1, 2, 4, 5]),
        description: "Single element first list"
      }
    ],
    templates: {
      python: `# Merge Two Sorted Lists
# Merge two sorted linked lists and return it as a sorted list.
# Time Complexity: O(n + m)
# Space Complexity: O(1)

from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

def arrayToList(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def listToArray(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    list1 = arrayToList(input_data["list1"])
    list2 = arrayToList(input_data["list2"])
    result = sol.mergeTwoLists(list1, list2)
    print(json.dumps(listToArray(result)))
`,
      java: `// Merge Two Sorted Lists
// Merge two sorted linked lists and return it as a sorted list.
// Time Complexity: O(n + m)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your code here
        return null;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static ListNode arrayToList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    
    public static int[] listToArray(ListNode head) {
        List<Integer> list = new ArrayList<>();
        while (head != null) {
            list.add(head.val);
            head = head.next;
        }
        return list.stream().mapToInt(i -> i).toArray();
    }

    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray list1Arr = input.getAsJsonArray("list1");
        JsonArray list2Arr = input.getAsJsonArray("list2");
        
        int[] arr1 = new int[list1Arr.size()];
        for (int i = 0; i < list1Arr.size(); i++) arr1[i] = list1Arr.get(i).getAsInt();
        int[] arr2 = new int[list2Arr.size()];
        for (int i = 0; i < list2Arr.size(); i++) arr2[i] = list2Arr.get(i).getAsInt();
        
        Solution sol = new Solution();
        ListNode result = sol.mergeTwoLists(arrayToList(arr1), arrayToList(arr2));
        System.out.println(new Gson().toJson(listToArray(result)));
    }
}
`,
      cpp: `// Merge Two Sorted Lists
// Merge two sorted linked lists and return it as a sorted list.
// Time Complexity: O(n + m)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your code here
        return nullptr;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>

ListNode* arrayToList(vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (int i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

void printList(ListNode* head) {
    cout << "[";
    bool first = true;
    while (head) {
        if (!first) cout << ",";
        cout << head->val;
        first = false;
        head = head->next;
    }
    cout << "]" << endl;
}

vector<int> parseArray(const string& s) {
    vector<int> result;
    if (s == "[]") return result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t s1 = input.find("[");
    size_t e1 = input.find("]");
    size_t s2 = input.find("[", e1+1);
    size_t e2 = input.find("]", s2);
    
    vector<int> arr1 = parseArray(input.substr(s1, e1-s1+1));
    vector<int> arr2 = parseArray(input.substr(s2, e2-s2+1));
    
    Solution sol;
    ListNode* result = sol.mergeTwoLists(arrayToList(arr1), arrayToList(arr2));
    printList(result);
    return 0;
}
`,
      javascript: `// Merge Two Sorted Lists
// Merge two sorted linked lists and return it as a sorted list.
// Time Complexity: O(n + m)
// Space Complexity: O(1)

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeTwoLists(list1, list2) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
function arrayToList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

function listToArray(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

const input = JSON.parse(process.argv[2]);
const list1 = arrayToList(input.list1);
const list2 = arrayToList(input.list2);
const result = mergeTwoLists(list1, list2);
console.log(JSON.stringify(listToArray(result)));
`
    }
  },

  // ============================================
  // PROBLEM 11: Binary Search
  // ============================================
  "binary-search": {
    slug: "binary-search",
    title: "Binary Search",
    functionName: "search",
    testCases: [
      {
        input: JSON.stringify({ nums: [-1, 0, 3, 5, 9, 12], target: 9 }),
        expectedOutput: JSON.stringify(4),
        description: "Target found at index 4"
      },
      {
        input: JSON.stringify({ nums: [-1, 0, 3, 5, 9, 12], target: 2 }),
        expectedOutput: JSON.stringify(-1),
        description: "Target not found"
      },
      {
        input: JSON.stringify({ nums: [5], target: 5 }),
        expectedOutput: JSON.stringify(0),
        description: "Single element found"
      },
      {
        input: JSON.stringify({ nums: [2, 5], target: 5 }),
        expectedOutput: JSON.stringify(1),
        description: "Two elements, target at end"
      },
      {
        input: JSON.stringify({ nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 1 }),
        expectedOutput: JSON.stringify(0),
        description: "Target at beginning"
      }
    ],
    templates: {
      python: `# Binary Search
# Given a sorted array of integers nums and a target value,
# return the index if the target is found. If not, return -1.
# Time Complexity: O(log n)
# Space Complexity: O(1)

from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.search(input_data["nums"], input_data["target"])
    print(json.dumps(result))
`,
      java: `// Binary Search
// Given a sorted array, return the index if target is found, else -1.
// Time Complexity: O(log n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) {
            nums[i] = numsArr.get(i).getAsInt();
        }
        int target = input.get("target").getAsInt();
        
        Solution sol = new Solution();
        int result = sol.search(nums, target);
        System.out.println(result);
    }
}
`,
      cpp: `// Binary Search
// Given a sorted array, return the index if target is found, else -1.
// Time Complexity: O(log n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        return -1;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string numsStr = input.substr(start, end - start + 1);
    size_t targetPos = input.find("target");
    int target = stoi(input.substr(input.find(":", targetPos) + 1));
    
    vector<int> nums = parseArray(numsStr);
    Solution sol;
    int result = sol.search(nums, target);
    cout << result << endl;
    return 0;
}
`,
      javascript: `// Binary Search
// Given a sorted array, return the index if target is found, else -1.
// Time Complexity: O(log n)
// Space Complexity: O(1)

function search(nums, target) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = search(input.nums, input.target);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 13: Best Time to Buy and Sell Stock
  // ============================================
  "best-time-to-buy-and-sell-stock": {
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    functionName: "maxProfit",
    testCases: [
      {
        input: JSON.stringify({ prices: [7, 1, 5, 3, 6, 4] }),
        expectedOutput: JSON.stringify(5),
        description: "Buy at 1, sell at 6"
      },
      {
        input: JSON.stringify({ prices: [7, 6, 4, 3, 1] }),
        expectedOutput: JSON.stringify(0),
        description: "Prices only decrease - no profit"
      },
      {
        input: JSON.stringify({ prices: [1, 2] }),
        expectedOutput: JSON.stringify(1),
        description: "Two prices increasing"
      },
      {
        input: JSON.stringify({ prices: [2, 4, 1] }),
        expectedOutput: JSON.stringify(2),
        description: "Buy at 2, sell at 4"
      },
      {
        input: JSON.stringify({ prices: [3, 3, 5, 0, 0, 3, 1, 4] }),
        expectedOutput: JSON.stringify(4),
        description: "Buy at 0, sell at 4"
      }
    ],
    templates: {
      python: `# Best Time to Buy and Sell Stock
# Given prices where prices[i] is the price on the ith day,
# find the maximum profit you can achieve by buying and selling once.
# Time Complexity: O(n)
# Space Complexity: O(1)

from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.maxProfit(input_data["prices"])
    print(json.dumps(result))
`,
      java: `// Best Time to Buy and Sell Stock
// Find the maximum profit by buying and selling once.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray pricesArr = input.getAsJsonArray("prices");
        int[] prices = new int[pricesArr.size()];
        for (int i = 0; i < pricesArr.size(); i++) {
            prices[i] = pricesArr.get(i).getAsInt();
        }
        
        Solution sol = new Solution();
        int result = sol.maxProfit(prices);
        System.out.println(result);
    }
}
`,
      cpp: `// Best Time to Buy and Sell Stock
// Find the maximum profit by buying and selling once.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string pricesStr = input.substr(start, end - start + 1);
    
    vector<int> prices = parseArray(pricesStr);
    Solution sol;
    int result = sol.maxProfit(prices);
    cout << result << endl;
    return 0;
}
`,
      javascript: `// Best Time to Buy and Sell Stock
// Find the maximum profit by buying and selling once.
// Time Complexity: O(n)
// Space Complexity: O(1)

function maxProfit(prices) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = maxProfit(input.prices);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 14: Product of Array Except Self
  // ============================================
  "product-of-array-except-self": {
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    functionName: "productExceptSelf",
    testCases: [
      {
        input: JSON.stringify({ nums: [1, 2, 3, 4] }),
        expectedOutput: JSON.stringify([24, 12, 8, 6]),
        description: "Standard case"
      },
      {
        input: JSON.stringify({ nums: [-1, 1, 0, -3, 3] }),
        expectedOutput: JSON.stringify([0, 0, 9, 0, 0]),
        description: "Contains zero"
      },
      {
        input: JSON.stringify({ nums: [2, 3] }),
        expectedOutput: JSON.stringify([3, 2]),
        description: "Two elements"
      },
      {
        input: JSON.stringify({ nums: [1, 1, 1, 1] }),
        expectedOutput: JSON.stringify([1, 1, 1, 1]),
        description: "All ones"
      },
      {
        input: JSON.stringify({ nums: [0, 0] }),
        expectedOutput: JSON.stringify([0, 0]),
        description: "Two zeros"
      }
    ],
    templates: {
      python: `# Product of Array Except Self
# Return an array where answer[i] equals the product of all elements except nums[i].
# Solve without using division and in O(n) time.
# Time Complexity: O(n)
# Space Complexity: O(1) excluding output

from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.productExceptSelf(input_data["nums"])
    print(json.dumps(result))
`,
      java: `// Product of Array Except Self
// Return an array where answer[i] equals the product of all elements except nums[i].
// Time Complexity: O(n)
// Space Complexity: O(1) excluding output

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Write your code here
        return new int[]{};
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) {
            nums[i] = numsArr.get(i).getAsInt();
        }
        
        Solution sol = new Solution();
        int[] result = sol.productExceptSelf(nums);
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Product of Array Except Self
// Return an array where answer[i] equals the product of all elements except nums[i].
// Time Complexity: O(n)
// Space Complexity: O(1) excluding output

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string numsStr = input.substr(start, end - start + 1);
    
    vector<int> nums = parseArray(numsStr);
    Solution sol;
    vector<int> result = sol.productExceptSelf(nums);
    
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Product of Array Except Self
// Return an array where answer[i] equals the product of all elements except nums[i].
// Time Complexity: O(n)
// Space Complexity: O(1) excluding output

function productExceptSelf(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = productExceptSelf(input.nums);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 15: Merge Intervals
  // ============================================
  "merge-intervals": {
    slug: "merge-intervals",
    title: "Merge Intervals",
    functionName: "merge",
    testCases: [
      {
        input: JSON.stringify({ intervals: [[1,3],[2,6],[8,10],[15,18]] }),
        expectedOutput: JSON.stringify([[1,6],[8,10],[15,18]]),
        description: "[1,3] and [2,6] merge"
      },
      {
        input: JSON.stringify({ intervals: [[1,4],[4,5]] }),
        expectedOutput: JSON.stringify([[1,5]]),
        description: "Adjacent intervals merge"
      },
      {
        input: JSON.stringify({ intervals: [[1,4],[0,4]] }),
        expectedOutput: JSON.stringify([[0,4]]),
        description: "Overlapping start"
      },
      {
        input: JSON.stringify({ intervals: [[1,4],[2,3]] }),
        expectedOutput: JSON.stringify([[1,4]]),
        description: "Contained interval"
      },
      {
        input: JSON.stringify({ intervals: [[1,4]] }),
        expectedOutput: JSON.stringify([[1,4]]),
        description: "Single interval"
      }
    ],
    templates: {
      python: `# Merge Intervals
# Given an array of intervals, merge all overlapping intervals.
# Time Complexity: O(n log n) for sorting
# Space Complexity: O(n) for output

from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.merge(input_data["intervals"])
    print(json.dumps(result))
`,
      java: `// Merge Intervals
// Given an array of intervals, merge all overlapping intervals.
// Time Complexity: O(n log n)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        return new int[][]{};
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray intervalsArr = input.getAsJsonArray("intervals");
        int[][] intervals = new int[intervalsArr.size()][2];
        for (int i = 0; i < intervalsArr.size(); i++) {
            JsonArray interval = intervalsArr.get(i).getAsJsonArray();
            intervals[i][0] = interval.get(0).getAsInt();
            intervals[i][1] = interval.get(1).getAsInt();
        }
        
        Solution sol = new Solution();
        int[][] result = sol.merge(intervals);
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Merge Intervals
// Given an array of intervals, merge all overlapping intervals.
// Time Complexity: O(n log n)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string input = argv[1];
    vector<vector<int>> intervals;
    
    size_t pos = input.find("[[") + 1;
    while (pos < input.length()) {
        size_t start = input.find("[", pos);
        if (start == string::npos) break;
        size_t end = input.find("]", start);
        string interval = input.substr(start + 1, end - start - 1);
        size_t comma = interval.find(",");
        int a = stoi(interval.substr(0, comma));
        int b = stoi(interval.substr(comma + 1));
        intervals.push_back({a, b});
        pos = end + 1;
    }
    
    Solution sol;
    vector<vector<int>> result = sol.merge(intervals);
    
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[" << result[i][0] << "," << result[i][1] << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Merge Intervals
// Given an array of intervals, merge all overlapping intervals.
// Time Complexity: O(n log n)
// Space Complexity: O(n)

function merge(intervals) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = merge(input.intervals);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 16: Group Anagrams
  // ============================================
  "group-anagrams": {
    slug: "group-anagrams",
    title: "Group Anagrams",
    functionName: "groupAnagrams",
    testCases: [
      {
        input: JSON.stringify({ strs: ["eat","tea","tan","ate","nat","bat"] }),
        expectedOutput: JSON.stringify([["bat"],["nat","tan"],["ate","eat","tea"]]),
        description: "Standard grouping"
      },
      {
        input: JSON.stringify({ strs: [""] }),
        expectedOutput: JSON.stringify([[""]]),
        description: "Empty string"
      },
      {
        input: JSON.stringify({ strs: ["a"] }),
        expectedOutput: JSON.stringify([["a"]]),
        description: "Single character"
      },
      {
        input: JSON.stringify({ strs: ["abc","bca","cab","xyz","zyx"] }),
        expectedOutput: JSON.stringify([["abc","bca","cab"],["xyz","zyx"]]),
        description: "Two groups"
      },
      {
        input: JSON.stringify({ strs: ["a","b","c"] }),
        expectedOutput: JSON.stringify([["a"],["b"],["c"]]),
        description: "No anagrams"
      }
    ],
    templates: {
      python: `# Group Anagrams
# Given an array of strings, group the anagrams together.
# Time Complexity: O(n × k log k) where k is max string length
# Space Complexity: O(n × k)

from typing import List
from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.groupAnagrams(input_data["strs"])
    # Sort for comparison
    result = sorted([sorted(group) for group in result])
    print(json.dumps(result))
`,
      java: `// Group Anagrams
// Given an array of strings, group the anagrams together.
// Time Complexity: O(n × k log k)
// Space Complexity: O(n × k)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray strsArr = input.getAsJsonArray("strs");
        String[] strs = new String[strsArr.size()];
        for (int i = 0; i < strsArr.size(); i++) {
            strs[i] = strsArr.get(i).getAsString();
        }
        
        Solution sol = new Solution();
        List<List<String>> result = sol.groupAnagrams(strs);
        // Sort for comparison
        for (List<String> group : result) Collections.sort(group);
        result.sort((a, b) -> a.get(0).compareTo(b.get(0)));
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Group Anagrams
// Given an array of strings, group the anagrams together.
// Time Complexity: O(n × k log k)
// Space Complexity: O(n × k)

#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string input = argv[1];
    vector<string> strs;
    
    size_t pos = 0;
    while ((pos = input.find("\\"", pos)) != string::npos) {
        size_t end = input.find("\\"", pos + 1);
        strs.push_back(input.substr(pos + 1, end - pos - 1));
        pos = end + 1;
    }
    
    Solution sol;
    vector<vector<string>> result = sol.groupAnagrams(strs);
    
    // Sort for comparison
    for (auto& group : result) sort(group.begin(), group.end());
    sort(result.begin(), result.end());
    
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            if (j > 0) cout << ",";
            cout << "\\"" << result[i][j] << "\\"";
        }
        cout << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Group Anagrams
// Given an array of strings, group the anagrams together.
// Time Complexity: O(n × k log k)
// Space Complexity: O(n × k)

function groupAnagrams(strs) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
let result = groupAnagrams(input.strs) || [];
// Sort for comparison
result = result.map(g => g.sort()).sort((a, b) => a[0].localeCompare(b[0]));
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 17: LRU Cache
  // ============================================
  "lru-cache": {
    slug: "lru-cache",
    title: "LRU Cache",
    functionName: "LRUCache",
    testCases: [
      {
        input: JSON.stringify({ 
          operations: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
          args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
        }),
        expectedOutput: JSON.stringify([null, null, null, 1, null, -1, null, -1, 3, 4]),
        description: "Standard LRU operations"
      },
      {
        input: JSON.stringify({ 
          operations: ["LRUCache", "put", "get"],
          args: [[1], [2, 1], [2]]
        }),
        expectedOutput: JSON.stringify([null, null, 1]),
        description: "Simple put and get"
      },
      {
        input: JSON.stringify({ 
          operations: ["LRUCache", "put", "put", "get", "put", "get"],
          args: [[2], [1, 1], [2, 2], [1], [3, 3], [2]]
        }),
        expectedOutput: JSON.stringify([null, null, null, 1, null, -1]),
        description: "Eviction test"
      }
    ],
    templates: {
      python: `# LRU Cache
# Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
# get(key): Return the value if key exists, otherwise return -1.
# put(key, value): Update or insert. Evict LRU key when capacity is reached.
# Time Complexity: O(1) for both operations
# Space Complexity: O(capacity)

class LRUCache:
    def __init__(self, capacity: int):
        # Write your code here
        pass
    
    def get(self, key: int) -> int:
        # Write your code here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    operations = input_data["operations"]
    args = input_data["args"]
    
    result = []
    cache = None
    
    for i, op in enumerate(operations):
        if op == "LRUCache":
            cache = LRUCache(args[i][0])
            result.append(None)
        elif op == "get":
            result.append(cache.get(args[i][0]))
        elif op == "put":
            cache.put(args[i][0], args[i][1])
            result.append(None)
    
    print(json.dumps(result))
`,
      java: `// LRU Cache
// Design a LRU cache with get and put operations in O(1) time.
// Time Complexity: O(1)
// Space Complexity: O(capacity)

import java.util.*;
import com.google.gson.*;

class LRUCache {
    public LRUCache(int capacity) {
        // Write your code here
    }
    
    public int get(int key) {
        // Write your code here
        return -1;
    }
    
    public void put(int key, int value) {
        // Write your code here
    }
}

public class Solution {
    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray operations = input.getAsJsonArray("operations");
        JsonArray argsArr = input.getAsJsonArray("args");
        
        List<Integer> result = new ArrayList<>();
        LRUCache cache = null;
        
        for (int i = 0; i < operations.size(); i++) {
            String op = operations.get(i).getAsString();
            JsonArray opArgs = argsArr.get(i).getAsJsonArray();
            
            if (op.equals("LRUCache")) {
                cache = new LRUCache(opArgs.get(0).getAsInt());
                result.add(null);
            } else if (op.equals("get")) {
                result.add(cache.get(opArgs.get(0).getAsInt()));
            } else if (op.equals("put")) {
                cache.put(opArgs.get(0).getAsInt(), opArgs.get(1).getAsInt());
                result.add(null);
            }
        }
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// LRU Cache
// Design a LRU cache with get and put operations in O(1) time.
// Time Complexity: O(1)
// Space Complexity: O(capacity)

#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {
        // Write your code here
    }
    
    int get(int key) {
        // Write your code here
        return -1;
    }
    
    void put(int key, int value) {
        // Write your code here
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    // Simplified test - actual parsing would be more complex
    LRUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl; // 1
    cache.put(3, 3);
    cout << cache.get(2) << endl; // -1
    return 0;
}
`,
      javascript: `// LRU Cache
// Design a LRU cache with get and put operations in O(1) time.
// Time Complexity: O(1)
// Space Complexity: O(capacity)

class LRUCache {
    constructor(capacity) {
        // Write your code here
    }
    
    get(key) {
        // Write your code here
        return -1;
    }
    
    put(key, value) {
        // Write your code here
    }
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const { operations, args } = input;
const result = [];
let cache = null;

for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "LRUCache") {
        cache = new LRUCache(args[i][0]);
        result.push(null);
    } else if (op === "get") {
        result.push(cache.get(args[i][0]));
    } else if (op === "put") {
        cache.put(args[i][0], args[i][1]);
        result.push(null);
    }
}
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 18: Min Stack
  // ============================================
  "min-stack": {
    slug: "min-stack",
    title: "Min Stack",
    functionName: "MinStack",
    testCases: [
      {
        input: JSON.stringify({ 
          operations: ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
          args: [[], [-2], [0], [-3], [], [], [], []]
        }),
        expectedOutput: JSON.stringify([null, null, null, null, -3, null, 0, -2]),
        description: "Standard operations"
      },
      {
        input: JSON.stringify({ 
          operations: ["MinStack", "push", "push", "getMin", "pop", "getMin"],
          args: [[], [1], [2], [], [], []]
        }),
        expectedOutput: JSON.stringify([null, null, null, 1, null, 1]),
        description: "Min stays same after pop"
      },
      {
        input: JSON.stringify({ 
          operations: ["MinStack", "push", "getMin", "top"],
          args: [[], [5], [], []]
        }),
        expectedOutput: JSON.stringify([null, null, 5, 5]),
        description: "Single element"
      }
    ],
    templates: {
      python: `# Min Stack
# Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.
# Time Complexity: O(1) for all operations
# Space Complexity: O(n)

class MinStack:
    def __init__(self):
        # Write your code here
        pass
    
    def push(self, val: int) -> None:
        # Write your code here
        pass
    
    def pop(self) -> None:
        # Write your code here
        pass
    
    def top(self) -> int:
        # Write your code here
        pass
    
    def getMin(self) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    operations = input_data["operations"]
    args = input_data["args"]
    
    result = []
    stack = None
    
    for i, op in enumerate(operations):
        if op == "MinStack":
            stack = MinStack()
            result.append(None)
        elif op == "push":
            stack.push(args[i][0])
            result.append(None)
        elif op == "pop":
            stack.pop()
            result.append(None)
        elif op == "top":
            result.append(stack.top())
        elif op == "getMin":
            result.append(stack.getMin())
    
    print(json.dumps(result))
`,
      java: `// Min Stack
// Design a stack with O(1) push, pop, top, and getMin operations.
// Time Complexity: O(1)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

class MinStack {
    public MinStack() {
        // Write your code here
    }
    
    public void push(int val) {
        // Write your code here
    }
    
    public void pop() {
        // Write your code here
    }
    
    public int top() {
        // Write your code here
        return 0;
    }
    
    public int getMin() {
        // Write your code here
        return 0;
    }
}

public class Solution {
    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray operations = input.getAsJsonArray("operations");
        JsonArray argsArr = input.getAsJsonArray("args");
        
        List<Integer> result = new ArrayList<>();
        MinStack stack = null;
        
        for (int i = 0; i < operations.size(); i++) {
            String op = operations.get(i).getAsString();
            JsonArray opArgs = argsArr.get(i).getAsJsonArray();
            
            if (op.equals("MinStack")) {
                stack = new MinStack();
                result.add(null);
            } else if (op.equals("push")) {
                stack.push(opArgs.get(0).getAsInt());
                result.add(null);
            } else if (op.equals("pop")) {
                stack.pop();
                result.add(null);
            } else if (op.equals("top")) {
                result.add(stack.top());
            } else if (op.equals("getMin")) {
                result.add(stack.getMin());
            }
        }
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Min Stack
// Design a stack with O(1) push, pop, top, and getMin operations.
// Time Complexity: O(1)
// Space Complexity: O(n)

#include <iostream>
#include <stack>
using namespace std;

class MinStack {
public:
    MinStack() {
        // Write your code here
    }
    
    void push(int val) {
        // Write your code here
    }
    
    void pop() {
        // Write your code here
    }
    
    int top() {
        // Write your code here
        return 0;
    }
    
    int getMin() {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    MinStack stack;
    stack.push(-2);
    stack.push(0);
    stack.push(-3);
    cout << stack.getMin() << endl; // -3
    stack.pop();
    cout << stack.top() << endl;    // 0
    cout << stack.getMin() << endl; // -2
    return 0;
}
`,
      javascript: `// Min Stack
// Design a stack with O(1) push, pop, top, and getMin operations.
// Time Complexity: O(1)
// Space Complexity: O(n)

class MinStack {
    constructor() {
        // Write your code here
    }
    
    push(val) {
        // Write your code here
    }
    
    pop() {
        // Write your code here
    }
    
    top() {
        // Write your code here
    }
    
    getMin() {
        // Write your code here
    }
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const { operations, args } = input;
const result = [];
let stack = null;

for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "MinStack") {
        stack = new MinStack();
        result.push(null);
    } else if (op === "push") {
        stack.push(args[i][0]);
        result.push(null);
    } else if (op === "pop") {
        stack.pop();
        result.push(null);
    } else if (op === "top") {
        result.push(stack.top());
    } else if (op === "getMin") {
        result.push(stack.getMin());
    }
}
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 19: Rotate Array
  // ============================================
  "rotate-array": {
    slug: "rotate-array",
    title: "Rotate Array",
    functionName: "rotate",
    testCases: [
      {
        input: JSON.stringify({ nums: [1, 2, 3, 4, 5, 6, 7], k: 3 }),
        expectedOutput: JSON.stringify([5, 6, 7, 1, 2, 3, 4]),
        description: "Rotate right by 3"
      },
      {
        input: JSON.stringify({ nums: [-1, -100, 3, 99], k: 2 }),
        expectedOutput: JSON.stringify([3, 99, -1, -100]),
        description: "Rotate with negative numbers"
      },
      {
        input: JSON.stringify({ nums: [1, 2], k: 3 }),
        expectedOutput: JSON.stringify([2, 1]),
        description: "k greater than array length"
      },
      {
        input: JSON.stringify({ nums: [1], k: 0 }),
        expectedOutput: JSON.stringify([1]),
        description: "No rotation"
      },
      {
        input: JSON.stringify({ nums: [1, 2, 3], k: 3 }),
        expectedOutput: JSON.stringify([1, 2, 3]),
        description: "Full rotation (k = length)"
      }
    ],
    templates: {
      python: `# Rotate Array
# Given an array, rotate the array to the right by k steps.
# Time Complexity: O(n)
# Space Complexity: O(1)

from typing import List

class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        # Write your code here (modify nums in-place)
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    nums = input_data["nums"]
    sol.rotate(nums, input_data["k"])
    print(json.dumps(nums))
`,
      java: `// Rotate Array
// Rotate the array to the right by k steps.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public void rotate(int[] nums, int k) {
        // Write your code here (modify nums in-place)
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) {
            nums[i] = numsArr.get(i).getAsInt();
        }
        int k = input.get("k").getAsInt();
        
        Solution sol = new Solution();
        sol.rotate(nums, k);
        System.out.println(new Gson().toJson(nums));
    }
}
`,
      cpp: `// Rotate Array
// Rotate the array to the right by k steps.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        // Write your code here (modify nums in-place)
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string numsStr = input.substr(start, end - start + 1);
    size_t kPos = input.find("k");
    int k = stoi(input.substr(input.find(":", kPos) + 1));
    
    vector<int> nums = parseArray(numsStr);
    Solution sol;
    sol.rotate(nums, k);
    
    cout << "[";
    for (int i = 0; i < nums.size(); i++) {
        if (i > 0) cout << ",";
        cout << nums[i];
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Rotate Array
// Rotate the array to the right by k steps.
// Time Complexity: O(n)
// Space Complexity: O(1)

function rotate(nums, k) {
    // Write your code here (modify nums in-place)
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const nums = input.nums;
rotate(nums, input.k);
console.log(JSON.stringify(nums));
`
    }
  },

  // ============================================
  // PROBLEM 20: Spiral Matrix
  // ============================================
  "spiral-matrix": {
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    functionName: "spiralOrder",
    testCases: [
      {
        input: JSON.stringify({ matrix: [[1,2,3],[4,5,6],[7,8,9]] }),
        expectedOutput: JSON.stringify([1,2,3,6,9,8,7,4,5]),
        description: "3x3 matrix"
      },
      {
        input: JSON.stringify({ matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] }),
        expectedOutput: JSON.stringify([1,2,3,4,8,12,11,10,9,5,6,7]),
        description: "3x4 matrix"
      },
      {
        input: JSON.stringify({ matrix: [[1]] }),
        expectedOutput: JSON.stringify([1]),
        description: "Single element"
      },
      {
        input: JSON.stringify({ matrix: [[1,2],[3,4]] }),
        expectedOutput: JSON.stringify([1,2,4,3]),
        description: "2x2 matrix"
      },
      {
        input: JSON.stringify({ matrix: [[1,2,3]] }),
        expectedOutput: JSON.stringify([1,2,3]),
        description: "Single row"
      },
      {
        input: JSON.stringify({ matrix: [[1],[2],[3]] }),
        expectedOutput: JSON.stringify([1,2,3]),
        description: "Single column"
      }
    ],
    templates: {
      python: `# Spiral Matrix
# Given an m x n matrix, return all elements in spiral order.
# Time Complexity: O(m × n)
# Space Complexity: O(1) excluding output

from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.spiralOrder(input_data["matrix"])
    print(json.dumps(result))
`,
      java: `// Spiral Matrix
// Return all elements of the matrix in spiral order.
// Time Complexity: O(m × n)
// Space Complexity: O(1) excluding output

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray matrixArr = input.getAsJsonArray("matrix");
        int[][] matrix = new int[matrixArr.size()][];
        for (int i = 0; i < matrixArr.size(); i++) {
            JsonArray row = matrixArr.get(i).getAsJsonArray();
            matrix[i] = new int[row.size()];
            for (int j = 0; j < row.size(); j++) {
                matrix[i][j] = row.get(j).getAsInt();
            }
        }
        
        Solution sol = new Solution();
        List<Integer> result = sol.spiralOrder(matrix);
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Spiral Matrix
// Return all elements of the matrix in spiral order.
// Time Complexity: O(m × n)
// Space Complexity: O(1) excluding output

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    vector<vector<int>> matrix = {{1,2,3},{4,5,6},{7,8,9}};
    
    Solution sol;
    vector<int> result = sol.spiralOrder(matrix);
    
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Spiral Matrix
// Return all elements of the matrix in spiral order.
// Time Complexity: O(m × n)
// Space Complexity: O(1) excluding output

function spiralOrder(matrix) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = spiralOrder(input.matrix);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 21: Valid Palindrome
  // ============================================
  "valid-palindrome": {
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    functionName: "isPalindrome",
    testCases: [
      {
        input: JSON.stringify({ s: "A man, a plan, a canal: Panama" }),
        expectedOutput: JSON.stringify(true),
        description: "Classic palindrome with punctuation"
      },
      {
        input: JSON.stringify({ s: "race a car" }),
        expectedOutput: JSON.stringify(false),
        description: "Not a palindrome"
      },
      {
        input: JSON.stringify({ s: " " }),
        expectedOutput: JSON.stringify(true),
        description: "Empty after removing non-alphanumeric"
      },
      {
        input: JSON.stringify({ s: "a" }),
        expectedOutput: JSON.stringify(true),
        description: "Single character"
      },
      {
        input: JSON.stringify({ s: "0P" }),
        expectedOutput: JSON.stringify(false),
        description: "Alphanumeric mix"
      }
    ],
    templates: {
      python: `# Valid Palindrome
# Given a string s, return true if it is a palindrome after converting to lowercase
# and removing all non-alphanumeric characters.
# Time Complexity: O(n)
# Space Complexity: O(1)

class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.isPalindrome(input_data["s"])
    print(json.dumps(result))
`,
      java: `// Valid Palindrome
// Check if string is palindrome after removing non-alphanumeric chars.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public boolean isPalindrome(String s) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        
        Solution sol = new Solution();
        boolean result = sol.isPalindrome(s);
        System.out.println(result);
    }
}
`,
      cpp: `// Valid Palindrome
// Check if string is palindrome after removing non-alphanumeric chars.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("\\"s\\":\\"") + 5;
    size_t end = input.rfind("\\"");
    string s = input.substr(start, end - start);
    
    Solution sol;
    bool result = sol.isPalindrome(s);
    cout << (result ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Valid Palindrome
// Check if string is palindrome after removing non-alphanumeric chars.
// Time Complexity: O(n)
// Space Complexity: O(1)

function isPalindrome(s) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = isPalindrome(input.s);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 22: Single Number
  // ============================================
  "single-number": {
    slug: "single-number",
    title: "Single Number",
    functionName: "singleNumber",
    testCases: [
      {
        input: JSON.stringify({ nums: [2, 2, 1] }),
        expectedOutput: JSON.stringify(1),
        description: "Single at end"
      },
      {
        input: JSON.stringify({ nums: [4, 1, 2, 1, 2] }),
        expectedOutput: JSON.stringify(4),
        description: "Single at beginning"
      },
      {
        input: JSON.stringify({ nums: [1] }),
        expectedOutput: JSON.stringify(1),
        description: "Only one element"
      },
      {
        input: JSON.stringify({ nums: [1, 1, 2, 2, 3] }),
        expectedOutput: JSON.stringify(3),
        description: "Single at end of pairs"
      },
      {
        input: JSON.stringify({ nums: [-1, -1, -2] }),
        expectedOutput: JSON.stringify(-2),
        description: "Negative numbers"
      }
    ],
    templates: {
      python: `# Single Number
# Given a non-empty array where every element appears twice except for one, find that single one.
# Must implement with O(1) extra space.
# Time Complexity: O(n)
# Space Complexity: O(1) - Use XOR!

from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.singleNumber(input_data["nums"])
    print(json.dumps(result))
`,
      java: `// Single Number
// Find the element that appears only once. Use O(1) space with XOR.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int singleNumber(int[] nums) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) {
            nums[i] = numsArr.get(i).getAsInt();
        }
        
        Solution sol = new Solution();
        int result = sol.singleNumber(nums);
        System.out.println(result);
    }
}
`,
      cpp: `// Single Number
// Find the element that appears only once. Use O(1) space with XOR.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    string numsStr = input.substr(start, end - start + 1);
    
    vector<int> nums = parseArray(numsStr);
    Solution sol;
    int result = sol.singleNumber(nums);
    cout << result << endl;
    return 0;
}
`,
      javascript: `// Single Number
// Find the element that appears only once. Use O(1) space with XOR.
// Time Complexity: O(n)
// Space Complexity: O(1)

function singleNumber(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = singleNumber(input.nums);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 23: Linked List Cycle
  // ============================================
  "linked-list-cycle": {
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    functionName: "hasCycle",
    testCases: [
      {
        input: JSON.stringify({ head: [3, 2, 0, -4], pos: 1 }),
        expectedOutput: JSON.stringify(true),
        description: "Cycle at position 1"
      },
      {
        input: JSON.stringify({ head: [1, 2], pos: 0 }),
        expectedOutput: JSON.stringify(true),
        description: "Cycle at position 0"
      },
      {
        input: JSON.stringify({ head: [1], pos: -1 }),
        expectedOutput: JSON.stringify(false),
        description: "No cycle"
      },
      {
        input: JSON.stringify({ head: [], pos: -1 }),
        expectedOutput: JSON.stringify(false),
        description: "Empty list"
      },
      {
        input: JSON.stringify({ head: [1, 2, 3, 4, 5], pos: -1 }),
        expectedOutput: JSON.stringify(false),
        description: "Long list without cycle"
      }
    ],
    templates: {
      python: `# Linked List Cycle
# Given head, determine if the linked list has a cycle.
# Use Floyd's Cycle Detection (Fast & Slow Pointers)
# Time Complexity: O(n)
# Space Complexity: O(1)

from typing import Optional

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

def createCycledList(arr, pos):
    if not arr:
        return None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0:
        nodes[-1].next = nodes[pos]
    return nodes[0]

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    head = createCycledList(input_data["head"], input_data["pos"])
    result = sol.hasCycle(head)
    print(json.dumps(result))
`,
      java: `// Linked List Cycle
// Determine if linked list has a cycle using Floyd's algorithm.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

public class Solution {
    public boolean hasCycle(ListNode head) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray headArr = input.getAsJsonArray("head");
        int pos = input.get("pos").getAsInt();
        
        if (headArr.size() == 0) {
            System.out.println("false");
            return;
        }
        
        ListNode[] nodes = new ListNode[headArr.size()];
        for (int i = 0; i < headArr.size(); i++) {
            nodes[i] = new ListNode(headArr.get(i).getAsInt());
        }
        for (int i = 0; i < nodes.length - 1; i++) {
            nodes[i].next = nodes[i + 1];
        }
        if (pos >= 0) {
            nodes[nodes.length - 1].next = nodes[pos];
        }
        
        Solution sol = new Solution();
        boolean result = sol.hasCycle(nodes[0]);
        System.out.println(result);
    }
}
`,
      cpp: `// Linked List Cycle
// Determine if linked list has a cycle using Floyd's algorithm.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    bool hasCycle(ListNode *head) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    // Test case: [3,2,0,-4] with cycle at pos 1
    ListNode* n1 = new ListNode(3);
    ListNode* n2 = new ListNode(2);
    ListNode* n3 = new ListNode(0);
    ListNode* n4 = new ListNode(-4);
    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n2;
    
    Solution sol;
    cout << (sol.hasCycle(n1) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Linked List Cycle
// Determine if linked list has a cycle using Floyd's algorithm.
// Time Complexity: O(n)
// Space Complexity: O(1)

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function hasCycle(head) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const { head: arr, pos } = input;

if (arr.length === 0) {
    console.log(JSON.stringify(false));
} else {
    const nodes = arr.map(x => new ListNode(x));
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    if (pos >= 0) {
        nodes[nodes.length - 1].next = nodes[pos];
    }
    
    const result = hasCycle(nodes[0]);
    console.log(JSON.stringify(result));
}
`
    }
  },

  // ============================================
  // PROBLEM 24: Maximum Depth of Binary Tree
  // ============================================
  "maximum-depth-of-binary-tree": {
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    functionName: "maxDepth",
    testCases: [
      {
        input: JSON.stringify({ root: [3, 9, 20, null, null, 15, 7] }),
        expectedOutput: JSON.stringify(3),
        description: "Standard tree"
      },
      {
        input: JSON.stringify({ root: [1, null, 2] }),
        expectedOutput: JSON.stringify(2),
        description: "Right-skewed tree"
      },
      {
        input: JSON.stringify({ root: [] }),
        expectedOutput: JSON.stringify(0),
        description: "Empty tree"
      },
      {
        input: JSON.stringify({ root: [1] }),
        expectedOutput: JSON.stringify(1),
        description: "Single node"
      },
      {
        input: JSON.stringify({ root: [1, 2, 3, 4, 5] }),
        expectedOutput: JSON.stringify(3),
        description: "Complete binary tree"
      }
    ],
    templates: {
      python: `# Maximum Depth of Binary Tree
# Given the root of a binary tree, return its maximum depth.
# Time Complexity: O(n)
# Space Complexity: O(h) where h is height of tree

from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

def buildTree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    while queue and i < len(arr):
        node = queue.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    root = buildTree(input_data["root"])
    result = sol.maxDepth(root)
    print(json.dumps(result))
`,
      java: `// Maximum Depth of Binary Tree
// Return the maximum depth of the tree.
// Time Complexity: O(n)
// Space Complexity: O(h)

import java.util.*;
import com.google.gson.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public int maxDepth(TreeNode root) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static TreeNode buildTree(JsonArray arr) {
        if (arr.size() == 0 || arr.get(0).isJsonNull()) return null;
        TreeNode root = new TreeNode(arr.get(0).getAsInt());
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < arr.size()) {
            TreeNode node = queue.poll();
            if (i < arr.size() && !arr.get(i).isJsonNull()) {
                node.left = new TreeNode(arr.get(i).getAsInt());
                queue.offer(node.left);
            }
            i++;
            if (i < arr.size() && !arr.get(i).isJsonNull()) {
                node.right = new TreeNode(arr.get(i).getAsInt());
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray rootArr = input.getAsJsonArray("root");
        
        Solution sol = new Solution();
        TreeNode root = buildTree(rootArr);
        int result = sol.maxDepth(root);
        System.out.println(result);
    }
}
`,
      cpp: `// Maximum Depth of Binary Tree
// Return the maximum depth of the tree.
// Time Complexity: O(n)
// Space Complexity: O(h)

#include <iostream>
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    // Test tree: [3, 9, 20, null, null, 15, 7]
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    
    Solution sol;
    cout << sol.maxDepth(root) << endl;
    return 0;
}
`,
      javascript: `// Maximum Depth of Binary Tree
// Return the maximum depth of the tree.
// Time Complexity: O(n)
// Space Complexity: O(h)

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function maxDepth(root) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
function buildTree(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
        const node = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

const input = JSON.parse(process.argv[2]);
const root = buildTree(input.root);
const result = maxDepth(root);
console.log(JSON.stringify(result));
`
    }
  },

  // ============================================
  // PROBLEM 25: Validate Binary Search Tree
  // ============================================
  "validate-binary-search-tree": {
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    functionName: "isValidBST",
    testCases: [
      {
        input: JSON.stringify({ root: [2, 1, 3] }),
        expectedOutput: JSON.stringify(true),
        description: "Valid BST"
      },
      {
        input: JSON.stringify({ root: [5, 1, 4, null, null, 3, 6] }),
        expectedOutput: JSON.stringify(false),
        description: "Invalid - 4 is less than 5 but on right"
      },
      {
        input: JSON.stringify({ root: [1] }),
        expectedOutput: JSON.stringify(true),
        description: "Single node"
      },
      {
        input: JSON.stringify({ root: [5, 4, 6, null, null, 3, 7] }),
        expectedOutput: JSON.stringify(false),
        description: "Invalid - 3 should not be in right subtree"
      },
      {
        input: JSON.stringify({ root: [2, 2, 2] }),
        expectedOutput: JSON.stringify(false),
        description: "Equal values are not valid BST"
      }
    ],
    templates: {
      python: `# Validate Binary Search Tree
# Given the root of a binary tree, determine if it is a valid BST.
# Time Complexity: O(n)
# Space Complexity: O(h)

from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

def buildTree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    while queue and i < len(arr):
        node = queue.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    root = buildTree(input_data["root"])
    result = sol.isValidBST(root)
    print(json.dumps(result))
`,
      java: `// Validate Binary Search Tree
// Determine if the tree is a valid BST.
// Time Complexity: O(n)
// Space Complexity: O(h)

import java.util.*;
import com.google.gson.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public boolean isValidBST(TreeNode root) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static TreeNode buildTree(JsonArray arr) {
        if (arr.size() == 0 || arr.get(0).isJsonNull()) return null;
        TreeNode root = new TreeNode(arr.get(0).getAsInt());
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < arr.size()) {
            TreeNode node = queue.poll();
            if (i < arr.size() && !arr.get(i).isJsonNull()) {
                node.left = new TreeNode(arr.get(i).getAsInt());
                queue.offer(node.left);
            }
            i++;
            if (i < arr.size() && !arr.get(i).isJsonNull()) {
                node.right = new TreeNode(arr.get(i).getAsInt());
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        Solution sol = new Solution();
        TreeNode root = buildTree(input.getAsJsonArray("root"));
        System.out.println(sol.isValidBST(root));
    }
}
`,
      cpp: `// Validate Binary Search Tree
// Determine if the tree is a valid BST.
// Time Complexity: O(n)
// Space Complexity: O(h)

#include <iostream>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    TreeNode* root = new TreeNode(2);
    root->left = new TreeNode(1);
    root->right = new TreeNode(3);
    
    Solution sol;
    cout << (sol.isValidBST(root) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Validate Binary Search Tree
// Determine if the tree is a valid BST.
// Time Complexity: O(n)
// Space Complexity: O(h)

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isValidBST(root) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
function buildTree(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
        const node = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

const input = JSON.parse(process.argv[2]);
const root = buildTree(input.root);
console.log(JSON.stringify(isValidBST(root)));
`
    }
  },

  // ============================================
  // PROBLEM 26: Search in Rotated Sorted Array
  // ============================================
  "search-in-rotated-sorted-array": {
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    functionName: "search",
    testCases: [
      {
        input: JSON.stringify({ nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }),
        expectedOutput: JSON.stringify(4),
        description: "Target in second half"
      },
      {
        input: JSON.stringify({ nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }),
        expectedOutput: JSON.stringify(-1),
        description: "Target not found"
      },
      {
        input: JSON.stringify({ nums: [1], target: 0 }),
        expectedOutput: JSON.stringify(-1),
        description: "Single element, not found"
      },
      {
        input: JSON.stringify({ nums: [1], target: 1 }),
        expectedOutput: JSON.stringify(0),
        description: "Single element, found"
      },
      {
        input: JSON.stringify({ nums: [3, 1], target: 1 }),
        expectedOutput: JSON.stringify(1),
        description: "Two elements rotated"
      }
    ],
    templates: {
      python: `# Search in Rotated Sorted Array
# Given a rotated sorted array, search for target in O(log n) time.
# Time Complexity: O(log n)
# Space Complexity: O(1)

from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.search(input_data["nums"], input_data["target"])
    print(json.dumps(result))
`,
      java: `// Search in Rotated Sorted Array
// Search for target in O(log n) time.
// Time Complexity: O(log n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        int target = input.get("target").getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.search(nums, target));
    }
}
`,
      cpp: `// Search in Rotated Sorted Array
// Search for target in O(log n) time.
// Time Complexity: O(log n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        return -1;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    vector<int> nums = parseArray(input.substr(start, end - start + 1));
    size_t tPos = input.find("target");
    int target = stoi(input.substr(input.find(":", tPos) + 1));
    
    Solution sol;
    cout << sol.search(nums, target) << endl;
    return 0;
}
`,
      javascript: `// Search in Rotated Sorted Array
// Search for target in O(log n) time.
// Time Complexity: O(log n)
// Space Complexity: O(1)

function search(nums, target) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(search(input.nums, input.target)));
`
    }
  },

  // ============================================
  // PROBLEM 27: Word Break
  // ============================================
  "word-break": {
    slug: "word-break",
    title: "Word Break",
    functionName: "wordBreak",
    testCases: [
      {
        input: JSON.stringify({ s: "leetcode", wordDict: ["leet", "code"] }),
        expectedOutput: JSON.stringify(true),
        description: "Can be segmented into leet + code"
      },
      {
        input: JSON.stringify({ s: "applepenapple", wordDict: ["apple", "pen"] }),
        expectedOutput: JSON.stringify(true),
        description: "Can reuse words"
      },
      {
        input: JSON.stringify({ s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] }),
        expectedOutput: JSON.stringify(false),
        description: "Cannot be segmented"
      },
      {
        input: JSON.stringify({ s: "a", wordDict: ["a"] }),
        expectedOutput: JSON.stringify(true),
        description: "Single character"
      },
      {
        input: JSON.stringify({ s: "cars", wordDict: ["car", "ca", "rs"] }),
        expectedOutput: JSON.stringify(true),
        description: "Multiple ways to segment"
      }
    ],
    templates: {
      python: `# Word Break
# Given a string s and a dictionary wordDict, return true if s can be segmented
# into a space-separated sequence of dictionary words.
# Time Complexity: O(n²) or O(n × m) where m is max word length
# Space Complexity: O(n)

from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.wordBreak(input_data["s"], input_data["wordDict"])
    print(json.dumps(result))
`,
      java: `// Word Break
// Return true if s can be segmented into dictionary words.
// Time Complexity: O(n²)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        JsonArray dictArr = input.getAsJsonArray("wordDict");
        List<String> wordDict = new ArrayList<>();
        for (int i = 0; i < dictArr.size(); i++) {
            wordDict.add(dictArr.get(i).getAsString());
        }
        
        Solution sol = new Solution();
        System.out.println(sol.wordBreak(s, wordDict));
    }
}
`,
      cpp: `// Word Break
// Return true if s can be segmented into dictionary words.
// Time Complexity: O(n²)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string s = "leetcode";
    vector<string> wordDict = {"leet", "code"};
    
    Solution sol;
    cout << (sol.wordBreak(s, wordDict) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Word Break
// Return true if s can be segmented into dictionary words.
// Time Complexity: O(n²)
// Space Complexity: O(n)

function wordBreak(s, wordDict) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(wordBreak(input.s, input.wordDict)));
`
    }
  },

  // ============================================
  // PROBLEM 28: Top K Frequent Elements
  // ============================================
  "top-k-frequent-elements": {
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    functionName: "topKFrequent",
    testCases: [
      {
        input: JSON.stringify({ nums: [1, 1, 1, 2, 2, 3], k: 2 }),
        expectedOutput: JSON.stringify([1, 2]),
        description: "Standard case"
      },
      {
        input: JSON.stringify({ nums: [1], k: 1 }),
        expectedOutput: JSON.stringify([1]),
        description: "Single element"
      },
      {
        input: JSON.stringify({ nums: [1, 2], k: 2 }),
        expectedOutput: JSON.stringify([1, 2]),
        description: "All elements equally frequent"
      },
      {
        input: JSON.stringify({ nums: [4, 1, -1, 2, -1, 2, 3], k: 2 }),
        expectedOutput: JSON.stringify([-1, 2]),
        description: "With negative numbers"
      },
      {
        input: JSON.stringify({ nums: [3, 0, 1, 0], k: 1 }),
        expectedOutput: JSON.stringify([0]),
        description: "K equals 1"
      }
    ],
    templates: {
      python: `# Top K Frequent Elements
# Given an integer array nums and an integer k, return the k most frequent elements.
# Time Complexity: O(n log k) with heap, or O(n) with bucket sort
# Space Complexity: O(n)

from typing import List
from collections import Counter
import heapq

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.topKFrequent(input_data["nums"], input_data["k"])
    print(json.dumps(sorted(result)))
`,
      java: `// Top K Frequent Elements
// Return the k most frequent elements.
// Time Complexity: O(n log k)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Write your code here
        return new int[]{};
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        int k = input.get("k").getAsInt();
        
        Solution sol = new Solution();
        int[] result = sol.topKFrequent(nums, k);
        Arrays.sort(result);
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Top K Frequent Elements
// Return the k most frequent elements.
// Time Complexity: O(n log k)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    vector<int> nums = parseArray(input.substr(start, end - start + 1));
    size_t kPos = input.find("\"k\"");
    int k = stoi(input.substr(input.find(":", kPos) + 1));
    
    Solution sol;
    vector<int> result = sol.topKFrequent(nums, k);
    sort(result.begin(), result.end());
    
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Top K Frequent Elements
// Return the k most frequent elements.
// Time Complexity: O(n log k)
// Space Complexity: O(n)

function topKFrequent(nums, k) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = topKFrequent(input.nums, input.k) || [];
console.log(JSON.stringify(result.sort((a, b) => a - b)));
`
    }
  },

  // ============================================
  // PROBLEM 29: Kth Largest Element in an Array
  // ============================================
  "kth-largest-element-in-an-array": {
    slug: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    functionName: "findKthLargest",
    testCases: [
      {
        input: JSON.stringify({ nums: [3, 2, 1, 5, 6, 4], k: 2 }),
        expectedOutput: JSON.stringify(5),
        description: "2nd largest is 5"
      },
      {
        input: JSON.stringify({ nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }),
        expectedOutput: JSON.stringify(4),
        description: "4th largest is 4"
      },
      {
        input: JSON.stringify({ nums: [1], k: 1 }),
        expectedOutput: JSON.stringify(1),
        description: "Single element"
      },
      {
        input: JSON.stringify({ nums: [2, 1], k: 2 }),
        expectedOutput: JSON.stringify(1),
        description: "Two elements, k=2"
      },
      {
        input: JSON.stringify({ nums: [-1, -1], k: 2 }),
        expectedOutput: JSON.stringify(-1),
        description: "Negative duplicates"
      }
    ],
    templates: {
      python: `# Kth Largest Element in an Array
# Find the kth largest element in an unsorted array.
# Time Complexity: O(n) average with QuickSelect, O(n log k) with heap
# Space Complexity: O(1) for QuickSelect, O(k) for heap

from typing import List
import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.findKthLargest(input_data["nums"], input_data["k"])
    print(json.dumps(result))
`,
      java: `// Kth Largest Element in an Array
// Find the kth largest element.
// Time Complexity: O(n) with QuickSelect
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        int k = input.get("k").getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.findKthLargest(nums, k));
    }
}
`,
      cpp: `// Kth Largest Element in an Array
// Find the kth largest element.
// Time Complexity: O(n) with QuickSelect
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
vector<int> parseArray(const string& s) {
    vector<int> result;
    stringstream ss(s.substr(1, s.length()-2));
    string item;
    while (getline(ss, item, ',')) {
        if (!item.empty()) result.push_back(stoi(item));
    }
    return result;
}

int main(int argc, char* argv[]) {
    string input = argv[1];
    size_t start = input.find("[");
    size_t end = input.find("]");
    vector<int> nums = parseArray(input.substr(start, end - start + 1));
    size_t kPos = input.find("\"k\"");
    int k = stoi(input.substr(input.find(":", kPos) + 1));
    
    Solution sol;
    cout << sol.findKthLargest(nums, k) << endl;
    return 0;
}
`,
      javascript: `// Kth Largest Element in an Array
// Find the kth largest element.
// Time Complexity: O(n) with QuickSelect
// Space Complexity: O(1)

function findKthLargest(nums, k) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(findKthLargest(input.nums, input.k)));
`
    }
  },

  // ============================================
  // PROBLEM 30: Course Schedule
  // ============================================
  "course-schedule": {
    slug: "course-schedule",
    title: "Course Schedule",
    functionName: "canFinish",
    testCases: [
      {
        input: JSON.stringify({ numCourses: 2, prerequisites: [[1, 0]] }),
        expectedOutput: JSON.stringify(true),
        description: "Simple dependency"
      },
      {
        input: JSON.stringify({ numCourses: 2, prerequisites: [[1, 0], [0, 1]] }),
        expectedOutput: JSON.stringify(false),
        description: "Cycle detected"
      },
      {
        input: JSON.stringify({ numCourses: 3, prerequisites: [[1, 0], [2, 1]] }),
        expectedOutput: JSON.stringify(true),
        description: "Chain dependency"
      },
      {
        input: JSON.stringify({ numCourses: 1, prerequisites: [] }),
        expectedOutput: JSON.stringify(true),
        description: "No prerequisites"
      },
      {
        input: JSON.stringify({ numCourses: 4, prerequisites: [[1, 0], [2, 1], [3, 2], [1, 3]] }),
        expectedOutput: JSON.stringify(false),
        description: "Cycle in larger graph"
      }
    ],
    templates: {
      python: `# Course Schedule
# Given numCourses and prerequisites, determine if you can finish all courses.
# This is a cycle detection problem in a directed graph.
# Time Complexity: O(V + E)
# Space Complexity: O(V + E)

from typing import List
from collections import defaultdict, deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.canFinish(input_data["numCourses"], input_data["prerequisites"])
    print(json.dumps(result))
`,
      java: `// Course Schedule
// Determine if you can finish all courses (cycle detection).
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        int numCourses = input.get("numCourses").getAsInt();
        JsonArray prereqArr = input.getAsJsonArray("prerequisites");
        int[][] prerequisites = new int[prereqArr.size()][2];
        for (int i = 0; i < prereqArr.size(); i++) {
            JsonArray pair = prereqArr.get(i).getAsJsonArray();
            prerequisites[i][0] = pair.get(0).getAsInt();
            prerequisites[i][1] = pair.get(1).getAsInt();
        }
        
        Solution sol = new Solution();
        System.out.println(sol.canFinish(numCourses, prerequisites));
    }
}
`,
      cpp: `// Course Schedule
// Determine if you can finish all courses (cycle detection).
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)

#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    int numCourses = 2;
    vector<vector<int>> prerequisites = {{1, 0}};
    
    Solution sol;
    cout << (sol.canFinish(numCourses, prerequisites) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Course Schedule
// Determine if you can finish all courses (cycle detection).
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)

function canFinish(numCourses, prerequisites) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(canFinish(input.numCourses, input.prerequisites)));
`
    }
  },

  // ============================================
  // PROBLEM 31: Longest Common Subsequence
  // ============================================
  "longest-common-subsequence": {
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    functionName: "longestCommonSubsequence",
    testCases: [
      {
        input: JSON.stringify({ text1: "abcde", text2: "ace" }),
        expectedOutput: JSON.stringify(3),
        description: "LCS is 'ace'"
      },
      {
        input: JSON.stringify({ text1: "abc", text2: "abc" }),
        expectedOutput: JSON.stringify(3),
        description: "Identical strings"
      },
      {
        input: JSON.stringify({ text1: "abc", text2: "def" }),
        expectedOutput: JSON.stringify(0),
        description: "No common subsequence"
      },
      {
        input: JSON.stringify({ text1: "bl", text2: "yby" }),
        expectedOutput: JSON.stringify(1),
        description: "LCS is 'b'"
      },
      {
        input: JSON.stringify({ text1: "oxcpqrsvwf", text2: "shmtulqrypy" }),
        expectedOutput: JSON.stringify(2),
        description: "Complex case"
      }
    ],
    templates: {
      python: `# Longest Common Subsequence
# Given two strings, return the length of their longest common subsequence.
# Time Complexity: O(m × n)
# Space Complexity: O(m × n), can be optimized to O(min(m, n))

class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.longestCommonSubsequence(input_data["text1"], input_data["text2"])
    print(json.dumps(result))
`,
      java: `// Longest Common Subsequence
// Return the length of the longest common subsequence.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String text1 = input.get("text1").getAsString();
        String text2 = input.get("text2").getAsString();
        
        Solution sol = new Solution();
        System.out.println(sol.longestCommonSubsequence(text1, text2));
    }
}
`,
      cpp: `// Longest Common Subsequence
// Return the length of the longest common subsequence.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string text1 = "abcde";
    string text2 = "ace";
    
    Solution sol;
    cout << sol.longestCommonSubsequence(text1, text2) << endl;
    return 0;
}
`,
      javascript: `// Longest Common Subsequence
// Return the length of the longest common subsequence.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

function longestCommonSubsequence(text1, text2) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(longestCommonSubsequence(input.text1, input.text2)));
`
    }
  },

  // ============================================
  // PROBLEM 32: Decode String
  // ============================================
  "decode-string": {
    slug: "decode-string",
    title: "Decode String",
    functionName: "decodeString",
    testCases: [
      {
        input: JSON.stringify({ s: "3[a]2[bc]" }),
        expectedOutput: JSON.stringify("aaabcbc"),
        description: "Simple encoding"
      },
      {
        input: JSON.stringify({ s: "3[a2[c]]" }),
        expectedOutput: JSON.stringify("accaccacc"),
        description: "Nested encoding"
      },
      {
        input: JSON.stringify({ s: "2[abc]3[cd]ef" }),
        expectedOutput: JSON.stringify("abcabccdcdcdef"),
        description: "Mixed encoding"
      },
      {
        input: JSON.stringify({ s: "abc3[cd]xyz" }),
        expectedOutput: JSON.stringify("abccdcdcdxyz"),
        description: "With plain text"
      },
      {
        input: JSON.stringify({ s: "10[a]" }),
        expectedOutput: JSON.stringify("aaaaaaaaaa"),
        description: "Multi-digit number"
      }
    ],
    templates: {
      python: `# Decode String
# Given an encoded string, return its decoded string.
# Pattern: k[encoded_string] means repeat encoded_string k times.
# Time Complexity: O(n × maxK) where maxK is max repetition
# Space Complexity: O(n)

class Solution:
    def decodeString(self, s: str) -> str:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.decodeString(input_data["s"])
    print(json.dumps(result))
`,
      java: `// Decode String
// Given an encoded string, return its decoded string.
// Time Complexity: O(n × maxK)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public String decodeString(String s) {
        // Write your code here
        return "";
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        
        Solution sol = new Solution();
        System.out.println("\\"" + sol.decodeString(s) + "\\"");
    }
}
`,
      cpp: `// Decode String
// Given an encoded string, return its decoded string.
// Time Complexity: O(n × maxK)
// Space Complexity: O(n)

#include <iostream>
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        // Write your code here
        return "";
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    string s = "3[a]2[bc]";
    
    Solution sol;
    cout << "\\"" << sol.decodeString(s) << "\\"" << endl;
    return 0;
}
`,
      javascript: `// Decode String
// Given an encoded string, return its decoded string.
// Time Complexity: O(n × maxK)
// Space Complexity: O(n)

function decodeString(s) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(decodeString(input.s)));
`
    }
  },

  // ============================================
  // PROBLEM 34: House Robber
  // ============================================
  "house-robber": {
    slug: "house-robber",
    title: "House Robber",
    functionName: "rob",
    testCases: [
      {
        input: JSON.stringify({ nums: [1, 2, 3, 1] }),
        expectedOutput: JSON.stringify(4),
        description: "Rob houses 1 and 3"
      },
      {
        input: JSON.stringify({ nums: [2, 7, 9, 3, 1] }),
        expectedOutput: JSON.stringify(12),
        description: "Rob houses 1, 3, 5"
      },
      {
        input: JSON.stringify({ nums: [2, 1, 1, 2] }),
        expectedOutput: JSON.stringify(4),
        description: "Rob first and last"
      },
      {
        input: JSON.stringify({ nums: [0] }),
        expectedOutput: JSON.stringify(0),
        description: "Single house with 0"
      },
      {
        input: JSON.stringify({ nums: [100, 1, 1, 100] }),
        expectedOutput: JSON.stringify(200),
        description: "Optimal is first and last"
      }
    ],
    templates: {
      python: `# House Robber
# Rob houses to maximize money. Cannot rob adjacent houses.
# Time Complexity: O(n)
# Space Complexity: O(1)

from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.rob(input_data["nums"])
    print(json.dumps(result))
`,
      java: `// House Robber
// Rob houses to maximize money. Cannot rob adjacent houses.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int rob(int[] nums) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.rob(nums));
    }
}
`,
      cpp: `// House Robber
// Rob houses to maximize money. Cannot rob adjacent houses.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
#include <sstream>
int main(int argc, char* argv[]) {
    vector<int> nums = {1, 2, 3, 1};
    
    Solution sol;
    cout << sol.rob(nums) << endl;
    return 0;
}
`,
      javascript: `// House Robber
// Rob houses to maximize money. Cannot rob adjacent houses.
// Time Complexity: O(n)
// Space Complexity: O(1)

function rob(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(rob(input.nums)));
`
    }
  },

  // ============================================
  // PROBLEM 35: Unique Paths
  // ============================================
  "unique-paths": {
    slug: "unique-paths",
    title: "Unique Paths",
    functionName: "uniquePaths",
    testCases: [
      {
        input: JSON.stringify({ m: 3, n: 7 }),
        expectedOutput: JSON.stringify(28),
        description: "3x7 grid"
      },
      {
        input: JSON.stringify({ m: 3, n: 2 }),
        expectedOutput: JSON.stringify(3),
        description: "3x2 grid"
      },
      {
        input: JSON.stringify({ m: 1, n: 1 }),
        expectedOutput: JSON.stringify(1),
        description: "1x1 grid"
      },
      {
        input: JSON.stringify({ m: 7, n: 3 }),
        expectedOutput: JSON.stringify(28),
        description: "7x3 grid (symmetric)"
      },
      {
        input: JSON.stringify({ m: 10, n: 10 }),
        expectedOutput: JSON.stringify(48620),
        description: "10x10 grid"
      }
    ],
    templates: {
      python: `# Unique Paths
# Count unique paths from top-left to bottom-right in m x n grid.
# Can only move right or down.
# Time Complexity: O(m × n)
# Space Complexity: O(n) with space optimization

class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.uniquePaths(input_data["m"], input_data["n"])
    print(json.dumps(result))
`,
      java: `// Unique Paths
// Count unique paths from top-left to bottom-right.
// Time Complexity: O(m × n)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int uniquePaths(int m, int n) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        int m = input.get("m").getAsInt();
        int n = input.get("n").getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.uniquePaths(m, n));
    }
}
`,
      cpp: `// Unique Paths
// Count unique paths from top-left to bottom-right.
// Time Complexity: O(m × n)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int uniquePaths(int m, int n) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main(int argc, char* argv[]) {
    int m = 3, n = 7;
    
    Solution sol;
    cout << sol.uniquePaths(m, n) << endl;
    return 0;
}
`,
      javascript: `// Unique Paths
// Count unique paths from top-left to bottom-right.
// Time Complexity: O(m × n)
// Space Complexity: O(n)

function uniquePaths(m, n) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(uniquePaths(input.m, input.n)));
`
    }
  },

  // ============================================
  // PROBLEM 36: Jump Game
  // ============================================
  "jump-game": {
    slug: "jump-game",
    title: "Jump Game",
    functionName: "canJump",
    testCases: [
      {
        input: JSON.stringify({ nums: [2, 3, 1, 1, 4] }),
        expectedOutput: JSON.stringify(true),
        description: "Can reach the end"
      },
      {
        input: JSON.stringify({ nums: [3, 2, 1, 0, 4] }),
        expectedOutput: JSON.stringify(false),
        description: "Stuck at index 3"
      },
      {
        input: JSON.stringify({ nums: [0] }),
        expectedOutput: JSON.stringify(true),
        description: "Already at end"
      },
      {
        input: JSON.stringify({ nums: [2, 0, 0] }),
        expectedOutput: JSON.stringify(true),
        description: "Jump over zeros"
      },
      {
        input: JSON.stringify({ nums: [1, 1, 1, 0] }),
        expectedOutput: JSON.stringify(true),
        description: "Reach exactly at end"
      }
    ],
    templates: {
      python: `# Jump Game
# Given an array where each element is max jump length at that position,
# determine if you can reach the last index.
# Time Complexity: O(n)
# Space Complexity: O(1)

from typing import List

class Solution:
    def canJump(self, nums: List[int]) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.canJump(input_data["nums"])
    print(json.dumps(result))
`,
      java: `// Jump Game
// Determine if you can reach the last index.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public boolean canJump(int[] nums) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.canJump(nums));
    }
}
`,
      cpp: `// Jump Game
// Determine if you can reach the last index.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<int> nums = {2, 3, 1, 1, 4};
    
    Solution sol;
    cout << (sol.canJump(nums) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Jump Game
// Determine if you can reach the last index.
// Time Complexity: O(n)
// Space Complexity: O(1)

function canJump(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(canJump(input.nums)));
`
    }
  },

  // ============================================
  // PROBLEM 38: Find Minimum in Rotated Sorted Array
  // ============================================
  "find-minimum-in-rotated-sorted-array": {
    slug: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    functionName: "findMin",
    testCases: [
      {
        input: JSON.stringify({ nums: [3, 4, 5, 1, 2] }),
        expectedOutput: JSON.stringify(1),
        description: "Rotated array"
      },
      {
        input: JSON.stringify({ nums: [4, 5, 6, 7, 0, 1, 2] }),
        expectedOutput: JSON.stringify(0),
        description: "Min at pivot"
      },
      {
        input: JSON.stringify({ nums: [11, 13, 15, 17] }),
        expectedOutput: JSON.stringify(11),
        description: "Not rotated"
      },
      {
        input: JSON.stringify({ nums: [2, 1] }),
        expectedOutput: JSON.stringify(1),
        description: "Two elements"
      },
      {
        input: JSON.stringify({ nums: [1] }),
        expectedOutput: JSON.stringify(1),
        description: "Single element"
      }
    ],
    templates: {
      python: `# Find Minimum in Rotated Sorted Array
# Find the minimum element in a rotated sorted array.
# Time Complexity: O(log n)
# Space Complexity: O(1)

from typing import List

class Solution:
    def findMin(self, nums: List[int]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.findMin(input_data["nums"])
    print(json.dumps(result))
`,
      java: `// Find Minimum in Rotated Sorted Array
// Find the minimum element.
// Time Complexity: O(log n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int findMin(int[] nums) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.findMin(nums));
    }
}
`,
      cpp: `// Find Minimum in Rotated Sorted Array
// Find the minimum element.
// Time Complexity: O(log n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<int> nums = {3, 4, 5, 1, 2};
    
    Solution sol;
    cout << sol.findMin(nums) << endl;
    return 0;
}
`,
      javascript: `// Find Minimum in Rotated Sorted Array
// Find the minimum element.
// Time Complexity: O(log n)
// Space Complexity: O(1)

function findMin(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(findMin(input.nums)));
`
    }
  },

  // ============================================
  // PROBLEM 39: Palindrome Partitioning
  // ============================================
  "palindrome-partitioning": {
    slug: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    functionName: "partition",
    testCases: [
      {
        input: JSON.stringify({ s: "aab" }),
        expectedOutput: JSON.stringify([["a", "a", "b"], ["aa", "b"]]),
        description: "Two partitions"
      },
      {
        input: JSON.stringify({ s: "a" }),
        expectedOutput: JSON.stringify([["a"]]),
        description: "Single character"
      },
      {
        input: JSON.stringify({ s: "aba" }),
        expectedOutput: JSON.stringify([["a", "b", "a"], ["aba"]]),
        description: "Palindrome string"
      },
      {
        input: JSON.stringify({ s: "aabb" }),
        expectedOutput: JSON.stringify([["a", "a", "b", "b"], ["a", "a", "bb"], ["aa", "b", "b"], ["aa", "bb"]]),
        description: "Multiple partitions"
      },
      {
        input: JSON.stringify({ s: "ab" }),
        expectedOutput: JSON.stringify([["a", "b"]]),
        description: "No palindrome substring"
      }
    ],
    templates: {
      python: `# Palindrome Partitioning
# Partition s such that every substring is a palindrome.
# Return all possible partitions.
# Time Complexity: O(n × 2^n)
# Space Complexity: O(n)

from typing import List

class Solution:
    def partition(self, s: str) -> List[List[str]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.partition(input_data["s"])
    print(json.dumps(sorted([sorted(p) for p in result])))
`,
      java: `// Palindrome Partitioning
// Partition s such that every substring is a palindrome.
// Time Complexity: O(n × 2^n)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<List<String>> partition(String s) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        
        Solution sol = new Solution();
        System.out.println(new Gson().toJson(sol.partition(s)));
    }
}
`,
      cpp: `// Palindrome Partitioning
// Partition s such that every substring is a palindrome.
// Time Complexity: O(n × 2^n)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<vector<string>> partition(string s) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    string s = "aab";
    
    Solution sol;
    auto result = sol.partition(s);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            if (j > 0) cout << ",";
            cout << "\\"" << result[i][j] << "\\"";
        }
        cout << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Palindrome Partitioning
// Partition s such that every substring is a palindrome.
// Time Complexity: O(n × 2^n)
// Space Complexity: O(n)

function partition(s) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(partition(input.s)));
`
    }
  },

  // ============================================
  // PROBLEM 40: Subsets
  // ============================================
  "subsets": {
    slug: "subsets",
    title: "Subsets",
    functionName: "subsets",
    testCases: [
      {
        input: JSON.stringify({ nums: [1, 2, 3] }),
        expectedOutput: JSON.stringify([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]),
        description: "Three elements"
      },
      {
        input: JSON.stringify({ nums: [0] }),
        expectedOutput: JSON.stringify([[], [0]]),
        description: "Single element"
      },
      {
        input: JSON.stringify({ nums: [1, 2] }),
        expectedOutput: JSON.stringify([[], [1], [2], [1, 2]]),
        description: "Two elements"
      },
      {
        input: JSON.stringify({ nums: [1, 2, 3, 4] }),
        expectedOutput: JSON.stringify([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3], [4], [1, 4], [2, 4], [1, 2, 4], [3, 4], [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]]),
        description: "Four elements"
      },
      {
        input: JSON.stringify({ nums: [] }),
        expectedOutput: JSON.stringify([[]]),
        description: "Empty array"
      }
    ],
    templates: {
      python: `# Subsets
# Given an integer array of unique elements, return all possible subsets.
# Time Complexity: O(n × 2^n)
# Space Complexity: O(n)

from typing import List

class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.subsets(input_data["nums"])
    # Sort for comparison
    result = sorted([sorted(s) for s in result], key=lambda x: (len(x), x))
    print(json.dumps(result))
`,
      java: `// Subsets
// Return all possible subsets of the array.
// Time Complexity: O(n × 2^n)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        
        Solution sol = new Solution();
        System.out.println(new Gson().toJson(sol.subsets(nums)));
    }
}
`,
      cpp: `// Subsets
// Return all possible subsets of the array.
// Time Complexity: O(n × 2^n)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<int> nums = {1, 2, 3};
    
    Solution sol;
    auto result = sol.subsets(nums);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            if (j > 0) cout << ",";
            cout << result[i][j];
        }
        cout << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Subsets
// Return all possible subsets of the array.
// Time Complexity: O(n × 2^n)
// Space Complexity: O(n)

function subsets(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(subsets(input.nums)));
`
    }
  },

  // ============================================
  // PROBLEM 41: Permutations
  // ============================================
  "permutations": {
    slug: "permutations",
    title: "Permutations",
    functionName: "permute",
    testCases: [
      {
        input: JSON.stringify({ nums: [1, 2, 3] }),
        expectedOutput: JSON.stringify([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]),
        description: "Three elements"
      },
      {
        input: JSON.stringify({ nums: [0, 1] }),
        expectedOutput: JSON.stringify([[0, 1], [1, 0]]),
        description: "Two elements"
      },
      {
        input: JSON.stringify({ nums: [1] }),
        expectedOutput: JSON.stringify([[1]]),
        description: "Single element"
      },
      {
        input: JSON.stringify({ nums: [1, 2] }),
        expectedOutput: JSON.stringify([[1, 2], [2, 1]]),
        description: "Two elements variant"
      },
      {
        input: JSON.stringify({ nums: [0] }),
        expectedOutput: JSON.stringify([[0]]),
        description: "Single zero"
      }
    ],
    templates: {
      python: `# Permutations
# Given an array of distinct integers, return all possible permutations.
# Time Complexity: O(n × n!)
# Space Complexity: O(n)

from typing import List

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.permute(input_data["nums"])
    print(json.dumps(sorted(result)))
`,
      java: `// Permutations
// Return all possible permutations of the array.
// Time Complexity: O(n × n!)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray numsArr = input.getAsJsonArray("nums");
        int[] nums = new int[numsArr.size()];
        for (int i = 0; i < numsArr.size(); i++) nums[i] = numsArr.get(i).getAsInt();
        
        Solution sol = new Solution();
        System.out.println(new Gson().toJson(sol.permute(nums)));
    }
}
`,
      cpp: `// Permutations
// Return all possible permutations of the array.
// Time Complexity: O(n × n!)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<int> nums = {1, 2, 3};
    
    Solution sol;
    auto result = sol.permute(nums);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            if (j > 0) cout << ",";
            cout << result[i][j];
        }
        cout << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Permutations
// Return all possible permutations of the array.
// Time Complexity: O(n × n!)
// Space Complexity: O(n)

function permute(nums) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(permute(input.nums)));
`
    }
  },

  // ============================================
  // PROBLEM 42: Combination Sum
  // ============================================
  "combination-sum": {
    slug: "combination-sum",
    title: "Combination Sum",
    functionName: "combinationSum",
    testCases: [
      {
        input: JSON.stringify({ candidates: [2, 3, 6, 7], target: 7 }),
        expectedOutput: JSON.stringify([[2, 2, 3], [7]]),
        description: "Multiple combinations"
      },
      {
        input: JSON.stringify({ candidates: [2, 3, 5], target: 8 }),
        expectedOutput: JSON.stringify([[2, 2, 2, 2], [2, 3, 3], [3, 5]]),
        description: "Three combinations"
      },
      {
        input: JSON.stringify({ candidates: [2], target: 1 }),
        expectedOutput: JSON.stringify([]),
        description: "No combination possible"
      },
      {
        input: JSON.stringify({ candidates: [1], target: 1 }),
        expectedOutput: JSON.stringify([[1]]),
        description: "Single element equals target"
      },
      {
        input: JSON.stringify({ candidates: [1, 2], target: 4 }),
        expectedOutput: JSON.stringify([[1, 1, 1, 1], [1, 1, 2], [2, 2]]),
        description: "Multiple ways with small numbers"
      }
    ],
    templates: {
      python: `# Combination Sum
# Find all unique combinations where candidates sum to target.
# The same number may be chosen unlimited times.
# Time Complexity: O(n^(target/min))
# Space Complexity: O(target/min)

from typing import List

class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.combinationSum(input_data["candidates"], input_data["target"])
    result = sorted([sorted(c) for c in result])
    print(json.dumps(result))
`,
      java: `// Combination Sum
// Find all unique combinations summing to target.
// Time Complexity: O(n^(target/min))
// Space Complexity: O(target/min)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray candArr = input.getAsJsonArray("candidates");
        int[] candidates = new int[candArr.size()];
        for (int i = 0; i < candArr.size(); i++) candidates[i] = candArr.get(i).getAsInt();
        int target = input.get("target").getAsInt();
        
        Solution sol = new Solution();
        System.out.println(new Gson().toJson(sol.combinationSum(candidates, target)));
    }
}
`,
      cpp: `// Combination Sum
// Find all unique combinations summing to target.
// Time Complexity: O(n^(target/min))
// Space Complexity: O(target/min)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<int> candidates = {2, 3, 6, 7};
    int target = 7;
    
    Solution sol;
    auto result = sol.combinationSum(candidates, target);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            if (j > 0) cout << ",";
            cout << result[i][j];
        }
        cout << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Combination Sum
// Find all unique combinations summing to target.
// Time Complexity: O(n^(target/min))
// Space Complexity: O(target/min)

function combinationSum(candidates, target) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(combinationSum(input.candidates, input.target)));
`
    }
  },

  // ============================================
  // PROBLEM 43: Letter Combinations of a Phone Number
  // ============================================
  "letter-combinations-of-a-phone-number": {
    slug: "letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
    functionName: "letterCombinations",
    testCases: [
      {
        input: JSON.stringify({ digits: "23" }),
        expectedOutput: JSON.stringify(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]),
        description: "Two digits"
      },
      {
        input: JSON.stringify({ digits: "" }),
        expectedOutput: JSON.stringify([]),
        description: "Empty input"
      },
      {
        input: JSON.stringify({ digits: "2" }),
        expectedOutput: JSON.stringify(["a", "b", "c"]),
        description: "Single digit"
      },
      {
        input: JSON.stringify({ digits: "79" }),
        expectedOutput: JSON.stringify(["pw", "px", "py", "pz", "qw", "qx", "qy", "qz", "rw", "rx", "ry", "rz", "sw", "sx", "sy", "sz"]),
        description: "Digits with 4 letters each"
      },
      {
        input: JSON.stringify({ digits: "234" }),
        expectedOutput: JSON.stringify(["adg", "adh", "adi", "aeg", "aeh", "aei", "afg", "afh", "afi", "bdg", "bdh", "bdi", "beg", "beh", "bei", "bfg", "bfh", "bfi", "cdg", "cdh", "cdi", "ceg", "ceh", "cei", "cfg", "cfh", "cfi"]),
        description: "Three digits"
      }
    ],
    templates: {
      python: `# Letter Combinations of a Phone Number
# Given a string of digits 2-9, return all possible letter combinations.
# Time Complexity: O(4^n × n) where n is the length of digits
# Space Complexity: O(n)

from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.letterCombinations(input_data["digits"])
    print(json.dumps(sorted(result) if result else []))
`,
      java: `// Letter Combinations of a Phone Number
// Return all possible letter combinations for given digits.
// Time Complexity: O(4^n × n)
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<String> letterCombinations(String digits) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String digits = input.get("digits").getAsString();
        
        Solution sol = new Solution();
        List<String> result = sol.letterCombinations(digits);
        Collections.sort(result);
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Letter Combinations of a Phone Number
// Return all possible letter combinations for given digits.
// Time Complexity: O(4^n × n)
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    string digits = "23";
    
    Solution sol;
    auto result = sol.letterCombinations(digits);
    sort(result.begin(), result.end());
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "\\"" << result[i] << "\\"";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Letter Combinations of a Phone Number
// Return all possible letter combinations for given digits.
// Time Complexity: O(4^n × n)
// Space Complexity: O(n)

function letterCombinations(digits) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = letterCombinations(input.digits) || [];
console.log(JSON.stringify(result.sort()));
`
    }
  },

  // ============================================
  // PROBLEM 44: Generate Parentheses
  // ============================================
  "generate-parentheses": {
    slug: "generate-parentheses",
    title: "Generate Parentheses",
    functionName: "generateParenthesis",
    testCases: [
      {
        input: JSON.stringify({ n: 3 }),
        expectedOutput: JSON.stringify(["((()))", "(()())", "(())()", "()(())", "()()()"]),
        description: "n=3"
      },
      {
        input: JSON.stringify({ n: 1 }),
        expectedOutput: JSON.stringify(["()"]),
        description: "n=1"
      },
      {
        input: JSON.stringify({ n: 2 }),
        expectedOutput: JSON.stringify(["(())", "()()"]),
        description: "n=2"
      },
      {
        input: JSON.stringify({ n: 4 }),
        expectedOutput: JSON.stringify(["(((())))", "((()()))", "((())())", "((()))()", "(()(()))", "(()()())", "(()())()", "(())(())", "(())()()", "()((()))", "()(()())", "()(())()", "()()(())", "()()()()"]),
        description: "n=4"
      },
      {
        input: JSON.stringify({ n: 0 }),
        expectedOutput: JSON.stringify([""]),
        description: "n=0"
      }
    ],
    templates: {
      python: `# Generate Parentheses
# Generate all combinations of n pairs of well-formed parentheses.
# Time Complexity: O(4^n / sqrt(n)) - Catalan number
# Space Complexity: O(n)

from typing import List

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.generateParenthesis(input_data["n"])
    print(json.dumps(sorted(result) if result else []))
`,
      java: `// Generate Parentheses
// Generate all valid combinations of n pairs of parentheses.
// Time Complexity: O(4^n / sqrt(n))
// Space Complexity: O(n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<String> generateParenthesis(int n) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        int n = input.get("n").getAsInt();
        
        Solution sol = new Solution();
        List<String> result = sol.generateParenthesis(n);
        Collections.sort(result);
        System.out.println(new Gson().toJson(result));
    }
}
`,
      cpp: `// Generate Parentheses
// Generate all valid combinations of n pairs of parentheses.
// Time Complexity: O(4^n / sqrt(n))
// Space Complexity: O(n)

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    int n = 3;
    
    Solution sol;
    auto result = sol.generateParenthesis(n);
    sort(result.begin(), result.end());
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "\\"" << result[i] << "\\"";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// Generate Parentheses
// Generate all valid combinations of n pairs of parentheses.
// Time Complexity: O(4^n / sqrt(n))
// Space Complexity: O(n)

function generateParenthesis(n) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
const result = generateParenthesis(input.n) || [];
console.log(JSON.stringify(result.sort()));
`
    }
  },

  // ============================================
  // PROBLEM 45: N-Queens
  // ============================================
  "n-queens": {
    slug: "n-queens",
    title: "N-Queens",
    functionName: "solveNQueens",
    testCases: [
      {
        input: JSON.stringify({ n: 4 }),
        expectedOutput: JSON.stringify([[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]),
        description: "4 queens"
      },
      {
        input: JSON.stringify({ n: 1 }),
        expectedOutput: JSON.stringify([["Q"]]),
        description: "1 queen"
      },
      {
        input: JSON.stringify({ n: 2 }),
        expectedOutput: JSON.stringify([]),
        description: "No solution for n=2"
      },
      {
        input: JSON.stringify({ n: 3 }),
        expectedOutput: JSON.stringify([]),
        description: "No solution for n=3"
      }
    ],
    templates: {
      python: `# N-Queens
# Place n queens on an n×n chessboard such that no two queens attack each other.
# Time Complexity: O(n!)
# Space Complexity: O(n²)

from typing import List

class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.solveNQueens(input_data["n"])
    print(json.dumps(sorted(result) if result else []))
`,
      java: `// N-Queens
// Place n queens on an n×n chessboard with no attacks.
// Time Complexity: O(n!)
// Space Complexity: O(n²)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public List<List<String>> solveNQueens(int n) {
        // Write your code here
        return new ArrayList<>();
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        int n = input.get("n").getAsInt();
        
        Solution sol = new Solution();
        System.out.println(new Gson().toJson(sol.solveNQueens(n)));
    }
}
`,
      cpp: `// N-Queens
// Place n queens on an n×n chessboard with no attacks.
// Time Complexity: O(n!)
// Space Complexity: O(n²)

#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        // Write your code here
        return {};
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    int n = 4;
    
    Solution sol;
    auto result = sol.solveNQueens(n);
    // Output formatting
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            if (j > 0) cout << ",";
            cout << "\\"" << result[i][j] << "\\"";
        }
        cout << "]";
    }
    cout << "]" << endl;
    return 0;
}
`,
      javascript: `// N-Queens
// Place n queens on an n×n chessboard with no attacks.
// Time Complexity: O(n!)
// Space Complexity: O(n²)

function solveNQueens(n) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(solveNQueens(input.n) || []));
`
    }
  },

  // ============================================
  // PROBLEM 46: Word Search
  // ============================================
  "word-search": {
    slug: "word-search",
    title: "Word Search",
    functionName: "exist",
    testCases: [
      {
        input: JSON.stringify({ board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCCED" }),
        expectedOutput: JSON.stringify(true),
        description: "Word found"
      },
      {
        input: JSON.stringify({ board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "SEE" }),
        expectedOutput: JSON.stringify(true),
        description: "Word at edge"
      },
      {
        input: JSON.stringify({ board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCB" }),
        expectedOutput: JSON.stringify(false),
        description: "Cannot reuse cell"
      },
      {
        input: JSON.stringify({ board: [["a"]], word: "a" }),
        expectedOutput: JSON.stringify(true),
        description: "Single cell"
      },
      {
        input: JSON.stringify({ board: [["A","A"]], word: "AAA" }),
        expectedOutput: JSON.stringify(false),
        description: "Word too long"
      }
    ],
    templates: {
      python: `# Word Search
# Given a 2D board and a word, find if the word exists in the grid.
# Word can be constructed from adjacent cells (horizontal/vertical).
# Time Complexity: O(m × n × 4^L) where L is word length
# Space Complexity: O(L) for recursion

from typing import List

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.exist(input_data["board"], input_data["word"])
    print(json.dumps(result))
`,
      java: `// Word Search
// Find if the word exists in the grid.
// Time Complexity: O(m × n × 4^L)
// Space Complexity: O(L)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray boardArr = input.getAsJsonArray("board");
        char[][] board = new char[boardArr.size()][];
        for (int i = 0; i < boardArr.size(); i++) {
            JsonArray row = boardArr.get(i).getAsJsonArray();
            board[i] = new char[row.size()];
            for (int j = 0; j < row.size(); j++) {
                board[i][j] = row.get(j).getAsString().charAt(0);
            }
        }
        String word = input.get("word").getAsString();
        
        Solution sol = new Solution();
        System.out.println(sol.exist(board, word));
    }
}
`,
      cpp: `// Word Search
// Find if the word exists in the grid.
// Time Complexity: O(m × n × 4^L)
// Space Complexity: O(L)

#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<vector<char>> board = {{'A','B','C','E'},{'S','F','C','S'},{'A','D','E','E'}};
    string word = "ABCCED";
    
    Solution sol;
    cout << (sol.exist(board, word) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Word Search
// Find if the word exists in the grid.
// Time Complexity: O(m × n × 4^L)
// Space Complexity: O(L)

function exist(board, word) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(exist(input.board, input.word)));
`
    }
  },

  // ============================================
  // PROBLEM 47: Longest Palindromic Substring
  // ============================================
  "longest-palindromic-substring": {
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    functionName: "longestPalindrome",
    testCases: [
      {
        input: JSON.stringify({ s: "babad" }),
        expectedOutput: JSON.stringify("bab"),
        description: "Multiple valid answers (bab or aba)"
      },
      {
        input: JSON.stringify({ s: "cbbd" }),
        expectedOutput: JSON.stringify("bb"),
        description: "Even length palindrome"
      },
      {
        input: JSON.stringify({ s: "a" }),
        expectedOutput: JSON.stringify("a"),
        description: "Single character"
      },
      {
        input: JSON.stringify({ s: "ac" }),
        expectedOutput: JSON.stringify("a"),
        description: "No palindrome > 1"
      },
      {
        input: JSON.stringify({ s: "racecar" }),
        expectedOutput: JSON.stringify("racecar"),
        description: "Entire string is palindrome"
      }
    ],
    templates: {
      python: `# Longest Palindromic Substring
# Given a string s, return the longest palindromic substring.
# Time Complexity: O(n²) with expand around center, O(n) with Manacher
# Space Complexity: O(1) for expand, O(n) for Manacher

class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.longestPalindrome(input_data["s"])
    print(json.dumps(result))
`,
      java: `// Longest Palindromic Substring
// Return the longest palindromic substring.
// Time Complexity: O(n²)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public String longestPalindrome(String s) {
        // Write your code here
        return "";
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        
        Solution sol = new Solution();
        System.out.println("\\"" + sol.longestPalindrome(s) + "\\"");
    }
}
`,
      cpp: `// Longest Palindromic Substring
// Return the longest palindromic substring.
// Time Complexity: O(n²)
// Space Complexity: O(1)

#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        // Write your code here
        return "";
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    string s = "babad";
    
    Solution sol;
    cout << "\\"" << sol.longestPalindrome(s) << "\\"" << endl;
    return 0;
}
`,
      javascript: `// Longest Palindromic Substring
// Return the longest palindromic substring.
// Time Complexity: O(n²)
// Space Complexity: O(1)

function longestPalindrome(s) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(longestPalindrome(input.s)));
`
    }
  },

  // ============================================
  // PROBLEM 48: Trapping Rain Water
  // ============================================
  "trapping-rain-water": {
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    functionName: "trap",
    testCases: [
      {
        input: JSON.stringify({ height: [0,1,0,2,1,0,1,3,2,1,2,1] }),
        expectedOutput: JSON.stringify(6),
        description: "Standard case"
      },
      {
        input: JSON.stringify({ height: [4,2,0,3,2,5] }),
        expectedOutput: JSON.stringify(9),
        description: "Valley in middle"
      },
      {
        input: JSON.stringify({ height: [1,2,3,4,5] }),
        expectedOutput: JSON.stringify(0),
        description: "Ascending - no water"
      },
      {
        input: JSON.stringify({ height: [5,4,3,2,1] }),
        expectedOutput: JSON.stringify(0),
        description: "Descending - no water"
      },
      {
        input: JSON.stringify({ height: [2,0,2] }),
        expectedOutput: JSON.stringify(2),
        description: "Simple pool"
      }
    ],
    templates: {
      python: `# Trapping Rain Water
# Given n non-negative integers representing elevation map, compute trapped water.
# Time Complexity: O(n) with two pointers
# Space Complexity: O(1)

from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.trap(input_data["height"])
    print(json.dumps(result))
`,
      java: `// Trapping Rain Water
// Compute trapped water from elevation map.
// Time Complexity: O(n)
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int trap(int[] height) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray heightArr = input.getAsJsonArray("height");
        int[] height = new int[heightArr.size()];
        for (int i = 0; i < heightArr.size(); i++) height[i] = heightArr.get(i).getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.trap(height));
    }
}
`,
      cpp: `// Trapping Rain Water
// Compute trapped water from elevation map.
// Time Complexity: O(n)
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    
    Solution sol;
    cout << sol.trap(height) << endl;
    return 0;
}
`,
      javascript: `// Trapping Rain Water
// Compute trapped water from elevation map.
// Time Complexity: O(n)
// Space Complexity: O(1)

function trap(height) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(trap(input.height)));
`
    }
  },

  // ============================================
  // PROBLEM 49: Median of Two Sorted Arrays
  // ============================================
  "median-of-two-sorted-arrays": {
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    functionName: "findMedianSortedArrays",
    testCases: [
      {
        input: JSON.stringify({ nums1: [1, 3], nums2: [2] }),
        expectedOutput: JSON.stringify(2.0),
        description: "Odd total length"
      },
      {
        input: JSON.stringify({ nums1: [1, 2], nums2: [3, 4] }),
        expectedOutput: JSON.stringify(2.5),
        description: "Even total length"
      },
      {
        input: JSON.stringify({ nums1: [], nums2: [1] }),
        expectedOutput: JSON.stringify(1.0),
        description: "One empty array"
      },
      {
        input: JSON.stringify({ nums1: [2], nums2: [] }),
        expectedOutput: JSON.stringify(2.0),
        description: "Other empty array"
      },
      {
        input: JSON.stringify({ nums1: [1, 3, 5], nums2: [2, 4, 6] }),
        expectedOutput: JSON.stringify(3.5),
        description: "Interleaved arrays"
      }
    ],
    templates: {
      python: `# Median of Two Sorted Arrays
# Find the median of two sorted arrays. Must be O(log(m+n)).
# Time Complexity: O(log(min(m, n)))
# Space Complexity: O(1)

from typing import List

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.findMedianSortedArrays(input_data["nums1"], input_data["nums2"])
    print(json.dumps(result))
`,
      java: `// Median of Two Sorted Arrays
// Find the median with O(log(min(m, n))) complexity.
// Time Complexity: O(log(min(m, n)))
// Space Complexity: O(1)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        return 0.0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        JsonArray arr1 = input.getAsJsonArray("nums1");
        JsonArray arr2 = input.getAsJsonArray("nums2");
        int[] nums1 = new int[arr1.size()];
        int[] nums2 = new int[arr2.size()];
        for (int i = 0; i < arr1.size(); i++) nums1[i] = arr1.get(i).getAsInt();
        for (int i = 0; i < arr2.size(); i++) nums2[i] = arr2.get(i).getAsInt();
        
        Solution sol = new Solution();
        System.out.println(sol.findMedianSortedArrays(nums1, nums2));
    }
}
`,
      cpp: `// Median of Two Sorted Arrays
// Find the median with O(log(min(m, n))) complexity.
// Time Complexity: O(log(min(m, n)))
// Space Complexity: O(1)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        return 0.0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    vector<int> nums1 = {1, 3};
    vector<int> nums2 = {2};
    
    Solution sol;
    cout << sol.findMedianSortedArrays(nums1, nums2) << endl;
    return 0;
}
`,
      javascript: `// Median of Two Sorted Arrays
// Find the median with O(log(min(m, n))) complexity.
// Time Complexity: O(log(min(m, n)))
// Space Complexity: O(1)

function findMedianSortedArrays(nums1, nums2) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(findMedianSortedArrays(input.nums1, input.nums2)));
`
    }
  },

  // ============================================
  // PROBLEM 50: Regular Expression Matching
  // ============================================
  "regular-expression-matching": {
    slug: "regular-expression-matching",
    title: "Regular Expression Matching",
    functionName: "isMatch",
    testCases: [
      {
        input: JSON.stringify({ s: "aa", p: "a" }),
        expectedOutput: JSON.stringify(false),
        description: "No match"
      },
      {
        input: JSON.stringify({ s: "aa", p: "a*" }),
        expectedOutput: JSON.stringify(true),
        description: "Star matches multiple"
      },
      {
        input: JSON.stringify({ s: "ab", p: ".*" }),
        expectedOutput: JSON.stringify(true),
        description: "Dot star matches all"
      },
      {
        input: JSON.stringify({ s: "aab", p: "c*a*b" }),
        expectedOutput: JSON.stringify(true),
        description: "Star can match zero"
      },
      {
        input: JSON.stringify({ s: "mississippi", p: "mis*is*p*." }),
        expectedOutput: JSON.stringify(false),
        description: "Complex pattern"
      }
    ],
    templates: {
      python: `# Regular Expression Matching
# Implement regex with '.' (any char) and '*' (zero or more of preceding).
# Time Complexity: O(m × n)
# Space Complexity: O(m × n)

class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.isMatch(input_data["s"], input_data["p"])
    print(json.dumps(result))
`,
      java: `// Regular Expression Matching
// Implement regex with '.' and '*'.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public boolean isMatch(String s, String p) {
        // Write your code here
        return false;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        String p = input.get("p").getAsString();
        
        Solution sol = new Solution();
        System.out.println(sol.isMatch(s, p));
    }
}
`,
      cpp: `// Regular Expression Matching
// Implement regex with '.' and '*'.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        // Write your code here
        return false;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    string s = "aa";
    string p = "a*";
    
    Solution sol;
    cout << (sol.isMatch(s, p) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `// Regular Expression Matching
// Implement regex with '.' and '*'.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

function isMatch(s, p) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(isMatch(input.s, input.p)));
`
    }
  },

  // ============================================
  // PROBLEM 51: Edit Distance
  // ============================================
  "edit-distance": {
    slug: "edit-distance",
    title: "Edit Distance",
    functionName: "minDistance",
    testCases: [
      {
        input: JSON.stringify({ word1: "horse", word2: "ros" }),
        expectedOutput: JSON.stringify(3),
        description: "horse -> ros"
      },
      {
        input: JSON.stringify({ word1: "intention", word2: "execution" }),
        expectedOutput: JSON.stringify(5),
        description: "intention -> execution"
      },
      {
        input: JSON.stringify({ word1: "", word2: "a" }),
        expectedOutput: JSON.stringify(1),
        description: "Empty to single char"
      },
      {
        input: JSON.stringify({ word1: "abc", word2: "abc" }),
        expectedOutput: JSON.stringify(0),
        description: "Same strings"
      },
      {
        input: JSON.stringify({ word1: "ab", word2: "bc" }),
        expectedOutput: JSON.stringify(2),
        description: "Two operations"
      }
    ],
    templates: {
      python: `# Edit Distance (Levenshtein Distance)
# Find minimum operations to convert word1 to word2.
# Operations: insert, delete, replace a character.
# Time Complexity: O(m × n)
# Space Complexity: O(m × n), can be O(min(m, n))

class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.minDistance(input_data["word1"], input_data["word2"])
    print(json.dumps(result))
`,
      java: `// Edit Distance (Levenshtein Distance)
// Find minimum operations to convert word1 to word2.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public int minDistance(String word1, String word2) {
        // Write your code here
        return 0;
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String word1 = input.get("word1").getAsString();
        String word2 = input.get("word2").getAsString();
        
        Solution sol = new Solution();
        System.out.println(sol.minDistance(word1, word2));
    }
}
`,
      cpp: `// Edit Distance (Levenshtein Distance)
// Find minimum operations to convert word1 to word2.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        // Write your code here
        return 0;
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    string word1 = "horse";
    string word2 = "ros";
    
    Solution sol;
    cout << sol.minDistance(word1, word2) << endl;
    return 0;
}
`,
      javascript: `// Edit Distance (Levenshtein Distance)
// Find minimum operations to convert word1 to word2.
// Time Complexity: O(m × n)
// Space Complexity: O(m × n)

function minDistance(word1, word2) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(minDistance(input.word1, input.word2)));
`
    }
  },

  // ============================================
  // PROBLEM 52: Minimum Window Substring
  // ============================================
  "minimum-window-substring": {
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    functionName: "minWindow",
    testCases: [
      {
        input: JSON.stringify({ s: "ADOBECODEBANC", t: "ABC" }),
        expectedOutput: JSON.stringify("BANC"),
        description: "Standard case"
      },
      {
        input: JSON.stringify({ s: "a", t: "a" }),
        expectedOutput: JSON.stringify("a"),
        description: "Single character match"
      },
      {
        input: JSON.stringify({ s: "a", t: "aa" }),
        expectedOutput: JSON.stringify(""),
        description: "Impossible case"
      },
      {
        input: JSON.stringify({ s: "aa", t: "aa" }),
        expectedOutput: JSON.stringify("aa"),
        description: "Exact match"
      },
      {
        input: JSON.stringify({ s: "cabwefgewcwaefgcf", t: "cae" }),
        expectedOutput: JSON.stringify("cwae"),
        description: "Multiple windows"
      }
    ],
    templates: {
      python: `# Minimum Window Substring
# Find minimum window in s containing all characters of t.
# Time Complexity: O(m + n)
# Space Complexity: O(k) where k is charset size

from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Write your code here
        pass

# DO NOT MODIFY BELOW THIS LINE
import json
import sys

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    sol = Solution()
    result = sol.minWindow(input_data["s"], input_data["t"])
    print(json.dumps(result))
`,
      java: `// Minimum Window Substring
// Find minimum window containing all chars of t.
// Time Complexity: O(m + n)
// Space Complexity: O(k)

import java.util.*;
import com.google.gson.*;

public class Solution {
    public String minWindow(String s, String t) {
        // Write your code here
        return "";
    }

    // DO NOT MODIFY BELOW THIS LINE
    public static void main(String[] args) {
        JsonObject input = JsonParser.parseString(args[0]).getAsJsonObject();
        String s = input.get("s").getAsString();
        String t = input.get("t").getAsString();
        
        Solution sol = new Solution();
        System.out.println("\\"" + sol.minWindow(s, t) + "\\"");
    }
}
`,
      cpp: `// Minimum Window Substring
// Find minimum window containing all chars of t.
// Time Complexity: O(m + n)
// Space Complexity: O(k)

#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        // Write your code here
        return "";
    }
};

// DO NOT MODIFY BELOW THIS LINE
int main() {
    string s = "ADOBECODEBANC";
    string t = "ABC";
    
    Solution sol;
    cout << "\\"" << sol.minWindow(s, t) << "\\"" << endl;
    return 0;
}
`,
      javascript: `// Minimum Window Substring
// Find minimum window containing all chars of t.
// Time Complexity: O(m + n)
// Space Complexity: O(k)

function minWindow(s, t) {
    // Write your code here
    
}

// DO NOT MODIFY BELOW THIS LINE
const input = JSON.parse(process.argv[2]);
console.log(JSON.stringify(minWindow(input.s, input.t)));
`
    }
  }
};

// Helper to get test data by slug
export function getTestData(slug: string): ProblemTestData | null {
  return problemTestCases[slug] || null;
}

// Get all available problem slugs with test cases
export function getAvailableProblemSlugs(): string[] {
  return Object.keys(problemTestCases);
}
