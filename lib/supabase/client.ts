import { createClient } from "@supabase/supabase-js"

// Create a singleton Supabase client for the browser
let clientInstance: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientInstance) return clientInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  clientInstance = createClient(supabaseUrl, supabaseKey)
  return clientInstance
}
