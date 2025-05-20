"use client"

import type React from "react"

import { useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase/client"

export default function AdminSetup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClientSupabaseClient()

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
        return
      }

      setMessage({
        type: "success",
        text: "Admin account created! Check your email to confirm your account.",
      })
      setEmail("")
      setPassword("")
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-[#0a1a40]">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Admin Account</h1>

        {message && (
          <div
            className={`p-3 rounded-md text-sm mb-4 ${
              message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-[30px] bg-white text-[#0a1a40] border-2 border-[#0a1a40]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-3 rounded-[30px] bg-white text-[#0a1a40] border-2 border-[#0a1a40]"
            />
          </div>

          <button type="submit" className="btn-secondary w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  )
}
