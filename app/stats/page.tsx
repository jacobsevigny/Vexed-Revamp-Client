"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { authFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Trophy, Target, TrendingUp, ClipboardList, Loader2, Check, X, ArrowLeft, ShieldOff } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type DQProgress = { index: number; correct: boolean; guess: string }

type DQEntry = {
  date: string; score: number; completed: boolean
  progress: DQProgress[] | null
}
type FFEntry = {
  date: string; score: number; totalAnswers: number; completed: boolean
  incorrectGuesses: number; revealedAnswers: boolean[] | null; answerTexts: string[] | null
}
type CPEntry = {
  date: string; correct: boolean; completed: boolean
  incorrectGuesses: number; guess: string | null
}
type DCEntry = {
  date: string; year: number; solved: boolean; completed: boolean
  guessesUsed: number; hintLevel: number
}
type DQCareer = { correct: number; possible: number; perfect: number }
type FFCareer = { correct: number; possible: number; perfect: number }
type CPCareer = { attempted: number; correct: number }
type DCCareer = { attempted: number; solved: number; perfect: number }

type GameStats = {
  dailyQuest: DQEntry[]; fanFeud: FFEntry[]; careerPath: CPEntry[]; draftClass: DCEntry[]
  career: { dailyQuest: DQCareer; fanFeud: FFCareer; careerPath: CPCareer; draftClass: DCCareer }
}

const EMPTY_DQ_CAREER: DQCareer = { correct: 0, possible: 0, perfect: 0 }
const EMPTY_FF_CAREER: FFCareer = { correct: 0, possible: 0, perfect: 0 }
const EMPTY_CP_CAREER: CPCareer = { attempted: 0, correct: 0 }
const EMPTY_DC_CAREER: DCCareer = { attempted: 0, solved: 0, perfect: 0 }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  })
}

function pct(num: number, den: number): string {
  if (den === 0) return "0%"
  const p = (num / den) * 100
  const rounded = Math.round(p * 10) / 10
  return rounded % 1 === 0 ? `${Math.round(rounded)}%` : `${rounded.toFixed(1)}%`
}

// ─── Simple dot — no hover, no tooltip ───────────────────────────────────────

/** Large dot for the most recent game row. */
function Dot({ correct }: { correct: boolean }) {
  return (
    <div className={`h-7 w-7 rounded-full shrink-0 ${
      correct ? "bg-emerald-500" : "bg-red-500"
    }`} />
  )
}

/** Small dot for the previous-game rows. */
function SmallDot({ correct }: { correct: boolean }) {
  return (
    <div className={`h-4 w-4 rounded-full shrink-0 ${
      correct ? "bg-emerald-500" : "bg-red-500"
    }`} />
  )
}

// ─── All-time stat card ───────────────────────────────────────────────────────

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col min-w-[80px]">
      <span className="text-white/40 text-[10px] uppercase tracking-wider leading-none">{label}</span>
      <span className="text-white font-bold text-xl mt-1 tabular-nums">{value}</span>
    </div>
  )
}

function CareerCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 px-5 py-4 mb-3" style={{ backgroundColor: "#0b2f58" }}>
      <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3">All-Time</p>
      <div className="flex flex-wrap gap-6">{children}</div>
    </div>
  )
}

// ─── Game section shell ───────────────────────────────────────────────────────
// `borderColor` is a Tailwind border-color class (e.g. "border-cyan-500").
// The same color frames the entire card — no separate accent bar at the top.

function GameSection({ icon, title, borderColor, career, mostRecent, history }: {
  icon: React.ReactNode; title: string; borderColor: string
  career: React.ReactNode; mostRecent: React.ReactNode; history: React.ReactNode
}) {
  return (
    <div
      className={`rounded-2xl border-2 ${borderColor} shadow-xl overflow-visible`}
      style={{ backgroundColor: "#082644" }}
    >
      <div className="px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        {career}
        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3">Recent Games</p>
        {mostRecent}
        {history}
      </div>
    </div>
  )
}

// ─── Daily Quest section ──────────────────────────────────────────────────────

