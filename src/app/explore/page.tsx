'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, Search, ExternalLink, Lock, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Footer } from '@/components/Footer'

interface Problem {
  slug: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  sub_pattern: string | null
  companies: string[]
  leetcode_link: string | null
}

const difficultyColors = {
  Easy: 'text-green-400 bg-green-400/10 border-green-400/20',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/20'
}

export default function ExplorePage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchProblems() {
      const supabase = createClient()
      const { data, error } = await supabase
        .rpc('get_public_problems')
      
      if (!error && data) {
        setProblems(data)
      }
      setLoading(false)
    }
    fetchProblems()
  }, [])

  // Group problems by category
  const groupedProblems = problems.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = []
    }
    acc[problem.category].push(problem)
    return acc
  }, {} as Record<string, Problem[]>)

  // Filter problems based on search
  const filteredCategories = Object.entries(groupedProblems).filter(([category, probs]) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return category.toLowerCase().includes(query) || 
           probs.some(p => p.title.toLowerCase().includes(query))
  })

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight">
            <Code2 className="w-6 h-6 text-primary" />
            <span>W Code</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/explore" className="text-foreground">Explore</Link>
            <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Explore DSA Patterns
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse 130+ curated problems organized by patterns. Sign in to track progress and access full solutions.
            </p>
          </motion.div>

          {/* CTA Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 border border-primary/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Sign in to unlock full access</p>
                  <p className="text-sm text-muted-foreground">Track progress, solve problems, and access detailed solutions</p>
                </div>
              </div>
              <Link 
                href="/login" 
                className="px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2"
              >
                Sign In Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search patterns or problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/30 border border-border/40 rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto"
          >
            <div className="text-center p-4 rounded-lg bg-secondary/20 border border-border/40">
              <div className="text-2xl font-bold text-primary">{Object.keys(groupedProblems).length}</div>
              <div className="text-xs text-muted-foreground">Patterns</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20 border border-border/40">
              <div className="text-2xl font-bold text-green-400">{problems.length}</div>
              <div className="text-xs text-muted-foreground">Problems</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20 border border-border/40">
              <div className="text-2xl font-bold text-blue-400">Free</div>
              <div className="text-xs text-muted-foreground">To Start</div>
            </div>
          </motion.div>

          {/* Problems List */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground mt-4">Loading problems...</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {filteredCategories.map(([category, categoryProblems], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="border border-border/40 rounded-xl overflow-hidden bg-secondary/10"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedCategories.has(category) ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                      <h3 className="font-semibold text-lg">{category}</h3>
                      <span className="text-sm text-muted-foreground">({categoryProblems.length} problems)</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
                        {categoryProblems.filter(p => p.difficulty === 'Easy').length} Easy
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                        {categoryProblems.filter(p => p.difficulty === 'Medium').length} Med
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-400/10 text-red-400 border border-red-400/20">
                        {categoryProblems.filter(p => p.difficulty === 'Hard').length} Hard
                      </span>
                    </div>
                  </button>

                  {/* Problems in Category */}
                  {expandedCategories.has(category) && (
                    <div className="border-t border-border/40">
                      {categoryProblems.map((problem, pidx) => (
                        <div
                          key={problem.slug}
                          className={`px-6 py-3 flex items-center justify-between hover:bg-secondary/20 transition-colors ${
                            pidx !== categoryProblems.length - 1 ? 'border-b border-border/20' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground w-8">{pidx + 1}.</span>
                            <div>
                              <p className="font-medium">{problem.title}</p>
                              {problem.companies && problem.companies.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {problem.companies.slice(0, 3).map(company => (
                                    <span key={company} className="text-xs px-2 py-0.5 rounded bg-secondary/50 text-muted-foreground">
                                      {company}
                                    </span>
                                  ))}
                                  {problem.companies.length > 3 && (
                                    <span className="text-xs text-muted-foreground">+{problem.companies.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs rounded-full border ${difficultyColors[problem.difficulty]}`}>
                              {problem.difficulty}
                            </span>
                            {problem.leetcode_link && (
                              <a
                                href={problem.leetcode_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">Ready to start your DSA journey?</p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Sign In & Start Solving
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
