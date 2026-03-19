-- Goals table
create table public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  deadline timestamp with time zone,
  status text default 'pending',
  progress integer default 0,
  created_at timestamp with time zone default now()
);

-- Milestones table
create table public.milestones (
  id uuid default gen_random_uuid() primary key,
  goal_id uuid references public.goals on delete cascade not null,
  title text not null,
  deadline timestamp with time zone,
  status text default 'pending',
  progress integer default 0
);

-- Habits table
create table public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  frequency text default 'daily',
  streak integer default 0,
  created_at timestamp with time zone default now()
);

-- Habit Logs table
create table public.habit_logs (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references public.habits on delete cascade not null,
  date date not null,
  completed boolean default false,
  unique(habit_id, date)
);

-- Journal entries table
create table public.journals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  content text not null,
  mood text,
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table public.goals enable row level security;
alter table public.milestones enable row level security;
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;
alter table public.journals enable row level security;

create policy "Users can only access their own goals" on public.goals for all using (auth.uid() = user_id);
create policy "Users can only access their own milestones" on public.milestones for all using (
  exists (select 1 from public.goals where goals.id = milestones.goal_id and goals.user_id = auth.uid())
);
create policy "Users can only access their own habits" on public.habits for all using (auth.uid() = user_id);
create policy "Users can only access their own habit logs" on public.habit_logs for all using (
  exists (select 1 from public.habits where habits.id = habit_logs.habit_id and habits.user_id = auth.uid())
);
create policy "Users can only access their own journals" on public.journals for all using (auth.uid() = user_id);
