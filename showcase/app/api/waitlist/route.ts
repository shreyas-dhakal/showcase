import { Resend } from "resend"

import { appendToSheet, normalizeEmail } from "@/lib/waitlist"

export const runtime = "nodejs"

function confirmationHtml() {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #111;">
      <p>thanks for joining the galvanise waitlist.</p>
      <p>galvanise sits in your codebase and keeps your tech stack up to date. we are opening early access in batches, and we will reach out to you when your spot is ready.</p>
      <p>if you have a legacy site you want migrated, just reply to this email and tell us about it.</p>
      <p>— the galvanise team</p>
    </div>
  `
}

async function sendConfirmation(email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.WAITLIST_FROM_EMAIL
  if (!apiKey || !from) return false

  const resend = new Resend(apiKey)
  const replyTo = process.env.WAITLIST_REPLY_TO

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "thanks for joining the galvanise waitlist",
    html: confirmationHtml(),
    ...(replyTo ? { replyTo } : {}),
  })

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: "invalid request" }, { status: 400 })
  }

  const email = normalizeEmail((payload as { email?: unknown })?.email)
  if (!email) {
    return Response.json({ error: "enter a valid email address" }, { status: 400 })
  }

  // Storing the signup is what actually matters, so it runs first and its
  // failure is the only thing that can fail the request.
  let stored = false
  try {
    stored = await appendToSheet(email)
  } catch (error) {
    console.error("waitlist: failed to append to sheet", error)
    return Response.json(
      { error: "could not save your email, please try again" },
      { status: 502 }
    )
  }

  // A confirmation that fails to send should not cost someone their spot.
  let emailed = false
  try {
    emailed = await sendConfirmation(email)
  } catch (error) {
    console.error("waitlist: failed to send confirmation", error)
  }

  if (!stored && !emailed) {
    console.error("waitlist: no storage or email provider configured")
    return Response.json(
      { error: "waitlist is not accepting signups yet" },
      { status: 503 }
    )
  }

  return Response.json({ ok: true, emailed })
}
