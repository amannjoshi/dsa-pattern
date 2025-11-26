'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, User, MapPin, FileText, Target } from 'lucide-react'

interface Profile {
  id: string
  username: string | null
  full_name: string | null
  bio: string | null
  location: string | null
  target_company: string | null
  avatar_url: string | null
}

interface ProfileFormProps {
  profile: Profile | null
  userId: string
}

const TARGET_COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Apple',
  'Microsoft',
  'Netflix',
  'Goldman Sachs',
  'Bloomberg',
  'Uber',
  'Airbnb',
  'LinkedIn',
  'Twitter',
  'Stripe',
  'Salesforce',
  'Adobe',
  'Oracle',
  'Nvidia',
  'Other'
]

export function ProfileForm({ profile, userId }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    target_company: profile?.target_company || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const supabase = createClient()

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...formData,
        updated_at: new Date().toISOString()
      })

    setIsLoading(false)

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <User className="w-4 h-4" />
          Username
        </label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your unique username"
          className="w-full bg-background/50 border border-border/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name
        </label>
        <input
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full bg-background/50 border border-border/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </label>
        <input
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Bangalore, India"
          className="w-full bg-background/50 border border-border/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Target Company */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Target className="w-4 h-4" />
          Target Company
        </label>
        <select
          name="target_company"
          value={formData.target_company}
          onChange={handleChange}
          className="w-full bg-background/50 border border-border/40 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        >
          <option value="">Select your target company</option>
          {TARGET_COMPANIES.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself and your goals..."
          rows={4}
          className="w-full bg-background/50 border border-border/40 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
        />
      </div>

      {/* Message */}
      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-foreground text-background font-medium py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Changes
          </>
        )}
      </button>
    </form>
  )
}
