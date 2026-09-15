"use client"

import React from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Waitlist1Props {
  className?: string
}

type Status = "idle" | "submitting" | "success" | "error"

const Waitlist1 = ({ className }: Waitlist1Props) => {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [message, setMessage] = React.useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting") return

    setStatus("submitting")
    setMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setMessage(data?.error ?? "something went wrong, please try again")
        return
      }

      setStatus("success")
      setMessage(
        data?.emailed
          ? "thank you for joining. check your inbox for a confirmation."
          : "thank you for joining. we will reach out when your spot is ready."
      )
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("could not reach the server, please try again")
    }
  }

  return (
    <section
      className={cn(
        "flex h-svh max-h-[1200px] min-h-[600px] items-center justify-center overflow-hidden py-32",
        className
      )}
    >
      <div className="container flex w-full flex-col items-center justify-center px-4 md:h-full">
        <h2 className="relative z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-10 lg:text-8xl">
          join the waitlist
        </h2>
        <p className="text-md mx-auto max-w-xl text-center text-muted-foreground lg:text-lg">
          early access is opening soon. leave your email and we will let you
          know when galvanise is ready for your codebase.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative z-20 mt-10 flex w-full max-w-md items-center gap-3 rounded-full p-1"
        >
          <Input
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "submitting"}
            aria-label="email address"
            aria-invalid={status === "error" || undefined}
            className="h-10 w-full rounded-xl border-none bg-muted shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none active:ring-0 active:outline-0"
            placeholder="enter your email"
          />
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="h-10 shrink-0 rounded-xl"
          >
            {status === "submitting" ? "joining..." : "join the waitlist"}
          </Button>
        </form>

        {/* Reserve the row so the form does not jump when the message lands. */}
        <p
          aria-live="polite"
          className={cn(
            "mt-4 h-5 text-center text-sm tracking-tight transition-opacity",
            status === "error" ? "text-destructive" : "text-muted-foreground",
            message ? "opacity-100" : "opacity-0"
          )}
        >
          {message}
        </p>
      </div>
    </section>
  )
}

export { Waitlist1 }
