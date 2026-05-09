"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { AutocompleteInput } from "@/components/ui/autocomplete-input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Plus, Trash2, CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { authFetch } from "@/lib/api"
import { useRouter } from "next/navigation"

const Calendar = dynamic(() => import("@/components/ui/calendar").then(m => m.Calendar), { ssr: false })

// ─── Types ────────────────────────────────────────────────────────────────────

type DQQuestion = { text: string; answer: string; answersDb: string }
type CPTeam     = { name: string; years: string }
type DcPick     = { round: string; pickOverall: string; position: string; playerName: string; college: string }

const BLANK_DQ: DQQuestion = { text: "", answer: "", answersDb: "" }
const BLANK_TEAM: CPTeam   = { name: "", years: "" }
const BLANK_PICK: DcPick   = { round: "", pickOverall: "", position: "", playerName: "", college: "" }

// ─── Category helpers ─────────────────────────────────────────────────────────

const DB_CATEGORIES: { label: string; value: string }[] = [
  { label: "NFL Players", value: "nfl_players" },
  { label: "NFL Teams",   value: "nfl_teams"   },
  { label: "NBA Players", value: "nba_players" },
  { label: "NBA Teams",   value: "nba_teams"   },
  { label: "NHL Players", value: "nhl_players" },
  { label: "NHL Teams",   value: "nhl_teams"   },
]

const SPORT_OPTIONS: { label: string; players: string; teams: string }[] = [
  { label: "NFL", players: "nfl_players", teams: "nfl_teams" },
  { label: "NBA", players: "nba_players", teams: "nba_teams" },
  { label: "NHL", players: "nhl_players", teams: "nhl_teams" },
]

const dbToSport = (db: string) => {
  if (db.startsWith("nba")) return "NBA"
  if (db.startsWith("nhl")) return "NHL"
  return "NFL"
}

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

const dateToStr = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

// ─── Reusable dark-theme select classes ───────────────────────────────────────
const DARK_TRIGGER = "w-full bg-white/5 border-white/20 text-white hover:bg-white/10 focus:border-white/40 data-[placeholder]:text-white/40 [&_svg]:text-white/50"
const DARK_CONTENT = "bg-[#0a2d52] border-white/20 text-white"
const DARK_ITEM    = "text-white focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10"

// ─── Page ─────────────────────────────────────────────────────────────────────

// Guard wrapper — keeps all hooks in the inner component so there are no
// Rules-of-Hooks violations from conditional returns.
export default function AddTriviaPage() {
  const { user, isAuthenticated, isHydrated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated) return
    if (!isAuthenticated) { router.replace("/login?redirect=/admin/add-trivia"); return }
    if (!user?.isAdmin)   { router.replace("/unauthorized"); return }
  }, [isHydrated, isAuthenticated, user, router])

  if (!isHydrated || !isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2eaafd" }}>
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    )
  }

  return <AddTriviaContent />
}

