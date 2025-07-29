
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type ActivityLog = Tables<'activity_logs'>;
type ActivityLogInsert = TablesInsert<'activity_logs'>;

export const useActivityLogs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: activityLogs = [], isLoading, error } = useQuery({
    queryKey: ['activity-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*, family_members(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const addActivityMutation = useMutation({
    mutationFn: async (activityData: Omit<ActivityLogInsert, 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('activity_logs')
        .insert({
          ...activityData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-logs'] });
      queryClient.invalidateQueries({ queryKey: ['family-members'] });
    }
  });

  const updateActivityMutation = useMutation({
    mutationFn: async ({ id, ...updates }: TablesUpdate<'activity_logs'> & { id: string }) => {
      const { data, error } = await supabase
        .from('activity_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-logs'] });
      queryClient.invalidateQueries({ queryKey: ['family-members'] });
    }
  });

  return {
    activityLogs,
    isLoading,
    error,
    addActivity: addActivityMutation.mutateAsync,
    updateActivity: updateActivityMutation.mutateAsync,
    isAddingActivity: addActivityMutation.isPending,
    isUpdatingActivity: updateActivityMutation.isPending
  };
};
