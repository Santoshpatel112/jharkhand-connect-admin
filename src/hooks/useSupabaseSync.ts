import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseSync = () => {
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      try {
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('citizens')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!existingUser) {
          // Create new user profile
          const { error } = await supabase
            .from('citizens')
            .insert({
              user_id: user.id,
              full_name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
              email: user.emailAddresses[0]?.emailAddress || '',
              phone: user.phoneNumbers[0]?.phoneNumber || null,
            });

          if (error) {
            console.error('Error syncing user:', error);
          }
        }
      } catch (error) {
        console.error('Error syncing user to Supabase:', error);
      }
    };

    syncUser();
  }, [user]);
};