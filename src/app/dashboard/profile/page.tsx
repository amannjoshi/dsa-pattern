import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { 
  User, 
  MapPin, 
  Mail, 
  Calendar, 
  Target, 
  Trophy, 
  Flame, 
  CheckCircle2,
  Clock,
  TrendingUp
} from 'lucide-react'
import { ProfileForm } from '@/components/dashboard/ProfileForm'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch user progress stats
  const { data: progressData } = await supabase
    .from('user_progress')
    .select('problem_slug, status, solved_at')
    .eq('user_id', user.id)

  const solvedCount = progressData?.filter(p => p.status === 'solved').length || 0
  const attemptedCount = progressData?.filter(p => p.status === 'attempted').length || 0

  // Calculate streak (simplified - counts consecutive days)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const solvedDates = progressData
    ?.filter(p => p.status === 'solved')
    .map(p => {
      const d = new Date(p.solved_at)
      d.setHours(0, 0, 0, 0)
      return d.getTime()
    })
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => b - a) || []

  let currentStreak = 0
  let checkDate = today.getTime()
  
  for (const date of solvedDates) {
    if (date === checkDate || date === checkDate - 86400000) {
      currentStreak++
      checkDate = date
    } else {
      break
    }
  }

  // Get difficulty breakdown
  const { data: problemsWithDifficulty } = await supabase
    .from('problems')
    .select('slug, difficulty')
  
  const difficultyMap = new Map(problemsWithDifficulty?.map(p => [p.slug, p.difficulty]) || [])
  
  const solvedByDifficulty = {
    Easy: 0,
    Medium: 0,
    Hard: 0
  }

  progressData?.filter(p => p.status === 'solved').forEach(p => {
    const diff = difficultyMap.get(p.problem_slug as string) as keyof typeof solvedByDifficulty
    if (diff && solvedByDifficulty[diff] !== undefined) {
      solvedByDifficulty[diff]++
    }
  })

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage your account and track your progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">
          {/* Avatar & Basic Info */}
          <div className="bg-secondary/5 border border-border/40 rounded-xl p-4 md:p-6 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 mb-4">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12" />
              )}
            </div>
            
            <h2 className="text-lg md:text-xl font-semibold">
              {profile?.full_name || profile?.username || 'Anonymous User'}
            </h2>
            <p className="text-sm text-muted-foreground">@{profile?.username || 'user'}</p>
            
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
              <MapPin className="w-4 h-4" />
              <span>{profile?.location || 'Not set'}</span>
            </div>

            <div className="flex items-center justify-center gap-1 text-xs md:text-sm text-muted-foreground mt-1">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate max-w-[200px]">{user.email}</span>
            </div>

            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {joinDate}</span>
            </div>

            {profile?.target_company && (
              <div className="flex items-center justify-center gap-1 text-sm text-primary mt-3">
                <Target className="w-4 h-4" />
                <span>Target: {profile.target_company}</span>
              </div>
            )}

            {profile?.bio && (
              <p className="text-sm text-muted-foreground mt-4 italic">
                &quot;{profile.bio}&quot;
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-secondary/5 border border-border/40 rounded-xl p-4 md:p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm md:text-base">
              <TrendingUp className="w-4 h-4 text-primary" />
              Quick Stats
            </h3>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Current Streak
                </div>
                <span className="font-bold text-orange-500">{currentStreak} days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Problems Solved
                </div>
                <span className="font-bold text-green-500">{solvedCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  Problems Attempted
                </div>
                <span className="font-bold text-yellow-500">{attemptedCount}</span>
              </div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="bg-secondary/5 border border-border/40 rounded-xl p-4 md:p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm md:text-base">
              <Trophy className="w-4 h-4 text-primary" />
              Difficulty Breakdown
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-400">Easy</span>
                  <span className="text-muted-foreground">{solvedByDifficulty.Easy}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, solvedByDifficulty.Easy * 5)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-yellow-400">Medium</span>
                  <span className="text-muted-foreground">{solvedByDifficulty.Medium}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, solvedByDifficulty.Medium * 5)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-400">Hard</span>
                  <span className="text-muted-foreground">{solvedByDifficulty.Hard}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, solvedByDifficulty.Hard * 5)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-secondary/5 border border-border/40 rounded-xl p-4 md:p-6">
            <h3 className="font-semibold mb-4 md:mb-6 text-sm md:text-base">Edit Profile</h3>
            <ProfileForm profile={profile} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
