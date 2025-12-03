'use client'

import Link from 'next/link'
import { 
  Network, 
  Layers, 
  Server, 
  Globe,
  Shield,
  Wifi,
  Download,
  ArrowRight,
  CheckCircle2,
  Router,
  Lock
} from 'lucide-react'

const networkTopics = [
  {
    id: 'osi-model',
    title: 'OSI Model',
    description: 'Understanding the 7 layers of network communication',
    icon: Layers,
    color: 'blue',
    topics: 7,
    href: '/dashboard/cn-theory/osi-model'
  },
  {
    id: 'tcp-ip',
    title: 'TCP/IP Model',
    description: 'Internet protocol suite and its 4 layers',
    icon: Globe,
    color: 'green',
    topics: 5,
    href: '/dashboard/cn-theory/tcp-ip'
  },
  {
    id: 'network-devices',
    title: 'Network Devices',
    description: 'Routers, switches, hubs, bridges, and more',
    icon: Router,
    color: 'purple',
    topics: 6,
    href: '/dashboard/cn-theory/network-devices'
  },
  {
    id: 'ip-addressing',
    title: 'IP Addressing',
    description: 'IPv4, IPv6, subnetting, and CIDR notation',
    icon: Network,
    color: 'orange',
    topics: 6,
    href: '/dashboard/cn-theory/ip-addressing'
  },
  {
    id: 'protocols',
    title: 'Network Protocols',
    description: 'HTTP, DNS, DHCP, FTP, SMTP, and more',
    icon: Server,
    color: 'cyan',
    topics: 8,
    href: '/dashboard/cn-theory/protocols'
  },
  {
    id: 'network-security',
    title: 'Network Security',
    description: 'Firewalls, VPN, encryption, and cyber threats',
    icon: Shield,
    color: 'red',
    topics: 6,
    href: '/dashboard/cn-theory/network-security'
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    icon: 'text-blue-500'
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-400',
    icon: 'text-green-500'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    icon: 'text-purple-500'
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    icon: 'text-orange-500'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
    icon: 'text-cyan-500'
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    icon: 'text-red-500'
  },
}

export default function CNTheoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
              <Wifi className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Computer Network Theory</h1>
              <p className="text-muted-foreground">Master networking concepts for interviews & GATE</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-300">38+ Topics</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Network className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-gray-300">Interview Ready</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Shield className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-300">GATE & Placement</span>
            </div>
          </div>
        </div>

        {/* Download Notes Button */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Complete CN Notes PDF</h2>
              <p className="text-gray-400 text-sm">Download comprehensive Computer Network notes covering all topics</p>
            </div>
            <a 
              href="/notes/CN Notes.pdf" 
              download
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              Download Complete Notes
            </a>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Network Fundamentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkTopics.map((topic) => {
              const colors = colorClasses[topic.color]
              const Icon = topic.icon
              
              return (
                <Link
                  key={topic.id}
                  href={topic.href}
                  className={`group p-5 rounded-xl ${colors.bg} border ${colors.border} hover:border-opacity-50 transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg bg-black/20 ${colors.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs font-medium ${colors.text}`}>
                          {topic.topics} topics
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Interview Prep Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">🎯 CN Interview Questions</h2>
              <p className="text-gray-400 text-sm">Practice questions from Cisco, Zscaler, Juniper, and top tech companies</p>
            </div>
            <Link 
              href="/dashboard/interview/cn"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <ArrowRight className="w-5 h-5" />
              View Interview Questions
            </Link>
          </div>
        </div>

        {/* Why Learn CN Section */}
        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Why Learn Computer Networks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-white">Essential for GATE CS</h3>
                <p className="text-sm text-gray-400">High weightage in GATE examination</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-white">Cloud & DevOps</h3>
                <p className="text-sm text-gray-400">Foundation for cloud computing careers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-white">Cybersecurity</h3>
                <p className="text-sm text-gray-400">Core knowledge for security roles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-white">System Design</h3>
                <p className="text-sm text-gray-400">Required for designing scalable systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
