"use client"

import { useActionState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { submitContactForm, initialFormState } from "@/src/actions/contact"
import { useEffect } from "react"

export default function ContactSection() {
  // Use the new useActionState hook
  const [formState, formAction, isPending] = useActionState(submitContactForm, initialFormState)
  const { toast } = useToast()

  // Show toast notification when form is submitted successfully
  useEffect(() => {
    if (formState.success) {
      toast({
        title: "Success!",
        description: formState.message,
        variant: "default",
      })
    }
  }, [formState.success, formState.message, toast])

  return (
    <section className="contact">
      <h2>Get In Touch</h2>
      <p>Have questions? We'd love to hear from you.</p>

      <form action={formAction} className="space-y-4">
        {formState.errors?._form && (
          <div className="bg-[#0a1a40] p-3 rounded-md text-[#ffd800] text-sm">
            {formState.errors._form.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className={`w-full p-3 rounded-[30px] bg-white text-[#0a1a40] border-2 ${
              formState.errors?.name ? "border-red-500" : "border-transparent"
            }`}
          />
          {formState.errors?.name && (
            <p className="text-[#0a1a40] text-xs mt-1 font-semibold">{formState.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className={`w-full p-3 rounded-[30px] bg-white text-[#0a1a40] border-2 ${
              formState.errors?.email ? "border-red-500" : "border-transparent"
            }`}
          />
          {formState.errors?.email && (
            <p className="text-[#0a1a40] text-xs mt-1 font-semibold">{formState.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your message"
            className={`w-full p-3 rounded-[24px] bg-white text-[#0a1a40] border-2 ${
              formState.errors?.message ? "border-red-500" : "border-transparent"
            }`}
          />
          {formState.errors?.message && (
            <p className="text-[#0a1a40] text-xs mt-1 font-semibold">{formState.errors.message[0]}</p>
          )}
        </div>

        <button type="submit" disabled={isPending} className="btn-secondary w-full">
          {isPending ? "Sending..." : "Send Message"}
        </button>

        {formState.success && (
          <div className="bg-[#0a1a40] p-3 rounded-md text-[#ffd800] text-sm mt-4">{formState.message}</div>
        )}
      </form>
    </section>
  )
}
