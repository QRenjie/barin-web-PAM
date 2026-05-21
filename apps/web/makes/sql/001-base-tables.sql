-- Initial schema (fresh install): request_logs + projects

-- ---------------------------------------------------------------------------
-- request_logs: API / auth / server event log (user-scoped RLS)
-- ---------------------------------------------------------------------------

create table public.request_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  event_category text not null,
  event_type text not null,
  success boolean not null default true,
  request_id uuid,
  payload jsonb
);

comment on table public.request_logs is 'Append-only log for HTTP API traffic, auth actions, and other server-side events; RLS limits reads to own user_id rows.';

comment on column public.request_logs.created_at is 'Row insert time (event recorded at).';
comment on column public.request_logs.updated_at is 'Last update time; append-only rows typically match created_at.';
comment on column public.request_logs.event_category is 'High-level group, e.g. api, auth, system.';
comment on column public.request_logs.event_type is 'Concrete event, e.g. http.request, login, logout.';
comment on column public.request_logs.request_id is 'Optional correlation id for an API/request lifecycle (e.g. AppApiResult.requestId); auth-only rows may be null.';
comment on column public.request_logs.payload is 'Event-specific context: HTTP fields, IP, errors, correlation_id, auth_provider, etc.';

create index idx_request_logs_user_id on public.request_logs (user_id);
create index idx_request_logs_created_at on public.request_logs (created_at desc);
create index idx_request_logs_category on public.request_logs (event_category);
create index idx_request_logs_event_type on public.request_logs (event_type);
create index idx_request_logs_request_id on public.request_logs (request_id);

alter table public.request_logs enable row level security;

create policy "request_logs_select_own" on public.request_logs
  for select
  using (user_id is not null and auth.uid() = user_id);

create policy "request_logs_insert_self_or_anon" on public.request_logs
  for insert
  with check (user_id is null or auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- projects: homepage project asset catalog (public read; authenticated writes)
-- ---------------------------------------------------------------------------

create table public.projects (
  id bigint generated always as identity primary key,
  name text not null,
  repo_url text,
  environments jsonb not null default '[]'::jsonb,
  author text not null default '',
  other_info text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.projects is 'Company project assets: repo, deployment environments, owner, tags; listed on the public home page.';
comment on column public.projects.environments is 'Deployment environments: [{ "name": "dev|local|prod|...", "url": "https://..." }]';

create index idx_projects_sort_order on public.projects (sort_order asc, id asc);

alter table public.projects enable row level security;

create policy "projects_select_public" on public.projects
  for select
  using (true);

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
