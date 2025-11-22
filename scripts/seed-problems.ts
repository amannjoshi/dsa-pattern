import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Role for Admin access

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or SERVICE_ROLE Key in .env.local')
  process.exit(1)
}

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

async function seedProblems() {
  const problemsPath = path.join(process.cwd(), 'content', 'problems.json')
  const problemsData = fs.readFileSync(problemsPath, 'utf-8')
  const problems = JSON.parse(problemsData)

  console.log(`Found ${problems.length} problems to sync...`)

  for (const problem of problems) {
    const { error } = await supabase
      .from('problems')
      .upsert({
        slug: problem.id, // Mapping 'id' from JSON to 'slug' in DB
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.pattern, // Mapping 'pattern' to 'category'
        description: problem.description,
        companies: problem.companies,
        leetcode_link: problem.leetcodeUrl
      }, { onConflict: 'slug' })

    if (error) {
      console.error(`Error syncing ${problem.title}:`, error.message)
    } else {
      console.log(`Synced: ${problem.title}`)
    }
  }

  console.log('Sync complete!')
}

seedProblems()
