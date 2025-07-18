-- Add 'hyre_hoj' to the activity_type enum
ALTER TABLE public.activity_logs
DROP CONSTRAINT activity_logs_activity_type_check;

ALTER TABLE public.activity_logs
ADD CONSTRAINT activity_logs_activity_type_check
CHECK (activity_type IN ('walking', 'running', 'cycling', 'other', 'hyre_hoj'));
