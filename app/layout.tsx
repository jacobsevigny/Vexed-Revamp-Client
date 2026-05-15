import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "Vexed Sports – Free Daily Sports Trivia",
    template: "%s | Vexed Sports",
  },
  description:
    "Play free daily sports trivia games — Daily Quest, Fan Feud, Career Path, and Draft Class. New challenges every day for NFL, NBA, and NHL fans.",
  metadataBase: new URL("https://vexedsports.com"),
  openGraph: {
    siteName: "Vexed Sports",
    type: "website",
    locale: "en_US",
    url: "https://vexedsports.com",
    title: "Vexed Sports – Free Daily Sports Trivia",
    description:
      "Play four free daily sports trivia games. Test your NFL, NBA, and NHL knowledge with new challenges every day.",
    images: [{ url: "/logo-full-transparent.svg", alt: "Vexed Sports" }],
  },
  twitter: {
    card: "summary",
    title: "Vexed Sports – Free Daily Sports Trivia",
    description:
      "Play four free daily sports trivia games. Test your NFL, NBA, and NHL knowledge with new challenges every day.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
