"use client"

import ReactDOM from "react-dom"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useId } from "react"
import { GAMES, type GameId } from "@/lib/games-config"

export function TrophySVG({ className = "w-14 h-14 sm:w-20 sm:h-20" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1639.16 1372.8"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Trophy"
    >
      <defs>
        <style>{`.cls-1{fill:#7bc143}.cls-1,.cls-2,.cls-3,.cls-4{stroke-width:0px}.cls-2{fill:#f0efef}.cls-3{fill:#fff}.cls-4{fill:#1958a4}`}</style>
      </defs>
      <circle className="cls-2" cx="641.59" cy="647.38" r="31.54" />
      <g>
        <path className="cls-4" d="M895.84,1066.31c64.45-14.07,127.88-31.54,189.36-52.18l-155.38,358.66h-261.23l-112.57-259.85c109.09-5.51,223.13-21.14,339.82-46.64Z" />
        <path className="cls-4" d="M1597.06,0l-161.3,204.85-56.5,130.44-2.5,5.77-46.52,107.41-155.26,358.4c-95.58,44.34-204.05,80.38-314.62,104.53-128.58,28.06-257.46,43.02-372.89,43.28l-133.38-307.93h-.03l-48.2-111.33L162.64,204.85,1.34,0l511.16,175.58,203.82,413.76c-135-118.93-400.86-270.04-400.86-270.04l174.93,214.59c-39.66,113.8,27.97,244.54,151.52,223.07,81.5-14.16,100.46-70.81,103.94-107.68l53.35,108.33,53.35-108.33c3.47,36.86,22.44,93.52,103.94,107.68,123.55,21.47,191.18-109.27,151.52-223.07l174.93-214.59s-265.86,151.11-400.86,270.04l203.82-413.76L1597.06,0Z" />
        <circle className="cls-2" cx="956.82" cy="647.38" r="31.54" />
      </g>
      <polygon className="cls-1" points="305.86 535.42 354.09 646.75 354.06 646.75 305.86 535.42" />
      <polygon className="cls-1" points="1376.76 341.06 1330.24 448.47 1330.21 448.47 1376.76 341.06" />
      <path className="cls-3" d="M1637.11,516.34c-14.75-76.85-102.73-123.34-236.15-142.28l-21.38,49.32c86.15,19.43,139.13,53.94,145.66,94.9,7.8,48.79-20.58,121.34-152.55,215.65-50.62,36.19-108.09,69.52-170.63,99.26-100.85,48.02-214.83,86.66-334.17,112.71-132.21,28.86-264.85,44.11-383.6,44.11-6.8,0-13.49-.03-20.08-.15-236.82-2.97-347-59.07-360.55-121.05-11.63-53.41,37.95-134.21,149.84-204.73,17.49-11.01,36.01-21.97,55.41-32.71l-20.55-47.44C94.83,682.38-19.62,799.51,2.78,902.18c25.97,118.9,227.22,183.06,500.23,177.32,117.84-2.47,249.04-17.96,385.28-47.7,93.25-20.35,181.23-47.32,261.85-78.76,310.14-120.87,511.72-307.67,486.96-436.69Z" />
    </svg>
  )
}

type GameCompleteModalProps = {
  onClose: () => void
  title: string
  badge: React.ReactNode
  message: string
  subMessage: string
  icon?: React.ReactNode
  currentGame?: GameId
}

export function GameCompleteModal({
  onClose,
  title,
  badge,
  message,
  subMessage,
  icon,
  currentGame,
}: GameCompleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const otherGames = currentGame ? GAMES.filter((g) => g.id !== currentGame) : []

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const t = setTimeout(() => modalRef.current?.focus(), 50)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  if (typeof document === "undefined") return null

  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative rounded-3xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[85vh] focus:outline-none"
          style={{ backgroundColor: "#082644" }}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={trapFocus}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2eaafd]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#2a569c]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-5 sm:p-7 md:p-9 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-2.5 sm:mb-4"
            >
              {icon ?? <TrophySVG />}
            </motion.div>

            <motion.h2
              id={titleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3"
            >
              {title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="mb-2.5 sm:mb-4"
            >
              {badge}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base font-semibold text-white mb-1"
            >
              {message}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-5"
            >
              {subMessage}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={onClose}
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white text-sm sm:text-base font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              Close
            </motion.button>

            {otherGames.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10"
              >
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-2 sm:mb-3">
                  Play Another Game
                </p>
                <div className="flex gap-2 sm:gap-2.5 justify-center">
                  {otherGames.map((game) => (
                    <Link
                      key={game.id}
                      href={game.href}
                      aria-label={`Play ${game.title}`}
                      className="flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/12 hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200 group w-[70px] sm:w-[86px]"
                    >
                      <img
                        src={game.iconUrl}
                        alt={`${game.title} icon`}
                        className="w-7 h-7 sm:w-9 sm:h-9 object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                      <span className="text-white/60 text-[9px] sm:text-[10px] font-semibold text-center leading-tight group-hover:text-white/90 transition-colors duration-200">
                        {game.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
