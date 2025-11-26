import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or SERVICE_ROLE Key in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const problemData: Record<string, { url: string; companies: string[]; description: string }> = {
  "Container With Most Water": {
    url: "https://leetcode.com/problems/container-with-most-water/",
    companies: ["Google", "Facebook", "Amazon"],
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water."
  },
  "3Sum": {
    url: "https://leetcode.com/problems/3sum/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0."
  },
  "Linked List Cycle": {
    url: "https://leetcode.com/problems/linked-list-cycle/",
    companies: ["Amazon", "Microsoft", "Spotify"],
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it."
  },
  "Happy Number": {
    url: "https://leetcode.com/problems/happy-number/",
    companies: ["Google", "Uber", "Twitter"],
    description: "Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits."
  },
  "Remove Nth Node From End of List": {
    url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    companies: ["Facebook", "Amazon", "Apple"],
    description: "Given the head of a linked list, remove the nth node from the end of the list and return its head."
  },
  "Middle of the Linked List": {
    url: "https://leetcode.com/problems/middle-of-the-linked-list/",
    companies: ["Microsoft", "Adobe", "Flipkart"],
    description: "Given the head of a singly linked list, return the middle node of the linked list."
  },
  "Remove Duplicates from Sorted Array": {
    url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    companies: ["Facebook", "Microsoft", "Adobe"],
    description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once."
  },
  "Remove Element": {
    url: "https://leetcode.com/problems/remove-element/",
    companies: ["Amazon", "Adobe", "Apple"],
    description: "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place."
  },
  "Backspace String Compare": {
    url: "https://leetcode.com/problems/backspace-string-compare/",
    companies: ["Google", "Amazon", "Microsoft"],
    description: "Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character."
  },
  "Removing Stars From a String": {
    url: "https://leetcode.com/problems/removing-stars-from-a-string/",
    companies: ["Amazon", "Microsoft"],
    description: "You are given a string s, which contains stars *. In one operation, you can: Choose a star in s. Remove the closest non-star character to its left, as well as the star itself."
  },
  "Longest Palindromic Substring": {
    url: "https://leetcode.com/problems/longest-palindromic-substring/",
    companies: ["Amazon", "Microsoft", "Google"],
    description: "Given a string s, return the longest palindromic substring in s."
  },
  "Palindromic Substrings": {
    url: "https://leetcode.com/problems/palindromic-substrings/",
    companies: ["Facebook", "LinkedIn", "Goldman Sachs"],
    description: "Given a string s, return the number of palindromic substrings in it."
  },
  "Reverse Words in a String": {
    url: "https://leetcode.com/problems/reverse-words-in-a-string/",
    companies: ["Microsoft", "Amazon", "Apple"],
    description: "Given an input string s, reverse the order of the words."
  },
  "Reverse String": {
    url: "https://leetcode.com/problems/reverse-string/",
    companies: ["Adobe", "Cisco", "Apple"],
    description: "Write a function that reverses a string. The input string is given as an array of characters s."
  },
  "Moving Average from Data Stream": {
    url: "https://leetcode.com/problems/moving-average-from-data-stream/",
    companies: ["Spotify", "Amazon", "Google"],
    description: "Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window."
  },
  "Maximum Average Subarray I": {
    url: "https://leetcode.com/problems/maximum-average-subarray-i/",
    companies: ["Google", "Facebook"],
    description: "You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to k that has the maximum average value."
  },
  "Longest Substring Without Repeating Characters": {
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    companies: ["Amazon", "Facebook", "Google"],
    description: "Given a string s, find the length of the longest substring without repeating characters."
  },
  "Minimum Window Substring": {
    url: "https://leetcode.com/problems/minimum-window-substring/",
    companies: ["Facebook", "Amazon", "LinkedIn"],
    description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window."
  },
  "Sliding Window Maximum": {
    url: "https://leetcode.com/problems/sliding-window-maximum/",
    companies: ["Google", "Amazon", "Microsoft"],
    description: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right."
  },
  "Shortest Subarray with Sum at Least K": {
    url: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
    companies: ["Goldman Sachs", "Google"],
    description: "Return the length of the shortest, non-empty, contiguous subarray of nums with sum at least k."
  },
  "Find All Anagrams in a String": {
    url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    companies: ["Amazon", "Facebook", "Snapchat"],
    description: "Given two strings s and p, return an array of all the start indices of p's anagrams in s."
  },
  "Permutation in String": {
    url: "https://leetcode.com/problems/permutation-in-string/",
    companies: ["Microsoft", "Amazon", "Facebook"],
    description: "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise."
  },
  "Binary Tree Level Order Traversal": {
    url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values."
  },
  "Binary Tree Zigzag Level Order Traversal": {
    url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    companies: ["Amazon", "Microsoft", "Bloomberg"],
    description: "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values."
  },
  "Same Tree": {
    url: "https://leetcode.com/problems/same-tree/",
    companies: ["Google", "Amazon", "Apple"],
    description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not."
  },
  "Symmetric Tree": {
    url: "https://leetcode.com/problems/symmetric-tree/",
    companies: ["Amazon", "Microsoft", "Google"],
    description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center)."
  },
  "Binary Tree Inorder Traversal": {
    url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    companies: ["Adobe", "Microsoft", "Amazon"],
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values."
  },
  "Validate Binary Search Tree": {
    url: "https://leetcode.com/problems/validate-binary-search-tree/",
    companies: ["Amazon", "Facebook", "Bloomberg"],
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST)."
  },
  "Maximum Depth of Binary Tree": {
    url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    companies: ["LinkedIn", "Amazon", "Google"],
    description: "Given the root of a binary tree, return its maximum depth."
  },
  "Balanced Binary Tree": {
    url: "https://leetcode.com/problems/balanced-binary-tree/",
    companies: ["Amazon", "Google", "Microsoft"],
    description: "Given a binary tree, determine if it is height-balanced."
  },
  "Lowest Common Ancestor of a Binary Search Tree": {
    url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    companies: ["Amazon", "Facebook", "Microsoft"],
    description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST."
  },
  "Lowest Common Ancestor of a Binary Tree": {
    url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree."
  },
  "Serialize and Deserialize Binary Tree": {
    url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    companies: ["Facebook", "Microsoft", "Amazon"],
    description: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer."
  },
  "Subtree of Another Tree": {
    url: "https://leetcode.com/problems/subtree-of-another-tree/",
    companies: ["Amazon", "Facebook", "Google"],
    description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot."
  },
  "Number of Islands": {
    url: "https://leetcode.com/problems/number-of-islands/",
    companies: ["Amazon", "Microsoft", "Google"],
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands."
  },
  "Surrounded Regions": {
    url: "https://leetcode.com/problems/surrounded-regions/",
    companies: ["Google", "Amazon", "Uber"],
    description: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'."
  },
  "01 Matrix": {
    url: "https://leetcode.com/problems/01-matrix/",
    companies: ["Google", "Amazon", "Microsoft"],
    description: "Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell."
  },
  "Rotting Oranges": {
    url: "https://leetcode.com/problems/rotting-oranges/",
    companies: ["Amazon", "Microsoft", "Oracle"],
    description: "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange."
  },
  "Course Schedule": {
    url: "https://leetcode.com/problems/course-schedule/",
    companies: ["Amazon", "Google", "Facebook"],
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai."
  },
  "Course Schedule II": {
    url: "https://leetcode.com/problems/course-schedule-ii/",
    companies: ["Amazon", "Facebook", "Microsoft"],
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Return the ordering of courses you should take to finish all courses."
  },
  "Course Schedule II (Kahn)": {
    url: "https://leetcode.com/problems/course-schedule-ii/",
    companies: ["Amazon", "Facebook", "Microsoft"],
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Return the ordering of courses you should take to finish all courses."
  },
  "Alien Dictionary": {
    url: "https://leetcode.com/problems/alien-dictionary/",
    companies: ["Facebook", "Google", "Amazon"],
    description: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown."
  },
  "Clone Graph": {
    url: "https://leetcode.com/problems/clone-graph/",
    companies: ["Facebook", "Amazon", "Google"],
    description: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph."
  },
  "Copy List with Random Pointer": {
    url: "https://leetcode.com/problems/copy-list-with-random-pointer/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null."
  },
  "Network Delay Time": {
    url: "https://leetcode.com/problems/network-delay-time/",
    companies: ["Google", "Amazon", "Microsoft"],
    description: "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi)."
  },
  "Swim in Rising Water": {
    url: "https://leetcode.com/problems/swim-in-rising-water/",
    companies: ["Google", "Facebook"],
    description: "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j)."
  },
  "Cheapest Flights Within K Stops": {
    url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    companies: ["Airbnb", "Google", "Amazon"],
    description: "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [from, to, price]."
  },
  "Shortest Path with Alternating Colors": {
    url: "https://leetcode.com/problems/shortest-path-with-alternating-colors/",
    companies: ["Microsoft", "Amazon"],
    description: "You are given an integer n, the number of nodes in a directed graph where the nodes are labeled from 0 to n - 1."
  },
  "Number of Connected Components in an Undirected Graph": {
    url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    companies: ["Google", "Facebook", "Amazon"],
    description: "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph."
  },
  "Redundant Connection": {
    url: "https://leetcode.com/problems/redundant-connection/",
    companies: ["Google", "Amazon", "Microsoft"],
    description: "In this problem, a tree is an undirected graph that is connected and has no cycles."
  },
  "Climbing Stairs": {
    url: "https://leetcode.com/problems/climbing-stairs/",
    companies: ["Amazon", "Google", "Adobe"],
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps."
  },
  "Decode Ways": {
    url: "https://leetcode.com/problems/decode-ways/",
    companies: ["Facebook", "Amazon", "Google"],
    description: "A message containing letters from A-Z can be encoded into numbers using the following mapping: 'A' -> '1', 'B' -> '2', ... 'Z' -> '26'."
  },
  "Maximum Subarray": {
    url: "https://leetcode.com/problems/maximum-subarray/",
    companies: ["LinkedIn", "Amazon", "Microsoft"],
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum."
  },
  "Maximum Sum Circular Subarray": {
    url: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
    companies: ["Amazon", "Microsoft", "Google"],
    description: "Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums."
  },
  "Coin Change": {
    url: "https://leetcode.com/problems/coin-change/",
    companies: ["Amazon", "Microsoft", "Walmart"],
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money."
  },
  "Combination Sum IV": {
    url: "https://leetcode.com/problems/combination-sum-iv/",
    companies: ["Google", "Facebook", "Snapchat"],
    description: "Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target."
  },
  "Partition Equal Subset Sum": {
    url: "https://leetcode.com/problems/partition-equal-subset-sum/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal."
  },
  "Target Sum": {
    url: "https://leetcode.com/problems/target-sum/",
    companies: ["Facebook", "Amazon", "Google"],
    description: "You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers."
  },
  "Word Break": {
    url: "https://leetcode.com/problems/word-break/",
    companies: ["Amazon", "Facebook", "Google"],
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words."
  },
  "Word Break II": {
    url: "https://leetcode.com/problems/word-break-ii/",
    companies: ["Amazon", "Google", "Snapchat"],
    description: "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences."
  },
  "Longest Common Subsequence": {
    url: "https://leetcode.com/problems/longest-common-subsequence/",
    companies: ["Amazon", "Microsoft", "Google"],
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0."
  },
  "Shortest Common Supersequence": {
    url: "https://leetcode.com/problems/shortest-common-supersequence/",
    companies: ["Microsoft", "Google"],
    description: "Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences."
  },
  "Kth Largest Element in an Array": {
    url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "Given an integer array nums and an integer k, return the kth largest element in the array."
  },
  "Top K Frequent Elements": {
    url: "https://leetcode.com/problems/top-k-frequent-elements/",
    companies: ["Amazon", "Facebook", "Google"],
    description: "Given an integer array nums and an integer k, return the k most frequent elements."
  },
  "Find Median from Data Stream": {
    url: "https://leetcode.com/problems/find-median-from-data-stream/",
    companies: ["Amazon", "Google", "Microsoft"],
    description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values."
  },
  "Finding MK Average": {
    url: "https://leetcode.com/problems/finding-mk-average/",
    companies: ["Google"],
    description: "You are given two integers, m and k, and a stream of integers. You are tasked to implement a data structure that calculates the MKAverage for the stream."
  },
  "Merge k Sorted Lists": {
    url: "https://leetcode.com/problems/merge-k-sorted-lists/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it."
  },
  "Find K Pairs with Smallest Sums": {
    url: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    companies: ["Google", "Amazon", "Uber"],
    description: "You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k."
  },
  "Meeting Rooms II": {
    url: "https://leetcode.com/problems/meeting-rooms-ii/",
    companies: ["Google", "Amazon", "Facebook"],
    description: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required."
  },
  "Reorganize String": {
    url: "https://leetcode.com/problems/reorganize-string/",
    companies: ["Amazon", "Google", "Facebook"],
    description: "Given a string s, rearrange the characters of s so that any two adjacent characters are not the same."
  },
  "Letter Combinations of a Phone Number": {
    url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent."
  },
  "Combinations": {
    url: "https://leetcode.com/problems/combinations/",
    companies: ["Microsoft", "Amazon", "Google"],
    description: "Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n]."
  },
  "Next Permutation": {
    url: "https://leetcode.com/problems/next-permutation/",
    companies: ["Facebook", "Amazon", "Google"],
    description: "A permutation of an array of integers is an arrangement of its members into a sequence or linear order."
  },
  "Permutations": {
    url: "https://leetcode.com/problems/permutations/",
    companies: ["Amazon", "Microsoft", "LinkedIn"],
    description: "Given an array nums of distinct integers, return all the possible permutations."
  },
  "Combination Sum": {
    url: "https://leetcode.com/problems/combination-sum/",
    companies: ["Airbnb", "Amazon", "Facebook"],
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target."
  },
  "Combination Sum II": {
    url: "https://leetcode.com/problems/combination-sum-ii/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target."
  },
  "Generate Parentheses": {
    url: "https://leetcode.com/problems/generate-parentheses/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses."
  },
  "Remove Invalid Parentheses": {
    url: "https://leetcode.com/problems/remove-invalid-parentheses/",
    companies: ["Facebook", "Google", "Amazon"],
    description: "Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid."
  },
  "Merge Intervals": {
    url: "https://leetcode.com/problems/merge-intervals/",
    companies: ["Facebook", "Google", "Amazon"],
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals."
  },
  "Insert Interval": {
    url: "https://leetcode.com/problems/insert-interval/",
    companies: ["Google", "Facebook", "Amazon"],
    description: "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti."
  },
  "Jump Game II": {
    url: "https://leetcode.com/problems/jump-game-ii/",
    companies: ["Amazon", "Google", "Microsoft"],
    description: "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]."
  },
  "Jump Game": {
    url: "https://leetcode.com/problems/jump-game/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position."
  },
  "Best Time to Buy and Sell Stock": {
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    companies: ["Amazon", "Facebook", "Microsoft"],
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day."
  },
  "Best Time to Buy and Sell Stock II": {
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    companies: ["Amazon", "Microsoft", "Bloomberg"],
    description: "You are given an integer array prices where prices[i] is the price of a given stock on the ith day."
  },
  "Gas Station": {
    url: "https://leetcode.com/problems/gas-station/",
    companies: ["Google", "Microsoft", "Amazon"],
    description: "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]."
  },
  "Search Insert Position": {
    url: "https://leetcode.com/problems/search-insert-position/",
    companies: ["Google", "Apple", "Amazon"],
    description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order."
  },
  "Sqrt(x)": {
    url: "https://leetcode.com/problems/sqrtx/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer."
  },
  "Search in Rotated Sorted Array": {
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index."
  },
  "Find Minimum in Rotated Sorted Array": {
    url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times."
  },
  "Split Array Largest Sum": {
    url: "https://leetcode.com/problems/split-array-largest-sum/",
    companies: ["Google", "Amazon", "Facebook"],
    description: "Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized."
  },
  "Koko Eating Bananas": {
    url: "https://leetcode.com/problems/koko-eating-bananas/",
    companies: ["Google", "Airbnb", "Facebook"],
    description: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours."
  },
  "Find First and Last Position of Element in Sorted Array": {
    url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    companies: ["Facebook", "Google", "Amazon"],
    description: "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value."
  },
  "Valid Parentheses": {
    url: "https://leetcode.com/problems/valid-parentheses/",
    companies: ["Amazon", "Facebook", "Microsoft"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."
  },
  "Longest Valid Parentheses": {
    url: "https://leetcode.com/problems/longest-valid-parentheses/",
    companies: ["Facebook", "Amazon", "Google"],
    description: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring."
  },
  "Remove K Digits": {
    url: "https://leetcode.com/problems/remove-k-digits/",
    companies: ["Microsoft", "Amazon", "Google"],
    description: "Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num."
  },
  "Next Greater Element I": {
    url: "https://leetcode.com/problems/next-greater-element-i/",
    companies: ["Amazon", "Google", "Microsoft"],
    description: "The next greater element of some element x in an array is the first greater element that is to the right of x in the same array."
  },
  "Evaluate Reverse Polish Notation": {
    url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    companies: ["Amazon", "Google", "Microsoft"],
    description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation."
  },
  "Basic Calculator": {
    url: "https://leetcode.com/problems/basic-calculator/",
    companies: ["Google", "Facebook", "Microsoft"],
    description: "Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation."
  },
  "Simplify Path": {
    url: "https://leetcode.com/problems/simplify-path/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path."
  },
  "Decode String": {
    url: "https://leetcode.com/problems/decode-string/",
    companies: ["Google", "Amazon", "Cisco"],
    description: "Given an encoded string, return its decoded string."
  },
  "Single Number": {
    url: "https://leetcode.com/problems/single-number/",
    companies: ["Amazon", "Google", "Facebook"],
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one."
  },
  "Number of 1 Bits": {
    url: "https://leetcode.com/problems/number-of-1-bits/",
    companies: ["Microsoft", "Amazon", "Apple"],
    description: "Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight)."
  },
  "Power of Two": {
    url: "https://leetcode.com/problems/power-of-two/",
    companies: ["Google", "Amazon", "Adobe"],
    description: "Given an integer n, return true if it is a power of two. Otherwise, return false."
  },
  "Reverse Linked List": {
    url: "https://leetcode.com/problems/reverse-linked-list/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list."
  },
  "Merge Two Sorted Lists": {
    url: "https://leetcode.com/problems/merge-two-sorted-lists/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list."
  },
  "Add Two Numbers": {
    url: "https://leetcode.com/problems/add-two-numbers/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit."
  },
  "Intersection of Two Linked Lists": {
    url: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect."
  },
  "Rotate Image": {
    url: "https://leetcode.com/problems/rotate-image/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise)."
  },
  "Rotate Array": {
    url: "https://leetcode.com/problems/rotate-array/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative."
  },
  "Spiral Matrix": {
    url: "https://leetcode.com/problems/spiral-matrix/",
    companies: ["Microsoft", "Amazon", "Google"],
    description: "Given an m x n matrix, return all elements of the matrix in spiral order."
  },
  "Set Matrix Zeroes": {
    url: "https://leetcode.com/problems/set-matrix-zeroes/",
    companies: ["Facebook", "Amazon", "Microsoft"],
    description: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's."
  },
  "Product of Array Except Self": {
    url: "https://leetcode.com/problems/product-of-array-except-self/",
    companies: ["Amazon", "Facebook", "Microsoft"],
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]."
  },
  "Palindrome Number": {
    url: "https://leetcode.com/problems/palindrome-number/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Given an integer x, return true if x is a palindrome, and false otherwise."
  },
  "Valid Palindrome": {
    url: "https://leetcode.com/problems/valid-palindrome/",
    companies: ["Facebook", "Microsoft", "Amazon"],
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward."
  },
  "Group Anagrams": {
    url: "https://leetcode.com/problems/group-anagrams/",
    companies: ["Amazon", "Microsoft", "Google"],
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order."
  },
  "Valid Anagram": {
    url: "https://leetcode.com/problems/valid-anagram/",
    companies: ["Amazon", "Google", "Microsoft"],
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise."
  },
  "Roman to Integer": {
    url: "https://leetcode.com/problems/roman-to-integer/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M."
  },
  "LRU Cache": {
    url: "https://leetcode.com/problems/lru-cache/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache."
  },
  "Min Stack": {
    url: "https://leetcode.com/problems/min-stack/",
    companies: ["Amazon", "Microsoft", "Facebook"],
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time."
  },
  "Implement Trie (Prefix Tree)": {
    url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    companies: ["Amazon", "Microsoft", "Google"],
    description: "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings."
  }
};

