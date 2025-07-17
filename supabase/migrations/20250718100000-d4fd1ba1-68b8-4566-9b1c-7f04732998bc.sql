-- Update family members policies to allow viewing all but only editing your own
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can update their own family members" ON public.family_members;
DROP POLICY IF EXISTS "Users can delete their own family members" ON public.family_members;

-- Recreate the update and delete policies with proper permissions
CREATE POLICY "Users can update their own family members"
  ON public.family_members
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own family members"
  ON public.family_members
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
