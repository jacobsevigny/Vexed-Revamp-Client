import { cn } from '@/lib/utils'

const steps = [
  'Choose Date',
  'Build Daily Quest',
  'Build Fan Feud',
  'Build Career Path',
  'Review & Publish',
]

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <nav className="w-full flex items-center justify-center mb-8">
      <ol className="flex gap-0 md:gap-4 w-full max-w-3xl">
        {steps.map((label, i) => (
          <li key={label} className="flex-1 flex flex-col items-center">
            <div className={cn(
              'rounded-full w-8 h-8 flex items-center justify-center font-bold text-base border-2 transition-all',
              i < currentStep ? 'bg-[#2eaafd] border-[#2eaafd] text-white' : i === currentStep ? 'bg-[#2a569c] border-[#2a569c] text-white shadow-lg' : 'bg-white border-blue-200 text-blue-400',
            )}>
              {i + 1}
            </div>
            <span className={cn('mt-2 text-xs font-medium text-center', i === currentStep ? 'text-[#2a569c]' : 'text-blue-400')}>{label}</span>
            {i < steps.length - 1 && (
              <div className="w-full h-1 bg-blue-100 mt-2 mb-2" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
