import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CivicReport {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  location_lat?: number | null;
  location_lng?: number | null;
  address?: string | null;
  image_url?: string | null;
  audio_url?: string | null;
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
}

export const useCivicReports = (status?: string) => {
  return useQuery({
    queryKey: ['civic-reports', status],
    queryFn: async (): Promise<CivicReport[]> => {
      let query = supabase
        .from('civic_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    },
  });
};

export const useReportStats = () => {
  return useQuery({
    queryKey: ['report-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('civic_reports')
        .select('status');

      if (error) throw error;

      const stats = {
        total: data.length,
        pending: data.filter(r => r.status === 'pending').length,
        in_progress: data.filter(r => r.status === 'in_progress').length,
        resolved: data.filter(r => r.status === 'resolved').length,
      };

      return stats;
    },
  });
};