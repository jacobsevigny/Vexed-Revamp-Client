"use client"

import { useState, useEffect, useCallback } from "react"
import { authFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Trophy, Target, TrendingUp, Loader2, Check, X } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type DQProgress = { index: number; correct: boolean; guess: string }

type DQEntry = {
  date: string
  score: number
  completed: boolean
  progress: DQProgress[] | null
}

type FFEntry = {
  date: string
  score: number
  totalAnswers: number
  completed: boolean
  incorrectGuesses: number
  revealedAnswers: boolean[] | null
  answerTexts: string[] | null
}

type CPEntry = {
  date: string
  correct: boolean
  completed: boolean
  incorrectGuesses: number
  guess: string | null
}

type GameStats = {
  dailyQuest: DQEntry[]
  fanFeud: FFEntry[]
  careerPath: CPEntry[]
}

// ─── Date formatting ──────────────────────────────────────────────────────────

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  })
}

// ─── Tooltip dot ─────────────────────────────────────────────────────────────
// Renders a green/red circle. On hover (desktop) or tap (mobile) shows a dark
// tooltip above it with the guessed answer text. Uses z-[9999] so it is never
// hidden behind other cards.

function Dot({
  correct,
  label,
  value,
}: {
  correct: boolean
  label: string
  value: string | null | undefined
}) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={e => { e.preventDefault(); setShow(v => !v) }}
    >
      <div
        className={`h-7 w-7 rounded-full cursor-pointer transition-transform active:scale-90 hover:scale-110 ${
          correct ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
        }`}
      />
      {show && (
        <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
          <div
            className="rounded-lg border border-white/20 shadow-2xl px-3 py-2 text-center whitespace-nowrap min-w-[80px] max-w-[200px]"
            style={{ backgroundColor: "#082644" }}
          >
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
            <p className="text-white text-xs font-medium truncate">{value || "—"}</p>
          </div>
          {/* Arrow */}
          <div className="flex justify-center mt-[-1px]">
            <div className="w-0 h-0 border-x-4 border-t-4 border-x-transparent border-t-[#082644]" />
          </div>
        </div>
      )}
    </div>
  )
}

// Single Career Path result dot (check or X with tooltip)
function CPDot({ correct, guess }: { correct: boolean; guess: string | null }) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={e => { e.preventDefault(); setShow(v => !v) }}
    >
      <div
        className={`h-9 w-9 rounded-full cursor-pointer transition-transform hover:scale-110 flex items-center justify-center ${
          correct ? "bg-emerald-500" : "bg-red-500"
        }`}
      >
        {correct
          ? <Check className="h-5 w-5 text-white" />
          : <X className="h-5 w-5 text-white" />}
      </div>
      {show && (
        <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
          <div
            className="rounded-lg border border-white/20 shadow-2xl px-3 py-2 text-center whitespace-nowrap min-w-[80px] max-w-[200px]"
            style={{ backgroundColor: "#082644" }}
          >
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Guessed</p>
            <p className="text-white text-xs font-medium truncate">{guess || "—"}</p>
          </div>
          <div className="flex justify-center mt-[-1px]">
            <div className="w-0 h-0 border-x-4 border-t-4 border-x-transparent border-t-[#082644]" />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── History row (small, for previous 4 games) ───────────────────────────────

function HistoryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <span className="text-white/50 text-sm">{label}</span>
      {children}
    </div>
  )
}

// ─── Game section ─────────────────────────────────────────────────────────────

function GameSection({
  icon,
  title,
  accentClass,
  mostRecent,
  history,
}: {
  icon: React.ReactNode
  title: string
  accentClass: string
  mostRecent: React.ReactNode
  history: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 shadow-xl overflow-visible" style={{ backgroundColor: "#082644" }}>
      <div className={`h-1 ${accentClass}`} />
      <div className="px-6 py-5">
        <div className="flex items-center gap-2 mb-5">
          {icon}
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        {/* Most recent — larger card */}
        {mostRecent}
        {/* Previous 4 */}
        {history}
      </div>
    </div>
  )
}

// ─── Daily Quest section ──────────────────────────────────────────────────────

function DailyQuestSection({ entries }: { entries: DQEntry[] }) {
  if (entries.length === 0) {
    return (
      <GameSection
        icon={<Target className="h-5 w-5 text-cyan-400" />}
        title="Daily Quest"
        accentClass="bg-gradient-to-r from-blue-500 to-cyan-500"
        mostRecent={<p className="text-white/40 text-sm py-4 text-center">No games played yet</p>}
        history={null}
      />
    )
  }

  const [recent, ...prev] = entries

  const mostRecent = (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">{fmtDate(recent.date)}</span>
        <span className="text-cyan-300 font-bold text-lg">{recent.score}/5</span>
      </div>
      {recent.progress ? (
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }, (_, i) => {
            const ans = recent.progress!.find(p => p.index === i)
            return (
              <Dot
                key={i}
                correct={ans?.correct ?? false}
                label={`Q${i + 1}`}
                value={ans?.guess}
              />
            )
          })}
        </div>
      ) : (
        <div className="flex gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={`h-7 w-7 rounded-full ${i < recent.score ? "bg-emerald-500" : "bg-red-500"}`} />
          ))}
        </div>
      )}
    </div>
  )

  const history = prev.length > 0 ? (
    <div className="space-y-2">
      {prev.map((e, i) => (
        <HistoryRow key={i} label={fmtDate(e.date)}>
          <span className="text-white font-semibold tabular-nums">{e.score}/5</span>
        </HistoryRow>
      ))}
    </div>
  ) : null

  return (
    <GameSection
      icon={<Target className="h-5 w-5 text-cyan-400" />}
      title="Daily Quest"
      accentClass="bg-gradient-to-r from-blue-500 to-cyan-500"
      mostRecent={mostRecent}
      history={history}
    />
  )
}

