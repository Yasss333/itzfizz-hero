// Top-down car drawn in SVG. Front (headlights) faces DOWN because it drives down the page.
export default function Car() {
  return (
    <svg viewBox="0 0 120 240" className="w-full h-auto overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0" stopColor="#e8470f" />
          <stop offset=".5" stopColor="#ff7a3d" />
          <stop offset="1" stopColor="#e8470f" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6c2" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff6c2" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* headlight beams */}
      <polygon points="22,226 46,226 62,330 -6,330" fill="url(#beam)" />
      <polygon points="74,226 98,226 126,330 58,330" fill="url(#beam)" />
      {/* wheels */}
      {[[6, 40], [100, 40], [6, 156], [100, 156]].map(([x, y]) => (
        <rect key={x + '-' + y} x={x} y={y} width="14" height="40" rx="5" fill="#050505" />
      ))}
      {/* shadow + body */}
      <rect x="14" y="8" width="92" height="224" rx="40" fill="#000" opacity=".18" transform="translate(4 6)" />
      <rect x="14" y="4" width="92" height="224" rx="40" fill="url(#body)" />
      {/* glass + roof */}
      <path d="M30 150 Q60 164 90 150 L84 188 Q60 196 36 188 Z" fill="#0a0a0a" opacity=".92" />
      <rect x="30" y="86" width="60" height="62" rx="12" fill="#ffd2bd" />
      <path d="M32 80 Q60 70 88 80 L90 58 Q60 50 30 58 Z" fill="#0a0a0a" opacity=".92" />
      <rect x="57" y="12" width="6" height="30" rx="3" fill="#fff" opacity=".35" />
      {/* lights */}
      <rect x="22" y="214" width="20" height="8" rx="4" fill="#fff6c2" />
      <rect x="78" y="214" width="20" height="8" rx="4" fill="#fff6c2" />
      <rect x="22" y="8" width="18" height="6" rx="3" fill="#8a1f00" />
      <rect x="80" y="8" width="18" height="6" rx="3" fill="#8a1f00" />
    </svg>
  )
}
