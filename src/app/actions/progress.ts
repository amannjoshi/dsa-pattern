'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markProblemAsSolved(slug: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      problem_slug: slug,
      status: 'solved',
      solved_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,problem_slug'
    })

  if (error) {
    console.error('Error marking problem as solved:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/problems')
  revalidatePath(`/dashboard/problems/${slug}`)
  return { success: true }
}
