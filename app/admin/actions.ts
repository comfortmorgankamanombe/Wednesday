"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/supabase/auth"

export type ContactSubmission = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
  status: string
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  // Check if user is authenticated
  await requireAuth()

  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching submissions:", error)
    return []
  }

  return data as ContactSubmission[]
}

export async function updateSubmissionStatus(id: string, status: string) {
  // Check if user is authenticated
  await requireAuth()

  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id)

  if (error) {
    console.error("Error updating submission:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
