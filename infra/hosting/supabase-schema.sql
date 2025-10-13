-- Esquema base para Supabase

create table if not exists posts (
  id text primary key,
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  cover_image text,
  published_at timestamptz not null,
  tags jsonb default '[]'::jsonb,
  reading_time integer
);

create table if not exists projects (
  id text primary key,
  name text not null,
  description text not null,
  excerpt text not null,
  technologies jsonb default '[]'::jsonb,
  role text not null,
  year integer not null,
  image text not null,
  links jsonb default '{}'::jsonb
);

create table if not exists site_stats (
  id text primary key,
  total_visits integer not null default 0,
  newsletter_subscribers integer not null default 0,
  monthly jsonb not null default '[]'::jsonb
);

-- Índices auxiliares
create index if not exists posts_slug_idx on posts (slug);
create index if not exists projects_year_idx on projects (year desc);
