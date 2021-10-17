import { User as SupabaseUser } from '@supabase/supabase-js';

import { User } from './types';

export const formatUser = (supabaseUser: SupabaseUser): User => {
  const user = {
    uid: supabaseUser.id,
    email: supabaseUser.email,
    name:
      supabaseUser.user_metadata?.name || supabaseUser.user_metadata?.full_name,
    provider: supabaseUser.app_metadata.provider,
    photoUrl: supabaseUser.user_metadata?.avatar_url,
  };

  return user;
};
