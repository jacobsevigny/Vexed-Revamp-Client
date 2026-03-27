"use client"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Users, UserPlus, Search, ChevronDown, ChevronUp, Check, X, BarChart3, Mail } from "lucide-react"
import Link from "next/link"

// Data loaded from API
type APIUser = { id: number; username: string; email?: string }
type PendingRequest = { id: number; requester: APIUser; status?: string }


export default function FriendsPage() {
  const [friendsOpen, setFriendsOpen] = useState(true)
  const [requestsOpen, setRequestsOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState<APIUser[] | null>(null)
  const [requests, setRequests] = useState<PendingRequest[] | null>(null)
  const [searchResults, setSearchResults] = useState<APIUser[] | null>(null)
  const [loading, setLoading] = useState(true)
  const searchDebounce = useRef<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/friends', { credentials: 'same-origin' })
        if (!mounted) return
        if (res.ok) {
          const json = await res.json()
          setFriends(json?.data?.friends || [])
          setRequests(json?.data?.pendingRequests || [])
        } else {
          setFriends([])
          setRequests([])
        }
      } catch (e) {
        setFriends([])
        setRequests([])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const filteredResults = (searchResults || []).filter(
    (user) => user.username?.toLowerCase().includes(searchQuery.toLowerCase()) || (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const refreshFriends = async () => {
    try {
      const res = await fetch('/api/friends', { credentials: 'same-origin' })
      if (!res.ok) return
      const json = await res.json()
      setFriends(json?.data?.friends || [])
      setRequests(json?.data?.pendingRequests || [])
    } catch (e) {
      // ignore
    }
  }

  const handleAcceptRequest = async (requestId: number) => {
    try {
      const res = await fetch(`/api/friends/request/${requestId}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      })
      if (res.ok) {
        toast({ title: 'Friend Request Accepted', description: `Friend added.` })
        await refreshFriends()
      } else {
        const err = await res.json().catch(() => ({}))
        toast({ title: 'Error', description: err?.error || 'Failed to accept request', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to accept request', variant: 'destructive' })
    }
  }

  const handleRejectRequest = async (requestId: number) => {
    try {
      const res = await fetch(`/api/friends/request/${requestId}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject' }),
      })
      if (res.ok) {
        toast({ title: 'Friend Request Rejected', description: `Request declined.`, variant: 'destructive' })
        await refreshFriends()
      } else {
        const err = await res.json().catch(() => ({}))
        toast({ title: 'Error', description: err?.error || 'Failed to reject request', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to reject request', variant: 'destructive' })
    }
  }

  const handleAddFriend = async (user: APIUser) => {
    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: user.id }),
      })
      if (res.ok) {
        toast({ title: 'Friend Request Sent', description: `Request sent to ${user.username}!` })
      } else {
        const err = await res.json().catch(()=>({ error: 'Failed' }))
        toast({ title: 'Error', description: err?.error || 'Failed to send request', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to send request', variant: 'destructive' })
    }
  }

  // Search effect (debounced)
  useEffect(() => {
    if (searchDebounce.current) window.clearTimeout(searchDebounce.current)
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults(null)
      return
    }
    searchDebounce.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/friends/search?username=${encodeURIComponent(searchQuery)}`, { credentials: 'same-origin' })
        if (res.ok) {
          const json = await res.json()
          setSearchResults(json?.users || [])
        } else {
          setSearchResults([])
        }
      } catch (e) {
        setSearchResults([])
      }
    }, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <Users className="w-10 h-10 text-[#4cc9f0]" />
            Friends
          </h1>
          <p className="text-white/70 text-lg">Connect with other players and compete together</p>
        </div>

        <div className="space-y-6">
          {/* My Friends Section */}
          <Collapsible open={friendsOpen} onOpenChange={setFriendsOpen}>
            <Card
              className="border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/5"
              style={{ backgroundColor: "#082644" }}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4cc9f0] to-[#2a569c] flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-white text-xl">My Friends</CardTitle>
                        <CardDescription className="text-white/60">{(friends || []).length} {(friends || []).length === 1 ? 'friend' : 'friends'}</CardDescription>
                      </div>
                    </div>
                    {friendsOpen ? (
                      <ChevronUp className="w-5 h-5 text-white/70" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {(friends || []).map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 border-2 border-[#4cc9f0]/30">
                            <AvatarFallback className="bg-gradient-to-br from-[#4cc9f0] to-[#2a569c] text-white font-semibold">
                              {friend.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-semibold">{friend.username}</p>
                            <p className="text-white/60 text-sm flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {friend.email}
                            </p>
                          </div>
                        </div>
                        <Link href="/stats">
                          <Button size="sm" className="bg-[#4cc9f0] hover:bg-[#4cc9f0]/90 text-white font-semibold">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            View Stats
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Friend Requests Section */}
          <Collapsible open={requestsOpen} onOpenChange={setRequestsOpen}>
            <Card
              className="border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/5"
              style={{ backgroundColor: "#082644" }}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-white text-xl">Friend Requests</CardTitle>
                        <CardDescription className="text-white/60">{(requests || []).length} pending {(requests || []).length === 1 ? 'request' : 'requests'}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {(requests || []).length > 0 && <Badge className="bg-pink-500 text-white border-0">{(requests || []).length}</Badge>}
                      {requestsOpen ? (
                        <ChevronUp className="w-5 h-5 text-white/70" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/70" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {(requests || []).length === 0 ? (
                    <div className="text-center py-8 text-white/60">No pending friend requests</div>
                  ) : (
                    <div className="space-y-3">
                      {(requests || []).map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 border-2 border-purple-500/30">
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                                {request.requester.username.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white font-semibold">{request.requester.username}</p>
                              <p className="text-white/60 text-sm flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {request.requester.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleAcceptRequest(request.id)} className="bg-green-500 hover:bg-green-600 text-white">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" onClick={() => handleRejectRequest(request.id)} variant="destructive">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Find Friends Section */}
          <Collapsible open={searchOpen} onOpenChange={setSearchOpen}>
            <Card
              className="border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/5"
              style={{ backgroundColor: "#082644" }}
            >
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-white text-xl">Find Friends</CardTitle>
                        <CardDescription className="text-white/60">Search for players to add</CardDescription>
                      </div>
                    </div>
                    {searchOpen ? (
                      <ChevronUp className="w-5 h-5 text-white/70" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      placeholder="Search by username or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#4cc9f0] focus:ring-[#4cc9f0]"
                    />
                  </div>
                  <div className="space-y-3">
                    {filteredResults.length === 0 ? (
                      <div className="text-center py-8 text-white/60">
                        {searchQuery ? "No users found" : "Start typing to search for friends"}
                      </div>
                    ) : (
                      filteredResults.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12 border-2 border-emerald-500/30">
                                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold">
                                      {user.username.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                            <div>
                              <p className="text-white font-semibold">{user.username}</p>
                              <p className="text-white/60 text-sm flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" onClick={() => handleAddFriend(user)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}
