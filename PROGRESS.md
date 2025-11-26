# Project Progress & Handover Guide

**Current Date:** November 26, 2025
**Project Name:** W Code (DSA Preparation Platform)
**Status:** Phase 4 In Progress (Profile System & Advanced UI) | Deployed on Vercel

## 🚀 Quick Start for New Developers

If you are picking up this project, simply tell Copilot:
> "Read PROGRESS.md and continue from where we left off."

## 🎨 Design Philosophy (Strict)
- **Aesthetic:** "Find Your Calm in the Complexity".
- **Colors:** Deep Charcoal (`#0a0a0a`), Muted Blue (`#3b82f6`), Soft White (`#ededed`).
- **Vibe:** Professional, Serene, Distraction-free. No cartoons.
- **Reference:** See `app/page.tsx` for the implementation of the Hero section.

## 🛠 Technical State

### Completed
- [x] **Project Setup**: Next.js 15, TypeScript, Tailwind CSS v4.
- [x] **Design System**: Configured in `globals.css` (CSS Variables) and `tailwind.config.ts`.
- [x] **Landing Page**: Implemented with `framer-motion` animations to match the "premium" feel.
- [x] **Branding**: Renamed to "W Code" throughout the app.
- [x] **Database**: Supabase (PostgreSQL) configured with `problems`, `user_progress`, and `profiles` tables.
- [x] **Auth**: Supabase Auth (Google OAuth) integrated with Middleware protection.
- [x] **Dashboard**: Authenticated user view with Sidebar navigation.
- [x] **Coding Workspace**: Monaco Editor integrated with problem description and LeetCode links.
- [x] **Progress Tracking**:
    - Database relation: `user_progress` table linking Users <-> Problems.
    - UI: "Mark as Solved" button toggles state.
    - Stats Page: `dashboard/progress` visualizes completion rates and difficulty breakdown.
- [x] **Pattern Accordion View**: Problems grouped by Pattern → Sub-pattern → Problems (like Thita.ai).
- [x] **Company Filter Sidebar**: Filter problems by company (Amazon, Google, etc.).
- [x] **User Profile System**: 
    - Profile page with stats, streak tracking, difficulty breakdown.
    - Editable profile form (username, full name, location, target company, bio).
- [x] **Content Population**:
    - **Bulk Import**: Parsed `content/problems.csv` (130+ problems).
    - **Data Enrichment**: Script `scripts/seed-enriched.ts` adds LeetCode URLs, Company Tags, and Descriptions.
- [x] **Deployment**: Deployed to Vercel at https://dsapattern.vercel.app/

### Database Tables (3 tables)
1. **problems** - All DSA problems with patterns, companies, difficulty
2. **user_progress** - Tracks which problems each user has solved/attempted
3. **profiles** - User profile data (name, bio, target company, streak, etc.)

### Pending Database Updates (Run in Supabase SQL Editor)
If you haven't run these yet, execute them in order:

```sql
-- Step 1: Add sub_pattern column
ALTER TABLE problems ADD COLUMN IF NOT EXISTS sub_pattern text;
UPDATE problems SET sub_pattern = category WHERE sub_pattern IS NULL;

-- Step 2: Create profiles table (run full SQL from supabase_schema.sql)
-- Step 3: Create auto-profile trigger (run full SQL from supabase_schema.sql)
-- Step 4: Create profiles for existing users
INSERT INTO profiles (id, email, username)
SELECT id, email, split_part(email, '@', 1)
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;
```

### Next Steps (Phase 4: Monetization & Polish)
- [ ] **Payments**: Integrate Stripe for a "Pro" tier (SaaS requirement).
- [ ] **Forgot Password**: Add password reset flow for email/password users.
- [ ] **SEO & Metadata**: Add OpenGraph tags and metadata for social sharing.
- [ ] **Code Execution**: (Deferred) Integrate Piston/Judge0 for running code directly in the browser.
- [ ] **Mobile Responsiveness**: Audit dashboard on mobile devices.

## 🔐 Database Security (SAFE ✅)

All tables have Row Level Security (RLS) enabled:

| Table | Security Status | Notes |
|-------|----------------|-------|
| `problems` | ✅ RLS Enabled | Only authenticated users can view (SaaS model) |
| `user_progress` | ✅ RLS Enabled | Users can only see/edit their OWN progress |
| `profiles` | ✅ RLS Enabled | Users can only see/edit their OWN profile |

**No security issues.** The schema is production-ready.

## 🗑️ Rollback Instructions (If Something Goes Wrong)

If the new `profiles` table or `sub_pattern` column causes issues, run these SQL commands in Supabase:

```sql
-- Remove profiles table completely
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Remove sub_pattern column from problems
ALTER TABLE problems DROP COLUMN IF EXISTS sub_pattern;
```

## 📝 Key Files Changed (Phase 4)

| File | Purpose |
|------|---------|
| `src/app/dashboard/profile/page.tsx` | User profile page with stats |
| `src/components/dashboard/ProfileForm.tsx` | Editable profile form |
| `src/components/dashboard/PatternAccordion.tsx` | Pattern → Sub-pattern → Problems view |
| `src/components/dashboard/CompanyFilter.tsx` | Company filter sidebar |
| `src/components/dashboard/ProblemsClient.tsx` | Main problems page with filters |
| `src/app/dashboard/layout.tsx` | Updated sidebar with Profile link |
| `supabase_schema.sql` | Complete database schema |

## 💻 Git Commands
```bash
git add .
git commit -m "feat: add profile system and pattern accordion view"
git push origin main
```

## 🌐 Live URLs
- **Production**: https://dsapattern.vercel.app/
- **Supabase Dashboard**: https://supabase.com/dashboard/project/hcalljooewzznmxcpdqg
