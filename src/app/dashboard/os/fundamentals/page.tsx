'use client'

import Link from 'next/link'
import { ArrowLeft, Cpu, Clock, BookOpen, CheckCircle2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'What is an Operating System?',
    content: `An **Operating System (OS)** is system software that manages computer hardware, software resources, and provides common services for computer programs.

**Main Functions of OS:**
• **Process Management** - Creating, scheduling, terminating processes
• **Memory Management** - Allocating and deallocating memory
• **File System Management** - Managing files and directories
• **I/O Management** - Managing input/output devices
• **Security & Protection** - Protecting data and resources

**OS as an Interface:**
\`\`\`
┌─────────────────────────────────┐
│         User Applications       │
├─────────────────────────────────┤
│      Operating System           │
│  (Process, Memory, File, I/O)   │
├─────────────────────────────────┤
│         Hardware                │
│   (CPU, Memory, Devices)        │
└─────────────────────────────────┘
\`\`\`

**Goals of OS:**
1. **Convenience** - Make computer easy to use
2. **Efficiency** - Use resources efficiently
3. **Ability to Evolve** - Allow updates without affecting users`,
  },
  {
    id: 2,
    title: 'Types of Operating Systems',
    content: `**1. Batch Operating System**
• Jobs are grouped and processed in batches
• No interaction with user during execution
• Example: Payroll systems, bank statements

**2. Multiprogramming OS**
• Multiple programs in memory simultaneously
• CPU switches between programs when one waits for I/O
• Increases CPU utilization

**3. Multitasking/Time-Sharing OS**
• CPU time is shared among multiple users/processes
• Each gets a small time quantum (time slice)
• Creates illusion of parallel execution
• Example: Windows, Linux, macOS

**4. Real-Time OS (RTOS)**
• Guarantees response within strict time constraints
• **Hard RTOS**: Missing deadline = system failure (missile systems)
• **Soft RTOS**: Missing deadline = degraded performance (video streaming)

**5. Distributed OS**
• Multiple computers work together as single system
• Resources shared across network
• Example: Google's infrastructure

**6. Embedded OS**
• Designed for specific hardware/purpose
• Limited resources, optimized for task
• Example: Smart TV, washing machine, car systems`,
  },
  {
    id: 3,
    title: 'System Calls',
    content: `**System Call** is the interface between a process and the operating system. When a program needs OS services, it makes a system call.

**How System Calls Work:**
\`\`\`
User Mode (Application)
        │
        ▼ System Call (trap)
────────────────────────
        │
        ▼
Kernel Mode (OS)
        │
        ▼ Execute & Return
────────────────────────
        │
        ▼
User Mode (Resume)
\`\`\`

**Categories of System Calls:**

| Category | Examples | Purpose |
|----------|----------|---------|
| **Process Control** | fork(), exec(), exit(), wait() | Create, manage, terminate processes |
| **File Management** | open(), read(), write(), close() | File operations |
| **Device Management** | ioctl(), read(), write() | Device I/O |
| **Information** | getpid(), alarm(), sleep() | System info |
| **Communication** | pipe(), shmget(), mmap() | IPC mechanisms |

**User Mode vs Kernel Mode:**
• **User Mode**: Limited access, can't access hardware directly
• **Kernel Mode**: Full access, can execute privileged instructions
• System call causes **mode switch** (trap) from user to kernel`,
  },
  {
    id: 4,
    title: 'Kernel and Its Types',
    content: `**Kernel** is the core of the operating system that has complete control over everything in the system.

**Functions of Kernel:**
• Process scheduling and management
• Memory management
• Device driver management
• System call handling
• Interrupt handling

**Types of Kernels:**

**1. Monolithic Kernel**
\`\`\`
┌─────────────────────────────┐
│         User Space          │
├─────────────────────────────┤
│   ┌───────────────────────┐ │
│   │    Monolithic Kernel  │ │
│   │  (All services here)  │ │
│   │  - File System        │ │
│   │  - Device Drivers     │ │
│   │  - Networking         │ │
│   │  - Process Mgmt       │ │
│   └───────────────────────┘ │
├─────────────────────────────┤
│         Hardware            │
└─────────────────────────────┘
\`\`\`
• All OS services run in kernel space
• Fast (no context switching)
• Large size, one bug can crash system
• Example: Linux, Unix

**2. Microkernel**
\`\`\`
┌─────────────────────────────────────┐
│ User Space                          │
│  [File System] [Drivers] [Network]  │
├─────────────────────────────────────┤
│   ┌─────────────────────┐           │
│   │    Microkernel      │           │
│   │  (IPC, Scheduling)  │           │
│   └─────────────────────┘           │
├─────────────────────────────────────┤
│            Hardware                 │
└─────────────────────────────────────┘
\`\`\`
• Minimal kernel - only essential services
• Other services in user space
• More stable, slower (more context switches)
• Example: Minix, QNX

**3. Hybrid Kernel**
• Combines monolithic and microkernel
• Performance of monolithic + stability of micro
• Example: Windows NT, macOS`,
  },
  {
    id: 5,
    title: 'Interrupts',
    content: `**Interrupt** is a signal that tells the CPU to stop current execution and handle an event.

**Why Interrupts?**
Without interrupts, CPU would have to constantly check (poll) if devices need attention. Interrupts allow devices to notify CPU only when needed.

**Types of Interrupts:**

**1. Hardware Interrupts**
• Generated by hardware devices
• Examples: Keyboard press, mouse click, disk read complete
• Asynchronous (can occur anytime)

**2. Software Interrupts (Traps)**
• Generated by programs
• System calls are implemented using software interrupts
• Synchronous (predictable)

**3. Exceptions**
• Generated due to errors
• Examples: Division by zero, page fault, invalid instruction

**Interrupt Handling Process:**
\`\`\`
1. Interrupt occurs
        │
        ▼
2. CPU stops current task
        │
        ▼
3. Save current state (PC, registers)
        │
        ▼
4. Look up ISR in Interrupt Vector Table
        │
        ▼
5. Execute Interrupt Service Routine (ISR)
        │
        ▼
6. Restore state
        │
        ▼
7. Resume previous task
\`\`\`

**Interrupt Vector Table (IVT):**
• Table containing addresses of ISRs
• Each interrupt type has unique number
• CPU uses this number to find correct handler`,
  },
  {
    id: 6,
    title: 'OS Structure & Architecture',
    content: `**Operating System Structures:**

**1. Simple Structure (MS-DOS)**
• No clear separation between layers
• Applications can access hardware directly
• Not secure, one crash affects everything

**2. Layered Structure**
\`\`\`
Layer 5: User Interface
Layer 4: I/O Management  
Layer 3: Device Drivers
Layer 2: Memory Management
Layer 1: CPU Scheduling
Layer 0: Hardware
\`\`\`
• Each layer uses services of lower layer
• Easy to debug and maintain
• Slower due to multiple layers

**3. Modular Structure (Modern Linux)**
• Core kernel + loadable modules
• Modules can be loaded/unloaded at runtime
• Flexible and efficient
• Example: Device drivers as modules

**Booting Process:**
\`\`\`
1. Power On
      │
      ▼
2. BIOS/UEFI runs POST (Power-On Self Test)
      │
      ▼
3. Load bootloader from boot device
      │
      ▼
4. Bootloader loads kernel into memory
      │
      ▼
5. Kernel initializes hardware
      │
      ▼
6. Start init process (PID 1)
      │
      ▼
7. Load system services
      │
      ▼
8. Display login prompt
\`\`\`

**Key Terms:**
• **BIOS**: Basic Input/Output System (legacy)
• **UEFI**: Unified Extensible Firmware Interface (modern)
• **Bootloader**: GRUB (Linux), Windows Boot Manager`,
  },
]

export default function OSFundamentalsPage() {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20">
              <Cpu className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">OS Fundamentals</h1>
              <p className="text-muted-foreground">Introduction to Operating Systems</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
            <BookOpen className="w-5 h-5 mx-auto mb-2 text-orange-500" />
            <p className="text-lg font-bold text-white">{topics.length}</p>
            <p className="text-xs text-muted-foreground">Topics</p>
          </div>
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
            <Clock className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
            <p className="text-lg font-bold text-white">30</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center col-span-2 md:col-span-1">
            <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-green-500" />
            <p className="text-lg font-bold text-white">Beginner</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-6">
          {topics.map((topic, index) => (
            <div key={topic.id} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 font-bold shrink-0">
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
                      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-800 text-orange-400 text-xs">$1</code>')
                      .replace(/```([\s\S]*?)```/g, '<pre class="p-4 rounded-xl bg-zinc-950 border border-zinc-800 overflow-x-auto my-4"><code class="text-sm text-gray-300">$1</code></pre>')
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
