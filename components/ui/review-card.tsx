import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function ReviewCard({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <Card className={cn('mb-4 p-4 bg-white/90 border-blue-100', className)}>
      <h3 className="text-lg font-bold text-[#2a569c] mb-2">{title}</h3>
      {children}
    </Card>
  )
}
