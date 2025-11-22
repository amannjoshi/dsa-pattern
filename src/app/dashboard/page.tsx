import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, ready to solve some problems?</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Problems Solved</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">0</span>
            <span className="text-sm text-muted-foreground">/ 150</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">0</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Global Rank</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">--</span>
            <span className="text-sm text-muted-foreground">Top 100%</span>
          </div>
        </div>
      </div>

      {/* Recent Activity / Recommended */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <div className="p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm flex items-center justify-center h-64 text-muted-foreground">
            Your personalized recommendations will appear here.
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="p-6 rounded-xl border border-border/40 bg-secondary/5 backdrop-blur-sm flex items-center justify-center h-64 text-muted-foreground">
            No activity yet. Start solving!
          </div>
        </div>
      </div>
    </div>
  )
}
