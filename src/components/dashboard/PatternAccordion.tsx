'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, CheckCircle2, Circle, ArrowRight } from 'lucide-react'

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

interface PatternAccordionProps {
  problems: Problem[]
  solvedProblems: Set<string>
  attemptedProblems: Set<string>
  selectedCompanies: string[]
}

interface PatternGroup {
  category: string
  subPatterns: {
    name: string
    problems: Problem[]
    attempted: number
    solved: number
  }[]
  totalProblems: number
  totalAttempted: number
  totalSolved: number
}

function groupProblemsByPattern(
  problems: Problem[], 
  solvedProblems: Set<string>,
  attemptedProblems: Set<string>
): PatternGroup[] {
  const categoryMap = new Map<string, Map<string, Problem[]>>()

  problems.forEach(problem => {
    const category = problem.category
    const subPattern = problem.sub_pattern || 'General'

    if (!categoryMap.has(category)) {
      categoryMap.set(category, new Map())
    }
    const subMap = categoryMap.get(category)!
    if (!subMap.has(subPattern)) {
      subMap.set(subPattern, [])
    }
    subMap.get(subPattern)!.push(problem)
  })

  const result: PatternGroup[] = []

  categoryMap.forEach((subPatterns, category) => {
    const subPatternList: PatternGroup['subPatterns'] = []
    let totalProblems = 0
    let totalAttempted = 0
    let totalSolved = 0

    subPatterns.forEach((probs, subName) => {
      const solved = probs.filter(p => solvedProblems.has(p.slug)).length
      const attempted = probs.filter(p => attemptedProblems.has(p.slug) || solvedProblems.has(p.slug)).length
      
      subPatternList.push({
        name: subName,
        problems: probs,
        attempted,
        solved
      })
      
      totalProblems += probs.length
      totalAttempted += attempted
      totalSolved += solved
    })

    result.push({
      category,
      subPatterns: subPatternList.sort((a, b) => a.name.localeCompare(b.name)),
      totalProblems,
      totalAttempted,
      totalSolved
    })
  })

  return result.sort((a, b) => a.category.localeCompare(b.category))
}

export function PatternAccordion({ 
  problems, 
  solvedProblems, 
  attemptedProblems,
  selectedCompanies 
}: PatternAccordionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [expandedSubPatterns, setExpandedSubPatterns] = useState<Set<string>>(new Set())

  // Filter by selected companies
  const filteredProblems = selectedCompanies.length > 0
    ? problems.filter(p => p.companies?.some(c => selectedCompanies.includes(c)))
    : problems

  const patternGroups = groupProblemsByPattern(filteredProblems, solvedProblems, attemptedProblems)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const toggleSubPattern = (key: string) => {
    setExpandedSubPatterns(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-secondary/50 text-muted-foreground'
    }
  }

  return (
    <div className="space-y-3">
      {patternGroups.map((group, idx) => {
        const isExpanded = expandedCategories.has(group.category)
        const progressPercent = group.totalProblems > 0 
          ? Math.round((group.totalSolved / group.totalProblems) * 100) 
          : 0

        return (
          <div 
            key={group.category} 
            className="bg-secondary/5 border border-border/40 rounded-xl overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(group.category)}
              className="w-full flex items-center gap-4 p-4 hover:bg-secondary/10 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">
                {idx + 1}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">{group.category}</h3>
                <p className="text-xs text-muted-foreground">
                  {group.subPatterns.length} sub-patterns • {group.totalProblems} problems
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{group.totalSolved}</span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="text-muted-foreground">{group.totalProblems}</span>
                  </div>
                  <div className="w-24 h-1.5 bg-secondary/50 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {group.totalAttempted} attempted
                </div>

                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Sub-patterns */}
            {isExpanded && (
              <div className="border-t border-border/40">
                {group.subPatterns.map((subPattern, subIdx) => {
                  const subKey = `${group.category}-${subPattern.name}`
                  const isSubExpanded = expandedSubPatterns.has(subKey)

                  return (
                    <div key={subPattern.name} className="border-b border-border/20 last:border-b-0">
                      {/* Sub-pattern Header */}
                      <button
                        onClick={() => toggleSubPattern(subKey)}
                        className="w-full flex items-center gap-4 px-4 py-3 pl-8 hover:bg-secondary/10 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isSubExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-xs text-muted-foreground font-mono">
                            {idx + 1}/{subIdx + 1}
                          </span>
                        </div>

                        <div className="flex-1 text-left">
                          <h4 className="text-sm font-medium text-foreground/90">{subPattern.name}</h4>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{subPattern.problems.length} problems</span>
                          <span className={`${subPattern.attempted > 0 ? 'text-primary' : 'text-muted-foreground/50'}`}>
                            {subPattern.attempted} attempted
                          </span>
                        </div>
                      </button>

                      {/* Problems List */}
                      {isSubExpanded && (
                        <div className="bg-background/30 border-t border-border/20">
                          {subPattern.problems.map((problem) => {
                            const isSolved = solvedProblems.has(problem.slug)
                            const isAttempted = attemptedProblems.has(problem.slug)

                            return (
                              <div
                                key={problem.id}
                                className="flex items-center gap-4 px-4 py-3 pl-16 hover:bg-secondary/10 transition-colors group"
                              >
                                {isSolved ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                ) : isAttempted ? (
                                  <Circle className="w-4 h-4 text-yellow-500 shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-muted-foreground/30 shrink-0" />
                                )}

                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm truncate ${isSolved ? 'text-muted-foreground' : 'text-foreground'}`}>
                                    {problem.title}
                                  </p>
                                </div>

                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                                  {problem.difficulty}
                                </span>

                                <Link
                                  href={`/dashboard/problems/${problem.slug}`}
                                  className="opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:opacity-90 transition-all flex items-center gap-1"
                                >
                                  Solve
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {patternGroups.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No problems found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
