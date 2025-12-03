'use client'

import Link from 'next/link'
import { Cpu, FileText, Layers, Settings, Download, ArrowRight, BookOpen, HardDrive, Zap } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'OS Fundamentals',
    description: 'Introduction to OS, types, functions, system calls, and kernel concepts',
    icon: Cpu,
    href: '/dashboard/os/fundamentals',
    color: 'orange',
    topics: ['What is OS?', 'Types of OS', 'System Calls', 'Kernel Types', 'OS Structure', 'Interrupts']
  },
  {
    id: 2,
    title: 'Process Management',
    description: 'Processes, threads, scheduling algorithms, synchronization, and deadlocks',
    icon: Layers,
    href: '/dashboard/os/process',
    color: 'cyan',
    topics: ['Process vs Thread', 'CPU Scheduling', 'Process Synchronization', 'Deadlocks', 'IPC', 'Semaphores']
  },
  {
    id: 3,
    title: 'Memory Management',
    description: 'Memory allocation, paging, segmentation, virtual memory, and page replacement',
    icon: HardDrive,
    href: '/dashboard/os/memory',
    color: 'pink',
    topics: ['Contiguous Allocation', 'Paging', 'Segmentation', 'Virtual Memory', 'Page Replacement', 'Thrashing']
  },
  {
    id: 4,
    title: 'Interview Questions',
    description: 'Top OS questions asked at FAANG and product companies with detailed answers',
    icon: Zap,
    href: '/dashboard/os/interview',
    color: 'purple',
    topics: ['Process & Threads', 'Scheduling', 'Deadlocks', 'Memory', 'File Systems', 'FAANG Questions']
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  orange: { 
    bg: 'bg-orange-500/10', 
    border: 'border-orange-500/20', 
    text: 'text-orange-400',
    iconBg: 'bg-gradient-to-br from-orange-500/20 to-amber-500/20'
  },
  cyan: { 
    bg: 'bg-cyan-500/10', 
    border: 'border-cyan-500/20', 
    text: 'text-cyan-400',
    iconBg: 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20'
  },
  pink: { 
    bg: 'bg-pink-500/10', 
    border: 'border-pink-500/20', 
    text: 'text-pink-400',
    iconBg: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20'
  },
  purple: { 
    bg: 'bg-purple-500/10', 
    border: 'border-purple-500/20', 
    text: 'text-purple-400',
    iconBg: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20'
  },
}

export default function OSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/20">
              <Cpu className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Operating Systems</h1>
              <p className="text-muted-foreground">Core OS Concepts for Interviews</p>
            </div>
          </div>

          <p className="text-gray-400 max-w-2xl">
            Master operating system concepts from process management to memory management. 
            Essential knowledge for system design interviews and understanding how computers work.
          </p>
        </div>

        {/* Download Notes Section */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 border border-orange-500/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">OS Complete Notes</h2>
                <p className="text-sm text-gray-400">Download comprehensive OS notes in PDF format</p>
              </div>
            </div>
            <a 
              href="/notes/OS.pdf" 
              download
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Topics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {topics.map((topic) => {
              const colors = colorClasses[topic.color]
              return (
                <Link 
                  key={topic.id}
                  href={topic.href}
                  className={`group p-6 rounded-2xl ${colors.bg} border ${colors.border} hover:border-opacity-50 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${colors.iconBg} border ${colors.border}`}>
                      <topic.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <ArrowRight className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all`} />
                  </div>
                  
                  <h3 className={`text-xl font-semibold ${colors.text} mb-2`}>{topic.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{topic.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {topic.topics.slice(0, 4).map((t, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-black/30 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                    {topic.topics.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-black/30 text-gray-500">
                        +{topic.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Why Operating Systems?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-black/20">
              <h3 className="font-semibold text-orange-400 mb-2">Interview Must-Have</h3>
              <p className="text-gray-400">OS is asked in every SDE interview - processes, threads, memory, and scheduling.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/20">
              <h3 className="font-semibold text-cyan-400 mb-2">System Design Foundation</h3>
              <p className="text-gray-400">Understanding OS helps in designing scalable and efficient systems.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/20">
              <h3 className="font-semibold text-pink-400 mb-2">Core CS Knowledge</h3>
              <p className="text-gray-400">Foundation for understanding how software interacts with hardware.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
