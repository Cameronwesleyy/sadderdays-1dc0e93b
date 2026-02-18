ALTER TABLE public.songs
  ADD COLUMN spotify_url text DEFAULT '',
  ADD COLUMN apple_url text DEFAULT '';