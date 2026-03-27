"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy, Target, TrendingUp, Calendar, CheckCircle2, XCircle } from "lucide-react"

// Determine logged-in state from localStorage (client-side)
import { useEffect, useState } from 'react'

const ClientStatsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    try {
      const hasToken = !!(localStorage.getItem('accessToken') || localStorage.getItem('user'))
      setIsLoggedIn(hasToken)
    } catch (e) {
      setIsLoggedIn(false)
    }
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#2eaafd" }}>
        <Card className="max-w-md w-full border-white/20" style={{ backgroundColor: "#082644" }}>
          <CardContent className="pt-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
            <p className="text-white/70 mb-6">Please log in to view your stats and track your progress.</p>
            <Link href="/login">
              <Button className="bg-white text-[#2a569c] hover:bg-white/90 font-semibold">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <StatsContent />
  )
}

export default ClientStatsPage

// Keep the actual page content in a separate component so it can be rendered when logged in
function StatsContent() {
  const [stats, setStats] = useState<any | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { isAuthenticated } = require('@/lib/auth-context').useAuth();
        if (!isAuthenticated) {
          setStats(null)
          setHistory([])
          setLoading(false)
          return
        }
        const { authFetch } = require('@/lib/api');
        const [sRes, hRes] = await Promise.all([
          authFetch('/api/scores/stats', { headers: { 'Content-Type': 'application/json' } }),
          authFetch('/api/scores/history', { headers: { 'Content-Type': 'application/json' } }),
        ])

        if (!mounted) return

        if (sRes.ok) {
          const sj = await sRes.json()
          setStats(sj?.data || null)
        } else {
          setStats(null)
        }

        if (hRes.ok) {
          const hj = await hRes.json()
          setHistory(hj?.data || [])
        } else {
          setHistory([])
        }
      } catch (e) {
        setStats(null)
        setHistory([])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const gameStats = stats
    ? [
        {
          id: 'daily-quest',
          name: 'Daily Quest',
          icon: Target,
          daysPlayed: stats.dailyQuest?.daysPlayed || 0,
          correctAnswers: stats.dailyQuest?.totalCorrect || 0,
          totalQuestions: stats.dailyQuest?.totalQuestions || 0,
          color: 'from-blue-500 to-cyan-500',
          accentColor: 'text-cyan-400',
        },
        {
          id: 'fan-feud',
          name: 'Fan Feud',
          icon: Trophy,
          daysPlayed: stats.fanFeud?.daysPlayed || 0,
          correctAnswers: stats.fanFeud?.totalCorrect || 0,
          totalQuestions: stats.fanFeud?.totalAnswers || 0,
          color: 'from-purple-500 to-pink-500',
          accentColor: 'text-pink-400',
        },
        {
          id: 'career-path',
          name: 'Career Path',
          icon: TrendingUp,
          daysPlayed: stats.careerPath?.daysPlayed || 0,
          correctAnswers: stats.careerPath?.correctGuesses || 0,
          totalQuestions: stats.careerPath?.daysPlayed || 0,
          color: 'from-emerald-500 to-teal-500',
          accentColor: 'text-teal-400',
        },
      ]
    : []

  const recentActivity = history.slice(0, 7).map((s) => ({
    date: s.date,
    dailyQuest: s.dailyQuestScore || 0,
    fanFeud: s.fanFeudScore || 0,
    careerPath: s.careerPathCorrect ? 5 : 0,
    completed: !!(s.dailyQuestCompleted || s.fanFeudCompleted || s.careerPathCompleted),
  }))

  const totalDaysPlayed = stats?.totalDaysPlayed || gameStats.reduce((sum, game) => sum + (game.daysPlayed || 0), 0)

  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-[#3cbcff]" />
            Your Stats
          </h1>
          <p className="text-white/70 text-lg">Track your performance across all trivia games</p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 border-white/20 overflow-hidden" style={{ backgroundColor: "#082644" }}>
          <div className="bg-gradient-to-r from-[#3cbcff]/20 to-transparent p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-[#3cbcff]" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Total Days Played</p>
                <p className="text-4xl font-bold text-white">{totalDaysPlayed}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Game Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {gameStats.map((game) => {
            const accuracy = Math.round((game.correctAnswers / game.totalQuestions) * 100)
            const Icon = game.icon

            return (
              <Card
                key={game.id}
                className="border-white/20 overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: "#082644" }}
              >
                <div className={`h-2 bg-gradient-to-r ${game.color}`} />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-8 h-8 ${game.accentColor}`} />
                    <Badge className="bg-white/20 text-white border-0">{game.daysPlayed} days</Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{game.name}</CardTitle>
                  <CardDescription className="text-white/60">Performance Overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Accuracy</span>
                      <span className="text-white font-semibold">{accuracy}%</span>
                    </div>
                    <Progress value={accuracy} className="h-3 bg-white/10" />
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Correct Answers</span>
                      <span className="text-white font-bold text-lg">
                        {game.correctAnswers} / {game.totalQuestions}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity Table */}
        <Card className="border-white/20" style={{ backgroundColor: "#082644" }}>
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#3cbcff]" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-white/60">Your performance over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/80 font-semibold">Date</TableHead>
                    <TableHead className="text-white/80 font-semibold text-center">Daily Quest</TableHead>
                    <TableHead className="text-white/80 font-semibold text-center">Fan Feud</TableHead>
                    <TableHead className="text-white/80 font-semibold text-center">Career Path</TableHead>
                    <TableHead className="text-white/80 font-semibold text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((day, index) => (
                    <TableRow key={index} className="border-white/10 hover:bg-white/5 transition-colors">
                      <TableCell className="text-white font-medium">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-semibold"
                        >
                          {day.dailyQuest}/5
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-pink-500/20 text-pink-300 border-pink-500/30 font-semibold"
                        >
                          {day.fanFeud}/5
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-semibold"
                        >
                          {day.careerPath}/5
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {day.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

}
