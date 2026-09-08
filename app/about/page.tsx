import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vexed Sports — a free daily sports trivia platform built for NFL, NBA, and NHL fans. Play Daily Quest, Fan Feud, Career Path, and Draft Class.",
  openGraph: { url: "https://vexedsports.com/about" },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 md:p-12 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 text-center">About Vexed Sports</h1>

          <div className="space-y-8 text-white/90 text-lg leading-relaxed">

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Who We Are</h2>
              <p>
                Vexed Sports was built by a lifelong sports fan who wanted a better way to test and celebrate sports
                knowledge. The goal was simple: create a free daily destination where fans can challenge themselves,
                learn something new, and enjoy quick games built for people who love the sport as much as we do.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
              <p className="mb-4">
                Vexed Sports features four unique daily games, each challenging your sports knowledge in a different way:
              </p>
              <ul className="space-y-4 ml-2">
                <li className="flex gap-3">
                  <span className="font-black text-white shrink-0">Daily Quest —</span>
                  <span>
                    Answer five progressive sports trivia questions each day covering NFL stats, NBA history, NHL
                    records, and more. Each correct answer unlocks the next question.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-white shrink-0">Fan Feud —</span>
                  <span>
                    Name the top eight answers from a daily sports survey. Think fast — you only get three wrong guesses
                    before the game ends.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-white shrink-0">Career Path —</span>
                  <span>
                    Study the team logos from a player's career journey and figure out who they are. A new mystery
                    player is featured every day.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-white shrink-0">Draft Class —</span>
                  <span>
                    Guess which NFL team's draft class is shown using pick data as clues. More information is revealed
                    with each wrong guess — the fewer guesses you use, the better.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p>
                Sports trivia should be fun, free, and available every single day. Vexed Sports releases new challenges
                daily across all four games and is completely free to play — no subscription, no paywalls. Whether
                you're a casual fan or a die-hard expert, there's always something to test your knowledge.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Track Your Progress</h2>
              <p>
                Create a free account to save your scores, track your daily streaks, and see your performance history
                across all four games. Guest players are always welcome too — no account is required to start
                playing right away.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">What's Next</h2>
              <p>
                Vexed Sports is constantly growing. More games, more leagues, and more community features for sports
                fans are on the way. Follow us on social media to stay up to date with new releases and daily challenge
                announcements.
              </p>
            </div>

          </div>

          <div className="mt-10 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/#games" className="text-white/80 hover:text-white font-medium transition-colors">
              Browse Games
            </Link>
            <span className="text-white/30">·</span>
            <Link href="/contact" className="text-white/80 hover:text-white font-medium transition-colors">
              Contact Us
            </Link>
            <span className="text-white/30">·</span>
            <Link href="/privacy" className="text-white/80 hover:text-white font-medium transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/30">·</span>
            <Link href="/terms" className="text-white/80 hover:text-white font-medium transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
