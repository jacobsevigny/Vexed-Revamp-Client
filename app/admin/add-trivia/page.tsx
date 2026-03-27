"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Stepper } from '@/components/ui/stepper'
import { SectionCard } from '@/components/ui/section-card'
import { AutocompleteInput } from '@/components/ui/autocomplete-input'
import { ReviewCard } from '@/components/ui/review-card'
import { useToast } from '@/hooks/use-toast'
const Calendar = dynamic(() => import('@/components/ui/calendar').then((m) => m.Calendar), { ssr: false })


const ANSWER_CATEGORIES = [
  "NBA Players",
  "NBA Teams",
  "NHL Players",
  "NHL Teams",
  "NFL Players",
  "NFL Teams",
]
const CAREER_PLAYER_CATEGORIES = [
  "NFL Players",
  "NHL Players",
  "NBA Players",
]


export default function AddTriviaPage() {
  // Step state: 0 = date, 1 = daily quest, 2 = fan feud, 3 = career path, 4 = review
  const [step, setStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // Daily Quest state
  const [dailyQuestQuestions, setDailyQuestQuestions] = useState(Array(5).fill(null).map(() => ({ question: "", category: "" })))
  const [dailyQuestAnswers, setDailyQuestAnswers] = useState(Array(5).fill(""))
  const [dailyQuestLoading, setDailyQuestLoading] = useState(Array(5).fill(false))

  // Suggestions cache by db key
  const [suggestionsByDb, setSuggestionsByDb] = useState<Record<string, string[]>>({})

  // Fan Feud state
  const [fanFeudQuestion, setFanFeudQuestion] = useState("")
  const [fanFeudCategory, setFanFeudCategory] = useState("")
  const [fanFeudAnswers, setFanFeudAnswers] = useState(Array(8).fill(""))
  const [fanFeudLoading, setFanFeudLoading] = useState(false)
  const [fanFeudSuggestions, setFanFeudSuggestions] = useState<string[]>([])

  // Career Path state
  const [careerPathCategory, setCareerPathCategory] = useState("")
  const [careerPathPlayer, setCareerPathPlayer] = useState("")
  const [careerPathTeams, setCareerPathTeams] = useState([""])
  const [careerPathPlayerSuggestions, setCareerPathPlayerSuggestions] = useState<string[]>([])
  const [careerPathTeamSuggestions, setCareerPathTeamSuggestions] = useState<string[]>([])
  const [careerPathPlayerLoading, setCareerPathPlayerLoading] = useState(false)
  const [careerPathTeamLoading, setCareerPathTeamLoading] = useState(false)

  // Validation state
  const [validation, setValidation] = useState<any>({})
  const [submitting, setSubmitting] = useState(false)

  const { toast } = useToast()

  // map UI category -> server `db` query param
  const mapCategoryToDb = (category: string) => {
    switch (category) {
      case 'NBA Players': return 'nba_players'
      case 'NBA Teams': return 'nba_teams'
      case 'NHL Players': return 'nhl_players'
      case 'NHL Teams': return 'nhl_teams'
      case 'NFL Players': return 'nfl_players'
      case 'NFL Teams': return 'nfl_teams'
      default: return ''
    }
  }

  // normalize for matching: strip diacritics/punctuation, lowercase and trim
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase()
      .trim()

  const fetchAllNames = async (dbKey: string, setLoading?: (b: boolean) => void) => {
    if (!dbKey) return []
    try {
      if (setLoading) setLoading(true)
      if (suggestionsByDb[dbKey]) {
        if (setLoading) setLoading(false)
        return suggestionsByDb[dbKey]
      }
      const res = await fetch(`/api/allnames?db=${encodeURIComponent(dbKey)}`)
      if (!res.ok) {
        if (setLoading) setLoading(false)
        return []
      }
      const data = await res.json()
      setSuggestionsByDb((prev) => ({ ...prev, [dbKey]: data }))
      if (setLoading) setLoading(false)
      return data
    } catch (e) {
      if (setLoading) setLoading(false)
      return []
    }
  }


  // --- Step 1: Date selection ---
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setValidation((v: any) => ({ ...v, date: undefined }))
  }

  const handleContinueDate = () => {
    if (!selectedDate) {
      setValidation((v: any) => ({ ...v, date: 'Please select a date.' }))
      return
    }
    setStep(1)
  }

  // On client mount, set the default date to today. This avoids the server
  // rendering a Date-derived attribute that may format differently than the
  // client (causing hydration mismatch errors).

  useEffect(() => {
    if (selectedDate === undefined) setSelectedDate(new Date())
  }, [])


  // --- Career Path team controls ---
  const handleAddTeam = () => {
    setCareerPathTeams([...careerPathTeams, ""])
  }
  const handleRemoveTeam = (index: number) => {
    if (careerPathTeams.length > 1) {
      setCareerPathTeams(careerPathTeams.filter((_, i) => i !== index))
    }
  }


  // --- Step 5: Review & Publish ---
  const handlePublish = async () => {
    setSubmitting(true)
    setValidation({})
    // Validate all steps again before submit
    // (Validation logic omitted here for brevity, but should be similar to previous logic)
    // ...
    const dateKey = selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    const dailyQuestionsPayload = dailyQuestQuestions.map((q, idx) => ({
      text: q.question,
      answer: (dailyQuestAnswers[idx] || '').trim(),
      answersDb: mapCategoryToDb(q.category),
    }))
    const fanFeudPayload = {
      question: fanFeudQuestion,
      answersDb: mapCategoryToDb(fanFeudCategory),
      answers: fanFeudAnswers.map((a) => (a || '').trim()),
    }
    const careerPathPayload = {
      playerName: careerPathPlayer.trim(),
      answersTable: mapCategoryToDb(careerPathCategory),
      teams: careerPathTeams.map((t) => (t || '').trim()),
    }
    const payload = {
      date: dateKey,
      dailyQuestions: dailyQuestionsPayload,
      fanFeud: fanFeudPayload,
      careerPath: careerPathPayload,
    }
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
      const headers: Record<string,string> = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch('/api/admin/add-questions', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }))
        toast({ title: 'Failed to submit trivia', description: err.error || res.statusText, variant: 'destructive' })
        setSubmitting(false)
        return
      }
      toast({ title: 'Trivia published!', description: 'Trivia for ' + dateKey + ' was published successfully.' })
      setSubmitting(false)
      setStep(0)
      // Optionally reset all state here
    } catch (error: any) {
      toast({ title: 'Failed to submit trivia', description: error?.message || String(error), variant: 'destructive' })
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-[#2eaafd] pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Admin: Add Trivia Content</h1>
          <Stepper currentStep={step} />

          {/* Step 1: Date selection */}
          {step === 0 && (
            <SectionCard title="Step 1: Choose Date" description="Select the date for which you want to create trivia.">
              <div className="flex flex-col items-center gap-4">
                <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} className="rounded-md border" />
                {validation.date && <div className="text-red-500 text-sm mt-2">{validation.date}</div>}
                <Button size="lg" className="mt-4 w-full max-w-xs" onClick={handleContinueDate}>Continue</Button>
              </div>
            </SectionCard>
          )}

          {/* Step 2: Daily Quest builder */}
          {step === 1 && (
            <SectionCard title="Step 2: Build Daily Quest" description="Enter 5 Daily Quest questions, each with a category and answer.">
              <Accordion type="multiple" className="mb-4">
                {dailyQuestQuestions.map((q, i) => (
                  <AccordionItem key={i} value={`q${i}`}>
                    <AccordionTrigger>
                      <span className="font-semibold text-base">Question {i + 1}</span>
                      <span className={q.question && q.category && dailyQuestAnswers[i] ? 'text-green-600 font-medium ml-2' : 'text-yellow-600 font-medium ml-2'}>
                        {q.question && q.category && dailyQuestAnswers[i] ? 'Ready' : 'Incomplete'}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <Label>Question Text</Label>
                        <Input
                          placeholder="Enter trivia question"
                          value={q.question}
                          onChange={e => {
                            const updated = [...dailyQuestQuestions]
                            updated[i].question = e.target.value
                            setDailyQuestQuestions(updated)
                          }}
                        />
                        <Label>Answer Category</Label>
                        <Select
                          value={q.category}
                          onValueChange={async (value) => {
                            const updated = [...dailyQuestQuestions]
                            updated[i].category = value
                            setDailyQuestQuestions(updated)
                            // preload suggestions for this category into cache
                            const db = mapCategoryToDb(value)
                            if (db) await fetchAllNames(db, (b) => setDailyQuestLoading(l => { const arr = [...l]; arr[i] = b; return arr }))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select answer category" />
                          </SelectTrigger>
                          <SelectContent>
                            {ANSWER_CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Label>Answer</Label>
                        <AutocompleteInput
                          value={dailyQuestAnswers[i]}
                          onChange={val => {
                            const updated = [...dailyQuestAnswers]
                            updated[i] = val
                            setDailyQuestAnswers(updated)
                          }}
                          onSelect={val => {
                            const updated = [...dailyQuestAnswers]
                            updated[i] = val
                            setDailyQuestAnswers(updated)
                          }}
                          suggestions={suggestionsByDb[mapCategoryToDb(q.category)] || []}
                          placeholder="Type or select an answer"
                          loading={dailyQuestLoading[i]}
                          exactMatch
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={() => setStep(2)} disabled={dailyQuestQuestions.some((q, i) => !q.question || !q.category || !dailyQuestAnswers[i])}>Continue</Button>
              </div>
            </SectionCard>
          )}

          {/* Step 3: Fan Feud builder */}
          {step === 2 && (
            <SectionCard title="Step 3: Build Fan Feud" description="Enter the Fan Feud prompt and up to 8 ranked answers.">
              <div className="flex flex-col gap-4">
                <Label>Fan Feud Prompt</Label>
                <Input
                  placeholder="Enter Fan Feud question"
                  value={fanFeudQuestion}
                  onChange={e => setFanFeudQuestion(e.target.value)}
                />
                <Label>Answer Category</Label>
                <Select
                  value={fanFeudCategory}
                  onValueChange={async (val) => {
                    setFanFeudCategory(val)
                    const db = mapCategoryToDb(val)
                    if (db) setFanFeudSuggestions(await fetchAllNames(db, setFanFeudLoading))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select answer category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ANSWER_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fanFeudAnswers.map((answer, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <Label>Rank {i + 1}</Label>
                      <AutocompleteInput
                        value={answer}
                        onChange={val => {
                          const updated = [...fanFeudAnswers]
                          updated[i] = val
                          setFanFeudAnswers(updated)
                        }}
                        onSelect={val => {
                          const updated = [...fanFeudAnswers]
                          updated[i] = val
                          setFanFeudAnswers(updated)
                        }}
                        suggestions={fanFeudSuggestions}
                        placeholder={`Answer ${i + 1}`}
                        loading={fanFeudLoading}
                        exactMatch
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} disabled={!fanFeudQuestion || !fanFeudCategory || fanFeudAnswers.some(a => !a)}>
                  Continue
                </Button>
              </div>
            </SectionCard>
          )}

          {/* Step 4: Career Path builder */}
          {step === 3 && (
            <SectionCard title="Step 4: Build Career Path" description="Select a player and their career team path.">
              <div className="flex flex-col gap-4">
                <Label>Player Category</Label>
                <Select
                  value={careerPathCategory}
                  onValueChange={async (val) => {
                    setCareerPathCategory(val)
                    // players db (e.g. nfl_players)
                    const playersDb = mapCategoryToDb(val)
                    // derive teams db from player category (e.g. nfl_teams)
                    const teamsDb = (() => {
                      switch (val) {
                        case 'NFL Players': return 'nfl_teams'
                        case 'NHL Players': return 'nhl_teams'
                        case 'NBA Players': return 'nba_teams'
                        default: return ''
                      }
                    })()
                    if (playersDb) setCareerPathPlayerSuggestions(await fetchAllNames(playersDb, setCareerPathPlayerLoading))
                    if (teamsDb) setCareerPathTeamSuggestions(await fetchAllNames(teamsDb, setCareerPathTeamLoading))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select player category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAREER_PLAYER_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label>Player</Label>
                <AutocompleteInput
                  value={careerPathPlayer}
                  onChange={setCareerPathPlayer}
                  onSelect={setCareerPathPlayer}
                  suggestions={careerPathPlayerSuggestions}
                  placeholder="Enter player name"
                  loading={careerPathPlayerLoading}
                  exactMatch
                />
                <Label>Team Path (chronological)</Label>
                <div className="flex flex-col gap-2">
                  {careerPathTeams.map((team, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <AutocompleteInput
                        value={team}
                        onChange={val => {
                          const updated = [...careerPathTeams]
                          updated[i] = val
                          setCareerPathTeams(updated)
                        }}
                        onSelect={val => {
                          const updated = [...careerPathTeams]
                          updated[i] = val
                          setCareerPathTeams(updated)
                        }}
                        suggestions={careerPathTeamSuggestions}
                        placeholder={`Team ${i + 1}`}
                        loading={careerPathTeamLoading}
                        exactMatch
                      />
                      {careerPathTeams.length > 1 && (
                        <Button type="button" size="icon" variant="destructive" onClick={() => handleRemoveTeam(i)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" size="sm" className="mt-2 w-fit" onClick={handleAddTeam}>
                    <Plus className="w-4 h-4 mr-1" /> Add Team
                  </Button>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} disabled={!careerPathCategory || !careerPathPlayer || careerPathTeams.some(t => !t)}>
                  Continue
                </Button>
              </div>
            </SectionCard>
          )}

          {/* Step 5: Review & Publish */}
          {step === 4 && (
            <SectionCard title="Step 5: Review & Publish" description="Review your trivia content and publish.">
              <div className="flex flex-col gap-4">
                <ReviewCard title="Date">
                  <div>{selectedDate?.toLocaleDateString()}</div>
                </ReviewCard>
                <ReviewCard title="Daily Quest Questions">
                  <ol className="list-decimal ml-6">
                    {dailyQuestQuestions.map((q, i) => (
                      <li key={i} className="mb-1">
                        <span className="font-semibold">{q.question}</span> <span className="text-blue-700">[{q.category}]</span> <span className="text-green-700">Answer: {dailyQuestAnswers[i]}</span>
                      </li>
                    ))}
                  </ol>
                </ReviewCard>
                <ReviewCard title="Fan Feud">
                  <div className="font-semibold mb-1">{fanFeudQuestion}</div>
                  <div className="text-blue-700 mb-2">[{fanFeudCategory}]</div>
                  <ol className="list-decimal ml-6">
                    {fanFeudAnswers.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ol>
                </ReviewCard>
                <ReviewCard title="Career Path">
                  <div className="font-semibold mb-1">{careerPathPlayer}</div>
                  <div className="text-blue-700 mb-2">[{careerPathCategory}]</div>
                  <div className="flex flex-wrap gap-2">
                    {careerPathTeams.map((t, i) => (
                      <span key={i} className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </ReviewCard>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(3)}>Back to Edit</Button>
                <Button onClick={handlePublish} loading={submitting} className="bg-[#2a569c] hover:bg-[#1e4070] text-white font-bold text-lg">
                  Publish Trivia for {selectedDate?.toLocaleDateString()}
                </Button>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