async function seedEnrichedProblems() {
  const csvPath = path.join(process.cwd(), 'content', 'problems.csv')
  
  if (!fs.existsSync(csvPath)) {
    console.error('problems.csv not found in content directory')
    return
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = fileContent.split('\n').slice(1) // Skip header

  console.log(`Processing ${lines.length} problems...`)

  let successCount = 0
  let failCount = 0

  for (const line of lines) {
    if (!line.trim()) continue

    // Parse CSV line (handling commas in quotes if necessary, but simple split for now)
    // Assuming format: Title,Difficulty,Pattern,LeetCode Link,Company
    const [title, difficulty, pattern] = line.split(',').map(s => s.trim())

    if (!title) continue

    // Extract category and sub_pattern from pattern
    // Pattern format: "Two Pointers - Converging" -> category: "Two Pointers", sub_pattern: "Converging"
    let category = pattern
    let sub_pattern = pattern
    
    if (pattern && pattern.includes(' - ')) {
      const parts = pattern.split(' - ')
      category = parts[0].trim()
      sub_pattern = pattern // Keep the full pattern as sub_pattern for grouping
    }

    // Look up enriched data
    let enriched = problemData[title]

    if (!enriched) {
      console.warn(`⚠️ No enriched data found for: "${title}". Using fallback.`)
      // Fallback: Generate a search link and generic description
      enriched = {
        url: `https://leetcode.com/problemset/all/?search=${encodeURIComponent(title)}`,
        companies: ["Unknown"],
        description: "Practice this problem on LeetCode."
      }
    }

    // Construct slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const { error } = await supabase
      .from('problems')
      .upsert({
        slug,
        title,
        difficulty,
        category,
        sub_pattern,
        description: enriched.description,
        companies: enriched.companies,
        leetcode_link: enriched.url
      }, { onConflict: 'slug' })

    if (error) {
      console.error(`❌ Error syncing ${title}:`, error.message)
      failCount++
    } else {
      console.log(`✅ Synced: ${title}`)
      successCount++
    }
  }

  console.log(`\nSync Complete!`)
  console.log(`Success: ${successCount}`)
  console.log(`Failed/Skipped: ${failCount}`)
}

seedEnrichedProblems()
