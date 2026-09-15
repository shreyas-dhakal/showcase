/** Shared server-side helpers for the waitlist signup flow. */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null

  const email = input.trim().toLowerCase()
  if (email.length < 5 || email.length > 254) return null
  if (!EMAIL_PATTERN.test(email)) return null

  return email
}

/**
 * Appends the signup to Google Sheets through an Apps Script web app.
 * Returns false when no webhook is configured so the caller can decide
 * whether the signup still counts as captured.
 */
export async function appendToSheet(email: string): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!url) return false

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      submittedAt: new Date().toISOString(),
      secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
    }),
    // Apps Script redirects to a googleusercontent.com URL on success.
    redirect: "follow",
  })

  if (!response.ok) {
    throw new Error(`Sheets webhook responded ${response.status}`)
  }

  return true
}
