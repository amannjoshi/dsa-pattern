import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Code2, 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Settings, 
  CreditCard, 
  LogOut,
  MapPin,
  User,
  Boxes,
  MessageSquareText,
  Binary
} from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { MobileNav } from '@/components/dashboard/MobileNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Navigation */}
      <MobileNav userEmail={user.email || 'User'} />

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-background/50 backdrop-blur-xl fixed h-full hidden md:flex flex-col z-20">
        <div className="p-6 border-b border-border/40">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl tracking-tight">
            <Code2 className="w-6 h-6 text-primary" />
            <span>W Code</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground bg-secondary/50 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/problems" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <BookOpen className="w-5 h-5" />
            Problems
          </Link>
          <Link href="/dashboard/oops" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <Boxes className="w-5 h-5" />
            OOPS
          </Link>
          <Link href="/dashboard/interview" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <MessageSquareText className="w-5 h-5" />
            Interview Prep
          </Link>
          <Link href="/dashboard/dsa-theory" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <Binary className="w-5 h-5" />
            DSA Theory
          </Link>
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider">Account</p>
          </div>
          <Link href="/dashboard/progress" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <Trophy className="w-5 h-5" />
            My Progress
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <User className="w-5 h-5" />
            Profile
          </Link>
          <Link href="/dashboard/pricing" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <CreditCard className="w-5 h-5" />
            Pricing
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-border/40 bg-secondary/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.email}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>India</span>
              </div>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen pt-16 md:pt-0">
        {children}
      </main>
    </div>
  )
}
