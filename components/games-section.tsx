import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ClipboardList } from "lucide-react"

const games = [
  {
    title: "Daily Quest",
    description: "Five questions. One path. Can you make it to the end?",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daily-quest-xEdLnWtWdxs0s2Boj9SnRpQMx0dQZZ.png",
    href: "/dailyquest",
  },
  {
    title: "Fan Feud",
    description: "Top 8 answers on the board. Can you name them all?",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fan-feud-sGYenYe9XUg6x6ksnhQmrYMOnWnOOo.png",
    href: "/fanfeud",
  },
  {
    title: "Career Path",
    description: "Guess the player from their career journey.",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/career-path-5XXDodosQ38jzCXi9nvjrcEMrJ8OAs.png",
    href: "/careerpath",
  },
]

export function GamesSection() {
  return (
    <section id="games" className="py-20 md:py-28" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-balance">Choose Your Challenge</h2>
          <p className="text-lg text-white max-w-2xl mx-auto text-pretty">
            Four unique ways to test your sports knowledge. New challenges every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {games.map((game) => (
            <Card
              key={game.title}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 overflow-hidden"
              style={{ backgroundColor: "#082644" }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src={game.iconUrl || "/placeholder.svg"}
                    alt={`${game.title} icon`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-2xl font-black text-white">{game.title}</CardTitle>
                <CardDescription className="text-base mt-2 text-pretty leading-relaxed text-white/80">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Link href={game.href}>
                  <Button
                    className="w-full font-bold group-hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    Play
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}

          {/* Draft Class card */}
          <Card
            className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 overflow-hidden"
            style={{ backgroundColor: "#082644" }}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-[#2eaafd]/20 border-2 border-[#2eaafd]/40 flex items-center justify-center">
                  <ClipboardList className="h-8 w-8 text-[#2eaafd]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-black text-white">Draft Class</CardTitle>
              <CardDescription className="text-base mt-2 text-pretty leading-relaxed text-white/80">
                Guess the NFL team from their draft picks.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <Link href="/draftclass">
                <Button
                  className="w-full font-bold group-hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Play
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
