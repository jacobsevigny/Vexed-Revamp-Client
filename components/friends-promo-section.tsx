"use client"
import React, { useEffect, useState } from "react"
import { authFetch } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { Users, UserPlus, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
type Friend = { id: number; username: string }

export function FriendsPromoSection() {
  const [friends, setFriends] = useState<Friend[] | null>(null)
  const [pending, setPending] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const { isAuthenticated } = useAuth();
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        if (!isAuthenticated) {
          setFriends(null)
          setLoading(false)
          return
        }
        const res = await authFetch('/api/friends', { headers: { 'Content-Type': 'application/json' } })
        if (!mounted) return
        if (!res.ok) {
          setFriends(null)
        } else {
          const json = await res.json()
          setFriends(json?.data?.friends || [])
          setPending((json?.data?.pendingRequests || []).length || 0)
        }
      } catch (e) {
        setFriends(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [isAuthenticated])

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-white">Your Friends</h3>
                  <Users className="h-6 w-6 text-white" />
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <p className="text-white/80">Loading...</p>
                  ) : friends && friends.length > 0 ? (
                    friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                            {friend.username.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white">{friend.username}</p>
                            <p className="text-sm text-white/70">Friend</p>
                          </div>
                        </div>
                        <Trophy className="w-5 h-5 text-white/70" />
                      </div>
                    ))
                  ) : (
                    <p className="text-white/80">You have no friends yet. Add some to start competing.</p>
                  )}
                </div>

                <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                  <p className="text-white/90 font-semibold">{pending > 0 ? `${pending} Friend Request(s) Pending` : `No Friend Requests`}</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-balance">Compete With Your Friends</h2>
              <p className="text-lg text-white/90 mb-8 text-pretty leading-relaxed">
                Connect with fellow sports fans, challenge your friends, and see who knows their sports trivia best.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Connect with Fans</h3>
                    <p className="text-white/80 text-pretty">Find and add friends who share your passion for sports</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Compare Scores</h3>
                    <p className="text-white/80 text-pretty">See how you stack up against your friends</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Grow Your Network</h3>
                    <p className="text-white/80 text-pretty">Expand your circle and discover new competitors</p>
                  </div>
                </div>
              </div>

              <Link href="/friends">
                <Button
                  size="lg"
                  className="bg-white text-[#2eaafd] hover:bg-white/90 font-bold text-lg px-8 py-6 hover:scale-105 transition-transform"
                >
                  Manage Friends
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
