// ASTRO360 OMNI / COSMOS Supabase Client & Data Persistence Layer
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-astro360.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface SupabaseProfile {
  id: string;
  name: string;
  email: string;
  dob: string;
  time: string;
  location: string;
  latitude?: number;
  longitude?: number;
  ayanamsha?: string;
  preferred_system?: string;
  notifications?: Record<string, unknown>;
  created_at?: string;
}

export interface SupabaseChatMessage {
  id?: string;
  user_id: string;
  role: 'user' | 'ai';
  content: string;
  suggested_followups?: string[];
  created_at?: string;
}

export interface SupabaseSavedChart {
  id?: string;
  user_id: string;
  title: string;
  chart_type: string;
  chart_data: Record<string, unknown>;
  created_at?: string;
}

export interface SupabaseDreamLog {
  id?: string;
  user_id: string;
  dream_text: string;
  symbols?: string[];
  interpretation?: string;
  created_at?: string;
}
