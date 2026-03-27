
"use client"
// Utility to check if user is logged in (based on localStorage 'user' or 'accessToken')
function isUserLoggedIn() {
  if (typeof window === 'undefined') return false;
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    return !!(user || token);
  } catch {
    return false;
  }
}

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FanFeudModal } from "@/components/fan-feud/fan-feud-modal"
import { FanFeudCompleteModal } from "@/components/fan-feud/fan-feud-complete-modal"
import { getFanFeud, getAllNames, authFetch } from "@/lib/api"
import { useAuth } from '@/lib/auth-context'

type FanFeudAnswer = {
  id: number
  answer: string
  rank: number
}

type Status = "loading" | "empty" | "error" | "ready"

const today = new Date().toISOString().split("T")[0]

// Fan Feud data is loaded from the server at runtime

// Answer slot images (1-8)
const answerImages = [
  "/number-1-badge.jpg",
  "/number-2-badge.jpg",
  "/number-3-badge.jpg",
  "/number-4-badge.jpg",
  "/number-5-badge.jpg",
  "/number-6-badge.jpg",
  "/number-7-badge.jpg",
  "/number-8-badge.jpg",
]

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
  const [initialized, setInitialized] = useState(false)

  const [gridScale, setGridScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [shake, setShake] = useState(false)

  // Storage key for guest progress
  const getStorageKey = () => `fanfeud_progress_guest_${today}`

  // Load progress from localStorage (for guests)
  const loadProgressFromStorage = () => {
    const storageKey = getStorageKey()
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setRevealedAnswers(parsed.revealedAnswers || Array(8).fill(false))
        setIncorrectGuesses(parsed.incorrectGuesses ?? 0)
        setGameComplete(parsed.gameComplete ?? false)
        setDidWin(parsed.didWin ?? false)
        // If the game was already completed (lost or won), show the complete modal on load
        if (parsed.gameComplete) {
          setShowCompleteModal(true)
          // keep the question modal hidden on load when completed
          setShowModal(false)
        } else {
          setShowCompleteModal(false)
          setShowModal(true)
        }
      } catch {
        console.warn("Invalid saved data. Resetting.")
        setRevealedAnswers(Array(8).fill(false))
        setIncorrectGuesses(0)
        setGameComplete(false)
        setDidWin(false)
        setShowCompleteModal(false)
        setShowModal(true)
      }
    } else {
      // no saved progress -> start with question modal open
      setShowCompleteModal(false)
      setShowModal(true)
    }
  }

  // Save progress to localStorage (for guests only)
  const saveProgressToStorage = () => {
    if (!isUserLoggedIn()) {
      const storageKey = getStorageKey()
      const toStore = { revealedAnswers, incorrectGuesses, gameComplete, didWin }
      localStorage.setItem(storageKey, JSON.stringify(toStore))
    }
  }

  // Try persisting progress to server (authenticated users)
  const { isAuthenticated } = useAuth();
  const saveProgressToServer = async () => {
    if (!isAuthenticated) return;
    try {
      const score = revealedAnswers.filter(Boolean).length
      const totalAnswers = answers.length
      await authFetch('/api/scores/fan-feud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: { revealedAnswers }, score, totalAnswers, completed: gameComplete, incorrectGuesses }),
      });
    } catch (e) {
      // ignore failures
    }
  }

  const load = useCallback(async () => {
    try {
      setStatus("loading")
      setErrorMsg("")

      // Fetch from API
      const data = await getFanFeud()
      if (!data) {
        setStatus("empty")
        return
      }

      setQuestion(data.question)
      setAnswersDb(data.answersDb)
      // Map server shape (answerText) to client shape (answer)
      const mappedAnswers = (data.answers || []).map((a: any) => ({ id: a.id, answer: a.answerText ?? a.answer ?? "", rank: a.rank }))
      setAnswers(mappedAnswers)

      // don't preload the full allNames list here; let the modal fetch it when needed
      setAllAnswers([])

      if (isAuthenticated) {
        // Clear guest progress on login
        const storageKey = getStorageKey();
        localStorage.removeItem(storageKey);
        // Try loading progress from server
        try {
          const res = await authFetch('/api/scores/load', { headers: { 'Content-Type': 'application/json' } });
          if (res.ok) {
            const json = await res.json()
            const serverData = json?.data
            if (serverData && serverData.fanFeudProgress) {
              const prog = serverData.fanFeudProgress
              setRevealedAnswers(prog.revealedAnswers || Array(8).fill(false))
              setIncorrectGuesses(serverData.fanFeudIncorrectGuesses || 0)
              setGameComplete(serverData.fanFeudCompleted || false)
              setDidWin((serverData.fanFeudScore || 0) >= (serverData.fanFeudTotalAnswers || 0))
              if (serverData.fanFeudCompleted) {
                setShowCompleteModal(true)
                setShowModal(false)
              } else {
                setShowCompleteModal(false)
                setShowModal(true)
              }
              setInitialized(true)
              setStatus("ready")
              return;
            }
          }
        } catch (e) {
          // If server fails, treat as not logged in (do not fallback to localStorage)
        }
        // If logged in but no server data, start fresh
        setRevealedAnswers(Array(8).fill(false))
        setIncorrectGuesses(0)
        setGameComplete(false)
        setDidWin(false)
        setShowCompleteModal(false)
        setShowModal(true)
        setInitialized(true)
        setStatus("ready")
        return;
      } else {
        // fallback to localStorage for guests
        loadProgressFromStorage();
      }

      setInitialized(true)
      setStatus("ready")
      // `loadProgressFromStorage` will decide whether to open the question modal or the complete modal
    } catch (e: any) {
      setStatus("error")
      setErrorMsg(e?.message || "Network error")
      setShowModal(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Save progress whenever state changes
  useEffect(() => {
    if (!initialized) return
    if (isUserLoggedIn()) {
      // Only persist to server
      saveProgressToServer()
    } else {
      // Only persist to localStorage
      saveProgressToStorage()
    }
  }, [revealedAnswers, incorrectGuesses, gameComplete, didWin, initialized])

  // Handle responsive scaling
  useEffect(() => {
    const onResize = () => {
      const gridNaturalWidth = 2 * 264 + 24 + 48
      const maxGridWidth = window.innerWidth * 0.9
      const scale = Math.min(1, maxGridWidth / gridNaturalWidth)
      setGridScale(scale)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const handleGuess = (guess: string) => {
    const normalizedGuess = guess.trim().toLowerCase()
    const matched = answers.find((ans) => ((ans.answer ?? "").trim().toLowerCase() === normalizedGuess))

    if (matched) {
      setRevealedAnswers((prev) => {
        const updated = [...prev]
        updated[matched.rank - 1] = true

        const allRevealed = updated.every((val, i) => {
          const hasAnswer = answers.some((a) => a.rank === i + 1)
          return !hasAnswer || val
        })

        if (allRevealed) {
          setGameComplete(true)
          setDidWin(true)
          setShowCompleteModal(true)
        }

        return updated
      })
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setIncorrectGuesses((prev) => {
        const newCount = prev + 1
        if (newCount >= 3) {
          setGameComplete(true)
            setDidWin(false)
            setShowCompleteModal(true)
        }
        return newCount
      })
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
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen w-full flex items-center justify-center px-4 pt-16"
          style={{ backgroundColor: "#2eaafd" }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-md border-4 border-[#152a4d]">
            <h1 className="text-3xl font-bold mb-4 text-[#152a4d]">No Fan Feud Yet</h1>
            <p className="text-gray-700">
              There isn't a Fan Feud published for today (<span className="font-mono font-semibold">{today}</span>) yet.
              Check back later!
            </p>
          </div>
        </div>
      </>
    )
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
          {/* Question header with modern styling */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 drop-shadow-lg">Fan Feud</h1>
            <p className="text-xl sm:text-2xl text-white/90 font-semibold">Guess all answers on the board to win!</p>
          </motion.div>

          {/* Floating modal */}
          {showModal && (
            <div className="w-full flex justify-center mb-8 z-10">
              <FanFeudModal
                question={question}
                answersDb={answersDb}
                onSubmit={handleGuess}
                shake={shake} 
                allAnswers={allAnswers}
                incorrectGuesses={incorrectGuesses}
                readOnly={gameComplete && !didWin}
              />
            </div>
          )}

          {/* Complete modal */}
          {showCompleteModal && (
            <div className="w-full flex justify-center mb-8 z-50 relative">
              <FanFeudCompleteModal
                correctCount={revealedAnswers.filter(Boolean).length}
                totalCount={answers.length}
                onClose={() => {
                  // If the user won, just close the complete modal; if they lost, re-open the question modal in read-only mode
                  setShowCompleteModal(false)
                  if (!didWin) setShowModal(true)
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
                      animate={{
                        rotateY: shouldReveal ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Front side - rank number */}
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl shadow-2xl border-4 border-[#152a4d] overflow-hidden group hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundColor: "#082644",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        {answer && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2a569c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="text-8xl sm:text-9xl font-black text-white/10 absolute">{i + 1}</span>
                            <span className="text-6xl sm:text-7xl font-black text-white relative z-10">{i + 1}</span>
                          </>
                        )}
                      </div>

                      {/* Back side - answer text */}
                      <div
                        className="absolute inset-0 flex items-center justify-center rounded-2xl shadow-2xl border-4 border-[#152a4d] px-4 text-center overflow-hidden"
                        style={{
                          backgroundColor: isRevealed ? "#152a4d" : "#082644",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="relative z-10">
                          <div
                            className="text-4xl sm:text-5xl font-black mb-2"
                            style={{
                              color: !isRevealed && gameComplete && !didWin ? "#f06d6f" : "#2eaafd",
                            }}
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
        </div>
      </div>
    </>
  )
}
