declare module '@supabase/supabase-js' {
  export const createClient: any;
  export type SupabaseClient = any;
}

declare module '@insforge/sdk' {
  export const createClient: any;
}

declare module 'three' {
  const three: any;
  export = three;
}

declare namespace THREE {
  type Mesh = any;
  type Group = any;
  type Vector3 = any;
  type Scene = any;
  type Camera = any;
}
