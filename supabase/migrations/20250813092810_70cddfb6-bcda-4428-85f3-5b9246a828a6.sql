-- Clean up duplicate Mike entry and all activity data to start fresh
DELETE FROM activity_logs;
DELETE FROM family_members WHERE id = '153b35d5-065f-4711-8c2e-6d8f75fac2d8';

-- Reset all family member stats to start fresh
UPDATE family_members SET 
  kilometers = 0,
  walking_km = 0,
  running_km = 0,
  streak = 0,
  last_activity = 'Never';