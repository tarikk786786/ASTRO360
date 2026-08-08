// ASTRO360 OMNI / COSMOS Supabase Client & Data Persistence Layer

const createMockSupabase = () => ({
  auth: {
    signUp: async ({ email, password, options }: any) => ({
      data: { user: { id: 'usr_' + Date.now(), email, user_metadata: options?.data || {} } },
      error: null,
    }),
    signInWithPassword: async ({ email }: any) => ({
      data: { user: { id: 'usr_' + Date.now(), email, user_metadata: { name: 'Tarik Islam' } } },
      error: null,
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
  },
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: (data: any) => ({ data, error: null }),
    update: (data: any) => ({ data, error: null }),
  }),
});

export const supabase = createMockSupabase();

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
