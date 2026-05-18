import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Vexed Sports",
  robots: { index: false, follow: false },
};

const CARDS = [
  {
    href: "/admin/add-trivia",
    icon: CalendarDays,
    title: "Add Trivia",
    description:
      "Create and manage daily content for Daily Quest, Fan Feud, Career Path, and Draft Class. Pick a date and fill in each game section.",
    accent: "from-blue-500/15 to-blue-600/5 hover:border-blue-500/40",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    href: "/admin/articles",
    icon: FileText,
    title: "Manage Articles",
    description:
      "Write and publish sports articles, rankings, and analysis. Use the block-based editor to build rich content with headers, images, and text.",
    accent: "from-emerald-500/15 to-emerald-600/5 hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
      <div className="mx-auto max-w-2xl px-4 py-14">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin
          </div>
          <h1 className="text-4xl font-extrabold text-white">Dashboard</h1>
          <p className="mt-3 text-white/45">
            Manage your content from one place
          </p>
        </div>

        {/* Option cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CARDS.map(
            ({ href, icon: Icon, title, description, accent, iconBg, iconColor }) => (
              <Link key={href} href={href} className="group block">
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/30 ${accent}`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex w-fit rounded-xl p-3.5 ${iconBg} ${iconColor}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h2 className="mb-2 text-xl font-bold text-white">{title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-white/50">
                    {description}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-white/30 transition-colors group-hover:text-white/70">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
