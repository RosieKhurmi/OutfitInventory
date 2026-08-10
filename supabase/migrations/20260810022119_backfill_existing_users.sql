-- Backfill: give every existing auth user a profile and default categories,
-- since handle_new_user() only fires for signups that happen after it existed.

-- 1. Create a profile for any auth user that doesn't have one yet.
insert into public.profiles (id, name)
select u.id, u.raw_user_meta_data ->> 'name'
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
);

-- 2. Create the 9 default categories for any user missing them (idempotent:
--    the unique(user_id, name) constraint plus this NOT EXISTS check make it
--    safe to run more than once without creating duplicates).
insert into public.categories (user_id, name, is_default)
select p.id, c.name, c.is_default
from public.profiles p
cross join (
  values
    ('Tops', false),
    ('Bottoms', false),
    ('Shorts', false),
    ('Shoes', false),
    ('Sweaters', false),
    ('Blazers/Vests', false),
    ('Dresses', false),
    ('Accessories', false),
    ('Unsorted', true)
) as c(name, is_default)
where not exists (
  select 1 from public.categories cat
  where cat.user_id = p.id and cat.name = c.name
);
