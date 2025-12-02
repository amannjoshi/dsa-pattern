'use client'

import Link from 'next/link'
import { ArrowLeft, Layers, Clock, Code2, BookOpen, CheckCircle2 } from 'lucide-react'
import { StackVisualizer, QueueVisualizer, CircularQueueVisualizer } from '@/components/dsa-theory/StackQueueVisualizer'

const topics = [
  {
    id: 1,
    title: 'What is a Stack?',
    visualizer: 'stack' as const,
    content: `A **Stack** is a linear data structure that follows **LIFO (Last In First Out)** principle. The last element added is the first one to be removed.

**Real-life examples:**
- Stack of plates: You take the top plate first
- Browser back button: Goes to the last visited page
- Undo operation: Undoes the last action first
- Call stack in programming: Last function called returns first

**Key Operations:**
- **Push**: Add element to the top
- **Pop**: Remove element from the top
- **Peek/Top**: View the top element without removing
- **isEmpty**: Check if stack is empty

**Where is Stack used?**
- Function calls (call stack)
- Expression evaluation and conversion
- Backtracking algorithms
- Undo/Redo functionality`,
    code: `#include <iostream>
#include <stack>  // STL Stack
using namespace std;

int main() {
    // Using STL Stack
    stack<int> s;
    
    // Push elements
    s.push(10);
    s.push(20);
    s.push(30);
    cout << "Pushed: 10, 20, 30" << endl;
    
    // Top element
    cout << "Top element: " << s.top() << endl;  // 30
    
    // Pop element
    s.pop();
    cout << "After pop, top: " << s.top() << endl;  // 20
    
    // Size
    cout << "Size: " << s.size() << endl;  // 2
    
    // Check if empty
    cout << "Is empty: " << (s.empty() ? "Yes" : "No") << endl;  // No
    
    // Pop all elements
    cout << "Popping all: ";
    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }
    cout << endl;  // 20 10
    
    return 0;
}`,
    complexity: 'Push: O(1) | Pop: O(1) | Peek: O(1) | isEmpty: O(1)'
  },
  {
    id: 2,
    title: 'Stack Implementation',
    content: `You can implement a stack in two ways:

**1. Array-based Stack**
- Fixed size (need to define maximum capacity)
- Fast operations (direct memory access)
- May waste space or overflow

**2. Linked List-based Stack**
- Dynamic size (grows as needed)
- No overflow (until memory runs out)
- Extra memory for pointers

**Array Implementation Steps:**
1. Create array with max size
2. Keep track of 'top' index (-1 means empty)
3. Push: increment top, add element
4. Pop: return element, decrement top

**Important Checks:**
- Overflow: Stack is full (top == maxSize - 1)
- Underflow: Stack is empty (top == -1)`,
    code: `#include <iostream>
using namespace std;

// Array-based Stack Implementation
class Stack {
private:
    int* arr;
    int top;
    int capacity;
    
public:
    Stack(int size) {
        capacity = size;
        arr = new int[capacity];
        top = -1;
    }
    
    ~Stack() {
        delete[] arr;
    }
    
    void push(int val) {
        if (isFull()) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top] = val;
    }
    
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        return arr[top--];
    }
    
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return -1;
        }
        return arr[top];
    }
    
    bool isEmpty() {
        return top == -1;
    }
    
    bool isFull() {
        return top == capacity - 1;
    }
    
    int size() {
        return top + 1;
    }
};

int main() {
    Stack s(5);
    
    s.push(10);
    s.push(20);
    s.push(30);
    
    cout << "Top: " << s.peek() << endl;      // 30
    cout << "Popped: " << s.pop() << endl;    // 30
    cout << "Top after pop: " << s.peek() << endl;  // 20
    cout << "Size: " << s.size() << endl;     // 2
    
    return 0;
}`,
    complexity: 'All operations: O(1)'
  },
  {
    id: 3,
    title: 'What is a Queue?',
    visualizer: 'queue' as const,
    content: `A **Queue** is a linear data structure that follows **FIFO (First In First Out)** principle. The first element added is the first one to be removed.

**Real-life examples:**
- Queue at a ticket counter: First person gets served first
- Print queue: First document prints first
- CPU scheduling: Processes are handled in order
- Message queues in software

**Key Operations:**
- **Enqueue**: Add element at the rear (back)
- **Dequeue**: Remove element from the front
- **Front**: View the front element
- **Rear**: View the last element
- **isEmpty**: Check if queue is empty

**Types of Queues:**
1. Simple Queue: Basic FIFO
2. Circular Queue: Last position connects to first
3. Priority Queue: Elements have priorities
4. Deque: Insert/Delete from both ends`,
    code: `#include <iostream>
#include <queue>  // STL Queue
using namespace std;

int main() {
    // Using STL Queue
    queue<int> q;
    
    // Enqueue (push) elements
    q.push(10);
    q.push(20);
    q.push(30);
    cout << "Enqueued: 10, 20, 30" << endl;
    
    // Front and back
    cout << "Front: " << q.front() << endl;  // 10
    cout << "Back: " << q.back() << endl;    // 30
    
    // Dequeue (pop) element
    q.pop();
    cout << "After dequeue, front: " << q.front() << endl;  // 20
    
    // Size
    cout << "Size: " << q.size() << endl;  // 2
    
    // Check if empty
    cout << "Is empty: " << (q.empty() ? "Yes" : "No") << endl;
    
    // Dequeue all
    cout << "Dequeue all: ";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;  // 20 30
    
    return 0;
}`,
    complexity: 'Enqueue: O(1) | Dequeue: O(1) | Front/Rear: O(1)'
  },
  {
    id: 4,
    title: 'Circular Queue',
    visualizer: 'circular-queue' as const,
    content: `A **Circular Queue** is a linear data structure where the last position is connected back to the first position, forming a circle.

**Why Circular Queue?**
In a normal queue, once the rear reaches the end, we can't add more elements even if there's space at the front (after dequeuing). Circular queue solves this!

**How it works:**
- Use modulo operation to wrap around
- Front and rear pointers move in a circle
- When rear reaches end, it wraps to beginning if space available

**Formulas:**
- Next position: (current + 1) % size
- Is Full: (rear + 1) % size == front
- Is Empty: front == -1

**Applications:**
- CPU scheduling (Round Robin)
- Memory management
- Traffic system
- Buffer in streaming`,
    code: `#include <iostream>
using namespace std;

class CircularQueue {
private:
    int* arr;
    int front, rear;
    int capacity;
    
public:
    CircularQueue(int size) {
        capacity = size;
        arr = new int[capacity];
        front = rear = -1;
    }
    
    ~CircularQueue() {
        delete[] arr;
    }
    
    void enqueue(int val) {
        // Check if full
        if ((rear + 1) % capacity == front) {
            cout << "Queue is full!" << endl;
            return;
        }
        
        if (front == -1) {
            front = 0;  // First element
        }
        
        rear = (rear + 1) % capacity;  // Circular increment
        arr[rear] = val;
        cout << "Enqueued: " << val << endl;
    }
    
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        
        int val = arr[front];
        
        if (front == rear) {
            // Last element
            front = rear = -1;
        } else {
            front = (front + 1) % capacity;  // Circular increment
        }
        
        return val;
    }
    
    int getFront() {
        if (isEmpty()) return -1;
        return arr[front];
    }
    
    bool isEmpty() {
        return front == -1;
    }
    
    void display() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return;
        }
        
        cout << "Queue: ";
        int i = front;
        while (true) {
            cout << arr[i] << " ";
            if (i == rear) break;
            i = (i + 1) % capacity;
        }
        cout << endl;
    }
};

int main() {
    CircularQueue cq(5);
    
    cq.enqueue(10);
    cq.enqueue(20);
    cq.enqueue(30);
    cq.enqueue(40);
    cq.display();  // 10 20 30 40
    
    cout << "Dequeued: " << cq.dequeue() << endl;  // 10
    cout << "Dequeued: " << cq.dequeue() << endl;  // 20
    
    cq.enqueue(50);  // Wraps around!
    cq.enqueue(60);
    cq.display();  // 30 40 50 60
    
    return 0;
}`,
    complexity: 'All operations: O(1)'
  }
]

export default function StackQueuePage() {
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
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Layers className="w-6 h-6 text-purple-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Stack & Queue
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              LIFO and FIFO data structures - fundamental for many algorithms.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <BookOpen className="w-5 h-5 mx-auto mb-2 text-purple-500" />
          <p className="text-lg font-bold">{topics.length}</p>
          <p className="text-xs text-muted-foreground">Topics</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Clock className="w-5 h-5 mx-auto mb-2 text-blue-500" />
          <p className="text-lg font-bold">40</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-center">
          <Code2 className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
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
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{topic.complexity}</span>
                </div>
              </div>
              {'visualizer' in topic && (
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 font-medium">
                  Interactive
                </span>
              )}
            </div>

            {/* Visualizer */}
            {'visualizer' in topic && topic.visualizer === 'stack' && (
              <div className="mb-4">
                <StackVisualizer />
              </div>
            )}
            {'visualizer' in topic && topic.visualizer === 'queue' && (
              <div className="mb-4">
                <QueueVisualizer />
              </div>
            )}
            {'visualizer' in topic && topic.visualizer === 'circular-queue' && (
              <div className="mb-4">
                <CircularQueueVisualizer />
              </div>
            )}

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
