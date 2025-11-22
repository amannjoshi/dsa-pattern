-- Create the problems table
create table if not exists problems (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  category text not null,
  description text not null,
  companies text[] default '{}',
  leetcode_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table problems enable row level security;

-- Create a policy that allows everyone to read problems
create policy "Public problems are viewable by everyone"
  on problems for select
  using ( true );

-- Create a policy that allows only authenticated users to insert/update (optional, for admin)
-- For now, we'll allow service_role (which our script uses) to bypass RLS automatically.

-- MIGRATION: Add leetcode_link column (Run this if you already created the table)
-- alter table problems add column leetcode_link text;
