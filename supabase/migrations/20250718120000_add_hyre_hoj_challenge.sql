-- Add "Hyre Hoj" challenge
INSERT INTO public.family_challenges (user_id, title, description, total_goal, start_date, end_date, is_active)
VALUES (
(SELECT id FROM auth.users ORDER BY id LIMIT 1),
  'Hyre Hoj',
  'Number of trips up the hill',
  100,
  '2025-07-18',
  '2025-08-18',
  true
);