function DailyQuestSection({ entries, career }: { entries: DQEntry[]; career: DQCareer }) {
  const careerCard = (
    <CareerCard>
      <StatCell label="Correct" value={`${career.correct} / ${career.possible}`} />
      <StatCell label="Accuracy" value={pct(career.correct, career.possible)} />
      <StatCell label="Perfect" value={career.perfect} />
    </CareerCard>
  )

  if (entries.length === 0) return (
    <GameSection icon={<Target className="h-5 w-5 text-cyan-400" />} title="Daily Quest"
      borderColor="border-cyan-500" career={careerCard}
      mostRecent={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>}
      history={null} />
  )

  const [recent, ...prev] = entries

  // Most recent: large circles, full date + score header
  const mostRecent = (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">{fmtDate(recent.date)}</span>
        <span className="text-cyan-300 font-bold text-lg">{recent.score}/5</span>
      </div>
      {/* Circles from detailed progress if available, else score-based */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 5 }, (_, i) => {
          const correct = recent.progress
            ? (recent.progress.find(p => p.index === i)?.correct ?? false)
            : i < recent.score
          return <Dot key={i} correct={correct} />
        })}
      </div>
    </div>
  )

  // Previous 4: smaller circles + date + score
  const history = prev.length > 0 ? (
    <div className="space-y-2">
      {prev.map((e, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5">
          <span className="text-white/50 text-sm">{fmtDate(e.date)}</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, ci) => (
                <SmallDot key={ci} correct={ci < e.score} />
              ))}
            </div>
            <span className="text-white/50 text-xs tabular-nums w-6 text-right">{e.score}/5</span>
          </div>
        </div>
      ))}
    </div>
  ) : null

  return (
    <GameSection icon={<Target className="h-5 w-5 text-cyan-400" />} title="Daily Quest"
      borderColor="border-cyan-500" career={careerCard}
      mostRecent={mostRecent} history={history} />
  )
}

// ─── Fan Feud section ─────────────────────────────────────────────────────────

function FanFeudSection({ entries, career }: { entries: FFEntry[]; career: FFCareer }) {
  const careerCard = (
    <CareerCard>
      <StatCell label="Correct" value={`${career.correct} / ${career.possible}`} />
      <StatCell label="Accuracy" value={pct(career.correct, career.possible)} />
      <StatCell label="Perfect Boards" value={career.perfect} />
    </CareerCard>
  )

  if (entries.length === 0) return (
    <GameSection icon={<Trophy className="h-5 w-5 text-pink-400" />} title="Fan Feud"
      borderColor="border-pink-500" career={careerCard}
      mostRecent={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>}
      history={null} />
  )

  const [recent, ...prev] = entries
  const total = recent.totalAnswers || 0

  // Most recent: large circles from revealedAnswers if available, else score-based
  const mostRecent = (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">{fmtDate(recent.date)}</span>
        <span className="text-pink-300 font-bold text-lg">{recent.score}/{total}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: total }, (_, i) => {
          const correct = recent.revealedAnswers
            ? recent.revealedAnswers[i] === true
            : i < recent.score
          return <Dot key={i} correct={correct} />
        })}
      </div>
    </div>
  )

  // Previous 4: smaller circles (score-based) + date + score
  const history = prev.length > 0 ? (
    <div className="space-y-2">
      {prev.map((e, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5">
          <span className="text-white/50 text-sm">{fmtDate(e.date)}</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 flex-wrap justify-end">
              {Array.from({ length: e.totalAnswers || 0 }, (_, ci) => (
                <SmallDot key={ci} correct={ci < e.score} />
              ))}
            </div>
            <span className="text-white/50 text-xs tabular-nums shrink-0">{e.score}/{e.totalAnswers}</span>
          </div>
        </div>
      ))}
    </div>
  ) : null

  return (
    <GameSection icon={<Trophy className="h-5 w-5 text-pink-400" />} title="Fan Feud"
      borderColor="border-pink-500" career={careerCard}
      mostRecent={mostRecent} history={history} />
  )
}

// ─── Career Path section ──────────────────────────────────────────────────────

