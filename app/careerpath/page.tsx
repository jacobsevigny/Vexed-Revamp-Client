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
import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerPathModal } from "@/components/career-path/career-path-modal"
import { CareerPathCompleteModal } from "@/components/career-path/career-path-complete-modal"
import { getCareerPath, getAllNames, authFetch } from "@/lib/api"
import { useAuth } from '@/lib/auth-context'

interface Team {
  id: number
  league: string
  name: string
  logo_url: string
  order_index: number
  years?: string | null
}
interface QuestData {
  player_name: string
  answers_table: string
  teams: Team[]
}

type Status = "loading" | "empty" | "error" | "ready"

const today = new Date().toISOString().split("T")[0]

// Career Path quest is loaded from the server at runtime

// CareerPathRow Component
const CareerPathRow: React.FC<{ teams: Team[]; shake?: boolean; modalOpen?: boolean }> = ({
  teams,
  shake,
  modalOpen,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640

  return (
    <div className={`w-full relative z-10 ${shake ? "animate-shake" : ""}`}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-6 max-w-6xl mx-auto px-4">
        {teams.map((team, idx) => (
          <React.Fragment key={`${team.league}-${team.id}-${team.order_index}`}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: idx * 0.15,
              }}
              className="flex flex-col items-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2eaafd]/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-[#082644] to-[#152a4d] p-3 sm:p-4 rounded-full border-4 border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
                  <Image
                    src={team.logo_url || "/placeholder.svg"}
                    alt={team.name}
                    width={isMobile ? 56 : 84}
                    height={isMobile ? 56 : 84}
                    style={{ objectFit: "contain" }}
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="mt-4 text-center max-w-[150px]">
                <p className="text-white font-bold text-sm sm:text-base drop-shadow-lg">{team.name}</p>
                {team.years && (
                  <p className="text-xs text-white/70 mt-1">{team.years}</p>
                )}
              </div>
            </motion.div>

            {idx < teams.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 + 0.3 }}
                className="flex items-center justify-center my-4 sm:my-0"
              >
                <Image
                  src="/images/design-mode/road.png"
                  alt="road"
                  width={isMobile ? 30 : 60}
                  height={isMobile ? 60 : 30}
                  className={`drop-shadow-lg ${isMobile ? "rotate-90" : ""}`}
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                  }}
                  draggable={false}
                />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default function CareerPath() {

  const [status, setStatus] = useState<Status>("loading")
  const [errorMsg, setErrorMsg] = useState("")

  const [quest, setQuest] = useState<QuestData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [completeModalOpen, setCompleteModalOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [shake, setShake] = useState(false)
  const [readOnly, setReadOnly] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const [allNames, setAllNames] = useState<string[]>([])

  const getStorageKey = () => `careerpath_progress_guest_${today}`;

  // Handle answer submission (dummy, must be implemented)
  const handleSubmit = () => {
    // TODO: Implement answer submission logic
  };

  const load = useCallback(async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const data = await getCareerPath();
      if (!data) {
        setStatus("empty");
        setQuest(null);
        setAllNames([]);
        setModalOpen(false);
        return;
      }
      setQuest(data);
      // Fetch all player names for autocomplete
      const names = await getAllNames(data.answers_table);
      setAllNames(names);
      setStatus("ready");
      setModalOpen(true); // Automatically open the modal when data loads
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to load Career Path.");
      setStatus("error");
      setAllNames([]);
      setModalOpen(false);
    }
  }, []);

  // Call load on mount (must be after load is defined)
  useEffect(() => {
    load();
  }, [load]);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen w-full bg-[#2eaafd] pt-16">
          <p className="p-6 text-lg text-white">Loading Career Path…</p>
        </div>
        <Footer />
      </>
    )
  }

  if (status === "empty") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-[#2eaafd] pt-16">
          <div className="bg-white/80 rounded-2xl shadow p-6 text-center w-[92vw] max-w-[520px] sm:w-auto">
            <h1 className="text-2xl font-semibold mb-2">No Career Path Yet</h1>
            <p className="text-sm text-gray-700">
              There isn't a Career Path published for today (<span className="font-mono">{today}</span>) yet. Check back
              later.
            </p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (status === "error") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-[#2eaafd] pt-16">
          <div className="bg-white/80 rounded-2xl shadow p-6 text-center w-[92vw] max-w-[520px] sm:w-auto">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-sm text-red-700 break-words">{errorMsg}</p>
            <button onClick={load} className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col items-center px-4 pt-24 pb-20"
        style={{ backgroundColor: "#2eaafd" }}
      >
        {modalOpen && quest && (
          <div className="w-full flex justify-center mb-[50px] px-4">
            <CareerPathModal
              answersDb={quest.answers_table}
              allNames={allNames}
              onSubmit={handleSubmit}
              shake={shake}
              incorrectGuesses={incorrectGuesses}
              readOnly={readOnly}
              playerName={quest.player_name}
            />
          </div>
        )}

        {completeModalOpen && (
          <div className="w-full flex justify-center mb-[50px] px-4">
            <CareerPathCompleteModal
              onClose={() => setCompleteModalOpen(false)}
              gameOver={incorrectGuesses >= 3}
              playerName={quest?.player_name}
            />
          </div>
        )}

        {quest && <CareerPathRow teams={quest.teams} shake={shake} modalOpen={modalOpen} />}

        {quest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-[50px]"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-lg">Career Path</h2>
            <p className="text-sm sm:text-base text-white/80">Guess the player from their career journey</p>
          </motion.div>
        )}
      </div>
    </>
  )
}