// ─── Fan Feud section ─────────────────────────────────────────────────────────

function FanFeudSection({ entries }: { entries: FFEntry[] }) {
  if (entries.length === 0) {
    return (
      <GameSection
        icon={<Trophy className="h-5 w-5 text-pink-400" />}
        title="Fan Feud"
        accentClass="bg-gradient-to-r from-purple-500 to-pink-500"
        mostRecent={<p className="text-white/40 text-sm py-4 text-center">No games played yet</p>}
        history={null}
      />
    )
  }

  const [recent, ...prev] = entries
  const total = recent.totalAnswers || 0
  const revealed = recent.revealedAnswers
  const texts = recent.answerTexts

  const mostRecent = (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">{fmtDate(recent.date)}</span>
        <span className="text-pink-300 font-bold text-lg">{recent.score}/{total}</span>
      </div>
      {revealed ? (
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: total }, (_, i) => (
            <Dot
              key={i}
              correct={revealed[i] === true}
              label={`#${i + 1}`}
              value={revealed[i] ? (texts?.[i] ?? null) : "Missed"}
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: total }, (_, i) => (
            <div key={i} className={`h-7 w-7 rounded-full ${i < recent.score ? "bg-emerald-500" : "bg-red-500"}`} />
          ))}
        </div>
      )}
    </div>
  )

  const history = prev.length > 0 ? (
    <div className="space-y-2">
      {prev.map((e, i) => (
        <HistoryRow key={i} label={fmtDate(e.date)}>
          <span className="text-white font-semibold tabular-nums">{e.score}/{e.totalAnswers}</span>
        </HistoryRow>
      ))}
    </div>
  ) : null

  return (
    <GameSection
      icon={<Trophy className="h-5 w-5 text-pink-400" />}
      title="Fan Feud"
      accentClass="bg-gradient-to-r from-purple-500 to-pink-500"
      mostRecent={mostRecent}
      history={history}
    />
  )
}

// ─── Career Path section ──────────────────────────────────────────────────────

function CareerPathSection({ entries }: { entries: CPEntry[] }) {
  if (entries.length === 0) {
    return (
      <GameSection
        icon={<TrendingUp className="h-5 w-5 text-teal-400" />}
        title="Career Path"
        accentClass="bg-gradient-to-r from-emerald-500 to-teal-500"
        mostRecent={<p className="text-white/40 text-sm py-4 text-center">No games played yet</p>}
        history={null}
      />
    )
  }

  const [recent, ...prev] = entries

  const mostRecent = (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">{fmtDate(recent.date)}</span>
        <span className={`font-bold text-lg ${recent.correct ? "text-emerald-400" : "text-red-400"}`}>
          {recent.correct ? "Correct" : "Incorrect"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <CPDot correct={recent.correct} guess={recent.guess} />
        <p className="text-white/50 text-sm">
          {recent.incorrectGuesses === 0
            ? "Guessed on first try"
            : `${recent.incorrectGuesses} wrong guess${recent.incorrectGuesses !== 1 ? "es" : ""}`}
        </p>
      </div>
    </div>
  )

  const history = prev.length > 0 ? (
    <div className="space-y-2">
      {prev.map((e, i) => (
        <HistoryRow key={i} label={fmtDate(e.date)}>
          <span className={`font-semibold text-sm ${e.correct ? "text-emerald-400" : "text-red-400"}`}>
            {e.correct ? "✓ Correct" : "✗ Incorrect"}
          </span>
        </HistoryRow>
      ))}
    </div>
  ) : null

  return (
    <GameSection
      icon={<TrendingUp className="h-5 w-5 text-teal-400" />}
      title="Career Path"
      accentClass="bg-gradient-to-r from-emerald-500 to-teal-500"
      mostRecent={mostRecent}
      history={history}
    />
  )
}

// ─── Not logged in view ───────────────────────────────────────────────────────

function GuestView() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div
        className="rounded-2xl border border-white/10 shadow-xl p-8 text-center max-w-sm w-full"
        style={{ backgroundColor: "#082644" }}
      >
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
          <Trophy className="h-8 w-8 text-white/60" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Log in to view stats</h2>
        <p className="text-white/60 mb-6 text-sm leading-relaxed">
          Only logged-in users can view their game statistics and history.
        </p>
        <Link
          href="/login?redirect=/stats"
          className="inline-block bg-[#2eaafd] hover:bg-[#2eaafd]/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StatsPage() {
  const { isAuthenticated, isHydrated } = useAuth()
  const [data, setData] = useState<GameStats | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const res = await authFetch("/api/scores/game-stats")
      if (res.ok) {
        const json = await res.json()
        setData(json?.data ?? null)
      }
    } catch {
      // silently fail — data stays null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) { setLoading(false); return }
    load()
  }, [isHydrated, isAuthenticated, load])

  // Show guest screen immediately once hydration confirms user is logged out
  if (isHydrated && !isAuthenticated) return <GuestView />

  return (
    <div className="min-h-screen pt-24 pb-16 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-[#3cbcff]" />
            Your Stats
          </h1>
          <p className="text-white/70">Last 5 games per mode · hover circles for your guesses</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="space-y-5">
            <DailyQuestSection entries={data?.dailyQuest ?? []} />
            <FanFeudSection    entries={data?.fanFeud ?? []} />
            <CareerPathSection entries={data?.careerPath ?? []} />
          </div>
        )}

      </div>
    </div>
  )
}
