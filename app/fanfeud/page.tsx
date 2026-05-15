"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FanFeudModal } from "@/components/fan-feud/fan-feud-modal"
import { FanFeudCompleteModal } from "@/components/fan-feud/fan-feud-complete-modal"
import { getFanFeud, getAllNames, authFetch } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { NoPuzzleToday } from "@/components/no-puzzle-today"
import { HowToPlayModal } from "@/components/how-to-play-modal"
import { GameNavHub } from "@/components/game-nav-hub"

const FAN_FEUD_STEPS = [
  {
    step: "1",
    title: "Read the Question",
    desc: "A daily sports survey question is shown. The top answers are hidden on the board.",
  },
  {
    step: "2",
    title: "Type Your Guess",
    desc: "Type an answer and select from the autocomplete suggestions.",
  },
  {
    step: "3",
    title: "Flip the Board",
    desc: "Correct guesses flip the matching card on the board. Reveal all answers to win.",
  },
  {
    step: "4",
    title: "Watch Your Lives",
    desc: "You have 3 wrong guesses before the game ends. Reveal all answers before you run out of lives.",
  },
]

type FanFeudAnswer = { id: number; answer: string; rank: number }
type Status = "loading" | "empty" | "error" | "ready"

const today = new Date().toISOString().split("T")[0]

