'use client'

import Link from 'next/link'
import { ArrowLeft, Zap, Clock, BookOpen, Building2 } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: 'What is the difference between Process and Thread?',
    answer: `Process:
• Independent program in execution with own memory space
• Has own address space, code, data, heap, stack
• Communication via IPC (pipes, sockets, shared memory)
• Context switching is expensive
• One process crash doesn't affect others

Thread:
• Lightweight unit of execution within a process
• Shares memory with other threads of same process
• Communication via shared memory (direct)
• Context switching is cheap
• One thread crash can crash entire process

Key Point: Threads share heap but have separate stacks.`,
    company: 'Amazon, Google, Microsoft'
  },
  {
    id: 2,
    question: 'Explain different CPU Scheduling Algorithms.',
    answer: `1. FCFS (First Come First Serve)
• Non-preemptive, simple, causes convoy effect

2. SJF (Shortest Job First)
• Non-preemptive, optimal average waiting time
• Can cause starvation

3. SRTF (Shortest Remaining Time First)
• Preemptive SJF, even better waiting time

4. Round Robin
• Preemptive, time quantum based
• Good for time-sharing systems
• No starvation

5. Priority Scheduling
• Based on priority, can cause starvation
• Solution: Aging

Best for interviews: Know Round Robin, Priority, and their trade-offs.`,
    company: 'Microsoft, Uber, Goldman'
  },
  {
    id: 3,
    question: 'What are the necessary conditions for Deadlock?',
    answer: `All 4 conditions must hold simultaneously:

1. Mutual Exclusion
   • At least one resource must be non-sharable
   • Only one process can use at a time

2. Hold and Wait
   • Process holding resources can request more

3. No Preemption
   • Resources can't be forcibly taken

4. Circular Wait
   • P1 → P2 → P3 → P1 (circular chain)

How to Prevent:
• Break Mutual Exclusion: Use sharable resources
• Break Hold & Wait: Request all at once
• Break No Preemption: Allow resource preemption
• Break Circular Wait: Order resources, request in order`,
    company: 'Amazon, Microsoft, Adobe'
  },
  {
    id: 4,
    question: 'What is Virtual Memory and how does it work?',
    answer: `Virtual Memory: Technique that allows execution of processes larger than physical memory.

How it works:
1. Uses disk as extension of RAM
2. Only needed pages loaded (demand paging)
3. Gives each process illusion of large contiguous memory

Key Components:
• Page Table: Maps virtual to physical addresses
• TLB: Cache for page table entries
• Swap Space: Disk area for swapped pages

Page Fault:
1. Access page not in memory
2. Trap to OS
3. Find page on disk
4. Load into free frame (or replace one)
5. Update page table
6. Restart instruction

Benefits:
• Run programs larger than RAM
• Better memory utilization
• Process isolation`,
    company: 'Google, Facebook, Apple'
  },
  {
    id: 5,
    question: 'Explain Paging vs Segmentation.',
    answer: `Paging:
• Divides memory into fixed-size pages/frames
• Eliminates external fragmentation
• May have internal fragmentation
• Invisible to programmer
• 1D address (page + offset)

Segmentation:
• Divides memory into variable-size segments
• Based on logical divisions (code, data, stack)
• Has external fragmentation
• Visible to programmer
• 2D address (segment + offset)

Comparison:
| Aspect | Paging | Segmentation |
|--------|--------|--------------|
| Size | Fixed | Variable |
| Fragmentation | Internal | External |
| Programmer View | No | Yes |
| Sharing | Hard | Easy |

Modern OS: Use both (segmented paging)`,
    company: 'Microsoft, Intel, Qualcomm'
  },
  {
    id: 6,
    question: 'What is Thrashing? How to prevent it?',
    answer: `Thrashing: System spends more time paging than executing useful work.

Cause:
• Too many processes
• Each gets fewer frames than needed
• Constant page faults
• CPU utilization drops
• OS adds more processes (makes it worse!)

Signs:
• High page fault rate
• Low CPU utilization
• High disk I/O

Prevention:
1. Working Set Model
   • Give each process enough frames for its working set

2. Page Fault Frequency
   • Monitor fault rate
   • Add frames if too high
   • Remove if too low

3. Reduce multiprogramming
   • Suspend some processes

4. Local replacement
   • Process only replaces its own pages`,
    company: 'Amazon, Google, Oracle'
  },
  {
    id: 7,
    question: 'What is a Semaphore? Explain types.',
    answer: `Semaphore: Integer variable for process synchronization.

Operations:
• wait(S) / P(S): Decrement, block if < 0
• signal(S) / V(S): Increment, wake waiting process

Types:

1. Binary Semaphore (Mutex)
• Value: 0 or 1
• Used for mutual exclusion

2. Counting Semaphore
• Value: 0 to N
• Used for resource counting

Example - Producer Consumer:
\`\`\`
empty = N, full = 0, mutex = 1

Producer:
  wait(empty)
  wait(mutex)
  // add item
  signal(mutex)
  signal(full)

Consumer:
  wait(full)
  wait(mutex)
  // remove item
  signal(mutex)
  signal(empty)
\`\`\``,
    company: 'Microsoft, Amazon, Uber'
  },
  {
    id: 8,
    question: 'What is Context Switching?',
    answer: `Context Switch: Saving state of current process and loading state of another process.

When does it happen?
• Time slice expires (preemption)
• Process makes blocking system call
• Higher priority process arrives
• Interrupt occurs

What is saved (PCB):
• Program counter
• CPU registers
• Memory management info
• I/O status
• Scheduling info

Time Taken:
• Typically 1-1000 microseconds
• Pure overhead (no useful work)

Why Thread Switch is Faster:
• Threads share address space
• No need to switch memory mappings
• Only save/restore registers

Optimization:
• Minimize context switches
• Use user-level threads
• Efficient scheduling algorithms`,
    company: 'Facebook, Google, Microsoft'
  },
  {
    id: 9,
    question: 'Explain Page Replacement Algorithms.',
    answer: `When all frames are full, which page to replace?

1. FIFO (First In First Out)
• Replace oldest page
• Simple but has Belady's Anomaly

2. Optimal (OPT)
• Replace page not used for longest future time
• Best but impractical (needs future knowledge)

3. LRU (Least Recently Used)
• Replace page not used for longest past time
• Good approximation of OPT
• Implementation: Counter or Stack

4. Clock (Second Chance)
• Circular queue with reference bit
• If R=0: replace, If R=1: clear R, move on

Performance: OPT > LRU > Clock ≈ FIFO

Important: LRU is most commonly asked!`,
    company: 'Amazon, Google, Microsoft'
  },
  {
    id: 10,
    question: 'What is a Race Condition? How to avoid it?',
    answer: `Race Condition: When outcome depends on the order of execution of concurrent processes accessing shared data.

Example:
\`\`\`
counter = 5
P1: counter++ (read 5, increment, write 6)
P2: counter-- (read 5, decrement, write 4)

If interleaved:
P1 reads 5
P2 reads 5
P1 writes 6
P2 writes 4  ← Wrong! Should be 5
\`\`\`

Solutions:

1. Mutex/Locks
   • Only one process in critical section

2. Semaphores
   • More flexible than mutex

3. Monitors
   • High-level synchronization

4. Atomic Operations
   • Hardware support for atomicity

Key: Always protect shared resources with synchronization primitives!`,
    company: 'Uber, Amazon, LinkedIn'
  },
  {
    id: 11,
    question: 'What is the difference between Mutex and Semaphore?',
    answer: `Mutex (Mutual Exclusion):
• Binary (0 or 1)
• Owned by the locking thread
• Only owner can unlock
• Used for mutual exclusion

Semaphore:
• Can be any non-negative integer
• Not owned by any thread
• Any thread can signal
• Used for signaling and resource counting

Key Differences:

| Aspect | Mutex | Semaphore |
|--------|-------|-----------|
| Value | 0 or 1 | 0 to N |
| Ownership | Yes | No |
| Unlock | Only owner | Anyone |
| Purpose | Mutual exclusion | Signaling |

When to use:
• Mutex: Protecting critical section
• Semaphore: Producer-consumer, resource pool`,
    company: 'Google, Apple, Microsoft'
  },
  {
    id: 12,
    question: 'Explain User Mode vs Kernel Mode.',
    answer: `User Mode:
• Limited privileges
• Can't directly access hardware
• Can't execute privileged instructions
• Application code runs here
• If crash, only that process affected

Kernel Mode:
• Full privileges
• Direct hardware access
• Can execute any instruction
• OS kernel runs here
• If crash, system crash

Mode Switch (Trap):
\`\`\`
User Mode
    │
    │ System Call / Interrupt
    ▼
Kernel Mode
    │
    │ Return
    ▼
User Mode
\`\`\`

Why Two Modes?
• Protection: Prevent user programs from:
  - Accessing other processes' memory
  - Directly manipulating hardware
  - Executing dangerous instructions

• Stability: Faulty user program can't crash OS`,
    company: 'Microsoft, Intel, AMD'
  },
  {
    id: 13,
    question: 'What is a System Call? Give examples.',
    answer: `System Call: Interface between user programs and OS kernel.

Process:
1. User program invokes system call
2. Mode switch: User → Kernel
3. OS executes requested service
4. Mode switch: Kernel → User
5. Return result to program

Categories & Examples:
• Process Control: fork(), exec(), exit(), wait()
• File Management: open(), read(), write(), close()
• Device Management: ioctl(), read(), write()
• Information: getpid(), alarm(), sleep()
• Communication: pipe(), shmget(), mmap()

Example - Reading a file:
\`\`\`
fd = open("file.txt", O_RDONLY);  // System call
read(fd, buffer, 100);             // System call
close(fd);                         // System call
\`\`\``,
    company: 'Google, Amazon, Microsoft'
  },
  {
    id: 14,
    question: 'What is Belady\'s Anomaly?',
    answer: `Belady's Anomaly: Counter-intuitive situation where increasing page frames causes MORE page faults.

Occurs with: FIFO page replacement

Example:
Reference String: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5

3 frames: 9 page faults
4 frames: 10 page faults (MORE!)

Why FIFO causes this:
• FIFO doesn't consider page usage frequency
• Oldest page might still be needed
• More frames can evict useful pages

Algorithms that DON'T have this:
• LRU (Least Recently Used)
• Optimal (OPT)
• Stack-based algorithms

Interview Tip: Know this is specific to FIFO!`,
    company: 'Amazon, Microsoft, Qualcomm'
  },
  {
    id: 15,
    question: 'What is the difference between Preemptive and Non-Preemptive Scheduling?',
    answer: `Non-Preemptive:
• Process runs until it terminates or blocks
• CPU cannot be taken away forcefully
• Simple to implement
• Can cause starvation
• Examples: FCFS, SJF

Preemptive:
• CPU can be taken from running process
• Based on priority or time quantum
• Better response time
• More context switches (overhead)
• Examples: Round Robin, SRTF, Priority

Comparison:
| Aspect | Non-Preemptive | Preemptive |
|--------|----------------|------------|
| CPU taken | No | Yes |
| Context Switch | Less | More |
| Response Time | Poor | Good |
| Implementation | Simple | Complex |
| Use Case | Batch | Interactive |`,
    company: 'Microsoft, Amazon, Oracle'
  },
]

export default function OSInterviewPage() {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/20">
              <Zap className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">OS Interview Questions</h1>
              <p className="text-muted-foreground">Top questions asked at FAANG & product companies</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
            <BookOpen className="w-5 h-5 mx-auto mb-2 text-purple-500" />
            <p className="text-lg font-bold text-white">15</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
            <Clock className="w-5 h-5 mx-auto mb-2 text-orange-500" />
            <p className="text-lg font-bold text-white">40</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center col-span-2 md:col-span-1">
            <Building2 className="w-5 h-5 mx-auto mb-2 text-blue-500" />
            <p className="text-lg font-bold text-white">FAANG</p>
            <p className="text-xs text-muted-foreground">Companies</p>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 font-bold shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{q.question}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {q.company}
                  </span>
                </div>
              </div>
              
              <div className="prose prose-invert prose-sm max-w-none ml-14">
                <div 
                  className="text-gray-300 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: q.answer
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-800 text-purple-400 text-xs">$1</code>')
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
