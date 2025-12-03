'use client'

import Link from 'next/link'
import { ArrowLeft, Layers, Clock, BookOpen, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'Process vs Thread',
    content: `**Process**: A program in execution. It has its own memory space, resources, and state.

**Thread**: A lightweight unit of execution within a process. Threads share the process's memory.

**Comparison:**

| Aspect | Process | Thread |
|--------|---------|--------|
| Memory | Separate memory space | Shares memory with other threads |
| Creation | Heavy (slow) | Light (fast) |
| Communication | IPC needed (pipes, sockets) | Direct (shared memory) |
| Context Switch | Expensive | Cheap |
| Crash Impact | Only that process | Entire process crashes |

**Process States:**
\`\`\`
        ┌──────────────────────────────────────────┐
        │                                          │
        ▼                                          │
    ┌───────┐   admit    ┌───────┐   dispatch  ┌───────┐
    │  New  │ ─────────► │ Ready │ ──────────► │Running│
    └───────┘            └───────┘             └───────┘
                             ▲                     │
                             │                     │
                    I/O done │    ┌────────────────┤
                             │    │ I/O wait       │ exit
                         ┌───────┐                 │
                         │Waiting│                 ▼
                         └───────┘           ┌───────────┐
                                             │Terminated │
                                             └───────────┘
\`\`\`

**Process Control Block (PCB):**
Contains: Process ID, State, CPU registers, Memory info, I/O status, Scheduling info`,
  },
  {
    id: 2,
    title: 'CPU Scheduling Algorithms',
    content: `**CPU Scheduler** decides which process gets CPU time and for how long.

**Key Terms:**
• **Arrival Time (AT)**: When process enters ready queue
• **Burst Time (BT)**: CPU time needed
• **Completion Time (CT)**: When process finishes
• **Turnaround Time (TAT)**: CT - AT
• **Waiting Time (WT)**: TAT - BT

**1. First Come First Serve (FCFS)**
• Non-preemptive
• Simple, but causes **Convoy Effect**
• Long processes block short ones

**2. Shortest Job First (SJF)**
• Non-preemptive
• Minimum average waiting time
• Problem: Starvation of long processes

**3. Shortest Remaining Time First (SRTF)**
• Preemptive version of SJF
• If new process has shorter burst, preempt

**4. Round Robin (RR)**
• Preemptive, uses time quantum (q)
• Each process gets q time, then goes to back of queue
• Good for time-sharing systems
• If q too small → too many context switches
• If q too large → becomes FCFS

**5. Priority Scheduling**
• Higher priority runs first
• Can be preemptive or non-preemptive
• Problem: **Starvation** (low priority never runs)
• Solution: **Aging** (increase priority over time)

**6. Multilevel Queue**
• Multiple queues with different priorities
• Each queue can have different algorithm
• Example: Foreground (RR), Background (FCFS)

**7. Multilevel Feedback Queue**
• Processes can move between queues
• New processes start in high priority queue
• If uses too much CPU, moved to lower queue`,
  },
  {
    id: 3,
    title: 'Process Synchronization',
    content: `**Race Condition**: When multiple processes access shared data concurrently and result depends on execution order.

**Critical Section**: Code segment where shared resources are accessed.

**Requirements for Critical Section Solution:**
1. **Mutual Exclusion**: Only one process in critical section at a time
2. **Progress**: If no one in CS, a waiting process should enter
3. **Bounded Waiting**: Limit on how long a process waits

**Peterson's Solution (for 2 processes):**
\`\`\`
flag[i] = true;        // I want to enter
turn = j;              // Give other process a chance
while (flag[j] && turn == j);  // Wait if other wants & it's their turn
// CRITICAL SECTION
flag[i] = false;       // I'm done
\`\`\`

**Semaphore**: Integer variable for synchronization

**Binary Semaphore (Mutex):**
• Value: 0 or 1
• Used for mutual exclusion

**Counting Semaphore:**
• Value: 0 to N
• Used for resource counting

**Operations:**
\`\`\`
wait(S) / P(S) / down(S):
    while (S <= 0);  // busy wait
    S--;

signal(S) / V(S) / up(S):
    S++;
\`\`\`

**Producer-Consumer Problem:**
\`\`\`
// Shared: buffer[N], in, out
// Semaphores: empty=N, full=0, mutex=1

Producer:
    wait(empty);     // Wait for empty slot
    wait(mutex);     // Lock buffer
    // Add item to buffer
    signal(mutex);   // Unlock buffer
    signal(full);    // Signal item added

Consumer:
    wait(full);      // Wait for item
    wait(mutex);     // Lock buffer
    // Remove item from buffer
    signal(mutex);   // Unlock buffer
    signal(empty);   // Signal slot freed
\`\`\``,
  },
  {
    id: 4,
    title: 'Deadlock',
    content: `**Deadlock**: A situation where processes are waiting for resources held by each other, creating a cycle with no progress.

**Example:**
\`\`\`
Process P1: Has R1, Wants R2
Process P2: Has R2, Wants R1
→ Both waiting forever = DEADLOCK
\`\`\`

**Necessary Conditions (all 4 must hold):**

1. **Mutual Exclusion**: Resource can be held by only one process
2. **Hold and Wait**: Process holding resources can request more
3. **No Preemption**: Resources can't be forcibly taken
4. **Circular Wait**: Circular chain of processes waiting

**Handling Deadlock:**

**1. Prevention** - Break one of the 4 conditions
• No Hold & Wait: Request all resources at once
• Preemption: Forcibly take resources
• Ordered Resources: Request in fixed order (breaks circular wait)

**2. Avoidance** - Don't enter unsafe state
• **Banker's Algorithm**: Check if request leaves system in safe state
• Safe State: Can complete all processes with available resources

**3. Detection & Recovery**
• Build Resource Allocation Graph
• If cycle exists → deadlock
• Recovery: Kill process or preempt resources

**4. Ignore** - Ostrich Algorithm
• Hope it doesn't happen
• Used in most OS (Windows, Linux)

**Banker's Algorithm:**
\`\`\`
Need[i][j] = Max[i][j] - Allocation[i][j]

Safety Check:
1. Work = Available
2. Find process i where Need[i] <= Work
3. If found: Work += Allocation[i], mark finished
4. Repeat until all finished (SAFE) or stuck (UNSAFE)
\`\`\``,
  },
  {
    id: 5,
    title: 'Inter-Process Communication (IPC)',
    content: `**IPC** allows processes to communicate and synchronize.

**Types of IPC:**

**1. Shared Memory**
\`\`\`
┌─────────────┐     ┌─────────────┐
│  Process A  │     │  Process B  │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └───────┬───────────┘
               │
    ┌──────────▼──────────┐
    │   Shared Memory     │
    └─────────────────────┘
\`\`\`
• Fast (no kernel involvement after setup)
• Needs synchronization (semaphores)
• Example: shmget(), shmat() in Unix

**2. Message Passing**
\`\`\`
Process A ──send(msg)──► Kernel ──receive()──► Process B
\`\`\`
• Slower (kernel involved)
• Built-in synchronization
• Good for distributed systems

**3. Pipes**
• Unidirectional communication
• Used between related processes (parent-child)
• Anonymous pipes: pipe()
• Named pipes (FIFO): exist in file system

**4. Sockets**
• Network communication
• Can be on same or different machines
• TCP (reliable) or UDP (fast)

**5. Signals**
• Notify process of events
• Examples: SIGKILL, SIGTERM, SIGINT (Ctrl+C)
• Limited information (just signal number)

**Message Passing Types:**

| Type | Sender | Receiver |
|------|--------|----------|
| Blocking Send | Waits until received | - |
| Non-blocking Send | Returns immediately | - |
| Blocking Receive | - | Waits until message |
| Non-blocking Receive | - | Returns NULL if no message |`,
  },
  {
    id: 6,
    title: 'Classic Synchronization Problems',
    content: `**1. Producer-Consumer Problem**
• Producer creates items, puts in buffer
• Consumer takes items from buffer
• Buffer has limited size
• Solution: Use semaphores (empty, full, mutex)

**2. Readers-Writers Problem**
• Multiple readers can read simultaneously
• Writers need exclusive access
• Variants: Reader-priority, Writer-priority

**Reader-Writer Solution:**
\`\`\`
// Semaphores: rw_mutex=1, mutex=1
// Variable: read_count=0

Reader:
    wait(mutex);
    read_count++;
    if (read_count == 1) wait(rw_mutex);  // First reader locks
    signal(mutex);
    // READ
    wait(mutex);
    read_count--;
    if (read_count == 0) signal(rw_mutex);  // Last reader unlocks
    signal(mutex);

Writer:
    wait(rw_mutex);
    // WRITE
    signal(rw_mutex);
\`\`\`

**3. Dining Philosophers Problem**
• 5 philosophers, 5 forks, circular table
• Need 2 forks to eat
• Problem: Deadlock if all pick left fork

**Solutions:**
• Allow only 4 philosophers at table
• Pick both forks atomically
• Odd picks left first, even picks right first

**4. Sleeping Barber Problem**
• Barber sleeps if no customer
• Customer waits if barber busy
• Limited waiting chairs
• Uses semaphores for coordination

**Monitor**:
• High-level synchronization construct
• Only one process can be active inside
• Has condition variables (wait, signal)
• Easier than semaphores, less error-prone`,
  },
]

