"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { authFetch, getAllNames } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Check, X, Loader2, Trophy, AlertCircle, ChevronDown } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Pick = {
  id: number
  round: number
  pickOverall: number
  playerName: string
  position: string
  college: string | null
}

type GameData = {
  gameId: number
  year: number
  picks: Pick[]
}

type GuestProgress = {
  hintLevel: number
  guesses: string[]
  solved: boolean
  completed: boolean
  correctTeam: string | null
}

type Status = "loading" | "ready" | "empty" | "error"

const today = new Date().toISOString().split("T")[0]
const MAX_WRONG = 5

// Hint level meanings:
//   0 → round + pick number only
//   1 → + draft year
//   2 → + position
//   3 → + player names for rounds 3+
//   4 → + player names for rounds 1–2
//   5 → game over

function showPlayerName(pick: Pick, hintLevel: number, completed: boolean): boolean {
  if (completed) return true
  if (pick.round >= 3) return hintLevel >= 3
  return hintLevel >= 4
}

function showPosition(hintLevel: number, completed: boolean): boolean {
  return hintLevel >= 2 || completed
}

// ─── Pick row ─────────────────────────────────────────────────────────────────

function PickRow({ pick, hintLevel, completed }: { pick: Pick; hintLevel: number; completed: boolean }) {
  const revealPos    = showPosition(hintLevel, completed)
  const revealPlayer = showPlayerName(pick, hintLevel, completed)

  const roundLabel = `R${pick.round}`
  const pickLabel  = `#${pick.pickOverall}`

  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10">
      {/* Round badge */}
      <div className="flex items-center gap-1.5 shrink-0 min-w-[90px]">
        <span className="text-xs font-bold text-white/40 bg-white/10 rounded px-1.5 py-0.5">{roundLabel}</span>
        <span className="text-white font-bold text-sm">{pickLabel}</span>
      </div>

      {/* Position */}
      <div className="w-12 shrink-0">
        {revealPos ? (
          <span className="text-[#2eaafd] font-semibold text-sm">{pick.position || "—"}</span>
        ) : (
          <span className="inline-block rounded bg-white/10 w-10 h-4" />
        )}
      </div>

      {/* Player name */}
      <div className="flex-1 min-w-0">
        {revealPlayer ? (
          <span className="text-white font-medium text-sm truncate">{pick.playerName || "—"}</span>
        ) : (
          <span className="inline-block rounded bg-white/10 w-28 h-4" />
        )}
      </div>
    </div>
  )
}

// ─── Guess chip ───────────────────────────────────────────────────────────────

