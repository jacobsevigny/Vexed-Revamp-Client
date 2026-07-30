"use client"

import { Suspense, useState, useEffect, useCallback, useRef } from "react"
import { authFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Loader2, Check, X, ArrowLeft, ShieldOff } from "lucide-react"
import { GAMES } from "@/lib/games-config"

// ─── Tab config ───────────────────────────────────────────────────────────────
// Single source of truth for each mode's accent color, used by both the tab bar
// and the panel's left accent bar. Tab icons reuse the same brand PNG badges as
// the Games page / nav hub (via GAMES in games-config.ts) rather than a separate
// icon set — those images are dense illustrations with a baked-in wordmark, so
// they only read cleanly at ~44px+ (nothing else in the app uses them smaller
// than 52px either), hence the larger chip size below instead of a compact
// inline icon.

type ModeKey = "dailyQuest" | "fanFeud" | "careerPath" | "draftClass"

const MODES: { key: ModeKey; label: string; iconUrl: string; border: string; text: string; chip: string }[] = [
  { key: "dailyQuest", label: "Daily Quest", iconUrl: GAMES.find(g => g.id === "dailyquest")!.iconUrl,
    border: "border-cyan-500",    text: "text-cyan-400",    chip: "bg-cyan-500/10" },
  { key: "fanFeud",    label: "Fan Feud",    iconUrl: GAMES.find(g => g.id === "fanfeud")!.iconUrl,
    border: "border-pink-500",    text: "text-pink-400",    chip: "bg-pink-500/10" },
  { key: "careerPath", label: "Career Path", iconUrl: GAMES.find(g => g.id === "careerpath")!.iconUrl,
    border: "border-emerald-500", text: "text-emerald-400", chip: "bg-emerald-500/10" },
  { key: "draftClass", label: "Draft Class", iconUrl: GAMES.find(g => g.id === "draftclass")!.iconUrl,
    border: "border-indigo-500",  text: "text-indigo-400",  chip: "bg-indigo-500/10" },
]

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
// One size used everywhere so the newest game row doesn't outweigh older ones.

function Dot({ correct }: { correct: boolean }) {
  return (
    <div className={`h-5 w-5 rounded-full shrink-0 ${
      correct ? "bg-emerald-500" : "bg-red-500"
    }`} />
  )
}

