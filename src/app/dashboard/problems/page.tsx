import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Search, Filter, ArrowRight, CheckCircle2 } from 'lucide-react'

export default async function ProblemsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  const { data: problems, error } = await supabase
    .from('problems')
    .select('*')
    .order('created_at', { ascending: true })

  // Fetch user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('problem_slug, status')
    .eq('user_id', user?.id)

  const solvedProblems = new Set(
    progress?.filter(p => p.status === 'solved').map(p => p.problem_slug)
  )

  if (error) {
    return <div className="p-8 text-red-400">Error loading problems: {error.message}</div>
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <p className="text-muted-foreground mt-1">Master the patterns, one problem at a time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search problems..." 
              className="bg-secondary/50 border border-border/40 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <button className="p-2 bg-secondary/50 border border-border/40 rounded-lg hover:bg-secondary/80 transition-colors">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {problems?.map((problem) => (
          <div 
            key={problem.id}
            className="group relative bg-secondary/5 hover:bg-secondary/10 border border-border/40 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {problem.title}
                  </h3>
                  {solvedProblems.has(problem.slug) && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {problem.category}
                  </span>
                  <span className="text-border">|</span>
                  <div className="flex gap-2">
                    {problem.companies?.slice(0, 3).map((company: string) => (
                      <span key={company} className="bg-white/5 px-2 py-0.5 rounded text-xs">
                        {company}
                      </span>
                    ))}
                    {problem.companies?.length > 3 && (
                      <span className="text-xs opacity-50">+{problem.companies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link 
                  href={`/dashboard/problems/${problem.slug}`}
                  className="px-6 py-2.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
                >
                  Solve
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
