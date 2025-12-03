'use client'

import Link from 'next/link'
import { Database, FileText, Table2, Download, ArrowRight, BookOpen, Code2, Building2 } from 'lucide-react'

const topics = [
  {
    id: 1,
    title: 'DBMS Concepts',
    description: 'Database fundamentals, ACID properties, normalization, keys, ER diagrams, relational algebra',
    icon: Database,
    href: '/dashboard/dbms/concepts',
    color: 'blue',
    topics: ['ACID Properties', 'Normalization', 'Keys & Constraints', 'ER Diagrams', 'Transactions', 'Relational Algebra']
  },
  {
    id: 2,
    title: 'SQL',
    description: 'SQL queries, joins, subqueries, aggregations, and advanced SQL concepts',
    icon: Code2,
    href: '/dashboard/dbms/sql',
    color: 'green',
    topics: ['SELECT Queries', 'JOINs', 'Subqueries', 'GROUP BY', 'Window Functions', 'CTEs']
  },
  {
    id: 3,
    title: 'Interview Questions',
    description: 'Top DBMS & SQL questions asked at FAANG and product companies with detailed answers',
    icon: Building2,
    href: '/dashboard/dbms/interview',
    color: 'purple',
    topics: ['DBMS Theory', 'SQL Queries', 'Amazon', 'Google', 'Microsoft', 'Uber']
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  blue: { 
    bg: 'bg-blue-500/10', 
    border: 'border-blue-500/20', 
    text: 'text-blue-400',
    iconBg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
  },
  green: { 
    bg: 'bg-green-500/10', 
    border: 'border-green-500/20', 
    text: 'text-green-400',
    iconBg: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
  },
  purple: { 
    bg: 'bg-purple-500/10', 
    border: 'border-purple-500/20', 
    text: 'text-purple-400',
    iconBg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
  },
}

export default function DBMSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
              <Database className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">DBMS</h1>
              <p className="text-muted-foreground">Database Management System Theory & SQL</p>
            </div>
          </div>

          <p className="text-gray-400 max-w-2xl">
            Master database concepts, SQL queries, and prepare for technical interviews with comprehensive 
            DBMS theory covering everything from basics to advanced topics.
          </p>
        </div>

        {/* Download Notes Section */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">DBMS Complete Notes</h2>
                <p className="text-sm text-gray-400">Download comprehensive DBMS notes in PDF format</p>
              </div>
            </div>
            <a 
              href="/notes/DBMS.pdf" 
              download
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
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
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Why DBMS?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-black/20">
              <h3 className="font-semibold text-blue-400 mb-2">Interview Essential</h3>
              <p className="text-gray-400">DBMS is asked in 90% of software engineering interviews at top companies.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/20">
              <h3 className="font-semibold text-green-400 mb-2">Backend Development</h3>
              <p className="text-gray-400">Essential for any backend role - understanding how data is stored and retrieved.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/20">
              <h3 className="font-semibold text-purple-400 mb-2">System Design</h3>
              <p className="text-gray-400">Database design is crucial for system design interviews and real-world applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