/** Uniform correct/incorrect circle used by Career Path & Draft Class rows. */
function ResultIcon({ ok }: { ok: boolean }) {
  return (
    <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
      ok ? "bg-emerald-500" : "bg-red-500"
    }`}>
      {ok ? <Check className="h-4 w-4 text-white" /> : <X className="h-4 w-4 text-white" />}
    </div>
  )
}

/** One row in a "Recent Games" list — identical size/type regardless of recency. */
function GameRow({ date, detail, indicator, badge, badgeColor }: {
  date: string
  detail?: string
  indicator: React.ReactNode
  badge?: string
  badgeColor?: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <div className="flex flex-col min-w-0">
        <span className="text-white/70 text-sm font-medium">{date}</span>
        {detail && <span className="text-white/40 text-xs mt-0.5 truncate">{detail}</span>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {indicator}
        {badge && (
          <span className={`font-bold text-sm tabular-nums whitespace-nowrap ${badgeColor ?? "text-white"}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
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

// ─── Game section body ────────────────────────────────────────────────────────
// Renders inside the shared tab panel below, which owns the card chrome
// (background, rounding, left accent bar) — this is content only.

function GameSection({ title, career, rows }: {
  title: string
  career: React.ReactNode; rows: React.ReactNode
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      {career}
      <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3">Recent Games</p>
      {rows}
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
    <GameSection title="Daily Quest"
      career={careerCard}
      rows={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>} />
  )

  // Every row — most recent included — uses the same size, padding, and dots.
  const rows = (
    <div className="space-y-2">
      {entries.map((e, i) => (
        <GameRow
          key={i}
          date={fmtDate(e.date)}
          badge={`${e.score}/5`}
          badgeColor="text-cyan-300"
          indicator={
            <div className="flex gap-1.5 flex-wrap justify-end">
              {Array.from({ length: 5 }, (_, ci) => {
                const correct = e.progress
                  ? (e.progress.find(p => p.index === ci)?.correct ?? false)
                  : ci < e.score
                return <Dot key={ci} correct={correct} />
              })}
            </div>
          }
        />
      ))}
    </div>
  )

  return (
    <GameSection title="Daily Quest"
      career={careerCard} rows={rows} />
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
    <GameSection title="Fan Feud"
      career={careerCard}
      rows={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>} />
  )

  const rows = (
    <div className="space-y-2">
      {entries.map((e, i) => {
        const total = e.totalAnswers || 0
        return (
          <GameRow
            key={i}
            date={fmtDate(e.date)}
            badge={`${e.score}/${total}`}
            badgeColor="text-pink-300"
            indicator={
              <div className="flex gap-1.5 flex-wrap justify-end max-w-[140px]">
                {Array.from({ length: total }, (_, ci) => {
                  const correct = e.revealedAnswers
                    ? e.revealedAnswers[ci] === true
                    : ci < e.score
                  return <Dot key={ci} correct={correct} />
                })}
              </div>
            }
          />
        )
      })}
    </div>
  )

  return (
    <GameSection title="Fan Feud"
      career={careerCard} rows={rows} />
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
    <GameSection title="Career Path"
      career={careerCard}
      rows={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>} />
  )

  const rows = (
    <div className="space-y-2">
      {entries.map((e, i) => (
        <GameRow
          key={i}
          date={fmtDate(e.date)}
          detail={e.incorrectGuesses === 0
            ? "Guessed on first try"
            : `${e.incorrectGuesses} wrong guess${e.incorrectGuesses !== 1 ? "es" : ""}`}
          badge={e.correct ? "Correct" : "Incorrect"}
          badgeColor={e.correct ? "text-emerald-400" : "text-red-400"}
          indicator={<ResultIcon ok={e.correct} />}
        />
      ))}
    </div>
  )

  return (
    <GameSection title="Career Path"
      career={careerCard} rows={rows} />
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
    <GameSection title="Draft Class"
      career={careerCard}
      rows={<p className="text-white/40 text-sm py-3 text-center">No games played yet</p>} />
  )

  const rows = (
    <div className="space-y-2">
      {entries.map((e, i) => (
        <GameRow
          key={i}
          date={fmtDate(e.date)}
          detail={`${e.year} Draft · ${e.guessesUsed === 1 ? "1 guess" : `${e.guessesUsed} guesses`}${
            e.solved && e.hintLevel === 0 ? " · Perfect (no hints)" : ""
          }`}
          badge={e.solved ? "Solved" : "Failed"}
          badgeColor={e.solved ? "text-emerald-400" : "text-red-400"}
          indicator={<ResultIcon ok={e.solved} />}
        />
      ))}
    </div>
  )

  return (
    <GameSection title="Draft Class"
      career={careerCard} rows={rows} />
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const targetUserIdParam = searchParams.get("user")
  const ownId = user?.id ? String(user.id) : null
  const isFriendView = !!(targetUserIdParam && targetUserIdParam !== ownId)

  const [data, setData]       = useState<(GameStats & { username?: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [activeModeKey, setActiveModeKey] = useState<ModeKey>("dailyQuest")
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // ── Redirect if not logged in ────────────────────────────────────────────────
  useEffect(() => {
    if (isHydrated && !isAuthenticated) router.push("/login?redirect=/stats")
  }, [isAuthenticated, isHydrated, router])

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

  if (!isHydrated || (!isAuthenticated && isHydrated)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2eaafd" }}>
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    )
  }
  if (!loading && error) return <ErrorView message={error} />

  const viewingUsername = data?.username
  const activeMode = MODES.find(m => m.key === activeModeKey)!

  function handleTabKeyDown(e: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null
    if (e.key === "ArrowRight") nextIndex = (index + 1) % MODES.length
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + MODES.length) % MODES.length
    else if (e.key === "Home") nextIndex = 0
    else if (e.key === "End") nextIndex = MODES.length - 1
    if (nextIndex !== null) {
      e.preventDefault()
      setActiveModeKey(MODES[nextIndex].key)
      tabRefs.current[nextIndex]?.focus()
    }
  }

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
          <h1
            className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-[#082644] mb-2"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
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

        <div
          className={`rounded-2xl border-l-4 ${activeMode.border} shadow-xl overflow-hidden transition-colors`}
          style={{ backgroundColor: "#082644" }}
        >
          <div role="tablist" aria-label="Game mode" className="flex overflow-x-auto border-b border-white/10">
            {MODES.map((mode, i) => {
              const selected = mode.key === activeModeKey
              return (
                <button
                  key={mode.key}
                  ref={(el) => { tabRefs.current[i] = el }}
                  role="tab"
                  id={`stats-tab-${mode.key}`}
                  aria-selected={selected}
                  aria-controls={`stats-panel-${mode.key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveModeKey(mode.key)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  className={`flex flex-col items-center gap-1 px-4 sm:px-5 pt-3 pb-2.5 text-xs font-semibold whitespace-nowrap shrink-0 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset ${
                    selected ? `${mode.text} border-current` : "text-white/45 border-transparent hover:text-white/70"
                  }`}
                >
                  <span className={`flex items-center justify-center h-14 w-14 rounded-xl ${mode.chip}`}>
                    <Image src={mode.iconUrl} alt="" width={44} height={44} className="object-contain" />
                  </span>
                  {mode.label}
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`stats-panel-${activeMode.key}`}
            aria-labelledby={`stats-tab-${activeMode.key}`}
            className="px-6 py-5"
          >
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
            ) : (
              <>
                {activeModeKey === "dailyQuest" && (
                  <DailyQuestSection entries={data?.dailyQuest ?? []} career={data?.career?.dailyQuest ?? EMPTY_DQ_CAREER} />
                )}
                {activeModeKey === "fanFeud" && (
                  <FanFeudSection entries={data?.fanFeud ?? []} career={data?.career?.fanFeud ?? EMPTY_FF_CAREER} />
                )}
                {activeModeKey === "careerPath" && (
                  <CareerPathSection entries={data?.careerPath ?? []} career={data?.career?.careerPath ?? EMPTY_CP_CAREER} />
                )}
                {activeModeKey === "draftClass" && (
                  <DraftClassSection entries={data?.draftClass ?? []} career={data?.career?.draftClass ?? EMPTY_DC_CAREER} />
                )}
              </>
            )}
          </div>
        </div>

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
