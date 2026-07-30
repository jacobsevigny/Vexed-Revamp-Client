import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const games = [
  {
    title: "Daily Quest",
    description: "Answer 5 trivia NFL questions across various categories. Answer a question to unlock the next. New questions every day.",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/daily-quest-xEdLnWtWdxs0s2Boj9SnRpQMx0dQZZ.png",
    href: "/dailyquest",
  },
  {
    title: "Fan Feud",
    description: "Name all top answers on the board. You have 3 wrong guesses, so make them count. Updated daily.",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fan-feud-sGYenYe9XUg6x6ksnhQmrYMOnWnOOo.png",
    href: "/fanfeud",
  },
  {
    title: "Career Path",
    description: "Study a player's career team history and guess who they are. New mystery player every day.",
    iconUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/career-path-5XXDodosQ38jzCXi9nvjrcEMrJ8OAs.png",
    href: "/careerpath",
  },
  {
    title: "Draft Class",
    description: "Identify an NFL team from their draft class picks. Clues unlock with each wrong guess. New class every day.",
    iconUrl: "https://mxful4sao5eyuuei.public.blob.vercel-storage.com/draft-class.png",
    href: "/draftclass",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch">
          {games.map((game) => (
            <Link
              key={game.title}
              href={game.href}
              className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Card
                className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary border-2 overflow-hidden"
                style={{ backgroundColor: "#082644" }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Image
                      src={game.iconUrl}
                      alt={`${game.title} game icon`}
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
                <CardContent className="text-center pb-6 mt-auto">
                  <Button
                    asChild
                    className="w-full font-bold group-hover:scale-105 transition-transform bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    <span>Play</span>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <p className="text-center text-white/60 text-sm mt-10">
          All games are free to play. No subscription required. New challenges drop every day.
        </p>
      </div>
    </section>
  )
}
