-- ==========================================
-- SUPABASE COMPLETE SCHEMA FOR PLAN PULSE
-- ==========================================

-- 1. PROFILES TABLE
-- Handles additional user metadata
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  email text,
  bio text,
  updated_at timestamp with time zone default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for Profiles
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Trigger to create a profile automatically when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email, bio)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    new.email,
    ''
  );
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger (drop first to avoid duplicates)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. GOALS & MILESTONES
create table if not exists public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  category text, -- Added category field
  deadline timestamp with time zone,
  status text default 'pending',
  progress integer default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.milestones (
  id uuid default gen_random_uuid() primary key,
  goal_id uuid references public.goals on delete cascade not null,
  title text not null,
  deadline timestamp with time zone,
  status text default 'pending',
  progress integer default 0
);

-- 3. HABITS & LOGS
create table if not exists public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  frequency text default 'daily',
  streak integer default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.habit_logs (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references public.habits on delete cascade not null,
  date date not null,
  completed boolean default false,
  unique(habit_id, date)
);

-- 4. JOURNALS
create table if not exists public.journals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  content text not null,
  mood text,
  created_at timestamp with time zone default now()
);

-- 5. RLS POLICIES FOR ALL TABLES
alter table public.goals enable row level security;
alter table public.milestones enable row level security;
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;
alter table public.journals enable row level security;

-- Goals Policies
drop policy if exists "Users can only access their own goals" on public.goals;
create policy "Users can only access their own goals" on public.goals for all using (auth.uid() = user_id);

-- Milestones Policies
drop policy if exists "Users can only access their own milestones" on public.milestones;
create policy "Users can only access their own milestones" on public.milestones for all using (
  exists (select 1 from public.goals where goals.id = milestones.goal_id and goals.user_id = auth.uid())
);

-- Habits Policies
drop policy if exists "Users can only access their own habits" on public.habits;
create policy "Users can only access their own habits" on public.habits for all using (auth.uid() = user_id);

-- Habit Logs Policies
drop policy if exists "Users can only access their own habit logs" on public.habit_logs;
create policy "Users can only access their own habit logs" on public.habit_logs for all using (
  exists (select 1 from public.habits where habits.id = habit_logs.habit_id and habits.user_id = auth.uid())
);

-- Journals Policies
drop policy if exists "Users can only access their own journals" on public.journals;
create policy "Users can only access their own journals" on public.journals for all using (auth.uid() = user_id);

-- 6. STORAGE BUCKET & POLICIES (Run in SQL Editor)
/*
-- Create the bucket
insert into storage.buckets (id, name, public) 
values ('profiles', 'profiles', true)
on conflict (id) do nothing;

-- Storage Policies
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'profiles' );

create policy "Anyone can upload their own avatar"
  on storage.objects for insert
  with check ( bucket_id = 'profiles' AND auth.role() = 'authenticated' );

create policy "Anyone can update their own avatar"
  on storage.objects for update
  using ( bucket_id = 'profiles' AND auth.uid() = (storage.foldername(name))[1]::uuid );

create policy "Anyone can delete their own avatar"
  on storage.objects for delete
  using ( bucket_id = 'profiles' AND auth.uid() = (storage.foldername(name))[1]::uuid );
*/
