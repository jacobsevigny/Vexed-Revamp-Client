export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 md:p-12 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 text-center">About Vexed Sports</h1>

          <div className="space-y-6 text-white/90 text-lg leading-relaxed">
            <p>
              Vexed Sports was created by a lifelong sports lover who wanted to build a place where fans can challenge themselves with daily sports trivia.
            </p>
            <p>
              The goal is simple: create a fun site where people who love sports can test their knowledge, learn new things, and enjoy quick daily games built for fans like us.
            </p>
            <p>
              Over time, Vexed Sports hopes to grow into a larger platform that offers much more than trivia. Bringing together games, content, and experiences designed to satisfy everything sports fans love about the game.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
