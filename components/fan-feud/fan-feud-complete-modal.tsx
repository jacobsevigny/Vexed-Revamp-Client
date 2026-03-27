"use client"
import ReactDOM from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star } from "lucide-react"
import { useEffect } from "react"

type Props = {
  correctCount: number
  totalCount: number
  onClose: () => void
}

export function FanFeudCompleteModal({ correctCount, totalCount, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const getScoreMessage = () => {
    if (totalCount === 0) return "Nice Try!"
    const pct = correctCount / totalCount
    if (pct === 1) return "Perfect Score! 🎉"
    if (pct >= 0.8) return "Excellent Work! 🌟"
    if (pct >= 0.6) return "Good Job! 👏"
    if (pct >= 0.4) return "Not Bad! 💪"
    return "Keep Practicing! 📚"
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
          className="relative rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          style={{ backgroundColor: "#082644" }}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2eaafd]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#2a569c]/20 to-transparent rounded-full blur-3xl" />

          <div className="relative p-8 md:p-12 text-center">
            {/* Trophy Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 1639.16 1372.8"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="trophy"
                >
                  <defs>
                    <style>
{`.cls-1{fill:#7bc143}.cls-1,.cls-2,.cls-3,.cls-4{stroke-width:0px}.cls-2{fill:#f0efef}.cls-3{fill:#fff}.cls-4{fill:#1958a4}`}
                    </style>
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

                {correctCount === totalCount && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -top-2 -right-2"
                  >
                    <Star size={32} className="text-yellow-400 fill-yellow-400" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Fan Feud Complete!
            </motion.h2>

            {/* Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white px-8 py-4 rounded-2xl shadow-lg">
                <span className="text-5xl font-bold">{correctCount}</span>
                <span className="text-2xl font-semibold">/{totalCount}</span>
              </div>
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-semibold text-white mb-2"
            >
              {getScoreMessage()}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/70 mb-8"
            >
              Come back tomorrow to play again!
            </motion.p>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
