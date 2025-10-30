/**
 * MCOM Mall logo component
 * Displays shopping bag icon with brand text
 *
 * @param className - Optional CSS classes for sizing and styling
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        {/* Shopping bag icon with handles */}
        <path d="M8 10h4V8a8 8 0 0116 0v2h4l2 24H6l2-24z" fill="currentColor" className="text-primary" />
        <path d="M20 14v4m8-4v4" stroke="white" strokeWidth="2" strokeLinecap="round" />

        {/* Brand name text */}
        <text
          x="45"
          y="28"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="20"
          fontWeight="700"
          fill="currentColor"
          className="text-foreground"
        >
          MCOM
        </text>
      </svg>
    </div>
  )
}
