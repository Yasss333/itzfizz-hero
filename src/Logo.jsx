// Placeholder ITZFIZZ logo (SVG). Replace with the real asset if you have one.
export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="#ff5a1f" />
        <path d="M23 6 11 22h8l-2 12 12-17h-8z" fill="#0a0a0a" />
      </svg>
      <span className="font-normal tracking-[0.35em] text-sm">ITZFIZZ</span>
    </div>
  )
}
