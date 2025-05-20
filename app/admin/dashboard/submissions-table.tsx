"use client"

import { useState } from "react"
import { type ContactSubmission, updateSubmissionStatus } from "../actions"

export function SubmissionsTable({ submissions: initialSubmissions }: { submissions: ContactSubmission[] }) {
  const [submissions, setSubmissions] = useState(initialSubmissions)

  async function handleStatusChange(id: string, status: string) {
    const result = await updateSubmissionStatus(id, status)

    if (result.success) {
      setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status } : sub)))
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(submission.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                  {submission.email}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{submission.message}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <select
                  value={submission.status}
                  onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
