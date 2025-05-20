"use server"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "./server"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return redirect("/admin/dashboard")
}

export async function signOut() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
  return redirect("/admin")
}

export async function getSession() {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    return redirect("/admin")
  }

  return session
}
