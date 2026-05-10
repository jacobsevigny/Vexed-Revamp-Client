"use client"
import React, { useEffect, useState } from "react"
import { BarChart3, TrendingUp, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { authFetch } from "@/lib/api"
type StatsShape = {
  totalDaysPlayed?: number
  dailyQuest?: { daysPlayed?: number; totalCorrect?: number; totalQuestions?: number; accuracy?: number | string }
  fanFeud?: { daysPlayed?: number; totalCorrect?: number; totalAnswers?: number; accuracy?: number | string }
  careerPath?: { daysPlayed?: number; correctGuesses?: number; accuracy?: number | string }
}

export function StatsPromoSection() {
  const [stats, setStats] = useState<StatsShape | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await authFetch("/api/scores/stats")
        if (!mounted) return
        if (!res.ok) {
          setStats(null)
        } else {
          const json = await res.json()
          setStats(json?.data || null)
        }
      } catch (e) {
        setStats(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const formatAccuracy = (v: number | string | undefined) => {
    if (v === undefined || v === null) return "0%"
    const s = String(v)
    return s.endsWith('%') ? s : `${s}%`
  }

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#082644" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-balance">Keep Track of Your Scores</h2>
              <p className="text-lg text-white/90 mb-8 text-pretty leading-relaxed">
                Monitor your performance across all trivia games. Track your accuracy and progress over time.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Detailed Analytics</h3>
                    <p className="text-white/80 text-pretty">View your performance metrics for each game mode</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Track Your Progress</h3>
                    <p className="text-white/80 text-pretty">See how you improve over time with historical data</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Accuracy Insights</h3>
                    <p className="text-white/80 text-pretty">Understand your strengths and areas for improvement</p>
                  </div>
                </div>
              </div>

              <Link href="/stats">
                <Button
                  size="lg"
                  className="bg-white text-[#082644] hover:bg-white/90 font-bold text-lg px-8 py-6 hover:scale-105 transition-transform"
                >
                  View Your Stats
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-white">Your Performance</h3>
                  <BarChart3 className="h-6 w-6 text-[#3cbcff]" />
                </div>

                <div className="space-y-6">
                  {loading ? (
                    <p className="text-white/80">Loading...</p>
                  ) : stats ? (
                    [
                      { game: "Daily Quest", accuracy: stats.dailyQuest?.accuracy ?? 0, color: "bg-cyan-500" },
                      { game: "Fan Feud", accuracy: stats.fanFeud?.accuracy ?? 0, color: "bg-purple-500" },
                      { game: "Career Path", accuracy: stats.careerPath?.accuracy ?? 0, color: "bg-emerald-500" },
                    ].map((stat) => (
                      <div key={String(stat.game)}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">{stat.game}</span>
                          <span className="text-white/90 font-bold">{formatAccuracy(stat.accuracy)}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div
                            className={`${stat.color} h-full rounded-full transition-all`}
                            style={{ width: `${Number(String(stat.accuracy).replace('%', '')) || 0}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/80">You have no stats yet. Play a game to get started.</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-black text-white">{stats?.totalDaysPlayed ?? 0}</p>
                      <p className="text-xs text-white/70">Days Played</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{stats?.dailyQuest?.totalCorrect ?? 0}</p>
                      <p className="text-xs text-white/70">Total Correct</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{stats?.dailyQuest?.accuracy ? formatAccuracy(stats.dailyQuest.accuracy) : "0%"}</p>
                      <p className="text-xs text-white/70">Avg Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
