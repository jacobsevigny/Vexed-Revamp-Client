import { Mail, Globe } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#2eaafd" }}>
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 md:p-12 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 text-center">Contact Us</h1>

          <p className="text-lg text-white/90 leading-relaxed mb-8 text-center">
            We'd love to hear from you! Whether you have a question, feedback, or a business inquiry, feel free to reach
            out to us anytime.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4 p-6 bg-white/10 rounded-xl border border-white/20">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Email</p>
                <a
                  href="mailto:contact@vexedsports.com"
                  className="text-white text-lg font-semibold hover:text-white/80 transition-colors"
                >
                  contact@vexedsports.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-white/10 rounded-xl border border-white/20">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Website</p>
                <a
                  href="https://vexedsports.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-semibold hover:text-white/80 transition-colors"
                >
                  https://vexedsports.com
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/80 leading-relaxed mb-4">
              Our team reviews all messages and will get back to you as soon as possible.
            </p>
            <p className="text-white font-semibold text-lg">Thank you for being part of the Vexed Sports community!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
