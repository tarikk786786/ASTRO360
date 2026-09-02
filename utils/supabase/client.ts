import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || "https://rdtvnrhvruhrxherkxzn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || "sb_publishable_VJ1F5t--Kxocat0qhccS7A_c9zsiFaM";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
