'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { markProblemAsSolved } from '@/app/actions/progress'
import { useRouter } from 'next/navigation'

export function SubmitButton({ slug, isSolved }: { slug: string, isSolved: boolean }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await markProblemAsSolved(slug)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSolved) {
    return (
      <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow-lg shadow-green-500/20 cursor-default">
        <CheckCircle2 className="w-4 h-4" />
        Solved
      </button>
    )
  }

  return (
    <button 
      onClick={handleSubmit}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all text-sm font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
      Mark as Solved
    </button>
  )
}
