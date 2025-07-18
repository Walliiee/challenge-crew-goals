-- Add hyre_hoj_trips column to family_members table
ALTER TABLE public.family_members
ADD COLUMN hyre_hoj_trips INTEGER NOT NULL DEFAULT 0;
