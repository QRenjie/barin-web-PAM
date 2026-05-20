-- Project asset catalog (public read for homepage; writes require authenticated user)

create table public.projects (
  id bigint generated always as identity primary key,
  name text not null,
  repo_url text,
  test_url text,
  prod_url text,
  author text not null default '',
  other_info text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.projects is 'Company project assets: repo, test/prod URLs, owner, tags; listed on the public home page.';

create index idx_projects_sort_order on public.projects (sort_order asc, id asc);

alter table public.projects enable row level security;

-- Anonymous and signed-in users can read (home page is public)
create policy "projects_select_public" on public.projects
  for select
  using (true);

-- Authenticated users may manage rows (extend with role checks later if needed)
create policy "projects_insert_authenticated" on public.projects
  for insert
  to authenticated
  with check (true);

create policy "projects_update_authenticated" on public.projects
  for update
  to authenticated
  using (true);

create policy "projects_delete_authenticated" on public.projects
  for delete
  to authenticated
  using (true);
