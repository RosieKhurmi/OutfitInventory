-- 1. profiles: one row per auth user
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  created_at timestamptz not null default now()
);

-- 2. categories: user-owned, one is flagged as the default "Unsorted" bucket
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

-- 3. clothes: always belongs to exactly one category (never null)
create table public.clothes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid not null references public.categories(id),
  name text not null,
  color text,
  pattern text,
  season text,
  occasion text,
  image_path text,
  created_at timestamptz not null default now()
);

-- 4. When a new auth user is created, create their profile + default "Unsorted" category
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');

  insert into public.categories (user_id, name, is_default)
  values
    (new.id, 'Tops', false),
    (new.id, 'Bottoms', false),
    (new.id, 'Shorts', false),
    (new.id, 'Shoes', false),
    (new.id, 'Sweaters', false),
    (new.id, 'Blazers/Vests', false),
    (new.id, 'Dresses', false),
    (new.id, 'Accessories', false),
    (new.id, 'Unsorted', true);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. When a category is deleted, move its clothes to "Unsorted" instead of
--    cascading/orphaning them. The default category itself can't be deleted.
create function public.handle_category_delete()
returns trigger as $$
declare
  unsorted_id uuid;
begin
  if old.is_default then
    raise exception 'Cannot delete the default Unsorted category';
  end if;

  select id into unsorted_id
  from public.categories
  where user_id = old.user_id and is_default = true;

  update public.clothes
  set category_id = unsorted_id
  where category_id = old.id;

  return old;
end;
$$ language plpgsql security definer;

create trigger before_category_delete
  before delete on public.categories
  for each row execute function public.handle_category_delete();

-- 6. Row Level Security: every table is locked to its owning user
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.clothes enable row level security;

create policy "select own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "select own categories" on public.categories
  for select using (auth.uid() = user_id);
create policy "insert own categories" on public.categories
  for insert with check (auth.uid() = user_id);
create policy "update own categories" on public.categories
  for update using (auth.uid() = user_id);
create policy "delete own categories" on public.categories
  for delete using (auth.uid() = user_id);

create policy "select own clothes" on public.clothes
  for select using (auth.uid() = user_id);
create policy "insert own clothes" on public.clothes
  for insert with check (auth.uid() = user_id);
create policy "update own clothes" on public.clothes
  for update using (auth.uid() = user_id);
create policy "delete own clothes" on public.clothes
  for delete using (auth.uid() = user_id);
