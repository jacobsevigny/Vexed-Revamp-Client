"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { authFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  Users, UserPlus, Search, Check, X, Loader2, UserCheck, Clock,
} from "lucide-react"

type APIUser = { id: number; username: string }
type PendingRequest = { id: number; requester: APIUser }
type SearchResult = APIUser & { email?: string }

// ─── Avatar helper ────────────────────────────────────────────────────────────

function UserAvatar({ username, gradient }: { username: string; gradient: string }) {
  return (
    <Avatar className="h-11 w-11 shrink-0">
      <AvatarFallback className={`${gradient} text-white font-bold text-sm`}>
        {username.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}

// ─── Section card ─────────────────────────────────────────────────────────────

function Section({
  icon,
  iconGradient,
  title,
  badge,
  children,
}: {
  icon: React.ReactNode
  iconGradient: string
  title: string
  badge?: number
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 shadow-xl overflow-hidden" style={{ backgroundColor: "#082644" }}>
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
        <div className={`h-9 w-9 rounded-full ${iconGradient} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <h2 className="text-lg font-bold text-white flex-1">{title}</h2>
        {badge !== undefined && badge > 0 && (
          <Badge className="bg-pink-500/80 text-white border-0 text-xs">{badge}</Badge>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function Empty({ message }: { message: string }) {
  return (
    <p className="text-center text-white/40 py-6 text-sm">{message}</p>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FriendsPage() {
  const { isAuthenticated, isHydrated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [friends, setFriends] = useState<APIUser[]>([])
  const [requests, setRequests] = useState<PendingRequest[]>([])
  const [loadingPage, setLoadingPage] = useState(true)

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null)
  const [searching, setSearching] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Per-item action loading
  const [actioning, setActioning] = useState<Record<string, boolean>>({})

  // ── Redirect if not logged in ────────────────────────────────────────────────
  useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push("/login?redirect=/friends")
  }, [isAuthenticated, isHydrated, router])

  // ── Load friends + requests ──────────────────────────────────────────────────
  const loadFriends = useCallback(async () => {
    try {
      const res = await authFetch("/api/friends")
      if (!res.ok) return
      const json = await res.json()
      setFriends(json?.data?.friends || [])
      setRequests(json?.data?.pendingRequests || [])
    } catch {
      // ignore — keep stale data
    }
  }, [])

  useEffect(() => {
    if (!isHydrated || !isAuthenticated) return
    setLoadingPage(true)
    loadFriends().finally(() => setLoadingPage(false))
  }, [isHydrated, isAuthenticated, loadFriends])

  // ── Search ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults(null)
      return
    }
    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await authFetch(`/api/friends/search?username=${encodeURIComponent(searchQuery)}`)
        setSearchResults(res.ok ? (await res.json())?.users || [] : [])
      } catch {
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 300)
  }, [searchQuery])

  // ── Actions ──────────────────────────────────────────────────────────────────

  const withLoading = async (key: string, fn: () => Promise<void>) => {
    setActioning(prev => ({ ...prev, [key]: true }))
    try { await fn() } finally {
      setActioning(prev => ({ ...prev, [key]: false }))
    }
  }

  const handleSendRequest = async (user: SearchResult) => {
    await withLoading(`send-${user.id}`, async () => {
      const res = await authFetch("/api/friends/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: user.id }),
      })
      if (res.ok) {
        toast({ title: "Request sent!", description: `Friend request sent to ${user.username}.` })
        // Remove from results so they can't send twice
        setSearchResults(prev => prev?.filter(u => u.id !== user.id) ?? null)
      } else {
        const err = await res.json().catch(() => ({}))
        toast({ title: "Error", description: err?.error || "Failed to send request", variant: "destructive" })
      }
    })
  }

  const handleAccept = async (request: PendingRequest) => {
    await withLoading(`accept-${request.id}`, async () => {
      const res = await authFetch(`/api/friends/request/${request.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept" }),
      })
      if (res.ok) {
        toast({ title: "Friend added!", description: `You are now friends with ${request.requester.username}.` })
        await loadFriends()
      } else {
        const err = await res.json().catch(() => ({}))
        toast({ title: "Error", description: err?.error || "Failed to accept", variant: "destructive" })
      }
    })
  }

  const handleDecline = async (request: PendingRequest) => {
    await withLoading(`decline-${request.id}`, async () => {
      const res = await authFetch(`/api/friends/request/${request.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject" }),
      })
      if (res.ok) {
        toast({ title: "Request declined." })
        await loadFriends()
      } else {
        const err = await res.json().catch(() => ({}))
        toast({ title: "Error", description: err?.error || "Failed to decline", variant: "destructive" })
      }
    })
  }

  // ── Guard ────────────────────────────────────────────────────────────────────

  if (!isHydrated || (!isAuthenticated && isHydrated)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2eaafd" }}>
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen pt-24 pb-16 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Users className="h-10 w-10" />
            Friends
          </h1>
          <p className="text-white/70">Connect and compete with other players</p>
        </div>

        {loadingPage ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="space-y-5">

            {/* ── Find Friends ──────────────────────────────────────────── */}
            <Section
              icon={<Search className="h-4 w-4 text-white" />}
              iconGradient="bg-gradient-to-br from-emerald-500 to-teal-600"
              title="Find Friends"
            >
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by username…"
                  className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:border-white/50"
                />
                {searching && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 animate-spin" />
                )}
              </div>

              {searchQuery.length >= 2 && searchResults !== null && (
                <div className="space-y-2">
                  {searchResults.length === 0 ? (
                    <Empty message="No users found" />
                  ) : (
                    searchResults.map(user => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                      >
                        <UserAvatar username={user.username} gradient="bg-gradient-to-br from-emerald-500 to-teal-600" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">{user.username}</p>
                        </div>
                        <Button
                          size="sm"
                          disabled={actioning[`send-${user.id}`]}
                          onClick={() => handleSendRequest(user)}
                          className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          {actioning[`send-${user.id}`]
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : <><UserPlus className="h-4 w-4 mr-1.5" />Add</>
                          }
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {searchQuery.length > 0 && searchQuery.length < 2 && (
                <p className="text-white/40 text-sm text-center py-3">Type at least 2 characters to search</p>
              )}

              {!searchQuery && (
                <p className="text-white/40 text-sm text-center py-3">Start typing to find players</p>
              )}
            </Section>

            {/* ── Incoming Requests ─────────────────────────────────────── */}
            <Section
              icon={<Clock className="h-4 w-4 text-white" />}
              iconGradient="bg-gradient-to-br from-purple-500 to-pink-600"
              title="Friend Requests"
              badge={requests.length}
            >
              {requests.length === 0 ? (
                <Empty message="No pending requests" />
              ) : (
                <div className="space-y-2">
                  {requests.map(req => (
                    <div
                      key={req.id}
                      className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                    >
                      <UserAvatar username={req.requester.username} gradient="bg-gradient-to-br from-purple-500 to-pink-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{req.requester.username}</p>
                        <p className="text-white/40 text-xs">Wants to be friends</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="icon"
                          disabled={actioning[`accept-${req.id}`] || actioning[`decline-${req.id}`]}
                          onClick={() => handleAccept(req)}
                          className="h-8 w-8 bg-emerald-500 hover:bg-emerald-600 text-white"
                          title="Accept"
                        >
                          {actioning[`accept-${req.id}`]
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : <Check className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          disabled={actioning[`accept-${req.id}`] || actioning[`decline-${req.id}`]}
                          onClick={() => handleDecline(req)}
                          className="h-8 w-8 bg-red-500/80 hover:bg-red-500 text-white"
                          title="Decline"
                        >
                          {actioning[`decline-${req.id}`]
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : <X className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* ── My Friends ───────────────────────────────────────────── */}
            <Section
              icon={<UserCheck className="h-4 w-4 text-white" />}
              iconGradient="bg-gradient-to-br from-[#2eaafd] to-[#2a569c]"
              title={`My Friends${friends.length > 0 ? ` (${friends.length})` : ""}`}
            >
              {friends.length === 0 ? (
                <Empty message="You haven't added any friends yet" />
              ) : (
                <div className="space-y-2">
                  {friends.map(friend => (
                    <div
                      key={friend.id}
                      className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                    >
                      <UserAvatar username={friend.username} gradient="bg-gradient-to-br from-[#2eaafd] to-[#2a569c]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{friend.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>

          </div>
        )}
      </div>
    </div>
  )
}
