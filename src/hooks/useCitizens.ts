import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Citizen {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export const useCitizens = () => {
  return useQuery({
    queryKey: ['citizens'],
    queryFn: async (): Promise<Citizen[]> => {
      const { data, error } = await supabase
        .from('citizens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    },
  });
};