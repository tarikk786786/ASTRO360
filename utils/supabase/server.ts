import { createServerClient, type CookieOptions } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rdtvnrhvruhrxherkxzn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_VJ1F5t--Kxocat0qhccS7A_c9zsiFaM";

export const createClient = (cookieStore: {
  getAll: () => Array<{ name: string; value: string }>;
  set?: (name: string, value: string, options?: CookieOptions) => void;
}) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            if (cookieStore.set) {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set!(name, value, options));
            }
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    },
  );
};
