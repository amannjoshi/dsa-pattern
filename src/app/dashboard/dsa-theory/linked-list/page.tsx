import Link from 'next/link'
import { ArrowLeft, GitBranch, Clock, Code2, BookOpen, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is a Linked List?',
    content: `A **Linked List** is a linear data structure where elements are stored in nodes, and each node points to the next node using a pointer. Unlike arrays, elements are NOT stored in contiguous memory.

**Real-life example:** Think of a train. Each coach (node) is connected to the next coach through a coupling (pointer). You can only move from one coach to the next, not jump directly to any coach.

**Key Points:**
- Dynamic size: Can grow or shrink during runtime
- No memory wastage: Allocates memory only when needed
- Random access not possible: Must traverse from the beginning
- Extra memory for pointers

**Components of a Node:**
1. Data: The actual value stored
2. Pointer: Address of the next node`,
    code: `#include <iostream>
using namespace std;

// Define the Node structure
struct Node {
    int data;      // Data part
    Node* next;    // Pointer to next node
    
    // Constructor for easy node creation
    Node(int value) {
        data = value;
        next = nullptr;  // NULL in older C++
    }
};

int main() {
    // Create nodes
    Node* head = new Node(10);      // First node
    Node* second = new Node(20);    // Second node
    Node* third = new Node(30);     // Third node
    
    // Link the nodes
    head->next = second;
    second->next = third;
    // third->next is already nullptr
    
    // Traverse and print
    cout << "Linked List: ";
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
    // Output: 10 -> 20 -> 30 -> NULL
    
    return 0;
}`,
    complexity: 'Access: O(n) | Search: O(n) | Insert at head: O(1)'
  },
  {
    id: 2,
    title: 'Types of Linked Lists',
    content: `There are 4 main types of linked lists:

**1. Singly Linked List**
- Each node points to the next node only
- Can traverse only in one direction (forward)
- Last node points to NULL

**2. Doubly Linked List**
- Each node has TWO pointers: next and previous
- Can traverse in both directions (forward and backward)
- More memory but more flexible

**3. Circular Linked List**
- Last node points back to the first node
- No NULL, forms a circle
- Useful for round-robin scheduling

**4. Circular Doubly Linked List**
- Doubly linked + circular
- First's prev points to last, last's next points to first`,
    code: `#include <iostream>
using namespace std;

// Singly Linked List Node
struct SinglyNode {
    int data;
    SinglyNode* next;
    
    SinglyNode(int val) : data(val), next(nullptr) {}
};

// Doubly Linked List Node
struct DoublyNode {
    int data;
    DoublyNode* next;
    DoublyNode* prev;
    
    DoublyNode(int val) : data(val), next(nullptr), prev(nullptr) {}
};

int main() {
    // Doubly Linked List Example
    DoublyNode* head = new DoublyNode(10);
    DoublyNode* second = new DoublyNode(20);
    DoublyNode* third = new DoublyNode(30);
    
    // Link forward
    head->next = second;
    second->next = third;
    
    // Link backward
    second->prev = head;
    third->prev = second;
    
    // Forward traversal
    cout << "Forward: ";
    DoublyNode* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " <-> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
    
    // Backward traversal
    cout << "Backward: ";
    temp = third;
    while (temp != nullptr) {
        cout << temp->data << " <-> ";
        temp = temp->prev;
    }
    cout << "NULL" << endl;
    
    return 0;
}`,
    complexity: 'Doubly: Insert/Delete O(1) if node given | Access O(n)'
  },
  {
    id: 3,
    title: 'Insertion Operations',
    content: `You can insert a new node at three positions:

**1. Insert at Beginning (Head)**
- Create new node
- Point new node's next to current head
- Update head to new node
- Time: O(1)

**2. Insert at End (Tail)**
- Create new node
- Traverse to the last node
- Point last node's next to new node
- Time: O(n) or O(1) if you maintain tail pointer

**3. Insert at Specific Position**
- Traverse to the node before the position
- Point new node's next to the next node
- Point previous node's next to new node
- Time: O(n)`,
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;
    
    LinkedList() : head(nullptr) {}
    
    // Insert at beginning - O(1)
    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    // Insert at end - O(n)
    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        
        if (head == nullptr) {
            head = newNode;
            return;
        }
        
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
    
    // Insert at position (1-indexed) - O(n)
    void insertAtPosition(int val, int pos) {
        if (pos == 1) {
            insertAtHead(val);
            return;
        }
        
        Node* newNode = new Node(val);
        Node* temp = head;
        
        for (int i = 1; i < pos - 1 && temp != nullptr; i++) {
            temp = temp->next;
        }
        
        if (temp == nullptr) return;  // Invalid position
        
        newNode->next = temp->next;
        temp->next = newNode;
    }
    
    void display() {
        Node* temp = head;
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    
    list.insertAtHead(30);
    list.insertAtHead(20);
    list.insertAtHead(10);
    cout << "After inserting at head: ";
    list.display();  // 10 -> 20 -> 30 -> NULL
    
    list.insertAtTail(40);
    cout << "After inserting at tail: ";
    list.display();  // 10 -> 20 -> 30 -> 40 -> NULL
    
    list.insertAtPosition(25, 3);
    cout << "After inserting 25 at position 3: ";
    list.display();  // 10 -> 20 -> 25 -> 30 -> 40 -> NULL
    
    return 0;
}`,
    complexity: 'At Head: O(1) | At Tail: O(n) | At Position: O(n)'
  },
  {
    id: 4,
    title: 'Deletion Operations',
    content: `Similar to insertion, deletion can happen at three positions:

**1. Delete from Beginning**
- Store head in a temporary variable
- Move head to the next node
- Delete the temporary node
- Time: O(1)

**2. Delete from End**
- Traverse to the second-last node
- Delete the last node
- Set second-last's next to NULL
- Time: O(n)

**3. Delete Specific Node/Value**
- Find the node before the target
- Bypass the target node
- Delete the target node
- Time: O(n)

**Important:** Always free the memory using delete in C++ to avoid memory leaks!`,
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;
    
    LinkedList() : head(nullptr) {}
    
    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) { head = newNode; return; }
        Node* temp = head;
        while (temp->next) temp = temp->next;
        temp->next = newNode;
    }
    
    // Delete from beginning - O(1)
    void deleteFromHead() {
        if (head == nullptr) return;
        
        Node* temp = head;
        head = head->next;
        delete temp;  // Free memory!
    }
    
    // Delete from end - O(n)
    void deleteFromTail() {
        if (head == nullptr) return;
        
        if (head->next == nullptr) {
            delete head;
            head = nullptr;
            return;
        }
        
        Node* temp = head;
        while (temp->next->next != nullptr) {
            temp = temp->next;
        }
        delete temp->next;
        temp->next = nullptr;
    }
    
    // Delete by value - O(n)
    void deleteValue(int val) {
        if (head == nullptr) return;
        
        // If head has the value
        if (head->data == val) {
            deleteFromHead();
            return;
        }
        
        Node* temp = head;
        while (temp->next != nullptr && temp->next->data != val) {
            temp = temp->next;
        }
        
        if (temp->next == nullptr) return;  // Value not found
        
        Node* toDelete = temp->next;
        temp->next = temp->next->next;
        delete toDelete;
    }
    
    void display() {
        Node* temp = head;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    for (int i = 1; i <= 5; i++) list.insertAtTail(i * 10);
    
    cout << "Original: ";
    list.display();  // 10 -> 20 -> 30 -> 40 -> 50 -> NULL
    
    list.deleteFromHead();
    cout << "After delete head: ";
    list.display();  // 20 -> 30 -> 40 -> 50 -> NULL
    
    list.deleteFromTail();
    cout << "After delete tail: ";
    list.display();  // 20 -> 30 -> 40 -> NULL
    
    list.deleteValue(30);
    cout << "After delete 30: ";
    list.display();  // 20 -> 40 -> NULL
    
    return 0;
}`,
    complexity: 'From Head: O(1) | From Tail: O(n) | By Value: O(n)'
  },
  {
    id: 5,
    title: 'Reversing a Linked List',
    content: `Reversing a linked list is one of the most asked interview questions!

**Approach (Iterative):**
1. Use three pointers: prev, curr, next
2. Start with prev = NULL, curr = head
3. For each node:
   - Save the next node
   - Point current's next to previous
   - Move prev and curr one step forward
4. When done, prev becomes the new head

**Why is this asked so often?**
- Tests pointer manipulation skills
- Simple concept, tricky implementation
- Many variations (reverse in groups, etc.)

**Recursive approach:**
- Recursively reverse the rest of the list
- Then point the next node back to current`,
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;
    
    LinkedList() : head(nullptr) {}
    
    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        if (!head) { head = newNode; return; }
        Node* temp = head;
        while (temp->next) temp = temp->next;
        temp->next = newNode;
    }
    
    // Iterative Reverse - O(n) time, O(1) space
    void reverseIterative() {
        Node* prev = nullptr;
        Node* curr = head;
        Node* next = nullptr;
        
        while (curr != nullptr) {
            next = curr->next;   // Save next
            curr->next = prev;   // Reverse pointer
            prev = curr;         // Move prev forward
            curr = next;         // Move curr forward
        }
        head = prev;
    }
    
    // Recursive Reverse - O(n) time, O(n) space (call stack)
    Node* reverseRecursive(Node* node) {
        // Base case: empty or single node
        if (node == nullptr || node->next == nullptr) {
            return node;
        }
        
        // Reverse the rest of the list
        Node* newHead = reverseRecursive(node->next);
        
        // Make next node point back to current
        node->next->next = node;
        node->next = nullptr;
        
        return newHead;
    }
    
    void reverseUsingRecursion() {
        head = reverseRecursive(head);
    }
    
    void display() {
        Node* temp = head;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    for (int i = 1; i <= 5; i++) {
        list.insertAtTail(i * 10);
    }
    
    cout << "Original: ";
    list.display();  // 10 -> 20 -> 30 -> 40 -> 50 -> NULL
    
    list.reverseIterative();
    cout << "After iterative reverse: ";
    list.display();  // 50 -> 40 -> 30 -> 20 -> 10 -> NULL
    
    list.reverseUsingRecursion();
    cout << "After recursive reverse: ";
    list.display();  // 10 -> 20 -> 30 -> 40 -> 50 -> NULL
    
    return 0;
}`,
    complexity: 'Iterative: O(n) time, O(1) space | Recursive: O(n) time, O(n) space'
  },
  {
    id: 6,
    title: 'Common Interview Problems',
    content: `Here are the most frequently asked linked list problems:

