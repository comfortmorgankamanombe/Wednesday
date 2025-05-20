import { getContactSubmissions } from "../actions"
import { requireAuth, signOut } from "@/lib/supabase/auth"
import { SubmissionsTable } from "./submissions-table"

export default async function AdminDashboard() {
  // Check if user is authenticated
  const session = await requireAuth()

  // Fetch submissions
  const submissions = await getContactSubmissions()

  return (
    <div className="min-h-screen bg-gray-100 text-[#0a1a40]">
      <header className="bg-[#0a1a40] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>{session.user.email}</span>
            <form action={signOut}>
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>

          {submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No submissions yet.</p>
          ) : (
            <SubmissionsTable submissions={submissions} />
          )}
        </div>
      </main>
    </div>
  )
}
