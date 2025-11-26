'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Sparkles, TrendingUp, X } from 'lucide-react'
import { CompanyFilter } from '@/components/dashboard/CompanyFilter'
import { PatternAccordion } from '@/components/dashboard/PatternAccordion'

interface Problem {
  id: string
  slug: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  sub_pattern: string
  companies: string[]
  leetcode_link: string | null
}

interface ProblemsClientProps {
  problems: Problem[]
  solvedProblems: Set<string>
  attemptedProblems: Set<string>
}

export function ProblemsClient({ problems, solvedProblems, attemptedProblems }: ProblemsClientProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')

  // Calculate company counts
  const companyCounts = useMemo(() => {
    const counts = new Map<string, number>()
    problems.forEach(problem => {
      problem.companies?.forEach(company => {
        counts.set(company, (counts.get(company) || 0) + 1)
      })
    })
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [problems])

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      // Search filter
      if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Difficulty filter
      if (difficultyFilter !== 'All' && problem.difficulty !== difficultyFilter) {
        return false
      }
      
      // Status filter
      if (statusFilter === 'Solved' && !solvedProblems.has(problem.slug)) {
        return false
      }
      if (statusFilter === 'Attempted' && !attemptedProblems.has(problem.slug)) {
        return false
      }
      if (statusFilter === 'Unsolved' && (solvedProblems.has(problem.slug) || attemptedProblems.has(problem.slug))) {
        return false
      }

      return true
    })
  }, [problems, searchQuery, difficultyFilter, statusFilter, solvedProblems, attemptedProblems])

  // Calculate stats
  const totalProblems = problems.length
  const totalSolved = solvedProblems.size
  const categories = new Set(problems.map(p => p.category)).size
  const progressPercent = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0

  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DSA Pattern Mastery</h1>
          <p className="text-muted-foreground mt-1">Systematic approach to Data Structures & Algorithms</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search problems, patterns..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/50 border border-border/40 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-secondary/50 border border-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-secondary/50 border border-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Status</option>
            <option value="Solved">Solved</option>
            <option value="Attempted">Attempted</option>
            <option value="Unsolved">Unsolved</option>
          </select>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 border rounded-lg transition-colors ${
              showFilters 
                ? 'bg-primary/10 border-primary/20 text-primary' 
                : 'bg-secondary/50 border-border/40 text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {selectedCompanies.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtering by:</span>
          {selectedCompanies.map(company => (
            <button
              key={company}
              onClick={() => handleCompanyToggle(company)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {company}
              <X className="w-3 h-3" />
            </button>
          ))}
          <button 
            onClick={() => setSelectedCompanies([])}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Company Filter Sidebar */}
        {showFilters && (
          <div className="hidden lg:block w-72 shrink-0">
            <CompanyFilter
              companies={companyCounts}
              selectedCompanies={selectedCompanies}
              onCompanyToggle={handleCompanyToggle}
              onClearAll={() => setSelectedCompanies([])}
            />
          </div>
        )}

        {/* Pattern Accordion */}
        <div className="flex-1 min-w-0">
          <PatternAccordion
            problems={filteredProblems}
            solvedProblems={solvedProblems}
            attemptedProblems={attemptedProblems}
            selectedCompanies={selectedCompanies}
          />
        </div>
      </div>
    </div>
  )
}
