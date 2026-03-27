import { cn } from '@/lib/utils'

export function SectionCard({ title, description, children, className }: { title: string, description?: string, children: React.ReactNode, className?: string }) {
  return (
    <section className={cn('bg-white/95 rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8 mb-8', className)}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#152a4d] mb-1">{title}</h2>
        {description && <p className="text-muted-foreground text-base mb-2">{description}</p>}
      </div>
      {children}
    </section>
  )
}
