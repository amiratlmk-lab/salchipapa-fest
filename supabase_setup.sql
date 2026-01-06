-- Create the table for participating locales
create table locales (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    image_url text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Create the table for votes
create table votes (
    id uuid default gen_random_uuid() primary key,
    locale_id uuid references locales(id) not null,
    voter_name text not null,
    voter_contact text not null,
    -- Stores either email or phone
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable Row Level Security (RLS)
alter table locales enable row level security;
alter table votes enable row level security;
-- Policies
-- Locales are readable by everyone
create policy "Locales are public" on locales for
select to anon using (true);
-- Votes can be inserted by anyone (anon), but we might want to restrict reading to admins only
create policy "Anyone can vote" on votes for
insert to anon with check (true);
-- Optional: Insert some dummy data for testing
insert into locales (name, image_url, description)
values (
        'Salchipapa La Bestia',
        'https://images.unsplash.com/photo-1594951664366-5e0441e88863?auto=format&fit=crop&q=80&w=600',
        'Con extra queso y tocineta crujiente.'
    ),
    (
        'El Rey del Sabor',
        'https://images.unsplash.com/photo-1623961990059-28356e22bc84?auto=format&fit=crop&q=80&w=600',
        'La clásica con salsa de la casa.'
    ),
    (
        'Mega Papas',
        'https://images.unsplash.com/photo-1541592106381-b31e9615242c?auto=format&fit=crop&q=80&w=600',
        'Papas rústicas con salchicha suiza.'
    );