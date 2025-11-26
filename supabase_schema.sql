-- Create the problems table
create table if not exists problems (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  category text not null,
  sub_pattern text not null,
  description text not null,
  companies text[] default '{}',
  leetcode_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the user profiles table
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  username text unique,
  full_name text,
  avatar_url text,
  location text default 'India',
  bio text,
  target_company text,
  problems_solved integer default 0,
  current_streak integer default 0,
  max_streak integer default 0,
  last_solved_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table profiles enable row level security;

-- SECURITY: Users can only view and edit their own profile
create policy "Users can view their own profile"
  on profiles for select
  to authenticated
  using ( auth.uid() = id );

create policy "Users can insert their own profile"
  on profiles for insert
  to authenticated
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using ( auth.uid() = id );

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, username, full_name, avatar_url)
  values (
    new.id,
    new.email,
    split_part(new.email, '@', 1),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

-- Trigger to auto-create profile
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable Row Level Security (RLS)
alter table problems enable row level security;

-- SECURITY: Only authenticated users can view problems (SaaS Model)
drop policy if exists "Public problems are viewable by everyone" on problems;
create policy "Authenticated users can view problems"
  on problems for select
  to authenticated
  using ( true );

-- Create user_progress table
create table if not exists user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  problem_slug text references problems(slug) on delete cascade not null,
  status text check (status in ('solved', 'attempted')) not null,
  solved_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, problem_slug)
);

-- Enable RLS
alter table user_progress enable row level security;

-- SECURITY: Users can ONLY access their own progress data
create policy "Users can view their own progress"
  on user_progress for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Users can insert their own progress"
  on user_progress for insert
  to authenticated
  with check ( auth.uid() = user_id );

create policy "Users can update their own progress"
  on user_progress for update
  to authenticated
  using ( auth.uid() = user_id );

-- PUBLIC ACCESS: Allow anyone to see the list (Title + Link), but NOT the description
-- This function allows unauthenticated users to fetch the list without seeing the 'description' column.
create or replace function get_public_problems()
returns table (
  slug text,
  title text,
  difficulty text,
  category text,
  companies text[],
  leetcode_link text
)
language sql
security definer -- Bypasses RLS
as $$
  select slug, title, difficulty, category, companies, leetcode_link
  from problems;
$$;

-- Grant access to public (anon) and logged in users
grant execute on function get_public_problems() to anon, authenticated;

