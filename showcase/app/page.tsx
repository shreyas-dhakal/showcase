import { Hero } from "@/components/hero"
import { ThemeToggle } from "@/components/theme-toggle"
import { Waitlist1 } from "@/components/waitlist1"

export default function Page() {
  return (
    <main className="bg-background">
      <ThemeToggle />
      <Hero />
      <Waitlist1 />
    </main>
  )
}