function CareerPathSection({ entries, career }: { entries: CPEntry[]; career: CPCareer }) {
  const careerCard = (
    <CareerCard>
      <StatCell label="Correct" value={`${career.correct} / ${career.attempted}`} />
      <StatCell label="Accuracy" value={pct(career.correct, career.attempted)} />
    </CareerCard>
  )

  if (entries.length === 0) return (
    <GameSection icon={<TrendingUp className="h-5 w-5 text-teal-400" />} title="Career Path"
      borderColor="border-emerald-500" career={careerCard}
      mostRecent={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>}
      history={null} />
  )

  const [recent, ...prev] = entries

  // Most recent: large check/X circle + guess-count text
  const mostRecent = (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">{fmtDate(recent.date)}</span>
        <span className={`font-bold text-lg ${recent.correct ? "text-emerald-400" : "text-red-400"}`}>
          {recent.correct ? "Correct" : "Incorrect"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${recent.correct ? "bg-emerald-500" : "bg-red-500"}`}>
          {recent.correct
            ? <Check className="h-5 w-5 text-white" />
            : <X className="h-5 w-5 text-white" />}
        </div>
        <p className="text-white/50 text-sm">
          {recent.incorrectGuesses === 0
            ? "Guessed on first try"
            : `${recent.incorrectGuesses} wrong guess${recent.incorrectGuesses !== 1 ? "es" : ""}`}
        </p>
      </div>
    </div>
  )

  // Previous 4: small check/X circle + date
  const history = prev.length > 0 ? (
    <div className="space-y-2">
      {prev.map((e, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5">
          <span className="text-white/50 text-sm">{fmtDate(e.date)}</span>
          <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${e.correct ? "bg-emerald-500" : "bg-red-500"}`}>
            {e.correct
              ? <Check className="h-3.5 w-3.5 text-white" />
              : <X className="h-3.5 w-3.5 text-white" />}
          </div>
        </div>
      ))}
    </div>
  ) : null

  return (
    <GameSection icon={<TrendingUp className="h-5 w-5 text-teal-400" />} title="Career Path"
      borderColor="border-emerald-500" career={careerCard}
      mostRecent={mostRecent} history={history} />
  )
}

// ─── Draft Class section ──────────────────────────────────────────────────────

function DraftClassSection({ entries, career }: { entries: DCEntry[]; career: DCCareer }) {
  const careerCard = (
    <CareerCard>
      <StatCell label="Solved" value={`${career.solved} / ${career.attempted}`} />
      <StatCell label="Solve %" value={pct(career.solved, career.attempted)} />
      <StatCell label="Perfect" value={career.perfect} />
    </CareerCard>
  )

  if (entries.length === 0) return (
    <GameSection icon={<ClipboardList className="h-5 w-5 text-indigo-400" />} title="Draft Class"
      borderColor="border-indigo-500" career={careerCard}
      mostRecent={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>}
      history={null} />
  )

  const [recent, ...prev] = entries

  const mostRecent = (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-base">{fmtDate(recent.date)}</span>
        <span className={`font-bold text-lg ${recent.solved ? "text-emerald-400" : "text-red-400"}`}>
          {recent.solved ? "Solved" : "Failed"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${recent.solved ? "bg-emerald-500" : "bg-red-500"}`}>
          {recent.solved
            ? <Check className="h-5 w-5 text-white" />
            : <X className="h-5 w-5 text-white" />}
        </div>
        <p className="text-white/50 text-sm">
          {recent.year} Draft ·{" "}
          {recent.guessesUsed === 1
            ? "1 guess"
            : `${recent.guessesUsed} guesses`}
          {recent.solved && recent.hintLevel === 0 ? " · Perfect (no hints)" : ""}
        </p>
      </div>
    </div>
  )

  const history = prev.length > 0 ? (
    <div className="space-y-2">
      {prev.map((e, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5">
          <span className="text-white/50 text-sm">{fmtDate(e.date)}</span>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">{e.year} Draft</span>
            <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${e.solved ? "bg-emerald-500" : "bg-red-500"}`}>
              {e.solved
                ? <Check className="h-3.5 w-3.5 text-white" />
                : <X className="h-3.5 w-3.5 text-white" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null

  return (
    <GameSection icon={<ClipboardList className="h-5 w-5 text-indigo-400" />} title="Draft Class"
      borderColor="border-indigo-500" career={careerCard}
      mostRecent={mostRecent} history={history} />
  )
}

// ─── Guest view ───────────────────────────────────────────────────────────────

function GuestView() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="rounded-2xl border border-white/10 shadow-xl p-8 text-center max-w-sm w-full" style={{ backgroundColor: "#082644" }}>
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
          <Trophy className="h-8 w-8 text-white/60" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Log in to view stats</h2>
        <p className="text-white/60 mb-6 text-sm leading-relaxed">Only logged-in users can view game statistics.</p>
        <Link href="/login?redirect=/stats" className="inline-block bg-[#2eaafd] hover:bg-[#2eaafd]/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
          Go to Login
        </Link>
      </div>
    </div>
  )
}

