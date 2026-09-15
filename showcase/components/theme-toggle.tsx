"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useIsDark } from "@/hooks/use-is-dark"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const isDark = useIsDark()

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