function GuessChip({ guess, correct }: { guess: string; correct: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
      correct ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border border-red-500/20 text-red-300"
    }`}>
      {correct
        ? <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
        : <X className="h-3.5 w-3.5 text-red-400 shrink-0" />}
      {guess}
    </div>
  )
}

// ─── Hint progress bar ────────────────────────────────────────────────────────

const HINT_LABELS = [
  "Round & pick",
  "Draft year",
  "Positions",
  "Later-round names",
  "All names",
]

function HintBar({ hintLevel, completed }: { hintLevel: number; completed: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {HINT_LABELS.map((label, i) => (
        <div key={i} title={label} className="flex-1">
          <div className={`h-1.5 rounded-full transition-colors ${
            i < hintLevel
              ? completed
                ? "bg-emerald-500"
                : "bg-amber-400"
              : "bg-white/15"
          }`} />
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DraftClass() {
  const { isAuthenticated, isHydrated } = useAuth()

  const [status,      setStatus]      = useState<Status>("loading")
  const [game,        setGame]        = useState<GameData | null>(null)
  const [nflTeams,    setNflTeams]    = useState<string[]>([])
  const [guess,       setGuess]       = useState("")
  const [guesses,     setGuesses]     = useState<string[]>([])
  const [hintLevel,   setHintLevel]   = useState(0)
  const [solved,      setSolved]      = useState(false)
  const [completed,   setCompleted]   = useState(false)
  const [correctTeam, setCorrectTeam] = useState<string | null>(null)
  const [submitting,  setSubmitting]  = useState(false)
  const [shake,       setShake]       = useState(false)
  const [dropdown,    setDropdown]    = useState(false)

  const inputRef    = useRef<HTMLInputElement>(null)
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const guestKey    = `draftclass_progress_guest_${today}`

  // ── Restore guest progress ────────────────────────────────────────────────
  const loadGuest = (): GuestProgress | null => {
    try {
      const raw = localStorage.getItem(guestKey)
      return raw ? (JSON.parse(raw) as GuestProgress) : null
    } catch {
      return null
    }
  }

  const saveGuest = (p: GuestProgress) => {
    localStorage.setItem(guestKey, JSON.stringify(p))
  }

  // ── Fetch game + progress ─────────────────────────────────────────────────
  const load = useCallback(async () => {
    if (!isHydrated) return
    setStatus("loading")
    try {
      const [res, teams] = await Promise.all([
        authFetch("/api/draftclass/today"),
        getAllNames("nfl_teams"),
      ])

      if (res.status === 404) { setStatus("empty"); return }
      if (!res.ok)            { setStatus("error");  return }

      const data = await res.json()
      setGame({ gameId: data.gameId, year: data.year, picks: data.picks })
      setNflTeams(teams)

      if (isAuthenticated && data.progress) {
        const p = data.progress
        setGuesses(p.guesses    || [])
        setHintLevel(p.hintLevel   || 0)
        setSolved(p.solved       || false)
        setCompleted(p.completed    || false)
      }
      if (data.correctTeam) setCorrectTeam(data.correctTeam)

      if (!isAuthenticated) {
        const gp = loadGuest()
        if (gp) {
          setGuesses(gp.guesses    || [])
          setHintLevel(gp.hintLevel   || 0)
          setSolved(gp.solved       || false)
          setCompleted(gp.completed    || false)
          if (gp.correctTeam) setCorrectTeam(gp.correctTeam)
        }
      }

      setStatus("ready")
    } catch {
      setStatus("error")
    }
  }, [isHydrated, isAuthenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load() }, [load])

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // ── Autocomplete filter ───────────────────────────────────────────────────
  const filtered = guess.trim()
    ? nflTeams.filter(t => t.toLowerCase().includes(guess.toLowerCase())).slice(0, 8)
    : []

  const selectTeam = (team: string) => {
    setGuess(team)
    setDropdown(false)
    inputRef.current?.focus()
  }

  // ── Submit guess ──────────────────────────────────────────────────────────
  const handleGuess = async () => {
    if (!guess.trim() || completed || submitting) return
    setSubmitting(true)
    setDropdown(false)
    try {
      const res = await authFetch("/api/draftclass/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: guess.trim(), guestHintLevel: hintLevel }),
      })

      if (!res.ok) return

      const data = await res.json()
      const newGuesses = [...guesses, guess.trim()]

      setGuesses(newGuesses)
      setHintLevel(data.hintLevel)
      setSolved(data.solved)
      setCompleted(data.completed)
      if (data.correctTeam) setCorrectTeam(data.correctTeam)
      setGuess("")

      if (!data.correct) {
        setShake(true)
        setTimeout(() => setShake(false), 600)
      }

      if (!isAuthenticated) {
        saveGuest({
          hintLevel:   data.hintLevel,
          guesses:     newGuesses,
          solved:      data.solved,
          completed:   data.completed,
          correctTeam: data.correctTeam || null,
        })
      }
    } catch {
      // network error — swallow
    } finally {
      setSubmitting(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter")  { e.preventDefault(); handleGuess() }
    if (e.key === "Escape") setDropdown(false)
    if (e.key === "ArrowDown" && filtered.length > 0) setDropdown(true)
  }

  // ── Wrong-guess count ─────────────────────────────────────────────────────
  const wrongCount      = guesses.filter((_, i) => {
    const isLast = i === guesses.length - 1
    return !(isLast && solved)
  }).length - (solved ? 0 : 0)

  // Simple count: hintLevel equals number of wrong guesses
  const guessesLeft = MAX_WRONG - hintLevel

  // ── Render helpers ────────────────────────────────────────────────────────
  const showYear = hintLevel >= 1 || completed

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2eaafd" }}>
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    )
  }

  if (status === "empty") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16 px-4" style={{ backgroundColor: "#2eaafd" }}>
          <div className="rounded-2xl border border-white/10 shadow-xl p-8 text-center max-w-sm w-full" style={{ backgroundColor: "#082644" }}>
            <AlertCircle className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No puzzle today</h2>
            <p className="text-white/60 text-sm">Check back tomorrow for a new Draft Class challenge.</p>
          </div>
        </div>
      </>
    )
  }

  if (status === "error") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16 px-4" style={{ backgroundColor: "#2eaafd" }}>
          <div className="rounded-2xl border border-white/10 shadow-xl p-8 text-center max-w-sm w-full" style={{ backgroundColor: "#082644" }}>
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-white/60 text-sm mb-6">Could not load today's puzzle.</p>
            <Button onClick={load} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Try again
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-16 px-4" style={{ backgroundColor: "#2eaafd" }}>
        <div className="max-w-xl mx-auto">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-1">
              Draft Class
            </h1>
            <p className="text-white/80 text-base">
              Guess the NFL team from their draft picks.
            </p>
          </div>

          {/* ── Main card ─────────────────────────────────────────────────── */}
          <div
            className="rounded-2xl border border-white/10 shadow-2xl overflow-visible"
            style={{ backgroundColor: "#082644" }}
          >

            {/* Year banner */}
            {showYear && game && (
              <div className="mx-4 mt-4 rounded-xl bg-[#2eaafd]/20 border border-[#2eaafd]/30 px-4 py-2.5 flex items-center justify-center gap-2">
                <span className="text-[#2eaafd] font-bold text-lg">{game.year} NFL Draft</span>
              </div>
            )}

            {/* Pick board */}
            <div className={`p-4 flex flex-col gap-2 transition-transform ${shake ? "animate-shake" : ""}`}>
              {(game?.picks ?? []).map(pick => (
                <PickRow key={pick.id} pick={pick} hintLevel={hintLevel} completed={completed} />
              ))}
            </div>

            {/* Hint progress */}
            <div className="px-4 pb-3">
              <HintBar hintLevel={hintLevel} completed={completed} />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-white/30 text-[10px] uppercase tracking-wider">
                  {hintLevel === 0 ? "No hints revealed" : `${hintLevel} hint${hintLevel !== 1 ? "s" : ""} revealed`}
                </span>
                {!completed && (
                  <span className="text-white/40 text-xs">
                    {guessesLeft} guess{guessesLeft !== 1 ? "es" : ""} remaining
                  </span>
                )}
              </div>
            </div>

            {/* ── Input area ────────────────────────────────────────────── */}
            {!completed && (
              <div className="px-4 pb-4 border-t border-white/10 pt-4">
                <div ref={wrapperRef} className="relative flex gap-2">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={guess}
                      onChange={e => { setGuess(e.target.value); setDropdown(true) }}
                      onFocus={() => { if (guess.trim()) setDropdown(true) }}
                      onKeyDown={handleKey}
                      placeholder="Search NFL teams…"
                      disabled={submitting}
                      autoComplete="off"
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#2eaafd]/60 focus:ring-1 focus:ring-[#2eaafd]/40 disabled:opacity-50 transition"
                    />

                    {/* Dropdown */}
                    {dropdown && filtered.length > 0 && (
                      <div
                        className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-white/10 overflow-hidden z-50 shadow-2xl"
                        style={{ backgroundColor: "#0a2d52" }}
                      >
                        {filtered.map(team => (
                          <button
                            key={team}
                            type="button"
                            onMouseDown={() => selectTeam(team)}
                            className="w-full text-left px-4 py-2.5 text-white/90 hover:bg-white/10 hover:text-white text-sm transition-colors"
                          >
                            {team}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleGuess}
                    disabled={!guess.trim() || submitting}
                    className="shrink-0 bg-[#2eaafd] hover:bg-[#2eaafd]/80 text-white font-bold px-5 rounded-xl"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guess"}
                  </Button>
                </div>
              </div>
            )}

            {/* ── Completion state ──────────────────────────────────────── */}
            {completed && (
              <div className={`mx-4 mb-4 rounded-xl px-5 py-4 ${
                solved
                  ? "bg-emerald-500/15 border border-emerald-500/30"
                  : "bg-red-500/10 border border-red-500/20"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    solved ? "bg-emerald-500" : "bg-red-500"
                  }`}>
                    {solved
                      ? <Trophy className="h-5 w-5 text-white" />
                      : <X className="h-5 w-5 text-white" />}
                  </div>
                  <div>
                    <p className={`font-bold text-base ${solved ? "text-emerald-300" : "text-red-300"}`}>
                      {solved ? "Correct!" : "Better luck next time!"}
                    </p>
                    <p className="text-white/70 text-sm mt-0.5">
                      {solved
                        ? `You identified the ${game?.year} ${correctTeam} draft class in ${guesses.length} guess${guesses.length !== 1 ? "es" : ""}.`
                        : `The answer was the ${game?.year} ${correctTeam}.`}
                    </p>
                  </div>
                </div>
                <p className="text-white/30 text-xs mt-3">Come back tomorrow for a new puzzle.</p>
              </div>
            )}

            {/* ── Previous guesses ──────────────────────────────────────── */}
            {guesses.length > 0 && (
              <div className="px-4 pb-4 border-t border-white/10 pt-4">
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">
                  {guesses.length} guess{guesses.length !== 1 ? "es" : ""}
                </p>
                <div className="flex flex-col gap-1.5">
                  {guesses.map((g, i) => {
                    const isCorrect = solved && i === guesses.length - 1
                    return <GuessChip key={i} guess={g} correct={isCorrect} />
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Hint legend (below card) */}
          <div className="mt-4 rounded-xl border border-white/10 px-4 py-3" style={{ backgroundColor: "#082644" }}>
            <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">Hint progression</p>
            <div className="space-y-1">
              {[
                { level: 0, label: "Start",           desc: "Round & overall pick" },
                { level: 1, label: "1 wrong guess",   desc: "Draft year revealed" },
                { level: 2, label: "2 wrong guesses", desc: "Positions revealed" },
                { level: 3, label: "3 wrong guesses", desc: "Later-round player names" },
                { level: 4, label: "4 wrong guesses", desc: "All player names" },
                { level: 5, label: "5 wrong guesses", desc: "Game over" },
              ].map(row => (
                <div key={row.level} className="flex items-center gap-2 text-xs">
                  <span className={`shrink-0 font-medium ${hintLevel > row.level ? "text-amber-400" : "text-white/30"}`}>
                    {row.label}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className={hintLevel > row.level ? "text-white/60" : "text-white/20"}>
                    {row.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