export default function FanFeud() {
  const [status, setStatus] = useState<Status>("loading")
  const [errorMsg, setErrorMsg] = useState("")

  const [question, setQuestion] = useState("")
  const [answers, setAnswers] = useState<FanFeudAnswer[]>([])
  const [answersDb, setAnswersDb] = useState("")
  const [allAnswers, setAllAnswers] = useState<string[]>([])

  const [showModal, setShowModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(Array(8).fill(false))
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [didWin, setDidWin] = useState(false)

  const [gridScale, setGridScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [shake, setShake] = useState(false)
  // Tracks cards whose flip animation has fully completed.
  // Once a card is in this set we stop rendering its front face, guaranteeing
  // the placeholder number is gone even on Mobile Safari where
  // backface-visibility can misbehave.
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const { isAuthenticated, isHydrated } = useAuth()

  const guestKey = () => `fanfeud_progress_guest_${today}`

  // ── Persist progress to the correct storage layer ──────────────────────────
  // Called directly from handleGuess with the exact new values — no stale closure risk.
  const saveProgress = async (
    revealed: boolean[],
    incorrect: number,
    complete: boolean,
    win: boolean,
    currentAnswers: FanFeudAnswer[]
  ) => {
    if (isAuthenticated) {
      try {
        const score = revealed.filter(Boolean).length
        await authFetch("/api/scores/fan-feud", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            progress: { revealedAnswers: revealed },
            score,
            totalAnswers: currentAnswers.length,
            completed: complete,
            incorrectGuesses: incorrect,
          }),
        })
      } catch { /* ignore — progress will be saved on next action */ }
    } else {
      localStorage.setItem(
        guestKey(),
        JSON.stringify({ revealedAnswers: revealed, incorrectGuesses: incorrect, gameComplete: complete, didWin: win })
      )
    }
  }

  const load = useCallback(async () => {
    if (!isHydrated) return

    try {
      setStatus("loading")
      setErrorMsg("")
      // Reset flip-tracking so cards restored from server/localStorage that are
      // already revealed skip straight to the flipped state without animation.
      setFlippedCards(new Set())

      const data = await getFanFeud()
      if (!data) {
        setStatus("empty")
        return
      }

      setQuestion(data.question)
      setAnswersDb(data.answersDb)
      const mappedAnswers: FanFeudAnswer[] = (data.answers || []).map((a: any) => ({
        id: a.id,
        answer: a.answerText ?? a.answer ?? "",
        rank: a.rank,
      }))
      setAnswers(mappedAnswers)
      setAllAnswers([])

      if (isAuthenticated) {
        // ── Logged-in: load progress from the database ──────────────────────
        try {
          const res = await authFetch("/api/scores/load", {
            headers: { "Content-Type": "application/json" },
          })
          if (res.ok) {
            const { data: serverData } = await res.json()
            if (serverData?.fanFeudProgress) {
              const prog = serverData.fanFeudProgress
              const revealed = prog.revealedAnswers || Array(8).fill(false)
              const incorrect = serverData.fanFeudIncorrectGuesses ?? 0
              const complete = serverData.fanFeudCompleted ?? false
              // Win = completed and didn't exhaust all guesses
              const win = complete && incorrect < 3

              setRevealedAnswers(revealed)
              setFlippedCards(new Set(revealed.map((r: boolean, i: number) => r ? i : -1).filter((i: number) => i >= 0)))
              setIncorrectGuesses(incorrect)
              setGameComplete(complete)
              setDidWin(win)
              setShowCompleteModal(complete)
              setShowModal(!complete)
              setStatus("ready")
              return
            }
          }
        } catch {
          // Server unavailable — fall through to a fresh start
        }
        // Logged in but no server record today: start fresh
        setRevealedAnswers(Array(8).fill(false))
        setIncorrectGuesses(0)
        setGameComplete(false)
        setDidWin(false)
        setShowCompleteModal(false)
        setShowModal(true)
      } else {
        // ── Guest: load progress from localStorage ───────────────────────────
        // Guest localStorage is intentionally NOT cleared here so that
        // guest progress remains intact when the user logs out again.
        const stored = localStorage.getItem(guestKey())
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            const restoredRevealed: boolean[] = parsed.revealedAnswers || Array(8).fill(false)
            setRevealedAnswers(restoredRevealed)
            setFlippedCards(new Set(restoredRevealed.map((r, i) => r ? i : -1).filter(i => i >= 0)))
            setIncorrectGuesses(parsed.incorrectGuesses ?? 0)
            setGameComplete(parsed.gameComplete ?? false)
            setDidWin(parsed.didWin ?? false)
            setShowCompleteModal(parsed.gameComplete ?? false)
            setShowModal(!(parsed.gameComplete ?? false))
          } catch {
            setRevealedAnswers(Array(8).fill(false))
            setIncorrectGuesses(0)
            setGameComplete(false)
            setDidWin(false)
            setShowCompleteModal(false)
            setShowModal(true)
          }
        } else {
          setRevealedAnswers(Array(8).fill(false))
          setIncorrectGuesses(0)
          setGameComplete(false)
          setDidWin(false)
          setShowCompleteModal(false)
          setShowModal(true)
        }
      }

      setStatus("ready")
    } catch (e: unknown) {
      setStatus("error")
      setErrorMsg(e instanceof Error ? e.message : "Network error")
      setShowModal(false)
    }
  }, [isAuthenticated, isHydrated])

  useEffect(() => {
    load()
  }, [load])

  // Handle responsive scaling
  useEffect(() => {
    const onResize = () => {
      const gridNaturalWidth = 2 * 264 + 24 + 48
      const maxGridWidth = window.innerWidth * 0.9
      setGridScale(Math.min(1, maxGridWidth / gridNaturalWidth))
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const handleGuess = (guess: string) => {
    const normalizedGuess = guess.trim().toLowerCase()
    const matched = answers.find(
      (ans) => (ans.answer ?? "").trim().toLowerCase() === normalizedGuess
    )

    if (matched) {
      // ── Correct guess ─────────────────────────────────────────────────────
      const newRevealed = [...revealedAnswers]
      newRevealed[matched.rank - 1] = true

      const allRevealed = newRevealed.every((val, i) => {
        const hasAnswer = answers.some((a) => a.rank === i + 1)
        return !hasAnswer || val
      })

      setRevealedAnswers(newRevealed)

      if (allRevealed) {
        setGameComplete(true)
        setDidWin(true)
        setShowCompleteModal(true)
        saveProgress(newRevealed, incorrectGuesses, true, true, answers)
      } else {
        saveProgress(newRevealed, incorrectGuesses, false, false, answers)
      }
    } else {
      // ── Wrong guess ───────────────────────────────────────────────────────
      setShake(true)
      setTimeout(() => setShake(false), 500)

      const newIncorrect = incorrectGuesses + 1
      setIncorrectGuesses(newIncorrect)

      if (newIncorrect >= 3) {
        setGameComplete(true)
        setDidWin(false)
        setShowCompleteModal(true)
        saveProgress(revealedAnswers, newIncorrect, true, false, answers)
      } else {
        saveProgress(revealedAnswers, newIncorrect, false, false, answers)
      }
    }
  }

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div
          className="flex items-center justify-center min-h-screen w-full pt-16"
          style={{ backgroundColor: "#2eaafd" }}
        >
          <p className="p-6 text-lg text-white font-semibold">Loading Fan Feud…</p>
        </div>
      </>
    )
  }

  if (status === "empty") {
    return <NoPuzzleToday game="Fan Feud" />
  }

  if (status === "error") {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen w-full flex items-center justify-center px-4 pt-16"
          style={{ backgroundColor: "#2eaafd" }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-md border-4 border-[#152a4d]">
            <h1 className="text-3xl font-bold mb-4 text-[#152a4d]">Something Went Wrong</h1>
            <p className="text-red-600 break-words">{errorMsg}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-y-auto px-4 sm:px-8 pt-28 pb-20"
        style={{ backgroundColor: "#2eaafd" }}
      >
        <div className="w-full max-w-6xl flex flex-col items-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 drop-shadow-lg">Fan Feud</h1>
            <p className="text-xl sm:text-2xl text-white/90 font-semibold mb-3">Guess all answers on the board to win!</p>
            <HowToPlayModal
              gameName="Fan Feud"
              subtitle="Eight answers are on the board. Can you name them all?"
              steps={FAN_FEUD_STEPS}
            />
          </motion.div>

          {showModal && (
            <div className="w-full flex justify-center mb-8 z-10">
              <FanFeudModal
                question={question}
                answersDb={answersDb}
                onSubmit={handleGuess}
                shake={shake}
                allAnswers={allAnswers}
                incorrectGuesses={incorrectGuesses}
                readOnly={gameComplete}
              />
            </div>
          )}

          {showCompleteModal && (
            <div className="w-full flex justify-center mb-8 z-50 relative">
              <FanFeudCompleteModal
                correctCount={revealedAnswers.filter(Boolean).length}
                totalCount={answers.length}
                onClose={() => {
                  setShowCompleteModal(false)
                  setShowModal(true)
                }}
              />
            </div>
          )}

          <div className={`w-full ${shake ? "animate-shake" : ""}`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
              {Array.from({ length: 8 }).map((_, i) => {
                const answer = answers.find((a) => a.rank === i + 1)
                const isRevealed = revealedAnswers[i]
                const shouldReveal = isRevealed || (gameComplete && !didWin && answer)
                // Once the flip animation settles we stop rendering the front face
                // entirely so the placeholder number cannot bleed through on any browser.
                const frontFaceGone = flippedCards.has(i)

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    style={{ perspective: "1000px" }}
                    className="aspect-[3/2]"
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotateY: shouldReveal ? 180 : 0 }}
                      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        // Both the unprefixed and webkit-prefixed forms are needed.
                        // Without -webkit-transform-style Safari flattens the children
                        // and backface-visibility stops working.
                        transformStyle: "preserve-3d",
                        WebkitTransformStyle: "preserve-3d",
                      }}
                      onAnimationComplete={() => {
                        if (shouldReveal) {
                          setFlippedCards((prev) => new Set([...prev, i]))
                        } else {
                          setFlippedCards((prev) => {
                            const next = new Set(prev)
                            next.delete(i)
                            return next
                          })
                        }
                      }}
                    >
                      {/* Front face – rank number.
                          Removed overflow-hidden: on Mobile Safari that property
                          forces a new compositing layer on an element inside a
                          preserve-3d context, which breaks backface-visibility and
                          makes the number "ghost" over the revealed answer.
                          Also removed hover:scale-105 / transition-transform for the
                          same reason (CSS transforms on children of preserve-3d
                          containers can re-flatten the 3D context in Safari).
                          The belt-and-suspenders: we stop rendering this element
                          entirely once the flip animation completes (frontFaceGone). */}
                      {!frontFaceGone && (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl shadow-2xl border-4 border-[#152a4d]"
                          style={{
                            backgroundColor: "#082644",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        >
                          {answer && (
                            <>
                              <span className="text-8xl sm:text-9xl font-black text-white/10 absolute select-none">{i + 1}</span>
                              <span className="text-6xl sm:text-7xl font-black text-white relative z-10">{i + 1}</span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Back face – answer text */}
                      <div
                        className="absolute inset-0 flex items-center justify-center rounded-2xl shadow-2xl border-4 border-[#152a4d] px-4 text-center overflow-hidden"
                        style={{
                          backgroundColor: isRevealed ? "#152a4d" : "#082644",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          WebkitTransform: "rotateY(180deg)",
                        }}
                      >
                        <div className="relative z-10">
                          <div
                            className="text-4xl sm:text-5xl font-black mb-2"
                            style={{ color: !isRevealed && gameComplete && !didWin ? "#f06d6f" : "#2eaafd" }}
                          >
                            {i + 1}
                          </div>
                          <div
                            className="font-bold leading-tight"
                            style={{
                              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                              color: !isRevealed && gameComplete && !didWin ? "#f06d6f" : "#fff",
                            }}
                          >
                            {answer?.answer}
                          </div>
                        </div>
                        {isRevealed && (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2eaafd]/10 to-transparent" />
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <GameNavHub currentGame="fanfeud" />
        </div>
      </div>
    </>
  )
}
