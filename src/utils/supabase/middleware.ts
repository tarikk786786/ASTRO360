import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rdtvnrhvruhrxherkxzn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_VJ1F5t--Kxocat0qhccS7A_c9zsiFaM";

export const createClient = (request: any) => {
  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies?.getAll ? request.cookies.getAll() : [];
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              if (request.cookies?.set) {
                request.cookies.set(name, value, options);
              }
            });
          } catch {
            // Ignored in non-mutating context
          }
        },
      },
    },
  );

  return supabase;
};
