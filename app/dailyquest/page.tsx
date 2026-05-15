"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import QuestionBox from "@/components/daily-quest/question-box"
import QuestionModal from "@/components/daily-quest/question-modal"
import CompleteModal from "@/components/daily-quest/complete-modal"
import { ChevronRight } from 'lucide-react'
import { getDailyQuest, getAllNames, authFetch, type DailyQuestion } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { NoPuzzleToday } from "@/components/no-puzzle-today"
import { HowToPlayModal } from "@/components/how-to-play-modal"
import { GameNavHub } from "@/components/game-nav-hub"

const DAILY_QUEST_STEPS = [
  {
    step: "1",
    title: "Read the Question",
    desc: "Each day brings 5 new sports trivia questions covering the NFL. Click on the first box to read the question and start your quest.",
  },
  {
    step: "2",
    title: "Type Your Answer",
    desc: "Start typing and select from the autocomplete dropdown.",
  },
  {
    step: "3",
    title: "Progress Through All 5",
    desc: "Whether your answer is right or wrong, you advance to the next question. All 5 must be answered to complete the quest.",
  },
  {
    step: "4",
    title: "Score",
    desc: "Earn a point for each correct answer. Log in to save your scores.",
  },
]

type Question = { text: string; answer: string; answers_db: string }
type AnswerRecord = { index: number; correct: boolean; guess: string }
type Status = "loading" | "empty" | "error" | "ready"

const today = new Date().toISOString().split("T")[0]

