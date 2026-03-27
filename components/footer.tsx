import Link from "next/link"
import { Instagram, Youtube } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            {/* Logo */}
            <div>
              <h3 className="text-2xl font-black tracking-tight">VEXED SPORTS</h3>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors font-medium">
                Contact
              </Link>
              <Link href="/privacy" className="text-white/80 hover:text-white transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/80 hover:text-white transition-colors font-medium">
                Terms of Service
              </Link>
            </nav>

            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/vexedsports_tv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/20 text-center text-sm text-white/70">
            <p>© {year} Vexed Sports. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
