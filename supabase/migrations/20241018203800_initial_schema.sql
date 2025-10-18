-- Create assessments table
create table if not exists public.assessments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text,
  sport text not null,
  level text not null,
  training_hours text not null,
  goals text not null,
  frustrations text[] not null,
  confusion_frequency text not null,
  tracking_method text[] not null,
  compete text not null,
  mental_challenges text[] not null,
  mental_strategies text[] not null,
  advice_sources text[] not null,
  willingness_to_pay text not null,
  blueprint_sent boolean default false,
  feedback text
);

-- Enable RLS (Row Level Security)
alter table public.assessments enable row level security;

-- Create policies for assessments
create policy "Allow public read access" on public.assessments
  for select using (true);

create policy "Allow insert for anon users" on public.assessments
  for insert with check (true);

create policy "Allow update for authenticated users" on public.assessments
  for update using (auth.uid() is not null);
