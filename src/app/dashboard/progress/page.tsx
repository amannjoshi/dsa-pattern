import { createClient } from "@/lib/supabase/server";
import { Trophy, Target, Zap, Calendar } from "lucide-react";

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all problems to calculate totals
  const { data: problems } = await supabase
    .from("problems")
    .select("difficulty");

  // Fetch user's solved problems
  const { data: progress } = await supabase
    .from("user_progress")
    .select("problem_slug, status, solved_at")
    .eq("user_id", user?.id)
    .eq("status", "solved");

  // Calculate Stats
  const totalProblems = problems?.length || 0;
  const totalSolved = progress?.length || 0;
  
  const easyTotal = problems?.filter(p => p.difficulty === 'Easy').length || 0;
  const mediumTotal = problems?.filter(p => p.difficulty === 'Medium').length || 0;
  const hardTotal = problems?.filter(p => p.difficulty === 'Hard').length || 0;

  // We need to join progress with problems to get difficulty of solved ones
  // Since we only have slug in progress, we'd typically do a join query.
  // For now, let's fetch the details of solved problems to count difficulties.
  const { data: solvedDetails } = await supabase
    .from("problems")
    .select("difficulty")
    .in("slug", progress?.map(p => p.problem_slug) || []);

  const easySolved = solvedDetails?.filter(p => p.difficulty === 'Easy').length || 0;
  const mediumSolved = solvedDetails?.filter(p => p.difficulty === 'Medium').length || 0;
  const hardSolved = solvedDetails?.filter(p => p.difficulty === 'Hard').length || 0;

  const completionRate = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Progress</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">Track your journey to mastery.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="p-4 md:p-6 rounded-xl bg-secondary/5 border border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm font-medium">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Total Solved</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold">{totalSolved} <span className="text-muted-foreground text-base md:text-lg font-normal">/ {totalProblems}</span></div>
        </div>
        
        <div className="p-4 md:p-6 rounded-xl bg-secondary/5 border border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm font-medium">
            <Target className="w-4 h-4 text-blue-500" />
            <span>Completion</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold">{completionRate}%</div>
        </div>

        <div className="p-4 md:p-6 rounded-xl bg-secondary/5 border border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm font-medium">
            <Zap className="w-4 h-4 text-purple-500" />
            <span>Streak</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold">1 <span className="text-muted-foreground text-base md:text-lg font-normal">Day</span></div>
        </div>

        <div className="p-4 md:p-6 rounded-xl bg-secondary/5 border border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm font-medium">
            <Calendar className="w-4 h-4 text-green-500" />
            <span>Last Solved</span>
          </div>
          <div className="text-sm md:text-lg font-medium truncate">
            {progress && progress.length > 0 
              ? new Date(progress[progress.length - 1].solved_at).toLocaleDateString() 
              : "No problems yet"}
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {/* Easy Card */}
        <div className="p-4 md:p-6 rounded-xl bg-green-500/5 border border-green-500/10 space-y-3 md:space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-green-400">Easy</h3>
            <span className="text-xs font-medium bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
              {easySolved} / {easyTotal}
            </span>
          </div>
          <div className="h-2 w-full bg-green-500/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Medium Card */}
        <div className="p-4 md:p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/10 space-y-3 md:space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-yellow-400">Medium</h3>
            <span className="text-xs font-medium bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full">
              {mediumSolved} / {mediumTotal}
            </span>
          </div>
          <div className="h-2 w-full bg-yellow-500/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${mediumTotal > 0 ? (mediumSolved / mediumTotal) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Hard Card */}
        <div className="p-4 md:p-6 rounded-xl bg-red-500/5 border border-red-500/10 space-y-3 md:space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-red-400">Hard</h3>
            <span className="text-xs font-medium bg-red-500/10 text-red-400 px-2 py-1 rounded-full">
              {hardSolved} / {hardTotal}
            </span>
          </div>
          <div className="h-2 w-full bg-red-500/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
