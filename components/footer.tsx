import Link from "next/link"
import { Instagram, Youtube } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">

            {/* Brand */}
            <div className="max-w-xs">
              <h3 className="text-2xl font-black tracking-tight mb-2">VEXED SPORTS</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Free daily sports trivia for NFL, NBA, and NHL fans. New challenges every day.
              </p>
            </div>

            {/* Games Links */}
            <div>
              <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Games</h4>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/dailyquest" className="text-white/70 hover:text-white transition-colors">
                  Daily Quest
                </Link>
                <Link href="/fanfeud" className="text-white/70 hover:text-white transition-colors">
                  Fan Feud
                </Link>
                <Link href="/careerpath" className="text-white/70 hover:text-white transition-colors">
                  Career Path
                </Link>
                <Link href="/draftclass" className="text-white/70 hover:text-white transition-colors">
                  Draft Class
                </Link>
              </nav>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Company</h4>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </nav>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://tiktok.com/@vexedsports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="Vexed Sports on TikTok"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/vexedsports_tv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="Vexed Sports on Instagram"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://youtube.com/@vexedsports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="Vexed Sports on YouTube"
                >
                  <Youtube className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/50">
            <p>© {year} Vexed Sports. All rights reserved.</p>
            <p>Free daily sports trivia — updated every day.</p>
          </div>

        </div>
      </div>
    </footer>
  )
}
