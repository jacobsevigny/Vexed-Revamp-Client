import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28" style={{ backgroundColor: "#082644" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-balance">About Vexed Sports</h2>
          <p className="text-lg text-white/90 leading-relaxed text-pretty mb-8">
            Founded by JC Sevigny, an avid sports fan and lifelong follower of the game, Vexed Sports was created to
            bring the thrill, knowledge, and debate of sports culture to life through interactive daily trivia.
          </p>
          <p className="text-lg text-white/90 leading-relaxed text-pretty mb-8">
            At Vexed Sports, we believe sports fandom is more than just watching — it's remembering legendary plays,
            iconic careers, and unforgettable moments. Our daily games like Daily Quest, Fan Feud, and Career Path let
            fans of all ages experience that excitement in a fun and competitive way.
          </p>
          <p className="text-lg text-white/90 leading-relaxed text-pretty mb-8">
            We're passionate about building a community where trivia meets culture — a space for every fan who's ever
            shouted stats at the TV, argued about MVP races, or remembered who led the league in rushing back in 2006.
          </p>
          <p className="text-lg text-white/90 leading-relaxed text-pretty mb-12">
            Whether you're a casual fan or a walking encyclopedia of sports facts, Vexed Sports is your home for daily
            challenges, friendly competition, and endless sports fun.
          </p>

          <div className="flex justify-center mt-12">
            <Image
              src="/logo-full-transparent.svg"
              alt="Vexed Sports"
              width={400}
              height={115}
              className="w-full max-w-md h-auto opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