export default function ProcessManagementPage() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard/os" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Operating Systems
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20">
              <Layers className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Process Management</h1>
              <p className="text-muted-foreground">Processes, Threads, Scheduling & Synchronization</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
            <BookOpen className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
            <p className="text-lg font-bold text-white">{topics.length}</p>
            <p className="text-xs text-muted-foreground">Topics</p>
          </div>
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
            <Clock className="w-5 h-5 mx-auto mb-2 text-orange-500" />
            <p className="text-lg font-bold text-white">45</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center col-span-2 md:col-span-1">
            <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-green-500" />
            <p className="text-lg font-bold text-white">Important</p>
            <p className="text-xs text-muted-foreground">For Interviews</p>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-6">
          {topics.map((topic, index) => (
            <div key={topic.id} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 font-bold shrink-0">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
              </div>
              
              <div className="prose prose-invert prose-sm max-w-none">
                <div 
                  className="text-gray-300 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: topic.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-400 text-xs">$1</code>')
                      .replace(/```([\s\S]*?)```/g, '<pre class="p-4 rounded-xl bg-zinc-950 border border-zinc-800 overflow-x-auto my-4"><code class="text-sm text-gray-300 font-mono">$1</code></pre>')
                      .replace(/\n• /g, '<br/>• ')
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