// ─── Error view ───────────────────────────────────────────────────────────────

function ErrorView({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="rounded-2xl border border-white/10 shadow-xl p-8 text-center max-w-sm w-full" style={{ backgroundColor: "#082644" }}>
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
          <ShieldOff className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-white/60 mb-6 text-sm leading-relaxed">{message}</p>
        <Link href="/friends" className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
          Back to Friends
        </Link>
      </div>
    </div>
  )
}

// ─── Inner page ───────────────────────────────────────────────────────────────

function StatsPageContent() {
  const { isAuthenticated, isHydrated, user } = useAuth()
  const searchParams = useSearchParams()
  const targetUserIdParam = searchParams.get("user")
  const ownId = user?.id ? String(user.id) : null
  const isFriendView = !!(targetUserIdParam && targetUserIdParam !== ownId)

  const [data, setData]       = useState<(GameStats & { username?: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const endpoint = isFriendView
        ? `/api/scores/game-stats/${targetUserIdParam}`
        : "/api/scores/game-stats"

      const res = await authFetch(endpoint)

      if (res.status === 403) { setError("You are not friends with this user."); return }
      if (res.status === 404) { setError("User not found."); return }
      if (!res.ok)            { setError("Failed to load stats."); return }

      const json = await res.json()
      setData(json?.data ? { ...json.data, username: json.username } : null)
    } catch {
      setError("Failed to load stats.")
    } finally {
      setLoading(false)
    }
  }, [isFriendView, targetUserIdParam])

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) { setLoading(false); return }
    load()
  }, [isHydrated, isAuthenticated, load])

  if (isHydrated && !isAuthenticated) return <GuestView />
  if (!loading && error) return <ErrorView message={error} />

  const viewingUsername = data?.username

  return (
    <div className="min-h-screen pt-24 pb-16 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="mx-auto max-w-2xl">

        {isFriendView && (
          <div className="mb-4">
            <Link href="/friends" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Friends
            </Link>
          </div>
        )}

        <div className="text-center mb-8">
          {/* "Your Stats" — dark navy text, no trophy icon */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#082644] mb-2">
            {isFriendView ? "Stats" : "Your Stats"}
          </h1>
          {isFriendView && viewingUsername ? (
            <p className="text-white/80 font-medium">
              Viewing stats for <span className="text-[#082644] font-bold">{viewingUsername}</span>
            </p>
          ) : (
            <p className="text-white/80">All-time career stats · last 5 games</p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="space-y-5">
            <DailyQuestSection entries={data?.dailyQuest ?? []} career={data?.career?.dailyQuest ?? EMPTY_DQ_CAREER} />
            <FanFeudSection    entries={data?.fanFeud    ?? []} career={data?.career?.fanFeud    ?? EMPTY_FF_CAREER} />
            <CareerPathSection entries={data?.careerPath ?? []} career={data?.career?.careerPath ?? EMPTY_CP_CAREER} />
            <DraftClassSection entries={data?.draftClass ?? []} career={data?.career?.draftClass ?? EMPTY_DC_CAREER} />
          </div>
        )}

      </div>
    </div>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function StatsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2eaafd" }}>
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    }>
      <StatsPageContent />
    </Suspense>
  )
}
