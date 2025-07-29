
-- Update RLS policies to allow all authenticated users to see all family members and activities
-- This will create a shared family challenge experience

-- Drop existing restrictive policies for family_members
DROP POLICY IF EXISTS "Users can view their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can update their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can delete their own family members" ON public.family_members;

-- Drop existing restrictive policies for activity_logs
DROP POLICY IF EXISTS "Users can view their own activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can update their own activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can delete their own activity logs" ON public.activity_logs;

-- Create new policies that allow all authenticated users to see all data
-- Family Members - Read access for all authenticated users
CREATE POLICY "Authenticated users can view all family members" 
  ON public.family_members 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Family Members - Only creators can update their own members
CREATE POLICY "Users can update their own family members" 
  ON public.family_members 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Family Members - Only creators can delete their own members
CREATE POLICY "Users can delete their own family members" 
  ON public.family_members 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Activity Logs - Read access for all authenticated users
CREATE POLICY "Authenticated users can view all activity logs" 
  ON public.activity_logs 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Activity Logs - Only creators can update their own logs
CREATE POLICY "Users can update their own activity logs" 
  ON public.activity_logs 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Activity Logs - Only creators can delete their own logs
CREATE POLICY "Users can delete their own activity logs" 
  ON public.activity_logs 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);
