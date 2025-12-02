'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Code2, 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Settings, 
  CreditCard,
  User,
  Menu,
  X
} from 'lucide-react'
import { SignOutButton } from './SignOutButton'

interface MobileNavProps {
  userEmail: string
}

export function MobileNav({ userEmail }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/problems', label: 'Problems', icon: BookOpen },
    { href: '/dashboard/progress', label: 'My Progress', icon: Trophy },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ]

  const accountItems = [
    { href: '/dashboard/pricing', label: 'Pricing', icon: CreditCard },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-xl border-b border-border/40 z-50 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <Code2 className="w-5 h-5 text-primary" />
          <span>W Code</span>
        </Link>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`
        md:hidden fixed top-0 right-0 h-full w-72 bg-background border-l border-border/40 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <span className="font-semibold">Menu</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'text-foreground bg-secondary/50'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider">Account</p>
          </div>
          
          {accountItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'text-foreground bg-secondary/50'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/40 bg-secondary/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {userEmail}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>
    </>
  )
}
