import type { ReactNode } from "react";

// Push all admin page content below the fixed navbar (h-16 = 64px).
// This is the single source of truth for navbar-clearance across every
// /admin/* route so individual pages don't each have to manage it.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="pt-16">{children}</div>;
}
