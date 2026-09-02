import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rdtvnrhvruhrxherkxzn.supabase.co";
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_VJ1F5t--Kxocat0qhccS7A_c9zsiFaM";

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);
export default supabase;
