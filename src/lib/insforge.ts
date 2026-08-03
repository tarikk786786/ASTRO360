import { createClient } from '@insforge/sdk';

const baseUrl = import.meta.env.VITE_INSFORGE_URL || import.meta.env.NEXT_PUBLIC_INSFORGE_URL || 'https://fxqrd37n.us-east.insforge.app';
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || import.meta.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'anon_60e029f60f0b26621fa338d7485e18e87191a998c2546c7496fa3a217e19ce69';

export const insforge = createClient({
  baseUrl,
  anonKey,
});
