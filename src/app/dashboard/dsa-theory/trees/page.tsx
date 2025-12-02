import Link from 'next/link'
import { ArrowLeft, Network, Clock, Code2, BookOpen, Download, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is a Tree?',
    content: `A **Tree** is a hierarchical data structure consisting of nodes connected by edges. Unlike linear structures (arrays, linked lists), trees are non-linear.

**Key Terminology:**
- **Root**: Topmost node (no parent)
- **Parent**: Node that has children
- **Child**: Node connected below a parent
- **Leaf**: Node with no children
- **Height**: Longest path from root to leaf
- **Depth**: Distance from root to a node
- **Subtree**: Tree formed by a node and its descendants

**Real-life examples:**
- Family tree (ancestors/descendants)
- File system (folders/files)
- Organization hierarchy (CEO → Managers → Employees)
- HTML DOM structure

**Why Trees?**
- Efficient searching (Binary Search Tree)
- Hierarchical data representation
- Decision making (Decision Trees)`,
    code: `#include <iostream>
using namespace std;

// Basic Tree Node
struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

int main() {
    // Create a simple binary tree
    //       1
    //      / \\
    //     2   3
    //    / \\
    //   4   5
    
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    
    cout << "Root: " << root->data << endl;
    cout << "Left child: " << root->left->data << endl;
    cout << "Right child: " << root->right->data << endl;
    
    return 0;
}`,
    complexity: 'Depends on tree type and operation'
  },
  {
    id: 2,
    title: 'Binary Tree & Binary Search Tree',
    content: `**Binary Tree:**
Each node has at most 2 children (left and right).

**Types of Binary Trees:**
1. **Full Binary Tree**: Every node has 0 or 2 children
2. **Complete Binary Tree**: All levels filled except possibly last (filled left to right)
3. **Perfect Binary Tree**: All leaves at same level, every node has 2 children
4. **Balanced Binary Tree**: Height difference between left and right subtrees ≤ 1

**Binary Search Tree (BST):**
Special binary tree with ordering property:
- Left subtree contains nodes with values **less than** parent
- Right subtree contains nodes with values **greater than** parent
- This property holds for ALL nodes

**BST Advantage:**
Search, Insert, Delete: O(log n) average case (O(n) worst case for skewed tree)`,
    code: `#include <iostream>
using namespace std;

struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BST {
public:
    TreeNode* root;
    
    BST() : root(nullptr) {}
    
    // Insert into BST
    TreeNode* insert(TreeNode* node, int val) {
        if (node == nullptr) {
            return new TreeNode(val);
        }
        
        if (val < node->data) {
            node->left = insert(node->left, val);
        } else {
            node->right = insert(node->right, val);
        }
        return node;
    }
    
    void insert(int val) {
        root = insert(root, val);
    }
    
    // Search in BST
    bool search(TreeNode* node, int val) {
        if (node == nullptr) return false;
        if (node->data == val) return true;
        
        if (val < node->data) {
            return search(node->left, val);
        } else {
            return search(node->right, val);
        }
    }
    
    bool search(int val) {
        return search(root, val);
    }
    
    // Inorder traversal (gives sorted order for BST)
    void inorder(TreeNode* node) {
        if (node == nullptr) return;
        inorder(node->left);
        cout << node->data << " ";
        inorder(node->right);
    }
};

int main() {
    BST tree;
    tree.insert(50);
    tree.insert(30);
    tree.insert(70);
    tree.insert(20);
    tree.insert(40);
    
    cout << "Inorder (sorted): ";
    tree.inorder(tree.root);
    cout << endl;  // 20 30 40 50 70
    
    cout << "Search 40: " << (tree.search(40) ? "Found" : "Not Found") << endl;
    cout << "Search 100: " << (tree.search(100) ? "Found" : "Not Found") << endl;
    
    return 0;
}`,
    complexity: 'BST - Search/Insert/Delete: O(log n) average, O(n) worst'
  },
  {
    id: 3,
    title: 'Tree Traversals',
    content: `**Tree Traversal** means visiting all nodes in a specific order. There are 4 main types:

**1. Inorder (Left → Root → Right)**
- For BST, gives nodes in sorted order
- Used for: Getting sorted elements

**2. Preorder (Root → Left → Right)**
- Root is visited first
- Used for: Creating copy of tree, prefix expressions

**3. Postorder (Left → Right → Root)**
- Root is visited last
- Used for: Deleting tree, postfix expressions

**4. Level Order (BFS)**
- Visit level by level, left to right
- Uses Queue
- Used for: Finding shortest path, level-wise processing

**Memory Tip:**
- Pre = Root first
- Post = Root last
- In = Root in middle`,
    code: `#include <iostream>
#include <queue>
using namespace std;

struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Inorder: Left -> Root -> Right
void inorder(TreeNode* node) {
    if (node == nullptr) return;
    inorder(node->left);
    cout << node->data << " ";
    inorder(node->right);
}

// Preorder: Root -> Left -> Right
void preorder(TreeNode* node) {
    if (node == nullptr) return;
    cout << node->data << " ";
    preorder(node->left);
    preorder(node->right);
}

// Postorder: Left -> Right -> Root
void postorder(TreeNode* node) {
    if (node == nullptr) return;
    postorder(node->left);
    postorder(node->right);
    cout << node->data << " ";
}

// Level Order (BFS)
void levelOrder(TreeNode* root) {
    if (root == nullptr) return;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        cout << node->data << " ";
        
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}

int main() {
    //       1
    //      / \\
    //     2   3
    //    / \\
    //   4   5
    
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    
    cout << "Inorder:    "; inorder(root);    cout << endl;  // 4 2 5 1 3
    cout << "Preorder:   "; preorder(root);   cout << endl;  // 1 2 4 5 3
    cout << "Postorder:  "; postorder(root);  cout << endl;  // 4 5 2 3 1
    cout << "Level Order: "; levelOrder(root); cout << endl; // 1 2 3 4 5
    
    return 0;
}`,
    complexity: 'All traversals: O(n) time, O(h) space for recursive (h = height)'
  },
  {
    id: 4,
    title: 'Height, Depth & Diameter',
    content: `**Height of a Node:**
Number of edges on the longest path from that node to a leaf.
- Height of leaf = 0
- Height of tree = Height of root

**Depth of a Node:**
Number of edges from root to that node.
- Depth of root = 0

**Diameter of Tree:**
The longest path between any two nodes (may or may not pass through root).

**Common Interview Problems:**
1. Find height of tree
2. Check if tree is balanced
3. Find diameter
4. Find maximum/minimum depth
5. Count nodes at each level`,
    code: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Height of tree
int height(TreeNode* node) {
    if (node == nullptr) return -1;  // or 0 depending on definition
    
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    
    return 1 + max(leftHeight, rightHeight);
}

// Check if balanced (height diff <= 1 for all nodes)
int checkBalance(TreeNode* node, bool& balanced) {
    if (node == nullptr) return -1;
    
    int leftH = checkBalance(node->left, balanced);
    int rightH = checkBalance(node->right, balanced);
    
    if (abs(leftH - rightH) > 1) {
        balanced = false;
    }
    
    return 1 + max(leftH, rightH);
}

bool isBalanced(TreeNode* root) {
    bool balanced = true;
    checkBalance(root, balanced);
    return balanced;
}

// Diameter of tree (optimized - O(n))
int diameterHelper(TreeNode* node, int& diameter) {
    if (node == nullptr) return 0;
    
    int leftH = diameterHelper(node->left, diameter);
    int rightH = diameterHelper(node->right, diameter);
    
    // Update diameter if path through this node is longer
    diameter = max(diameter, leftH + rightH);
    
    return 1 + max(leftH, rightH);
}

int diameter(TreeNode* root) {
    int dia = 0;
    diameterHelper(root, dia);
    return dia;
}

int main() {
    //       1
    //      / \\
    //     2   3
    //    / \\
    //   4   5
    //  /
    // 6
    
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    root->left->left->left = new TreeNode(6);
    
    cout << "Height: " << height(root) << endl;      // 3
    cout << "Balanced: " << (isBalanced(root) ? "Yes" : "No") << endl;  // No
    cout << "Diameter: " << diameter(root) << endl;  // 4 (path: 6-4-2-5 or 6-4-2-1-3)
    
    return 0;
}`,
    complexity: 'Height: O(n) | Balanced: O(n) | Diameter: O(n)'
  }
]

export default function TreesPage() {
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
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Network className="w-6 h-6 text-orange-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Trees</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Hierarchical data structure - Binary Trees, BST, Traversals and more.
            </p>
          </div>
          
          <a href="/notes/dsa-complete-notes.pdf" download
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-500 rounded-lg font-medium hover:bg-orange-500/20 transition-colors">
            <Download className="w-4 h-4" />
            Download Notes
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-orange-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">50</p>
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
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold shrink-0">
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
