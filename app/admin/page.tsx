"use client"

import { useState } from "react"
import { signIn } from "@/lib/supabase/auth"

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await signIn(formData)

    if (result && "error" in result) {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-[#0a1a40]">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {error && <div className="bg-red-50 p-3 rounded-md text-red-500 text-sm mb-4">{error}</div>}

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
              name="password"
              type="password"
              required
              className="w-full p-3 rounded-[30px] bg-white text-[#0a1a40] border-2 border-[#0a1a40]"
            />
          </div>

          <button type="submit" className="btn-secondary w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
