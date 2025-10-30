"use client"

import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useSearch } from "@/hooks/use-search"
import { Search, Loader2, ShoppingBag, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import type { User } from "@/types/user"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const { data, isLoading, isError } = useSearch(debouncedQuery)

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (!token || !userData) {
      router.push("/signin")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch {
      router.push("/signin")
    }
  }, [router])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo className="h-10" />
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm">
              <span className="text-muted-foreground">Welcome, </span>
              <span className="font-medium">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Search Bar */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Find what you're looking for</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-full"
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {isLoading && debouncedQuery && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {isError && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">Failed to fetch search results. Please try again.</p>
              </div>
            )}

            {!isLoading && !isError && debouncedQuery && data && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {data.meta?.totalItems || 0} {(data.meta?.totalItems || 0) === 1 ? "result" : "results"} found
                  </p>
                </div>

                {!data.items || data.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-sm text-muted-foreground">Try searching with different keywords</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {data.items.map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          {item.fileUrls && item.fileUrls.length > 0 && (
                            <div className="aspect-video bg-muted relative">
                              <img
                                src={item.fileUrls[0] || "/placeholder.svg"}
                                alt={item.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div className="p-4 space-y-2">
                            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                            {item.shortDescription && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.shortDescription}</p>
                            )}
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                              {item.category && (
                                <span className="text-xs bg-secondary px-2 py-1 rounded-full">{item.category}</span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {!debouncedQuery && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Start searching</h3>
                <p className="text-sm text-muted-foreground">Enter a keyword to find products</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
