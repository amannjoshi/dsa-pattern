import { createClient } from '@/lib/supabase/server'
import { ProblemsClient } from '@/components/dashboard/ProblemsClient'

export default async function ProblemsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  const { data: problems, error } = await supabase
    .from('problems')
    .select('*')
    .order('category', { ascending: true })

  // Fetch user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('problem_slug, status')
    .eq('user_id', user?.id)

  const solvedProblems = new Set(
    progress?.filter(p => p.status === 'solved').map(p => p.problem_slug) || []
  )
  
  const attemptedProblems = new Set(
    progress?.filter(p => p.status === 'attempted').map(p => p.problem_slug) || []
  )

  if (error) {
    return <div className="p-8 text-red-400">Error loading problems: {error.message}</div>
  }

  // Transform problems to include sub_pattern (derive from category if not present)
  const transformedProblems = (problems || []).map(problem => ({
    ...problem,
    sub_pattern: problem.sub_pattern || problem.category,
    companies: problem.companies || []
  }))

  return (
    <ProblemsClient 
      problems={transformedProblems}
      solvedProblems={solvedProblems}
      attemptedProblems={attemptedProblems}
    />
  )
}
