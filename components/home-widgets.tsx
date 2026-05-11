"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, Users, Check, X, UserPlus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { authFetch } from "@/lib/api"

// ─── Types ────────────────────────────────────────────────────────────────────

type CareerData = {
  dailyQuest?:  { totalCorrect: number; totalQuestions: number; accuracy: string | number }
  fanFeud?:     { totalCorrect: number; totalAnswers: number; accuracy: string | number }
  careerPath?:  { correctGuesses: number; daysPlayed: number; accuracy: string | number }
}

type TodayScore = {
  dailyQuestScore: number | null
  dailyQuestCompleted: boolean
  fanFeudScore: number | null
  fanFeudTotalAnswers: number | null
  fanFeudCompleted: boolean
  careerPathCorrect: boolean | null
  careerPathCompleted: boolean
} | null

type FriendEntry = { id: number; username: string; today: TodayScore }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pctNum(v: string | number | undefined): number {
  const n = parseFloat(String(v ?? 0))
  return isNaN(n) ? 0 : Math.min(100, Math.max(0, n))
}

function pctStr(v: string | number | undefined): string {
  return `${Math.round(pctNum(v))}%`
}

// ─── Primitive UI pieces ──────────────────────────────────────────────────────

function Card({
  title, icon, borderColor, children,
}: {
  title: string; icon: React.ReactNode; borderColor: string; children: React.ReactNode
}) {
  return (
    <div
      className={`rounded-2xl border-2 ${borderColor} shadow-xl p-5 flex flex-col`}
      style={{ backgroundColor: "#082644" }}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function CtaBox({
  text, href, label, icon,
}: {
  text: string; href: string; label: string; icon?: React.ReactNode
}) {
  return (
    <div className="mt-auto rounded-xl bg-white/5 border border-white/10 p-4 text-center">
      <p className="text-white/60 text-xs mb-3 leading-relaxed">{text}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 bg-[#2eaafd] hover:bg-[#2eaafd]/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
      >
        {icon}
        {label}
      </Link>
    </div>
  )
}

/** Three placeholder shimmer rows while data loads */
function SkeletonRows() {
  return (
    <div className="space-y-3 animate-pulse">
      {[55, 40, 65].map(w => (
        <div key={w} className="h-8 rounded-lg bg-white/10" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

// ─── Demo content (guest / empty states) ─────────────────────────────────────

const DEMO_STAT_ROWS = [
  { label: "Daily Quest",  value: "42 / 55", pct: 76, color: "bg-cyan-500"    },
  { label: "Fan Feud",     value: "31 / 44", pct: 70, color: "bg-pink-500"    },
  { label: "Career Path",  value: "9 / 13",  pct: 69, color: "bg-emerald-500" },
]

const DEMO_FRIEND_ROWS = [
  { initials: "JB", username: "jambiggums",  dq: "5/5",  ff: "6 found", cp: true  },
  { initials: "TC", username: "triviachamp", dq: "3/5",  ff: "4 found", cp: false },
  { initials: "SP", username: "sportspro99", dq: "4/5",  ff: "7 found", cp: true  },
]

function DemoStatRows({ faded }: { faded?: boolean }) {
  return (
    <div className={`space-y-3 ${faded ? "opacity-40 pointer-events-none select-none" : "opacity-60 pointer-events-none select-none"}`}>
      {DEMO_STAT_ROWS.map(r => (
        <div key={r.label}>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/70">{r.label}</span>
            <span className="text-white/60">{r.value} ({r.pct}%)</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className={`h-2 rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function DemoFriendRows({ faded }: { faded?: boolean }) {
  return (
    <div className={`space-y-2 ${faded ? "opacity-25 pointer-events-none select-none" : "opacity-55 pointer-events-none select-none"}`}>
      {DEMO_FRIEND_ROWS.map(f => (
        <div key={f.username} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {f.initials}
          </div>
          <span className="text-white/70 text-sm font-medium flex-1 truncate">{f.username}</span>
          <div className="flex items-center gap-1.5 text-[11px] shrink-0">
            <span className="text-cyan-300/70">{f.dq}</span>
            <span className="text-white/20">·</span>
            <span className="text-pink-300/70">{f.ff}</span>
            <span className="text-white/20">·</span>
            {f.cp
              ? <Check className="h-3 w-3 text-emerald-400/70" />
              : <X     className="h-3 w-3 text-red-400/70" />}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Real friend row ──────────────────────────────────────────────────────────

function FriendRow({ friend }: { friend: FriendEntry }) {
  const t = friend.today
  const hasAny = t && (t.dailyQuestCompleted || t.fanFeudCompleted || t.careerPathCompleted)

  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
        {friend.username.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-white text-sm font-medium flex-1 truncate">{friend.username}</span>
      <div className="flex items-center gap-1.5 text-[11px] shrink-0">
        {hasAny ? (
          <>
            {t!.dailyQuestCompleted && (
              <span className="text-cyan-300">{t!.dailyQuestScore}/5</span>
            )}
            {t!.dailyQuestCompleted && (t!.fanFeudCompleted || t!.careerPathCompleted) && (
              <span className="text-white/20">·</span>
            )}
            {t!.fanFeudCompleted && (
              <span className="text-pink-300">{t!.fanFeudScore} found</span>
            )}
            {t!.fanFeudCompleted && t!.careerPathCompleted && (
              <span className="text-white/20">·</span>
            )}
            {t!.careerPathCompleted && (
              t!.careerPathCorrect
                ? <Check className="h-3 w-3 text-emerald-400" />
                : <X     className="h-3 w-3 text-red-400" />
            )}
          </>
        ) : (
          <span className="text-white/30 text-[10px]">No plays today</span>
        )}
      </div>
    </div>
  )
}

// ─── Stats card ───────────────────────────────────────────────────────────────

function StatsCard() {
  const { isAuthenticated, isHydrated } = useAuth()
  const [data,    setData]    = useState<CareerData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) { setLoading(false); return }
    let active = true
    ;(async () => {
      try {
        const res = await authFetch("/api/scores/stats")
        if (!active || !res.ok) return
        const json = await res.json()
        setData(json?.data ?? null)
      } catch { /* ignore */ } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [isHydrated, isAuthenticated])

  // ── Guest ──────────────────────────────────────────────────────────────────
  if (isHydrated && !isAuthenticated) {
    return (
      <Card title="Stats" icon={<BarChart3 className="h-5 w-5 text-cyan-400" />} borderColor="border-cyan-500">
        <DemoStatRows />
        <CtaBox text="Create an account to track your real stats!" href="/register" label="Sign Up Free" />
      </Card>
    )
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Card title="Stats" icon={<BarChart3 className="h-5 w-5 text-cyan-400" />} borderColor="border-cyan-500">
        <SkeletonRows />
      </Card>
    )
  }

  // ── No data yet ────────────────────────────────────────────────────────────
  const hasData =
    (data?.dailyQuest?.totalQuestions ?? 0) > 0 ||
    (data?.fanFeud?.totalAnswers ?? 0) > 0 ||
    (data?.careerPath?.daysPlayed ?? 0) > 0

  if (!hasData) {
    return (
      <Card title="Stats" icon={<BarChart3 className="h-5 w-5 text-cyan-400" />} borderColor="border-cyan-500">
        <DemoStatRows faded />
        <CtaBox text="Play a game to start tracking your stats!" href="/dailyquest" label="Play Now" />
      </Card>
    )
  }

  // ── Real data ──────────────────────────────────────────────────────────────
  const rows = [
    {
      label: "Daily Quest",
      value: `${data!.dailyQuest?.totalCorrect ?? 0} / ${data!.dailyQuest?.totalQuestions ?? 0}`,
      pct:   pctNum(data!.dailyQuest?.accuracy),
      color: "bg-cyan-500",
    },
    {
      label: "Fan Feud",
      value: `${data!.fanFeud?.totalCorrect ?? 0} / ${data!.fanFeud?.totalAnswers ?? 0}`,
      pct:   pctNum(data!.fanFeud?.accuracy),
      color: "bg-pink-500",
    },
    {
      label: "Career Path",
      value: `${data!.careerPath?.correctGuesses ?? 0} / ${data!.careerPath?.daysPlayed ?? 0}`,
      pct:   pctNum(data!.careerPath?.accuracy),
      color: "bg-emerald-500",
    },
  ]

  return (
    <Card title="Stats" icon={<BarChart3 className="h-5 w-5 text-cyan-400" />} borderColor="border-cyan-500">
      <div className="space-y-3 mb-4">
        {rows.map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-white/70">{r.label}</span>
              <span className="text-white font-medium">
                {r.value}{" "}
                <span className="text-white/50">({pctStr(r.pct)})</span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-2 rounded-full ${r.color} transition-all`} style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <Link href="/stats" className="block text-center text-xs text-cyan-400 hover:text-cyan-300 transition-colors mt-auto">
        Full stats →
      </Link>
    </Card>
  )
}

// ─── Friends card ─────────────────────────────────────────────────────────────

function FriendsCard() {
  const { isAuthenticated, isHydrated } = useAuth()
  const [friends, setFriends] = useState<FriendEntry[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) { setLoading(false); return }
    let active = true
    ;(async () => {
      try {
        const res = await authFetch("/api/friends/summary")
        if (!active || !res.ok) return
        const json = await res.json()
        setFriends(json?.friends ?? [])
      } catch { /* ignore */ } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [isHydrated, isAuthenticated])

  // ── Guest ──────────────────────────────────────────────────────────────────
  if (isHydrated && !isAuthenticated) {
    return (
      <Card title="Friends" icon={<Users className="h-5 w-5 text-purple-400" />} borderColor="border-purple-500">
        <DemoFriendRows />
        <CtaBox
          text="Create an account to add friends and compete!"
          href="/register"
          label="Sign Up Free"
        />
      </Card>
    )
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Card title="Friends" icon={<Users className="h-5 w-5 text-purple-400" />} borderColor="border-purple-500">
        <SkeletonRows />
      </Card>
    )
  }

  // ── No friends yet ─────────────────────────────────────────────────────────
  if (!friends || friends.length === 0) {
    return (
      <Card title="Friends" icon={<Users className="h-5 w-5 text-purple-400" />} borderColor="border-purple-500">
        <DemoFriendRows faded />
        <CtaBox
          text="Add friends to see their daily stats here!"
          href="/friends"
          label="Find Friends"
          icon={<UserPlus className="h-3.5 w-3.5" />}
        />
      </Card>
    )
  }

  // ── Has friends ────────────────────────────────────────────────────────────
  return (
    <Card title="Friends" icon={<Users className="h-5 w-5 text-purple-400" />} borderColor="border-purple-500">
      <div className="mb-3">
        {friends.slice(0, 3).map(f => (
          <FriendRow key={f.id} friend={f} />
        ))}
      </div>
      <Link href="/friends" className="block text-center text-xs text-purple-400 hover:text-purple-300 transition-colors mt-auto">
        View all friends →
      </Link>
    </Card>
  )
}

// ─── Exported section ─────────────────────────────────────────────────────────

export function HomeWidgets() {
  return (
    <section className="pb-16 md:pb-20" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <StatsCard />
          <FriendsCard />
        </div>
      </div>
    </section>
  )
}
