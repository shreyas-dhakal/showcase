"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

/**
 * Resolves the active theme without tripping hydration. Assumes dark until the
 * client has mounted, which matches the default theme set in the root layout.
 */
export function useIsDark() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return !mounted || resolvedTheme !== "light"
}