export default function DailyQuestPage() {
  const [status, setStatus] = useState<Status>("loading")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [answered, setAnswered] = useState<AnswerRecord[]>([])
  const [current, setCurrent] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)
  const [score, setScore] = useState(0)
  const [reviewIndex, setReviewIndex] = useState<number | null>(null)
  const [allNames, setAllNames] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const { isAuthenticated, isHydrated } = useAuth()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const guestKey = () => `trivia_progress_guest_${today}`

  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase()
      .trim()

  const load = useCallback(async () => {
    // Wait until the auth context has finished hydrating from localStorage.
    // Without this guard the page would load twice: once as guest, then again
    // as logged-in user after the context re-renders.
    if (!isHydrated) return

    try {
      setStatus("loading")
      setErrorMsg("")
      const data = await getDailyQuest()
      if (!data) {
        setStatus("empty")
        return
      }

      const mapped: Question[] = data.map((q: DailyQuestion) => ({
        text: q.text,
        answer: q.answer,
        answers_db: q.answers_db,
      }))
      setQuestions(mapped)
      setStatus("ready")

      if (isAuthenticated) {
        // ── Logged-in: load progress from the database ───────────────────���──
        try {
          const res = await authFetch("/api/scores/load", {
            headers: { "Content-Type": "application/json" },
          })
          if (res.ok) {
            const { data: serverData } = await res.json()
            if (serverData?.dailyQuestProgress) {
              const progress = serverData.dailyQuestProgress as AnswerRecord[]
              setAnswered(progress)
              setCurrent(progress.length)
              if (serverData.dailyQuestCompleted) {
                setScore(
                  serverData.dailyQuestScore ??
                    progress.filter((a: AnswerRecord) => a.correct).length
                )
                setShowCongrats(true)
              } else {
                setShowCongrats(false)
              }
              return
            }
          }
        } catch {
          // Server unavailable — fall through to a fresh start
        }
        // Logged in but no server record for today: start fresh
        setAnswered([])
        setCurrent(0)
        setShowCongrats(false)
      } else {
        // ── Guest: load progress from localStorage ───────────────────────────
        const key = guestKey()
        const stored = localStorage.getItem(key)
        if (stored) {
          try {
            const progress: AnswerRecord[] = JSON.parse(stored)
            setAnswered(progress)
            setCurrent(progress.length)
            if (progress.length === mapped.length) {
              const finalScore = progress.filter((a) => a.correct).length
              setScore(finalScore)
              if (localStorage.getItem(`${key}_completed`) === "true") {
                setShowCongrats(true)
              }
            }
          } catch {
            // Corrupted storage — start fresh
          }
        }
      }
    } catch (err: unknown) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Network error")
    }
  }, [isAuthenticated, isHydrated])

  useEffect(() => {
    load()
  }, [load])

  const handleBoxClick = (i: number) => {
    if (i === current) {
      setShowModal(true)
    } else if (answered.find((a) => a.index === i)) {
      setReviewIndex(i)
    }
  }

  const handleAnswerSubmit = (input: string) => {
    if (status !== "ready" || current >= questions.length) return

    const isCorrect = normalize(input) === normalize(questions[current].answer)
    const updated = [...answered, { index: current, correct: isCorrect, guess: input }]
    setAnswered(updated)
    setCurrent(updated.length)
    setShowModal(false)

    const isComplete = updated.length === questions.length
    const finalScore = updated.filter((a) => a.correct).length

    if (isComplete) {
      setScore(finalScore)
      setShowCongrats(true)
    }

    if (isAuthenticated) {
      // ── Logged-in: persist to database ───────────────────────────────────
      authFetch("/api/scores/daily-quest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: finalScore,
          completed: isComplete,
          progress: updated,
        }),
      }).catch(() => {})
    } else {
      // ── Guest: persist to localStorage ───────────────────────────────────
      const key = guestKey()
      localStorage.setItem(key, JSON.stringify(updated))
      if (isComplete) {
        localStorage.setItem(`${key}_completed`, "true")
        localStorage.setItem(`${key}_score`, finalScore.toString())
      }
    }
  }

  useEffect(() => {
    if (showModal && questions[current]) {
      ;(async () => {
        try {
          const names = await getAllNames(questions[current].answers_db)
          setAllNames(names)
        } catch {
          setAllNames([])
        }
      })()
    }
  }, [showModal, questions, current])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-[#2eaafd] pt-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-lg text-white font-medium">Loading Daily Quest...</p>
        </div>
      </div>
    )
  }

  if (status === "empty") {
    return <NoPuzzleToday game="Daily Quest" />
  }

  if (status === "error") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 bg-[#2eaafd] pt-16">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{errorMsg}</p>
          <button
            onClick={load}
            className="px-6 py-3 rounded-xl bg-[#2a569c] text-white font-semibold hover:bg-[#1e4070] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#2eaafd] flex flex-col items-center px-4 pt-24 pb-12">
      <div className="w-full max-w-6xl flex-1 flex flex-col justify-center py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Daily Quest</h1>
          <p className="text-white/80 text-lg">Answer 5 sports trivia questions to complete today's quest</p>
          <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white/60 text-sm">Progress:</span>
              <span className="text-white font-bold">{answered.length}/5</span>
            </div>
            <HowToPlayModal
              gameName="Daily Quest"
              subtitle="Five sports trivia questions. One new set every day."
              steps={DAILY_QUEST_STEPS}
            />
          </div>
        </motion.div>

        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-center gap-6 md:gap-8`}>
          {questions.map((_, i) => {
            const record = answered.find((a) => a.index === i)
            const isAnswered = !!record
            const correct = record?.correct ?? false

            return (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                >
                  <QuestionBox
                    index={i}
                    unlocked={i === current || isAnswered}
                    answered={isAnswered}
                    correct={correct}
                    locked={i > current}
                    onClick={() => handleBoxClick(i)}
                    active={(showModal && current === i) || reviewIndex === i}
                  />
                </motion.div>
                {i < questions.length - 1 && (
                  <ChevronRight
                    className={`${isMobile ? "rotate-90" : ""} text-white/40 transition-all duration-300 ${
                      isAnswered ? "text-white/80" : ""
                    }`}
                    size={isMobile ? 32 : 40}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {showModal && current < questions.length && (
          <QuestionModal
            question={questions[current].text}
            answersDb={questions[current].answers_db}
            allNames={allNames}
            onSubmit={handleAnswerSubmit}
            onClose={() => setShowModal(false)}
          />
        )}

        {reviewIndex !== null && reviewIndex < questions.length && (
          <QuestionModal
            question={questions[reviewIndex].text}
            answersDb={questions[reviewIndex].answers_db}
            review={true}
            guess={answered.find((a) => a.index === reviewIndex)?.guess ?? ""}
            correctAnswer={questions[reviewIndex].answer}
            wasCorrect={answered.find((a) => a.index === reviewIndex)?.correct ?? false}
            onClose={() => setReviewIndex(null)}
          />
        )}
      </div>

      <GameNavHub currentGame="dailyquest" />

      {showCongrats && (
        <CompleteModal score={score} onClose={() => setShowCongrats(false)} />
      )}
    </div>
  )
}
