import { Trophy, Award, Flame } from "lucide-react"
export function LeaderboardSection() {
  return (
    <section id="leaderboard" className="py-20 md:py-28" style={{ backgroundColor: "#082644" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-balance">
                Compete with Fans Worldwide
              </h2>
              <p className="text-lg text-white/90 mb-8 text-pretty leading-relaxed">
                Earn streaks, badges, and climb the ranks each day. Track your progress, challenge your friends, and see
                how you stack up against the best.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Global Leaderboards</h3>
                    <p className="text-white/80 text-pretty">
                      Climb the ranks and prove you're the ultimate sports fan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Daily Streaks</h3>
                    <p className="text-white/80 text-pretty">Keep your streak alive and unlock exclusive rewards</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">Achievement Badges</h3>
                    <p className="text-white/80 text-pretty">Collect badges for your accomplishments and milestones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Element */}
            <div className="relative">
              <div className="bg-card border-2 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">Top Players</h3>
                  <Trophy className="h-6 w-6 text-primary" />
                </div>

                <div className="space-y-4">
                  {[
                    { rank: 1, name: "SportsFan2024", score: 2847, badge: "🥇" },
                    { rank: 2, name: "TriviaKing", score: 2756, badge: "🥈" },
                    { rank: 3, name: "ChampionMind", score: 2689, badge: "🥉" },
                    { rank: 4, name: "QuizMaster", score: 2543, badge: "🏆" },
                    { rank: 5, name: "StatGenius", score: 2498, badge: "⭐" },
                  ].map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{player.badge}</span>
                        <div>
                          <p className="font-bold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">Rank #{player.rank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-primary">{player.score}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
