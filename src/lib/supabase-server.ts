import { createClient } from '@supabase/supabase-js';

function getRequiredEnv(name: string) {
  const value = (process.env[name] ?? '').trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function createSupabaseAdminClient() {
  const url = getRequiredEnv('SUPABASE_URL');
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createSupabaseAuthClient() {
  const url = getRequiredEnv('SUPABASE_URL');
  const anonKey = (process.env.SUPABASE_ANON_KEY ?? '').trim();
  const publishableKey = (process.env.SUPABASE_PUBLISHABLE_KEY ?? '').trim();

  // Prefer publishable key when anon key is mistakenly set to a secret key format.
  const authKey =
    anonKey.startsWith('sb_secret_') && publishableKey
      ? publishableKey
      : anonKey || publishableKey;

  if (!authKey) {
    throw new Error('Missing required env var: SUPABASE_ANON_KEY or SUPABASE_PUBLISHABLE_KEY');
  }

  return createClient(url, authKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
