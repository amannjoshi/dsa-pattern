import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, Flame, Target, BookOpen, TrendingUp, Clock, Zap } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user profile for personalized greeting
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  // Fetch user progress stats
  const { data: progressData, count: solvedCount } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact' })
    .eq('user_id', user?.id)
    .eq('status', 'solved')

  // Get total problems count
  const { count: totalProblems } = await supabase
    .from('problems')
    .select('*', { count: 'exact', head: true })

  // Get recommended problems (problems user hasn't solved, prioritize by pattern)
  const { data: recommendedProblems } = await supabase
    .from('problems')
    .select('slug, title, difficulty, category, companies')
    .not('slug', 'in', `(${progressData?.map(p => `"${p.problem_slug}"`).join(',') || '""'})`)
    .limit(5)

  const userName = profile?.full_name || profile?.username || user?.email?.split('@')[0] || 'Coder'
  const streak = profile?.current_streak || 0
  const solved = solvedCount || 0
  const total = totalProblems || 130

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {streak > 0 
              ? `You're on a ${streak}-day streak! Keep it up! 🔥` 
              : "Ready to start your coding journey today?"
            }
          </p>
        </div>
        <Link 
          href="/dashboard/problems"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors w-fit"
        >
          Start Practicing
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Target className="w-4 h-4" />
            <h3 className="text-xs md:text-sm font-medium">Solved</h3>
          </div>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-2xl md:text-3xl font-bold">{solved}</span>
            <span className="text-xs md:text-sm text-muted-foreground">/ {total}</span>
          </div>
        </div>
        
        <div className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <h3 className="text-xs md:text-sm font-medium">Streak</h3>
          </div>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-2xl md:text-3xl font-bold">{streak}</span>
            <span className="text-xs md:text-sm text-muted-foreground">days</span>
          </div>
        </div>

        <div className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <h3 className="text-xs md:text-sm font-medium">Progress</h3>
          </div>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-2xl md:text-3xl font-bold">{total > 0 ? Math.round((solved / total) * 100) : 0}%</span>
          </div>
        </div>

        <div className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h3 className="text-xs md:text-sm font-medium">Rank</h3>
          </div>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-2xl md:text-3xl font-bold">--</span>
          </div>
        </div>
      </div>

      {/* Today's Study Plan */}
      <div className="p-4 md:p-6 rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Today&apos;s Focus</h2>
            <p className="text-sm text-muted-foreground">Your personalized study plan</p>
          </div>
        </div>
        
        <div className="bg-background/50 rounded-lg p-4 border border-border/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary">Pattern: Two Pointers</span>
            <span className="text-xs text-muted-foreground">3 problems</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Master the two pointers technique to solve array and string problems efficiently.
          </p>
          <Link 
            href="/dashboard/problems?pattern=two-pointers"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recommended & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Recommended Problems */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold">Recommended for You</h2>
            <Link href="/dashboard/problems" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm overflow-hidden">
            {recommendedProblems && recommendedProblems.length > 0 ? (
              <div className="divide-y divide-border/40">
                {recommendedProblems.slice(0, 4).map((problem) => (
                  <Link 
                    key={problem.slug}
                    href={`/dashboard/problems/${problem.slug}`}
                    className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm font-medium truncate">{problem.title}</p>
                      <p className="text-xs text-muted-foreground">{problem.category}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                      problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 flex items-center justify-center h-48 text-muted-foreground text-sm">
                Loading recommendations...
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold">Recent Activity</h2>
            <Link href="/dashboard/progress" className="text-sm text-primary hover:underline">
              View progress
            </Link>
          </div>
          <div className="rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm overflow-hidden">
            {progressData && progressData.length > 0 ? (
              <div className="divide-y divide-border/40">
                {progressData.slice(0, 4).map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <Target className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.problem_slug.replace(/-/g, ' ')}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(activity.solved_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 flex items-center justify-center h-48 text-muted-foreground text-sm">
                No activity yet. Start solving problems!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Friendly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Link 
          href="/dashboard/problems"
          className="p-4 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/20 transition-colors text-center"
        >
          <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
          <span className="text-sm font-medium">All Problems</span>
        </Link>
        <Link 
          href="/dashboard/progress"
          className="p-4 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/20 transition-colors text-center"
        >
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
          <span className="text-sm font-medium">My Progress</span>
        </Link>
        <Link 
          href="/dashboard/profile"
          className="p-4 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/20 transition-colors text-center"
        >
          <Target className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
          <span className="text-sm font-medium">Profile</span>
        </Link>
        <Link 
          href="/explore"
          className="p-4 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/20 transition-colors text-center"
        >
          <Zap className="w-6 h-6 mx-auto mb-2 text-orange-500" />
          <span className="text-sm font-medium">Explore</span>
        </Link>
      </div>
    </div>
  )
}