**1. Detect Cycle (Floyd's Algorithm)**
Use slow and fast pointers. If they meet, there's a cycle.

**2. Find Middle Element**
Use slow and fast pointers. When fast reaches end, slow is at middle.

**3. Merge Two Sorted Lists**
Compare heads, add smaller to result, move that pointer forward.

**4. Check if Palindrome**
Find middle, reverse second half, compare with first half.

**5. Remove Nth Node from End**
Use two pointers n nodes apart. When first reaches end, second is at target.

**6. Intersection of Two Lists**
Calculate lengths, move longer list's pointer by difference, then move together.`,
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// Detect Cycle - Floyd's Cycle Detection
bool hasCycle(Node* head) {
    if (!head || !head->next) return false;
    
    Node* slow = head;
    Node* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;         // Move 1 step
        fast = fast->next->next;   // Move 2 steps
        
        if (slow == fast) return true;  // Cycle detected!
    }
    return false;
}

// Find Middle Element
Node* findMiddle(Node* head) {
    if (!head) return nullptr;
    
    Node* slow = head;
    Node* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;  // slow is at middle
}

// Merge Two Sorted Lists
Node* mergeSorted(Node* l1, Node* l2) {
    Node dummy(0);
    Node* tail = &dummy;
    
    while (l1 && l2) {
        if (l1->data <= l2->data) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    
    tail->next = l1 ? l1 : l2;  // Attach remaining
    return dummy.next;
}

int main() {
    // Create list: 1 -> 2 -> 3 -> 4 -> 5
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(4);
    head->next->next->next->next = new Node(5);
    
    // Find middle
    Node* mid = findMiddle(head);
    cout << "Middle element: " << mid->data << endl;  // Output: 3
    
    // Check cycle
    cout << "Has cycle: " << (hasCycle(head) ? "Yes" : "No") << endl;  // No
    
    // Create cycle for testing
    // head->next->next->next->next->next = head->next;
    // cout << "Has cycle: " << (hasCycle(head) ? "Yes" : "No") << endl;  // Yes
    
    return 0;
}`,
    complexity: 'Cycle Detection: O(n) | Find Middle: O(n) | Merge: O(n+m)'
  }
]

export default function LinkedListPage() {
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
              <div className="p-2 bg-green-500/10 rounded-lg">
                <GitBranch className="w-6 h-6 text-green-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Linked List
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Dynamic data structure with nodes connected through pointers.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-green-500" />
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

      {/* Topics */}
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div 
            key={topic.id}
            className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 font-bold shrink-0">
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
