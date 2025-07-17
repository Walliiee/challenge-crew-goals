
-- Update RLS policies to allow viewing all data but only editing your own
-- Drop the overly permissive policies that were just created
DROP POLICY IF EXISTS "Authenticated users can view all family members" ON public.family_members;
DROP POLICY IF EXISTS "Authenticated users can view all activity logs" ON public.activity_logs;

-- Create new policies with proper permissions
-- Family Members - All authenticated users can view, but only creators can modify
CREATE POLICY "Authenticated users can view all family members" 
  ON public.family_members 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own family members" 
  ON public.family_members 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Activity Logs - All authenticated users can view, but only creators can modify  
CREATE POLICY "Authenticated users can view all activity logs" 
  ON public.activity_logs 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own activity logs" 
  ON public.activity_logs 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
