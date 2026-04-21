-- Supabase schema for replacing Appwrite-backed admin receipts system.
-- Run in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.receipts (
  id text primary key default gen_random_uuid()::text,
  receipt_number text not null unique,
  client_name text not null,
  client_email text not null,
  company_name text,
  issue_date date not null,
  due_date date,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(12,2) not null default 0,
  tax numeric(8,2) not null default 0,
  discount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  notes text not null default '',
  status text not null check (status in ('draft', 'sent', 'paid')),
  created_at timestamptz not null default now()
);

create index if not exists receipts_created_at_idx on public.receipts (created_at desc);

create table if not exists public.counters (
  name text primary key,
  count integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_logs (
  id text primary key default gen_random_uuid()::text,
  event text not null check (event in ('login', 'logout', 'visit')),
  email text not null default '',
  path text not null default '',
  ip text not null default '',
  user_agent text not null default '',
  device_type text not null default 'unknown',
  browser text not null default 'unknown',
  os text not null default 'unknown',
  city text not null default '',
  region text not null default '',
  country text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_logs_created_at_idx on public.admin_audit_logs (created_at desc);

create or replace function public.next_receipt_counter(counter_name text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  next_count integer;
begin
  insert into public.counters (name, count)
  values (counter_name, 1)
  on conflict (name)
  do update set
    count = public.counters.count + 1,
    updated_at = now()
  returning count into next_count;

  return next_count;
end;
$$;
