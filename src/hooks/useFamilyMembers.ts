
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type FamilyMember = Tables<'family_members'>;
type FamilyMemberInsert = TablesInsert<'family_members'>;
type FamilyMemberUpdate = TablesUpdate<'family_members'>;

export const useFamilyMembers = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: familyMembers = [], isLoading, error } = useQuery({
    queryKey: ['family-members', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const addMemberMutation = useMutation({
    mutationFn: async (memberData: Omit<FamilyMemberInsert, 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('family_members')
        .insert({
          ...memberData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family-members'] });
    }
  });

  const updateMemberMutation = useMutation({
    mutationFn: async ({ id, ...updates }: FamilyMemberUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('family_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family-members'] });
    }
  });

  return {
    familyMembers,
    isLoading,
    error,
    addMember: addMemberMutation.mutateAsync,
    updateMember: updateMemberMutation.mutateAsync,
    isAddingMember: addMemberMutation.isPending,
    isUpdatingMember: updateMemberMutation.isPending
  };
};
