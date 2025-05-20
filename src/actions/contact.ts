"use server"

import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// Define the form schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

// Define the form state type
export type ContactFormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
}

// Initial form state
export const initialFormState: ContactFormState = {
  message: "",
  errors: {},
  success: false,
}

// Server action to handle form submission
export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Extract form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validate form data
  const validationResult = contactFormSchema.safeParse({ name, email, message })

  if (!validationResult.success) {
    // Return validation errors
    return {
      message: "Please fix the errors in the form",
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    // Initialize Supabase client
    const supabase = createServerSupabaseClient()

    // Insert data into Supabase
    const { error } = await supabase.from("contact_submissions").insert([{ name, email, message }])

    if (error) {
      console.error("Supabase error:", error)
      return {
        message: "Failed to submit your message. Please try again later.",
        errors: { _form: ["Database error occurred"] },
        success: false,
      }
    }

    // Return success state
    return {
      message: "Thank you for your message! We'll get back to you soon.",
      errors: {},
      success: true,
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      message: "An unexpected error occurred. Please try again later.",
      errors: { _form: ["Server error occurred"] },
      success: false,
    }
  }
}
