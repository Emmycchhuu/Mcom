import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * Landing page for MCOM Mall
 * Displays hero section with call-to-action buttons for signup and signin
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation header with logo and auth buttons */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo className="h-10" />
          <div className="flex items-center gap-3">
            <Link href="/signin">
              <Button variant="ghost" className="rounded-full">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main hero section with welcome message */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">Welcome to MCOM Mall</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Your one-stop destination for all your shopping needs. Discover amazing products at unbeatable prices.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="rounded-full">
                  Get Started
                </Button>
              </Link>
              <Link href="/signin">
                <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