// All form state and logic live here — only rendered once the guard passes.
function AddTriviaContent() {
  const { user } = useAuth()
  const { toast } = useToast()

  // Date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const dateStr = dateToStr(selectedDate)

  // Loading / existing data status
  const [loadingDate, setLoadingDate] = useState(false)
  const [hasExisting, setHasExisting] = useState<{ dq: boolean; ff: boolean; cp: boolean; dc: boolean } | null>(null)

  // Suggestions cache: dbKey → string[]
  const [cache, setCache] = useState<Record<string, string[]>>({})
  const fetchingRef = useRef<Set<string>>(new Set())

  const fetchNames = useCallback(async (db: string) => {
    if (!db || cache[db] || fetchingRef.current.has(db)) return
    fetchingRef.current.add(db)
    try {
      const res = await fetch(`/api/allnames?db=${encodeURIComponent(db)}`)
      if (res.ok) {
        const data: string[] = await res.json()
        setCache(prev => ({ ...prev, [db]: data }))
      }
    } finally {
      fetchingRef.current.delete(db)
    }
  }, [cache])

  // ── Daily Quest ──────────────────────────────────────────────────────────────
  const [dqQuestions, setDqQuestions] = useState<DQQuestion[]>(() => Array(5).fill(null).map(() => ({ ...BLANK_DQ })))

  const setDQ = (i: number, patch: Partial<DQQuestion>) =>
    setDqQuestions(prev => prev.map((q, idx) => idx === i ? { ...q, ...patch } : q))

  // ── Fan Feud ─────────────────────────────────────────────────────────────────
  const [ffQuestion, setFfQuestion] = useState("")
  const [ffDb, setFfDb]             = useState("")
  const [ffAnswers, setFfAnswers]   = useState<string[]>(Array(8).fill(""))

  // ── Career Path ──────────────────────────────────────────────────────────────
  const [cpSport,  setCpSport]  = useState("NFL")
  const [cpPlayer, setCpPlayer] = useState("")
  const [cpTeams,  setCpTeams]  = useState<CPTeam[]>([{ ...BLANK_TEAM }])

  // ── Draft Class ───────────────────────────────────────────────────────────────
  const [dcTeam,  setDcTeam]  = useState("")
  const [dcYear,  setDcYear]  = useState("")
  const [dcPicks, setDcPicks] = useState<DcPick[]>([{ ...BLANK_PICK }])

  const updateDcPick = (i: number, patch: Partial<DcPick>) =>
    setDcPicks(prev => prev.map((p, idx) => idx === i ? { ...p, ...patch } : p))

  const cpSportOpt  = SPORT_OPTIONS.find(s => s.label === cpSport) || SPORT_OPTIONS[0]
  const cpPlayersDb = cpSportOpt.players
  const cpTeamsDb   = cpSportOpt.teams

  // ── Prefetch suggestions when categories are set ─────────────────────────────
  useEffect(() => {
    dqQuestions.forEach(q => { if (q.answersDb) fetchNames(q.answersDb) })
  }, [dqQuestions, fetchNames])

  useEffect(() => { if (ffDb) fetchNames(ffDb) }, [ffDb, fetchNames])

  useEffect(() => {
    fetchNames(cpPlayersDb)
    fetchNames(cpTeamsDb)
  }, [cpPlayersDb, cpTeamsDb, fetchNames])

  // ── Load existing data when date changes ─────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoadingDate(true)
      setHasExisting(null)
      try {
        const res = await authFetch(`/api/admin/trivia-by-date?date=${dateStr}`)
        if (cancelled || !res.ok) return
        const data = await res.json()
        if (cancelled) return

        const hasDQ = !!(data.dailyQuest?.length)
        const hasFF = !!data.fanFeud
        const hasCP = !!data.careerPath
        const hasDC = !!data.draftClass
        setHasExisting({ dq: hasDQ, ff: hasFF, cp: hasCP, dc: hasDC })

        setDqQuestions(Array(5).fill(null).map((_, i) => {
          const q = data.dailyQuest?.[i]
          return q ? { text: q.text, answer: q.answer, answersDb: q.answersDb } : { ...BLANK_DQ }
        }))

        if (hasFF) {
          setFfQuestion(data.fanFeud.question)
          setFfDb(data.fanFeud.answersDb || "")
          setFfAnswers(Array(8).fill("").map((_, i) => data.fanFeud.answers[i] || ""))
        } else {
          setFfQuestion(""); setFfDb(""); setFfAnswers(Array(8).fill(""))
        }

        if (hasCP) {
          setCpSport(dbToSport(data.careerPath.answersTable))
          setCpPlayer(data.careerPath.playerName)
          setCpTeams(data.careerPath.teams.length
            ? data.careerPath.teams.map((t: any) => ({ name: t.name, years: t.years || "" }))
            : [{ ...BLANK_TEAM }]
          )
        } else {
          setCpPlayer(""); setCpTeams([{ ...BLANK_TEAM }])
        }

        if (hasDC) {
          setDcTeam(data.draftClass.teamName || "")
          setDcYear(String(data.draftClass.year || ""))
          setDcPicks(data.draftClass.picks?.length
            ? data.draftClass.picks.map((p: any) => ({
                round:       String(p.round       || ""),
                pickOverall: String(p.pickOverall  || ""),
                position:    p.position   || "",
                playerName:  p.playerName || "",
                college:     p.college    || "",
              }))
            : [{ ...BLANK_PICK }]
          )
        } else {
          setDcTeam(""); setDcYear(""); setDcPicks([{ ...BLANK_PICK }])
        }
      } catch {
        // silently ignore
      } finally {
        if (!cancelled) setLoadingDate(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [dateStr])

  // ── Validation ───────────────────────────────────────────────────────────────
  const [errors, setErrors] = useState<string[]>([])

  const validate = (): boolean => {
    const errs: string[] = []
    dqQuestions.forEach((q, i) => {
      if (!q.text.trim())   errs.push(`Daily Quest Q${i + 1}: question text required`)
      if (!q.answersDb)     errs.push(`Daily Quest Q${i + 1}: answer category required`)
      if (!q.answer.trim()) errs.push(`Daily Quest Q${i + 1}: answer required`)
    })
    if (!ffQuestion.trim()) errs.push("Fan Feud: question required")
    if (!ffDb)              errs.push("Fan Feud: answer category required")
    if (!ffAnswers.some(a => a.trim())) errs.push("Fan Feud: at least one answer required")
    if (!cpPlayer.trim())   errs.push("Career Path: player name required")
    if (!cpTeams.some(t => t.name.trim())) errs.push("Career Path: at least one team required")
    setErrors(errs)
    return errs.length === 0
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async () => {
    setSubmitSuccess(false)
    if (!validate()) {
      document.getElementById("error-summary")?.scrollIntoView({ behavior: "smooth" })
      return
    }
    setSubmitting(true)
    try {
      const res = await authFetch("/api/admin/add-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateStr,
          dailyQuestions: dqQuestions.map(q => ({ text: q.text.trim(), answer: q.answer.trim(), answersDb: q.answersDb })),
          fanFeud: { question: ffQuestion.trim(), answersDb: ffDb, answers: ffAnswers.map(a => a.trim()) },
          careerPath: { playerName: cpPlayer.trim(), answersTable: cpPlayersDb, teams: cpTeams.map(t => ({ name: t.name.trim(), years: t.years.trim() })) },
          draftClass: dcTeam.trim() ? {
            teamName: dcTeam.trim(),
            year:     parseInt(dcYear) || new Date().getFullYear(),
            picks:    dcPicks.filter(p => p.round && p.pickOverall).map(p => ({
              round:       parseInt(p.round),
              pickOverall: parseInt(p.pickOverall),
              position:    p.position.trim(),
              playerName:  p.playerName.trim(),
              college:     p.college.trim() || null,
            })),
          } : null,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        toast({ title: "Failed to save", description: err.error, variant: "destructive" })
        return
      }

      setSubmitSuccess(true)
      setHasExisting({ dq: true, ff: true, cp: true, dc: !!dcTeam.trim() })
      toast({ title: "Trivia published!", description: `Saved for ${formatDate(selectedDate)}.` })
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (e: unknown) {
      toast({ title: "Failed to save", description: e instanceof Error ? e.message : "Network error", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────

  // Dark-themed input class used on every text input/textarea in this page
  const DARK_INPUT = "bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:border-white/50 focus-visible:ring-white/20"

  const anyExisting = hasExisting && (hasExisting.dq || hasExisting.ff || hasExisting.cp || hasExisting.dc)

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-20 px-4" style={{ backgroundColor: "#2eaafd" }}>
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Add Trivia Content</h1>
            <p className="text-white/70 mt-2">Pick a date, fill in all three games, then publish.</p>
          </div>

          {/* Success banner */}
          {submitSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span className="text-emerald-300 font-medium">
                Trivia for {formatDate(selectedDate)} published successfully.
              </span>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* DATE                                                               */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <section className="rounded-2xl shadow-xl border border-white/10 p-6 mb-6" style={{ backgroundColor: "#082644" }}>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#2eaafd]" />
              Date
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[260px] justify-start text-left font-medium bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#2eaafd]" />
                    {formatDate(selectedDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#082644] border-white/10" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={d => { if (d) { setSelectedDate(d); setCalendarOpen(false) } }}
                    initialFocus
                    className="text-white [&_button]:text-white [&_button:hover]:bg-white/10 [&_button[aria-selected]]:bg-[#2eaafd] [&_button[aria-selected]]:text-white [&_button.day-outside]:text-white/30"
                  />
                </PopoverContent>
              </Popover>

              {loadingDate && (
                <span className="flex items-center gap-2 text-sm text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                </span>
              )}
              {!loadingDate && anyExisting && (
                <span className="flex items-center gap-2 text-sm bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg px-3 py-1.5">
                  <RefreshCw className="h-4 w-4 shrink-0" />
                  Existing trivia found — submitting will replace it.
                </span>
              )}
              {!loadingDate && hasExisting && !anyExisting && (
                <span className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                  <CheckCircle2 className="h-4 w-4" /> No trivia yet for this date.
                </span>
              )}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* DAILY QUEST                                                        */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <section className="rounded-2xl shadow-xl border border-white/10 p-6 mb-6" style={{ backgroundColor: "#082644" }}>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h2 className="text-xl font-bold text-white">Daily Quest</h2>
                <span className="ml-auto text-sm text-white/50">
                  {dqQuestions.filter(q => q.text && q.answersDb && q.answer).length}/5 ready
                </span>
              </div>
              <p className="text-white/50 text-sm mt-1">Five questions — each needs a question, category, and answer.</p>
            </div>

            <Accordion type="multiple" className="space-y-2">
              {dqQuestions.map((q, i) => {
                const ready = !!(q.text && q.answersDb && q.answer)
                return (
                  <AccordionItem
                    key={i}
                    value={`dq-${i}`}
                    className="border border-white/10 rounded-xl overflow-visible"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5 rounded-xl text-white [&>svg]:text-white/50">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white">Question {i + 1}</span>
                        {ready
                          ? <span className="text-xs font-medium text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-2 py-0.5">Ready</span>
                          : <span className="text-xs font-medium text-amber-400 bg-amber-500/15 border border-amber-500/25 rounded-full px-2 py-0.5">Incomplete</span>
                        }
                        {q.text && <span className="text-sm text-white/30 truncate max-w-[200px]">{q.text}</span>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-2 overflow-visible">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-4">
                        <div>
                          <Label className="mb-1.5 block text-sm font-medium text-white/80">Question Text</Label>
                          <Textarea
                            placeholder="e.g. Who holds the NFL record for most passing yards in a single season?"
                            value={q.text}
                            onChange={e => setDQ(i, { text: e.target.value })}
                            rows={2}
                            className={`resize-none ${DARK_INPUT}`}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="mb-1.5 block text-sm font-medium text-white/80">Answer Category</Label>
                            <Select
                              value={q.answersDb}
                              onValueChange={db => {
                                setDQ(i, { answersDb: db, answer: "" })
                                fetchNames(db)
                              }}
                            >
                              <SelectTrigger className={DARK_TRIGGER}>
                                <SelectValue placeholder="Select category…" />
                              </SelectTrigger>
                              <SelectContent className={DARK_CONTENT}>
                                {DB_CATEGORIES.map(c => (
                                  <SelectItem key={c.value} value={c.value} className={DARK_ITEM}>{c.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="mb-1.5 block text-sm font-medium text-white/80">Correct Answer</Label>
                            <AutocompleteInput
                              value={q.answer}
                              onChange={val => setDQ(i, { answer: val })}
                              onSelect={val => setDQ(i, { answer: val })}
                              suggestions={cache[q.answersDb] || []}
                              placeholder={q.answersDb ? "Start typing…" : "Select a category first"}
                              disabled={!q.answersDb}
                              exactMatch
                              className={DARK_INPUT}
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </section>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* FAN FEUD                                                           */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <section className="rounded-2xl shadow-xl border border-white/10 p-6 mb-6" style={{ backgroundColor: "#082644" }}>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <h2 className="text-xl font-bold text-white">Fan Feud</h2>
              </div>
              <p className="text-white/50 text-sm mt-1">One question with 1–8 ranked answers. Top answer = rank 1.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label className="mb-1.5 block text-sm font-medium text-white/80">Question</Label>
                <Textarea
                  placeholder="e.g. Name a player who has won both a Super Bowl and an MVP award."
                  value={ffQuestion}
                  onChange={e => setFfQuestion(e.target.value)}
                  rows={2}
                  className={`resize-none ${DARK_INPUT}`}
                />
              </div>

              <div>
                <Label className="mb-1.5 block text-sm font-medium text-white/80">Answer Category</Label>
                <Select
                  value={ffDb}
                  onValueChange={db => { setFfDb(db); setFfAnswers(Array(8).fill("")); fetchNames(db) }}
                >
                  <SelectTrigger className={`max-w-xs ${DARK_TRIGGER}`}>
                    <SelectValue placeholder="Select category…" />
                  </SelectTrigger>
                  <SelectContent className={DARK_CONTENT}>
                    {DB_CATEGORIES.map(c => (
                      <SelectItem key={c.value} value={c.value} className={DARK_ITEM}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium text-white/80">
                  Answers{" "}
                  <span className="text-white/40 font-normal">(rank 1 = most popular, leave trailing slots blank)</span>
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ffAnswers.map((answer, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/30 w-6 text-right shrink-0">#{i + 1}</span>
                      <AutocompleteInput
                        value={answer}
                        onChange={val => setFfAnswers(prev => prev.map((a, idx) => idx === i ? val : a))}
                        onSelect={val => setFfAnswers(prev => prev.map((a, idx) => idx === i ? val : a))}
                        suggestions={cache[ffDb] || []}
                        placeholder={i === 0 ? "Most popular answer…" : `Rank ${i + 1}…`}
                        disabled={!ffDb}
                        exactMatch
                        className={DARK_INPUT}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* CAREER PATH                                                        */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <section className="rounded-2xl shadow-xl border border-white/10 p-6 mb-6" style={{ backgroundColor: "#082644" }}>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                <h2 className="text-xl font-bold text-white">Career Path</h2>
              </div>
              <p className="text-white/50 text-sm mt-1">Pick a player and list teams in chronological order. Years are optional.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block text-sm font-medium text-white/80">Sport</Label>
                  <Select
                    value={cpSport}
                    onValueChange={sport => { setCpSport(sport); setCpPlayer(""); setCpTeams([{ ...BLANK_TEAM }]) }}
                  >
                    <SelectTrigger className={DARK_TRIGGER}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={DARK_CONTENT}>
                      {SPORT_OPTIONS.map(s => (
                        <SelectItem key={s.label} value={s.label} className={DARK_ITEM}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm font-medium text-white/80">Player</Label>
                  <AutocompleteInput
                    value={cpPlayer}
                    onChange={setCpPlayer}
                    onSelect={setCpPlayer}
                    suggestions={cache[cpPlayersDb] || []}
                    placeholder="Start typing a player name…"
                    exactMatch
                    className={DARK_INPUT}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium text-white/80">
                  Team Path{" "}
                  <span className="text-white/40 font-normal">(chronological order)</span>
                </Label>
                <div className="flex flex-col gap-2">
                  {cpTeams.map((team, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/30 w-6 text-right shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <AutocompleteInput
                          value={team.name}
                          onChange={val => setCpTeams(prev => prev.map((t, idx) => idx === i ? { ...t, name: val } : t))}
                          onSelect={val => setCpTeams(prev => prev.map((t, idx) => idx === i ? { ...t, name: val } : t))}
                          suggestions={cache[cpTeamsDb] || []}
                          placeholder="Team name…"
                          exactMatch
                          className={DARK_INPUT}
                        />
                      </div>
                      <Input
                        value={team.years}
                        onChange={e => setCpTeams(prev => prev.map((t, idx) => idx === i ? { ...t, years: e.target.value } : t))}
                        placeholder="Years (e.g. 2018–2022)"
                        className={`w-40 shrink-0 text-sm ${DARK_INPUT}`}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="shrink-0 text-white/30 hover:text-red-400 hover:bg-red-500/10"
                        disabled={cpTeams.length <= 1}
                        onClick={() => setCpTeams(prev => prev.filter((_, idx) => idx !== i))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-fit mt-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setCpTeams(prev => [...prev, { ...BLANK_TEAM }])}
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Team
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* DRAFT CLASS                                                        */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <section className="rounded-2xl shadow-xl border border-white/10 p-6 mb-6" style={{ backgroundColor: "#082644" }}>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <h2 className="text-xl font-bold text-white">Draft Class</h2>
                <span className="ml-2 text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">Optional</span>
              </div>
              <p className="text-white/50 text-sm mt-1">Enter a team, draft year, and their picks. Leave blank to skip.</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Team + Year row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block text-sm font-medium text-white/80">NFL Team</Label>
                  <AutocompleteInput
                    value={dcTeam}
                    onChange={setDcTeam}
                    onSelect={setDcTeam}
                    suggestions={cache["nfl_teams"] || []}
                    placeholder="e.g. New Orleans Saints"
                    exactMatch
                    className={DARK_INPUT}
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm font-medium text-white/80">Draft Year</Label>
                  <Input
                    value={dcYear}
                    onChange={e => setDcYear(e.target.value)}
                    placeholder="e.g. 2019"
                    type="number"
                    min="1936"
                    max={new Date().getFullYear()}
                    className={DARK_INPUT}
                  />
                </div>
              </div>

              {/* Picks */}
              <div>
                <Label className="mb-2 block text-sm font-medium text-white/80">
                  Draft Picks
                  <span className="text-white/40 font-normal ml-1">(round, overall pick, position, player)</span>
                </Label>

                {/* Header row */}
                <div className="hidden sm:flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-medium text-white/30 uppercase w-6 shrink-0" />
                  <span className="text-[10px] font-medium text-white/30 uppercase w-14 shrink-0">Rd</span>
                  <span className="text-[10px] font-medium text-white/30 uppercase w-20 shrink-0">Pick #</span>
                  <span className="text-[10px] font-medium text-white/30 uppercase w-20 shrink-0">Pos</span>
                  <span className="text-[10px] font-medium text-white/30 uppercase flex-1">Player Name</span>
                  <span className="text-[10px] font-medium text-white/30 uppercase w-32 shrink-0">College</span>
                </div>

                <div className="flex flex-col gap-2">
                  {dcPicks.map((pick, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/30 w-6 text-right shrink-0">{i + 1}</span>
                      <Input
                        value={pick.round}
                        onChange={e => updateDcPick(i, { round: e.target.value })}
                        placeholder="Rd"
                        type="number"
                        min="1"
                        max="7"
                        className={`w-14 shrink-0 text-sm ${DARK_INPUT}`}
                      />
                      <Input
                        value={pick.pickOverall}
                        onChange={e => updateDcPick(i, { pickOverall: e.target.value })}
                        placeholder="Pick"
                        type="number"
                        min="1"
                        max="262"
                        className={`w-20 shrink-0 text-sm ${DARK_INPUT}`}
                      />
                      <Input
                        value={pick.position}
                        onChange={e => updateDcPick(i, { position: e.target.value })}
                        placeholder="QB"
                        className={`w-20 shrink-0 text-sm ${DARK_INPUT}`}
                      />
                      <Input
                        value={pick.playerName}
                        onChange={e => updateDcPick(i, { playerName: e.target.value })}
                        placeholder="Player name…"
                        className={`flex-1 min-w-0 text-sm ${DARK_INPUT}`}
                      />
                      <Input
                        value={pick.college}
                        onChange={e => updateDcPick(i, { college: e.target.value })}
                        placeholder="College"
                        className={`w-28 shrink-0 text-sm ${DARK_INPUT}`}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="shrink-0 text-white/30 hover:text-red-400 hover:bg-red-500/10"
                        disabled={dcPicks.length <= 1}
                        onClick={() => setDcPicks(prev => prev.filter((_, idx) => idx !== i))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-fit mt-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setDcPicks(prev => [...prev, { ...BLANK_PICK }])}
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Pick
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* SUBMIT                                                             */}
          {/* ══════════════════════════════════════════════════════════════════ */}
          <section className="rounded-2xl shadow-xl border border-white/10 p-6" style={{ backgroundColor: "#082644" }} id="error-summary">
            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span className="font-semibold text-red-300">Please fix before submitting:</span>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((e, i) => (
                    <li key={i} className="text-sm text-red-400">{e}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-white/50">
                Saving trivia for{" "}
                <span className="font-semibold text-white">{formatDate(selectedDate)}</span>
                {anyExisting && <span className="text-amber-400"> — will replace existing</span>}
              </div>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-[#2a569c] hover:bg-[#1e4070] text-white font-bold text-base px-8 h-11"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving…</>
                ) : anyExisting ? (
                  "Replace Trivia"
                ) : (
                  "Publish Trivia"
                )}
              </Button>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
